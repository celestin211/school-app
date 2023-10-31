<?php

namespace App\Service;

use App\Entity\Corps;
use App\Entity\Grade;
use App\Entity\Ligne;
use App\Entity\ListeAlimentation;
use App\Entity\Referentiel\FonctionsOccupees;
use App\Entity\Referentiel\Mobilite;
use App\Entity\Referentiel\Position;
use App\Entity\Referentiel\TypeFonctionsOccupees;
use App\EnumTypes\EnumEnteteType;
use App\Repository\CorpsRepository;
use App\Repository\GradeRepository;
use App\Repository\Referentiel\FonctionsOccupeesRepository;
use App\Repository\Referentiel\PositionRepository;
use App\Repository\Referentiel\MobiliteRepository;
use App\Repository\Referentiel\TypeFonctionsOccupeesRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Exceptions\ExcelException;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Symfony\Component\String\Slugger\AsciiSlugger;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ExcelFileReader
{
    private const MAPPING = [
        1 => 'Matricule',
        2 => 'Civilite',
        3 => 'NomUsage',
        4 => 'NomNaissance',
        5 => 'Prenom',
        6 => 'DateNaissance',
        7 => 'DateEntreeCorpsAC',
        8 => 'OrigineRecrutement',
        9 => 'DateExerciceDroitOption',
        10 => 'OrigineEntreeCorpsMisEnExtinction',
        11 => 'CorpsOrigine',
        12 => 'GradeOrigine',
        13 => 'DateEntreeCorpsOrigine',
        14 => 'Position',
        15 => 'DateEffetPosition',
        16 => 'DateFinPosition',
        17 => 'Grade',
        18 => 'DateEntreeGrade',
        19 => 'Echelon',
        20 => 'DateEntreeEchelon',
        21 => 'AdministrationAffectation',
        22 => 'AdministrationEmploi',
        23 => 'Direction',
        24 => 'TypeFonctionsOccupees',
        25 => 'FonctionsOccupees',
        26 => 'IntituleFonctionsOccupees',
        27 => 'DateNominationEmploiDirection',
        28 => 'DateNominationEmploiDecisionGouvernement',
        29 => 'Mobilite',
        30 => 'DateDebutMobilite',
        31 => 'DateFinMobilite',
        32 => 'Observations',
    ];

    private ValidatorInterface $validator;
    private int $nbLignesMax;
    private bool $arretSurErreur;
    private string $excelRegex;
    private EntityManagerInterface $em;

    public function __construct(
        ValidatorInterface $validator,
        int $nbLignesMax,
        bool $arretSurErreur,
        string $excelRegex,
        EntityManagerInterface $em
    ) {
        $this->validator = $validator;
        $this->nbLignesMax = $nbLignesMax;
        $this->arretSurErreur = $arretSurErreur;
        $this->excelRegex = $excelRegex;
        $this->em = $em;
    }

    /**
     * @param ListeAlimentation $liste
     * @param int $offset
     * @param Ligne $targetClass
     * @return array ['objets' => $objectList, 'erreurs' => $errorList, 'offset' => $ligne]
     * Cette méthode lis le fichier associé au paramètre $liste en commençant par la ligne numéro $offset
     * le résultat est décrit ci-dessous :
     * (objects) ===> array qui contient la liste d'objets lus
     *      clé : n° ligne dans le fichier
     *      valeur : Objet du type $targetClass validé par le service de validation Symfony
     * (erreurs) ===> array qui contient la liste d'erreurs
     *      clé : n° ligne dans le fichier
     *      valeur : soit une liste de ConstraintsViolations (si les erreurs viennent de la validation de l'objet)
     *      soit une chaîne de caractères si les erreurs viennent du parsing excel (erreur lié à la validation regex)
     * (lignesLues) ===> numéro de la dernière ligne lue
     *
     * @throws ExcelException
     */
    public function readLinesFromFile(ListeAlimentation $liste, int $offset, Ligne $targetClass): array
    {
        // Paramétrage du parsing et Lecture du fichier Excel
        $fullPath = $liste->getDocument()->getFile()->getRealPath();
        $objReader = IOFactory::createReaderForFile($fullPath);
        $objReader->setReadDataOnly(true);
        $objReader->setReadEmptyCells(false);
        $phpExcelObject = $objReader->load($fullPath);

        // Recuperation des repositories

        /* @var CorpsRepository $corpsRepository */
        $corpsRepository = $this->em->getRepository(Corps::class);

        /* @var GradeRepository $gradeRepository */
        $gradeRepository = $this->em->getRepository(Grade::class);

        /* @var TypeFonctionsOccupeesRepository $typeFonctionsOccupeesRepository */
        $typeFonctionsOccupeesRepository = $this->em->getRepository(TypeFonctionsOccupees::class);

        /* @var FonctionsOccupeesRepository $fonctionsOccupeesRepository */
        $fonctionsOccupeesRepository = $this->em->getRepository(FonctionsOccupees::class);

        /* @var PositionRepository $positionRepository */
        $positionRepository = $this->em->getRepository(Position::class);

        /* @var MobiliteRepository $mobiliteRepository */
        $mobiliteRepository = $this->em->getRepository(Mobilite::class);

        // Définition de la fiche excel à utiliser
        $activeSheet = $phpExcelObject->getSheet(0);

        // Récuperation de l'entete depuis le fichier excel (Cellules A5 à AF5)
        $headerRow = $activeSheet->rangeToArray('A5:AF5')[0];

        // Formattage des cellules de l'entete (slug)
        $slugger =  new AsciiSlugger();
        $formattedHeader = [];
        foreach ($headerRow as $value) {
            $formattedHeader[] = !empty($value) ? $slugger->slug($value)->lower()->toString() : '';
        }

        // Vérification du contenu de l'entete
        if (!empty(array_diff($formattedHeader, EnumEnteteType::VALUES))) {
            throw new ExcelException(ExcelException::WRONG_TEMPLATE);
        }

        // Vérification du contenu du fichier
        $limitLignes = $activeSheet->getHighestDataRow();
        if ($offset > $limitLignes) {
            throw new ExcelException(ExcelException::NO_DATA);
        }

        $ligne = $offset;

        $objectList = [];
        $errorList = [];
        $arreterLecture = false;

        while ($ligne <= $limitLignes && ($ligne - $offset) < $this->nbLignesMax && !$arreterLecture) {
            $erreurRegex = false;

            // On crée un nouvel objet de la class cible
            $currentObject = clone $targetClass;

            // On alimente ses attributs à partir du fichier excel
            foreach (self::MAPPING as $colIndex => $attributHandler) {

                // Récupération de la cellule
                $cellule = $activeSheet->getCellByColumnAndRow($colIndex, $ligne);

                // Lecture du contenu de la cellule
                $contenuCellule = $cellule->getValue();

                // Suppression des espaces en debut et en fin de chaine
                $contenuCellule = trim($contenuCellule);

                // Remplacer ’ par '
                $contenuCellule = str_replace('’', "'", $contenuCellule);

                // Mise à null si la cellule est vide
                if (0 == strlen($contenuCellule)) {
                    $contenuCellule = null;
                }

                // Validation du format du contenu
                $syntaxValidation = preg_match_all($this->excelRegex, $contenuCellule);

                if (0 == $syntaxValidation) {
                    $erreurRegex = true;

                    $col = $cellule->getColumn();
                    if (array_key_exists($ligne, $errorList)) {
                        $errorList[$ligne] = $errorList[$ligne]. ', ' . $col;
                    } else {
                        $errorList[$ligne] = 'Erreurs dans la taille des colonnes: ' . $col;
                    }

                    if (!$arreterLecture && $this->arretSurErreur) {
                        $arreterLecture = true;
                    }
                } else {
                    // initialisation de l'attribut
                    $setAttribut = 'set'.$attributHandler;

                    if ('setCorpsOrigine' == $setAttribut) {
                        $corps = $corpsRepository->getCorpsByLibelleLong($contenuCellule);

                        if ($corps) {
                            $currentObject->setCorpsOrigineIngres($corps);
                        } else {
                            $currentObject->setCorpsOrigineIngres($contenuCellule);
                        }
                    } elseif ('setGradeOrigine' == $setAttribut && $currentObject->getCorpsOrigineIngres()) {
                        if ($currentObject->getCorpsOrigineIngres() instanceof Corps) {
                            $grade = $gradeRepository->getGradeByCorpsAndLibelleLong(
                                $currentObject->getCorpsOrigineIngres(),
                                $contenuCellule
                            );
                            if ($grade) {
                                $currentObject->setGradeOrigineIngres($grade);
                            }
                        } else {
                            $currentObject->setGradeOrigineIngres($contenuCellule);
                        }
                    } elseif ('setTypeFonctionsOccupees' == $setAttribut) {
                        $typeFonctionsOccupees = $typeFonctionsOccupeesRepository->getByLibelle($contenuCellule);
                        if ($typeFonctionsOccupees) {
                            $currentObject->$setAttribut($typeFonctionsOccupees);
                        } else {
                            $currentObject->$setAttribut($contenuCellule);
                        }
                    } elseif ('setFonctionsOccupees' == $setAttribut && $currentObject->getTypeFonctionsOccupees()) {
                        $fonctionsOccupees = $fonctionsOccupeesRepository->getByTypeFonctionsOccupeesAndLibelle(
                            $currentObject->getTypeFonctionsOccupees(),
                            $contenuCellule
                        );
                        if ($fonctionsOccupees) {
                            $currentObject->$setAttribut($fonctionsOccupees);
                        } else {
                            $currentObject->$setAttribut($contenuCellule);
                        }
                    } elseif ('setPosition' == $setAttribut) {
                        $position = $positionRepository->getByLibelle($contenuCellule);

                        if ($position) {
                            $currentObject->$setAttribut($position);
                        } else {
                            $currentObject->$setAttribut($contenuCellule);
                        }
                    } elseif ('setMobilite' == $setAttribut) {
                        $mobilite = $mobiliteRepository->getByLibelle($contenuCellule);
                        if ($mobilite) {
                            $currentObject->$setAttribut($mobilite);
                        } else {
                            $currentObject->$setAttribut($contenuCellule);
                        }
                    } else {
                        $currentObject->$setAttribut($contenuCellule);
                    }
                }
            }

            if (!$erreurRegex) {
                $currentObject->setOrdre($ligne);
                $currentObject->setListeAlimentation($liste);

                // Validation de l'objet que l'on vient de créer
                $errors = $this->validator->validate($currentObject);

                if (count($errors) > 0) {
                    if (!$arreterLecture && $this->arretSurErreur) {
                        $arreterLecture = true;
                    }
                    $errorList[$ligne] = $errors;
                } else {
                    $objectList[$ligne] = $currentObject;
                }
            }
            ++$ligne;
        }

        return ['objets' => $objectList, 'erreurs' => $errorList, 'lignesLues' => $ligne];
    }
}
