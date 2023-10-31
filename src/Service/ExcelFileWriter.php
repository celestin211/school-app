<?php

namespace App\Service;

use App\Entity\GestionCompteCourant;
use App\Entity\Integration;
use App\Entity\ListeAlimentation;
use App\Entity\Utilisateur;
use App\EnumTypes\EnumIndicateurType;
use App\Util\Converter;
use App\Util\FileHelper;
use App\Util\Util;
use Doctrine\ORM\EntityManagerInterface;
use LogicException;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExcelFileWriter
{
    const DATE_FORMAT = 'd/m/Y';
    /**
     * @var EntityManagerInterface
     */
    protected $em;

    /**
     * @var LoggerInterface
     */
    protected $logger;

    /**
     * @var FileHelper
     */
    protected $fileHelper;

    /**
     * @var string
     */
    protected $kernelProjectDir;

    /**
     * @var string
     */
    protected $templateDirectory;
    /**
     * @var string
     */
    protected $readerType;

    public function __construct(EntityManagerInterface $em, LoggerInterface $logger, FileHelper $fileHelper, $kernelProjectDir, $excelType)
    {
        $this->em = $em;
        $this->logger = $logger;
        $this->fileHelper = $fileHelper;
        $this->kernelProjectDir = $kernelProjectDir;
        $this->templateDirectory = $this->kernelProjectDir. '/templates/Maquettes';
        $this->readerType = $excelType;
    }
    private function getAgentsPromouvablesAG(Campagne $campagne, $tempDirName, $returnAsResponse = false)
    {
        $template = 'AG.xls';
        $params = ['anneeReference' => $campagne->getAnneeReference(),
            'anneeReference-1' => $campagne->getAnneeReference() - 1, ];
        $fileName = 'Agents_promouvables_campagne_administrateur_general_'.$campagne->getAnneeReference().'.xls';
        $premiereLigneTemplate = 7;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        /* @var $repository ListeAlimentationRepository */
        $repository = $this->em->getRepository(ListeAlimentation::class);

        $listes = $repository->getListesValidees($campagne);

        /* @var $liste ListeAlimentation */
        foreach ($listes as $liste) {
            // Copie de la première feuille
            $sheet = $objPHPExcel->getSheet(0)->copy();

            // Renommage de la nouvelle feuille
            $sheet->setTitle($liste->getMinistere()->getLibelleCourt());

            $nbProposeUtile = 0;
            $nbProposeNonUtile = 0;
            $nbNonPropose = 0;

            /* @var $ligne AG */
            foreach ($liste->getLignes() as $ligne) {
                $numCol = 1;

                //proposé en rang utile", "proposé en rang non utile", "non proposé"
                $propose = $ligne->getPropose();

                switch ($propose) {
                    case EnumProposeType::PROPOSE_RANG_UTILE:
                        $numRow = $premiereLigneTemplate + $nbProposeUtile;
                        ++$nbProposeUtile;
                        break;

                    case EnumProposeType::PROPOSE_RANG_NON_UTILE:
                        $numRow = $premiereLigneTemplate + 7 + $nbProposeUtile + $nbProposeNonUtile;
                        ++$nbProposeNonUtile;
                        break;

                    case EnumProposeType::NON_PROPOSE:
                        $numRow = $premiereLigneTemplate + 14 + $nbProposeUtile + $nbProposeNonUtile + $nbNonPropose;
                        ++$nbNonPropose;
                        break;

                    default:
                        throw new LogicException('ExcelFileWriter.getAgentsPromouvablesHC() : Type de proposition inconnu : '.$propose);
                }

                $sheet->setCellValueByColumnAndRow($numCol, $numRow, ucfirst($ligne->getListeAlimentation()->getMinistere()->getLibelleCourt()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getPropose()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getOrdreProposition()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getCivilite()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper($ligne->getNomUsage()).' '.ucwords($ligne->getPrenom()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::age($ligne->getDateNaissance(), $campagne->getAnneeReference() - 1));
                if (null !== $ligne->getDateEntreeCorpsAC()) {
                    $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateEntreeCorpsAC()));
                } else {
                    ++$numCol;
                }

                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, EnumOrigineRecrutementType::getLibelle($ligne->getOrigineRecrutement()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getPosition1512AnneePrec());
                if (null !== $ligne->getDateAccesHC()) {
                    $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateAccesHC()->getTimestamp()));
                } else {
                    ++$numCol;
                }

                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getEchelon());
                if (null !== $ligne->getDateEntreeEchelon()) {
                    $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateEntreeEchelon()->getTimestamp()));
                } else {
                    ++$numCol;
                }

                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, Util::anciennete($ligne->getDateEntreeEchelon(), $campagne->getAnneeReference()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::ouiNon($ligne->getRemplitConditionsEchelon()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateRemplitConditionsEchelon()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::ouiNon($ligne->getRemplitConditionsService()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateRemplitConditionsService()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getFonctionsOccupees())
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDirection()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getMobilite())
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateDebutMobilite()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateFinMobilite()))
                ;

                // Insertion d'une nouvelle ligne
                $sheet->insertNewRowBefore($numRow + 1, 1);
            }

            // Suppression de la dernière ligne car elle est vide
            $sheet->removeRow($premiereLigneTemplate + $nbProposeUtile);
            $sheet->removeRow($premiereLigneTemplate + $nbProposeUtile + 6 + $nbProposeNonUtile);
            $sheet->removeRow($premiereLigneTemplate + $nbProposeUtile + 6 + $nbProposeNonUtile + 6 + $nbNonPropose);

            // Ajout de la feuille au classeur
            $objPHPExcel->addSheet($sheet);
        }

        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        if ($returnAsResponse) {
            $response = $this->getStream($objPHPExcel, $fileName);

            return $response;
        }
        if ('' == $tempDirName) {
            throw new \Exception("getAgentsPromouvablesHC le repertoire temp n'a pas été passé par paramètre");
        }

        $this->fileHelper->saveExcelFileToTempDir($fileName, $objPHPExcel, $tempDirName);
    }

    private function getAgentsPromouvablesHC(Campagne $campagne, $tempDirName, $returnAsResponse = false)
    {
        $template = 'HC.xls';
        $params = ['anneeReference' => $campagne->getAnneeReference(),
            'anneeReference-1' => $campagne->getAnneeReference() - 1, ];

        $fileName = 'Agents_promouvables_campagne_hors_classe_'.$campagne->getAnneeReference().'.xls';
        $premiereLigneTemplate = 7;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        /* @var $repository ListeAlimentationRepository */
        $repository = $this->em->getRepository(ListeAlimentation::class);

        $listes = $repository->getListesValidees($campagne);

        /* @var $liste ListeAlimentation */
        foreach ($listes as $liste) {
            // Copie de la première feuille
            $sheet = $objPHPExcel->getSheet(0)->copy();

            // Renommage de la nouvelle feuille
            $sheet->setTitle($liste->getMinistere()->getLibelleCourt());

            $numRow = $premiereLigneTemplate;

            $nbProposeUtile = 0;
            $nbProposeNonUtile = 0;
            $nbNonPropose = 0;
            /* @var $ligne HC */
            foreach ($liste->getLignes() as $ligne) {
                $numCol = 1;

                //proposé en rang utile", "proposé en rang non utile", "non proposé"
                $propose = $ligne->getPropose();

                switch ($propose) {
                    case EnumProposeType::PROPOSE_RANG_UTILE:
                        $numRow = $premiereLigneTemplate + $nbProposeUtile;
                        ++$nbProposeUtile;
                        break;

                    case EnumProposeType::PROPOSE_RANG_NON_UTILE:
                        $numRow = $premiereLigneTemplate + 7 + $nbProposeUtile + $nbProposeNonUtile;
                        ++$nbProposeNonUtile;
                        break;

                    case EnumProposeType::NON_PROPOSE:
                        $numRow = $premiereLigneTemplate + 14 + $nbProposeUtile + $nbProposeNonUtile + $nbNonPropose;
                        ++$nbNonPropose;
                        break;

                    default:
                        throw new \Exception('ExcelFileWriter.getAgentsPromouvablesHC() : Type de proposition inconnu : '.$propose);
                }

                $sheet
                    ->setCellValueByColumnAndRow($numCol, $numRow, ucfirst($ligne->getListeAlimentation()->getMinistere()->getLibelleCourt()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($propose))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getOrdreProposition()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getCivilite()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper($ligne->getNomUsage()).' '.ucwords($ligne->getPrenom()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::age($ligne->getDateNaissance(), $campagne->getAnneeReference() - 1))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, EnumOrigineRecrutementType::getLibelle($ligne->getOrigineRecrutement()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getCorpsOrigineIngres())
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getGradeOrigineIngres())
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateEntreeCorpsOrigine()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateEntreeCorpsAC()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getEchelon())
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::anciennete($ligne->getDateEntreeEchelon(), $campagne->getAnneeReference()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getPosition1512AnneePrec())
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::ouiNon($ligne->getRemplitConditionsEchelon()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateRemplitConditionsEchelon()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::ouiNon($ligne->getRemplitConditionsService()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateRemplitConditionsService()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getFonctionsOccupees())
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDirection()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getMobilite())
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateDebutMobilite()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateFinMobilite()))
                ;

                // Insertion d'une nouvelle ligne
                $sheet->insertNewRowBefore($numRow + 1, 1);
            }

            // Suppression de la dernière ligne car elle est vide
            $sheet->removeRow($premiereLigneTemplate + $nbProposeUtile);
            $sheet->removeRow($premiereLigneTemplate + $nbProposeUtile + 6 + $nbProposeNonUtile);
            $sheet->removeRow($premiereLigneTemplate + $nbProposeUtile + 6 + $nbProposeNonUtile + 6 + $nbNonPropose);

            // Ajout de la feuille au classeur
            $objPHPExcel->addSheet($sheet);
        }

        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        if ($returnAsResponse) {
            return $this->getStream($objPHPExcel, $fileName);
        }
        if ('' == $tempDirName) {
            throw new \Exception("getAgentsPromouvablesHC le repertoire temp n'a pas été passé par paramèetre");
        }

        $this->fileHelper->saveExcelFileToTempDir($fileName, $objPHPExcel, $tempDirName);
    }

    private function getAgentsPromouvablesES(Campagne $campagne, $tempDirName, $returnAsResponse = false)
    {
        $template = 'ES.xls';
        $params = ['anneeReference' => $campagne->getAnneeReference(),
            'anneeReference-1' => $campagne->getAnneeReference() - 1, ];

        $fileName = 'Agents_promouvables_campagne_echelon_special_'.$campagne->getAnneeReference().'.xls';
        $premiereLigneTemplate = 7;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        /* @var $repository ListeAlimentationRepository */
        $repository = $this->em->getRepository(ListeAlimentation::class);

        $listes = $repository->getListesValidees($campagne);

        /* @var $liste ListeAlimentation */
        foreach ($listes as $liste) {
            // Copie de la première feuille
            $sheet = $objPHPExcel->getSheet(0)->copy();

            // Renommage de la nouvelle feuille
            $sheet->setTitle($liste->getMinistere()->getLibelleCourt());

            $numRow = $premiereLigneTemplate;

            $nbProposeUtile = 0;
            $nbProposeNonUtile = 0;
            $nbNonPropose = 0;

            /* @var $ligne ES */
            foreach ($liste->getLignes() as $ligne) {
                $numCol = 1;

                //proposé en rang utile", "proposé en rang non utile", "non proposé"
                $propose = $ligne->getPropose();

                switch ($propose) {
                    case EnumProposeType::PROPOSE_RANG_UTILE:
                        $numRow = $premiereLigneTemplate + $nbProposeUtile;
                        ++$nbProposeUtile;
                        break;

                    case EnumProposeType::PROPOSE_RANG_NON_UTILE:
                        $numRow = $premiereLigneTemplate + 7 + $nbProposeUtile + $nbProposeNonUtile;
                        ++$nbProposeNonUtile;
                        break;

                    case EnumProposeType::NON_PROPOSE:
                        $numRow = $premiereLigneTemplate + 14 + $nbProposeUtile + $nbProposeNonUtile + $nbNonPropose;
                        ++$nbNonPropose;
                        break;

                    default:
                        throw new \Exception('ExcelFileWriter.getAgentsPromouvablesHC() : Type de proposition inconnu : '.$propose);
                }

                $sheet->setCellValueByColumnAndRow($numCol, $numRow, ucfirst($ligne->getListeAlimentation()->getMinistere()->getLibelleCourt()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getPropose()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getOrdreProposition()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getCivilite()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper($ligne->getNomUsage()).' '.ucwords($ligne->getPrenom()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::age($ligne->getDateNaissance(), $campagne->getAnneeReference()));

                if (null !== $ligne->getDateEntreeCorpsAC()) {
                    $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateEntreeCorpsAC()->getTimestamp()));
                } else {
                    ++$numCol;
                }

                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, EnumOrigineRecrutementType::getLibelle($ligne->getOrigineRecrutement()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getPosition1512AnneePrec());

                if (null !== $ligne->getDateAccesAG()) {
                    $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateAccesAG()->getTimestamp()));
                } else {
                    ++$numCol;
                }

                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getEchelon())
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::anciennete($ligne->getDateEntreeEchelon(), $campagne->getAnneeReference()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getPeriodeEmploiDecisionGouvernement()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDureeCumuleeEmploiDecisionGouvernement()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getTypeFonctionsOccupees())
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getFonctionsOccupees())
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getIntituleFonctionsOccupees())
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getAdministrationEmploi())
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getDirection())
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getObservations());

                // Insertion d'une nouvelle ligne
                $sheet->insertNewRowBefore($numRow + 1, 1);
            }

            // Suppression de la dernière ligne de chaque tableau car elles sont vides
            $sheet->removeRow($premiereLigneTemplate + $nbProposeUtile);
            $sheet->removeRow($premiereLigneTemplate + $nbProposeUtile + 6 + $nbProposeNonUtile);
            $sheet->removeRow($premiereLigneTemplate + $nbProposeUtile + 6 + $nbProposeNonUtile + 6 + $nbNonPropose);

            // Ajout de la feuille au classeur
            $objPHPExcel->addSheet($sheet);
        }

        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        if ($returnAsResponse) {
            $response = $this->getStream($objPHPExcel, $fileName);

            return $response;
        }
        if ('' == $tempDirName) {
            throw new \Exception("getAgentsPromouvablesHC le repertoire temp n'a pas été passé par paramèetre");
        }

        $this->fileHelper->saveExcelFileToTempDir($fileName, $objPHPExcel, $tempDirName);
    }

    private function getAgentsPromouvablesIntegration(Campagne $campagne, $tempDirName, $returnAsResponse = false)
    {
        $template = 'Integration.xls';
        $params = ['anneeReference' => $campagne->getAnneeReference(),
            'anneeReference-1' => $campagne->getAnneeReference() - 1, ];

        $fileName = 'Agents_demandes_integration_'.$campagne->getAnneeReference().'.xls';
        $premiereLigneTemplate = 4;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        /* @var $repository ListeAlimentationRepository */
        $repository = $this->em->getRepository(ListeAlimentation::class);

        $listes = $repository->getListesValidees($campagne);

        /* @var $liste ListeAlimentation */
        foreach ($listes as $liste) {
            // Copie de la première feuille
            $sheet = $objPHPExcel->getSheet(0)->copy();

            // Renommage de la nouvelle feuille
            $sheet->setTitle($liste->getMinistere()->getLibelleCourt());

            $this->exporterIntegration($liste, $sheet);

            // Ajout de la feuille au classeur
            $objPHPExcel->addSheet($sheet);
        }

        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        if ($returnAsResponse) {
            $response = $this->getStream($objPHPExcel, $fileName);

            return $response;
        }
        if ('' == $tempDirName) {
            throw new \Exception("getAgentsPromouvablesHC le repertoire temp n'a pas été passé par paramèetre");
        }

        $this->fileHelper->saveExcelFileToTempDir($fileName, $objPHPExcel, $tempDirName);
    }

    private function getAgentsPromouvablesDetachement(Campagne $campagne, $tempDirName, $returnAsResponse = false)
    {
        $template = 'Detachement.xls';
        $params = ['anneeReference' => $campagne->getAnneeReference(),
            'anneeReference-1' => $campagne->getAnneeReference() - 1, ];

        $fileName = 'Agents_accueillis_en_detachement_'.$campagne->getAnneeReference().'.xls';
        $premiereLigneTemplate = 4;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        /* @var $repository ListeAlimentationRepository */
        $repository = $this->em->getRepository(ListeAlimentation::class);

        $listes = $repository->getListesValidees($campagne);

        /* @var $liste ListeAlimentation */
        foreach ($listes as $liste) {
            // Copie de la première feuille
            $sheet = $objPHPExcel->getSheet(0)->copy();

            // Renommage de la nouvelle feuille
            $sheet->setTitle($liste->getMinistere()->getLibelleCourt());

            $numRow = $premiereLigneTemplate;
            /* @var $ligne Detachement */
            foreach ($liste->getLignes() as $ligne) {
                $numCol = 1;
                $sheet->setCellValueByColumnAndRow($numCol, $numRow, ucfirst($ligne->getListeAlimentation()->getMinistere()->getLibelleCourt()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getCivilite()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper($ligne->getNomUsage()).' '.ucwords($ligne->getPrenom()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::age($ligne->getDateNaissance(), $campagne->getAnneeReference()));

                if (null !== $ligne->getDateDebut()) {
                    $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateDebut()->getTimestamp()));
                } else {
                    ++$numCol;
                }

                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDureeDetachement()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getRenouvellement()));

                if (null !== $ligne->getDateRenouvellement()) {
                    $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateRenouvellement()->getTimestamp()));
                } else {
                    ++$numCol;
                }

                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDureeRenouvellement()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getCorpsOrigine()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getGradeOrigine()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getAccueilMobilite()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getGradeAccueil()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getFonctionAccueil()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDirectionAccueil()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getObservations()));

                // Insertion d'une nouvelle ligne
                $sheet->insertNewRowBefore($numRow + 1, 1);
                ++$numRow;
            }

            // Suppression de la dernière ligne car elle est vide
            $sheet->removeRow($numRow);

            // Ajout de la feuille au classeur
            $objPHPExcel->addSheet($sheet);
        }

        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        if ($returnAsResponse) {
            $response = $this->getStream($objPHPExcel, $fileName);

            return $response;
        }
        if ('' == $tempDirName) {
            throw new \Exception("getAgentsPromouvablesHC le repertoire temp n'a pas été passé par paramèetre");
        }

        $this->fileHelper->saveExcelFileToTempDir($fileName, $objPHPExcel, $tempDirName);
    }

    private function getAgentsPromouvablesDisponibilite(Campagne $campagne, $tempDirName, $returnAsResponse = false)
    {
        $template = 'Disponibilite.xls';
        $params = ['anneeReference' => $campagne->getAnneeReference(),
            'anneeReference-1' => $campagne->getAnneeReference() - 1, ];

        $fileName = 'Agents_en_disponibilite_'.$campagne->getAnneeReference().'.xls';
        $premiereLigneTemplate = 4;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        /* @var $repository ListeAlimentationRepository */
        $repository = $this->em->getRepository(ListeAlimentation::class);

        $listes = $repository->getListesValidees($campagne);

        /* @var $liste ListeAlimentation */
        foreach ($listes as $liste) {
            // Copie de la première feuille
            $sheet = $objPHPExcel->getSheet(0)->copy();

            // Renommage de la nouvelle feuille
            $sheet->setTitle($liste->getMinistere()->getLibelleCourt());

            $numRow = $premiereLigneTemplate;
            /* @var $ligne Disponibilite */
            foreach ($liste->getLignes() as $ligne) {
                $numCol = 1;
                $sheet->setCellValueByColumnAndRow($numCol, $numRow, ucfirst($ligne->getListeAlimentation()->getMinistere()->getLibelleCourt()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getCivilite()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper($ligne->getNomUsage()).' '.ucwords($ligne->getPrenom()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::age($ligne->getDateNaissance(), $campagne->getAnneeReference()));

                if (null !== $ligne->getDateDebut()) {
                    $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateDebut()->getTimestamp()));
                } else {
                    ++$numCol;
                }

                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDuree()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getRenouvellement()));

                if (null !== $ligne->getDateRenouvellement()) {
                    $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateRenouvellement()->getTimestamp()));
                } else {
                    ++$numCol;
                }

                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDureeRenouvellement()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getTypeDisponibilite()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getGrade()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getOrganismeAccueil()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getFonctionAccueil()));

                if (null !== $ligne->getDateCommisionDeontologie()) {
                    $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateCommisionDeontologie()->getTimestamp()));
                } else {
                    ++$numCol;
                }

                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getAvisCommisionDeontologie()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getObservations()));

                // Insertion d'une nouvelle ligne
                $sheet->insertNewRowBefore($numRow + 1, 1);
                ++$numRow;
            }

            // Suppression de la dernière ligne car elle est vide
            $sheet->removeRow($numRow);

            // Ajout de la feuille au classeur
            $objPHPExcel->addSheet($sheet);
        }

        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        if ($returnAsResponse) {
            $response = $this->getStream($objPHPExcel, $fileName);

            return $response;
        }
        if ('' == $tempDirName) {
            throw new \Exception("getAgentsPromouvablesHC le repertoire temp n'a pas été passé par paramèetre");
        }

        $this->fileHelper->saveExcelFileToTempDir($fileName, $objPHPExcel, $tempDirName);
    }

    private function getAgentsPromouvablesTitularisation(Campagne $campagne, $tempDirName, $returnAsResponse = false)
    {
        $template = 'Titularisation.xls';
        $params = ['anneeReference' => $campagne->getAnneeReference(),
            'anneeReference-1' => $campagne->getAnneeReference() - 1, ];

        $fileName = 'Agents_titularises_'.$campagne->getAnneeReference().'.xls';
        $premiereLigneTemplate = 4;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        /* @var $repository ListeAlimentationRepository */
        $repository = $this->em->getRepository(ListeAlimentation::class);

        $listes = $repository->getListesValidees($campagne);

        /* @var $liste ListeAlimentation */
        foreach ($listes as $liste) {
            // Copie de la première feuille
            $sheet = $objPHPExcel->getSheet(0)->copy();

            // Renommage de la nouvelle feuille
            $sheet->setTitle($liste->getMinistere()->getLibelleCourt());

            $numRow = $premiereLigneTemplate;
            /* @var $ligne Titularisation */
            foreach ($liste->getLignes() as $ligne) {
                $numCol = 1;
                $sheet->setCellValueByColumnAndRow($numCol, $numRow, ucfirst($ligne->getListeAlimentation()->getMinistere()->getLibelleCourt()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getCivilite()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper($ligne->getNomUsage()).' '.ucwords($ligne->getPrenom()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::age($ligne->getDateNaissance(), $campagne->getAnneeReference()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getAdministrationOrigne()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getCorpsOrigineIngres())
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getGradeOrigineIngres())
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDirectionOrigine()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getFonctionsAnterieures()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getAdministrationAccueil()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDirectionAccueil()))
                    ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getFonctionsNouvelles()));

                // Insertion d'une nouvelle ligne
                $sheet->insertNewRowBefore($numRow + 1, 1);
                ++$numRow;
            }

            // Suppression de la dernière ligne car elle est vide
            $sheet->removeRow($numRow);

            // Ajout de la feuille au classeur
            $objPHPExcel->addSheet($sheet);
        }

        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        if ($returnAsResponse) {
            $response = $this->getStream($objPHPExcel, $fileName);

            return $response;
        }
        if ('' == $tempDirName) {
            throw new \Exception("getAgentsPromouvablesHC le repertoire temp n'a pas été passé par paramèetre");
        }

        $this->fileHelper->saveExcelFileToTempDir($fileName, $objPHPExcel, $tempDirName);
    }

    protected function createPHPExcel($template, $params = [])
    {
        // Chargement du template
        $objPHPExcel = \PhpOffice\PhpSpreadsheet\IOFactory::load($this->templateDirectory.'/'.$template);

        // Remplacement des variables dans le template
        $sheet = $objPHPExcel->getSheet(0);

        foreach ($params as $param => $paramValue) {
            for ($i = 1; $i < 22; ++$i) {
                for ($j = 0; $j < 50; ++$j) {
                    $cellValue = $sheet->getCellByColumnAndRow($j, $i);
                    $cellValue = str_replace('{{'.$param.'}}', $paramValue, $cellValue);
                    $sheet->setCellValueByColumnAndRow($j, $i, $cellValue);
                }
            }
        }

        $objPHPExcel->getProperties()->setCreator('BOSONGO')
            ->setLastModifiedBy('BOSONGO')
            ->setTitle('Restitution BOSONGO')
            ->setSubject('Restitution BOSONGO')
            ->setDescription('Restitution BOSONGO')
            ->setKeywords("BOSONGO Administrateur de l'Etat Restitution")
            ->setCategory('Restitution');

        return $objPHPExcel;
    }

    protected function getStream($objPHPExcel, $fileName)
    {
        // Activation de la première feuille
        $objPHPExcel->setActiveSheetIndex(0);

        $writer = IOFactory::createWriter($objPHPExcel, 'Xls');
        $response = new StreamedResponse(
            function () use ($writer) {
                $writer->save('php://output');
            }
        );

        //$response = $this->phpexcel->createStreamedResponse($writer);

        // adding headers
        $dispositionHeader = $response->headers->makeDisposition(ResponseHeaderBag::DISPOSITION_ATTACHMENT, $fileName);
        $response->headers->set('Content-Type', 'text/vnd.ms-excel; charset=utf-8');
        $response->headers->set('Pragma', 'public');
        $response->headers->set('Cache-Control', 'maxage=1');
        $response->headers->set('Content-Disposition', $dispositionHeader);
        $response->headers->set('Set-Cookie', 'fileDownload=true; path=/');

        return $response;
    }

    // TODO : start


    private function exporterListeDisponibilite(ListeAlimentation $liste, $tempDirName, $returnAsResponse)
    {
        $campagne = $liste->getCampagne();

        $template = 'Disponibilite.xls';
        $params = ['anneeReference' => $campagne->getAnneeReference(),
            'anneeReference-1' => $campagne->getAnneeReference() - 1, ];

        $fileName = 'Agents_en_disponibilite_'.$campagne->getAnneeReference().'_'.Converter::convertStringToCanonical($liste->getMinistere()->getLibelleCourt()).'.xls';
        $premiereLigneTemplate = 4;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        // Copie de la première feuille
        $sheet = $objPHPExcel->getSheet(0)->copy();

        // Renommage de la nouvelle feuille
        $sheet->setTitle($liste->getMinistere()->getLibelleCourt());

        $numRow = $premiereLigneTemplate;
        /* @var $ligne Disponibilite */
        foreach ($liste->getLignes() as $ligne) {
            $numCol = 1;
            $sheet->setCellValueByColumnAndRow($numCol, $numRow, ucfirst($ligne->getListeAlimentation()->getMinistere()->getLibelleCourt()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getCivilite()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper($ligne->getNomUsage()).' '.ucwords($ligne->getPrenom()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::age($ligne->getDateNaissance(), $campagne->getAnneeReference()));

            if (null !== $ligne->getDateDebut()) {
                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateDebut()->getTimestamp()));
            } else {
                ++$numCol;
            }

            $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDuree()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getRenouvellement()));

            if (null !== $ligne->getDateRenouvellement()) {
                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateRenouvellement()->getTimestamp()));
            } else {
                ++$numCol;
            }

            $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDureeRenouvellement()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getTypeDisponibilite()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getGrade()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getOrganismeAccueil()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getFonctionAccueil()));

            if (null !== $ligne->getDateCommisionDeontologie()) {
                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateCommisionDeontologie()->getTimestamp()));
            } else {
                ++$numCol;
            }

            $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getAvisCommisionDeontologie()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getObservations()));

            // Insertion d'une nouvelle ligne
            $sheet->insertNewRowBefore($numRow + 1, 1);
            ++$numRow;
        }

        // Suppression de la dernière ligne car elle est vide
        $sheet->removeRow($numRow);

        // Ajout de la feuille au classeur
        $objPHPExcel->addSheet($sheet);

        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        if ($returnAsResponse) {
            $response = $this->getStream($objPHPExcel, $fileName);

            return $response;
        }
        if ('' == $tempDirName) {
            throw new \Exception("getAgentsPromouvablesHC le repertoire temp n'a pas été passé par paramèetre");
        }

        $this->fileHelper->saveExcelFileToTempDir($fileName, $objPHPExcel, $tempDirName);
    }

    private function exporterListeTitularisation(ListeAlimentation $liste, $tempDirName, $returnAsResponse = false)
    {
        $campagne = $liste->getCampagne();

        $template = 'Titularisation.xls';
        $params = ['anneeReference' => $campagne->getAnneeReference(),
            'anneeReference-1' => $campagne->getAnneeReference() - 1, ];

        $fileName = 'Agents_titularises_'.$campagne->getAnneeReference().'_'.Converter::convertStringToCanonical($liste->getMinistere()->getLibelleCourt()).'.xls';
        $premiereLigneTemplate = 4;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        // Copie de la première feuille
        $sheet = $objPHPExcel->getSheet(0)->copy();

        // Renommage de la nouvelle feuille
        $sheet->setTitle($liste->getMinistere()->getLibelleCourt());

        $numRow = $premiereLigneTemplate;
        /* @var $ligne Titularisation */
        foreach ($liste->getLignes() as $ligne) {
            $numCol = 1;
            $sheet->setCellValueByColumnAndRow($numCol, $numRow, ucfirst($ligne->getListeAlimentation()->getMinistere()->getLibelleCourt()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getCivilite()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper($ligne->getNomUsage()).' '.ucwords($ligne->getPrenom()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::age($ligne->getDateNaissance(), $campagne->getAnneeReference()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getAdministrationOrigne()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getCorpsOrigineIngres())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getGradeOrigineIngres())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDirectionOrigine()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getFonctionsAnterieures()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getAdministrationAccueil()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDirectionAccueil()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getFonctionsNouvelles()));

            // Insertion d'une nouvelle ligne
            $sheet->insertNewRowBefore($numRow + 1, 1);
            ++$numRow;
        }

        // Suppression de la dernière ligne car elle est vide
        $sheet->removeRow($numRow);

        // Ajout de la feuille au classeur
        $objPHPExcel->addSheet($sheet);

        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        if ($returnAsResponse) {
            $response = $this->getStream($objPHPExcel, $fileName);

            return $response;
        }
        if ('' == $tempDirName) {
            throw new \Exception("getAgentsPromouvablesHC le repertoire temp n'a pas été passé par paramètre");
        }

        $this->fileHelper->saveExcelFileToTempDir($fileName, $objPHPExcel, $tempDirName);
    }

    public function exportLigneAgent($campagne)
    {
        switch ($campagne->getTypeCampagne()) {
            case EnumTypeCampagneType::POPULATION_GLOBALE:
                return $this->exportLigneAgentAM($campagne);
            case EnumTypeCampagneType::AVANCEMENT_HC:
                return $this->exportLigneAgentHC($campagne);
            case EnumTypeCampagneType::AVANCEMENT_AG:
                return $this->exportLigneAgentAG($campagne);
            case EnumTypeCampagneType::AVANCEMENT_ES:
                return $this->exportLigneAgentES($campagne);
            case EnumTypeCampagneType::INTEGRATION:
                return $this->exportLigneAgentIntegration($campagne);
            case EnumTypeCampagneType::DETACHEMENT:
                return $this->exportLigneAgentDetachement($campagne);
            case EnumTypeCampagneType::DISPONIBILITE:
                return $this->exportLigneAgentDisponibilite($campagne);
            case EnumTypeCampagneType::TITULARISATION:
                return $this->exportLigneAgentTitularisation($campagne);
            default:
                $message = 'Appel de la methode exportLigneAgent() avec un type de campagne inconnu : '.$campagne->getTypeCampagne();
                $this->logger->critical($message);
                throw new \Exception($message);
        }
    }

    /*
     * Retourne un fichier Excel comprenant l'ensemble des lignes d'une campagne AM
     */
    private function exportLigneAgentAM(Campagne $campagne, $tempDirName = '', $returnAsResponse = true)
    {
        $lignes = $this->em->getRepository(Ligne::class)->getLignesAExporterByCampagne($campagne);

        $template = 'Agents.xls';
        $fileName = 'export_agents.xls';

        $params = [];

        if (isset($lignes[0])) {
            $params['anneeReference-1'] = $lignes[0]->getListeAlimentation()->getCampagne()->getAnneeReference() - 1;
            $params['anneeReference'] = $lignes[0]->getListeAlimentation()->getCampagne()->getAnneeReference();
        }

        $premiereLigneTemplate = 5;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        // Copie de la première feuille
        $sheet = $objPHPExcel->getSheet(0)->copy();

        // Renommage de la nouvelle feuille
        $sheet->setTitle('export Agents');

        $numRow = $premiereLigneTemplate;

        /** @var AM $ligne */
        foreach ($lignes as $ligne) {
            $numCol = 1;
            $sheet->setCellValueByColumnAndRow($numCol, $numRow, ucfirst($ligne->getListeAlimentation()->getMinistere()->getLibelleCourt()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getMatricule())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getCivilite()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper($ligne->getNomUsage()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper($ligne->getNomNaissance()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucwords($ligne->getPrenom()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getDateNaissance()->format(self::DATE_FORMAT))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::ageAvecVirgule($ligne->getDateNaissance(), $ligne->getListeAlimentation()->getCampagne()->getAnneeReference(), 12, 31))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getDateEntreeCorpsAC() ? $ligne->getDateEntreeCorpsAC()->format(self::DATE_FORMAT) : null)
                ->setCellValueByColumnAndRow(++$numCol, $numRow, EnumOrigineRecrutementType::getLibelle($ligne->getOrigineRecrutement()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, EnumOrigineEntreeCorpsMisEnExtinctionType::getLibelle($ligne->getOrigineEntreeCorpsMisEnExtinction()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateExerciceDroitOption()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getCorpsOrigineIngres())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getGradeOrigineIngres())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getDateEntreeCorpsOrigine() ? $ligne->getDateEntreeCorpsOrigine()->format(self::DATE_FORMAT) : null)
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getPosition()->getLibelle())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getDateEffetPosition() ? $ligne->getDateEffetPosition()->format(self::DATE_FORMAT) : null)
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getDateFinPosition() ? $ligne->getDateFinPosition()->format(self::DATE_FORMAT) : null)
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getGrade()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getDateEntreeGrade() ? $ligne->getDateEntreeGrade()->format(self::DATE_FORMAT) : null)
                ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::twig_upper($ligne->getEchelon()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getDateEntreeEchelon() ? $ligne->getDateEntreeEchelon()->format(self::DATE_FORMAT) : null)
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getAdministrationEmploi()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDirection()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getTypeFonctionsOccupees()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getFonctionsOccupees())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getIntituleFonctionsOccupees()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getDateNominationEmploiDirection() ? $ligne->getDateNominationEmploiDirection()->format(self::DATE_FORMAT) : null)
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getDateNominationEmploiDecisionGouvernement() ? $ligne->getDateNominationEmploiDecisionGouvernement()->format(self::DATE_FORMAT) : null)
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getMobilite())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getDateDebutMobilite() ? $ligne->getDateDebutMobilite()->format(self::DATE_FORMAT) : null)
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getDateFinMobilite() ? $ligne->getDateFinMobilite()->format(self::DATE_FORMAT) : null)
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getObservations()));
            ++$numRow;
        }

        // Suppression de la dernière ligne car elle est vide
        $sheet->removeRow($numRow);

        // Ajout de la feuille au classeur
        $objPHPExcel->addSheet($sheet);
        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        $response = $this->getStream($objPHPExcel, $fileName);

        return $response;
    }

    /*
     * Retourne un fichier Excel comprenant l'ensemble des lignes d'une campagne HC
     */
    private function exportLigneAgentHC($campagne, $tempDirName = '', $returnAsResponse = true)
    {
        $lignes = $this->em->getRepository(Ligne::class)->getLignesAExporterByCampagne($campagne);

        $template = 'HCministere.xls';
        $fileName = 'Agents_campagne_HC_'.$campagne->getAnneeReference().'.xls';

        $params = ['anneeReference' => $campagne->getAnneeReference(),
            'anneeReference-1' => $campagne->getAnneeReference() - 1, ];

        $premiereLigneTemplate = 4;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        // Copie de la première feuille
        $sheet = $objPHPExcel->getSheet(0)->copy();

        // Renommage de la nouvelle feuille
        $sheet->setTitle('Agents_campagne_HC');

        $numRow = $premiereLigneTemplate;
        /* @var $ligne HC */
        foreach ($lignes as $ligne) {
            $numCol = 1;

            $sheet->setCellValueByColumnAndRow($numCol, $numRow, ucfirst($ligne->getListeAlimentation()->getMinistere()->getLibelleCourt()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getPropose()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getOrdreProposition()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getCivilite()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper($ligne->getNomUsage()).' '.ucwords($ligne->getPrenom()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::age($ligne->getDateNaissance(), $campagne->getAnneeReference() - 1))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, EnumOrigineRecrutementType::getLibelle($ligne->getOrigineRecrutement()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, EnumOrigineEntreeCorpsMisEnExtinctionType::getLibelle($ligne->getOrigineEntreeCorpsMisEnExtinction()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateExerciceDroitOption()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getCorpsOrigineIngres())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getGradeOrigineIngres())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateEntreeCorpsOrigine()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateEntreeCorpsAC()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getEchelon())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::anciennete($ligne->getDateEntreeEchelon(), $campagne->getAnneeReference()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getPosition1512AnneePrec())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::ouiNon($ligne->getRemplitConditionsEchelon()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateRemplitConditionsEchelon()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::ouiNon($ligne->getRemplitConditionsService()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateRemplitConditionsService()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getAdministrationEmploi()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDirection()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getTypeFonctionsOccupees()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getFonctionsOccupees())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getIntituleFonctionsOccupees())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getMobilite())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateDebutMobilite()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateFinMobilite()))
            ;

            ++$numRow;
        }

        // Ajout de la feuille au classeur
        $objPHPExcel->addSheet($sheet);

        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        if ($returnAsResponse) {
            $response = $this->getStream($objPHPExcel, $fileName);

            return $response;
        }

        if ('' == $tempDirName) {
            throw new \Exception("getAgentsPromouvablesHC le repertoire temp n'a pas été passé en paramètre");
        }

        $this->fileHelper->saveExcelFileToTempDir($fileName, $objPHPExcel, $tempDirName);
    }

    /*
     * Retourne un fichier Excel comprenant l'ensemble des lignes d'une campagne AG
     */
    private function exportLigneAgentAG($campagne, $tempDirName = '', $returnAsResponse = true)
    {
        $lignes = $this->em->getRepository(Ligne::class)->getLignesAExporterByCampagne($campagne);

        $template = 'AGministere.xls';
        $fileName = 'Agents_campagne_AG_'.$campagne->getAnneeReference().'.xls';

        $params = ['anneeReference' => $campagne->getAnneeReference(),
            'anneeReference-1' => $campagne->getAnneeReference() - 1, ];

        $premiereLigneTemplate = 4;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        // Copie de la première feuille
        $sheet = $objPHPExcel->getSheet(0)->copy();

        // Renommage de la nouvelle feuille
        $sheet->setTitle('Agents_campagne_AG');

        $numRow = $premiereLigneTemplate;
        /* @var $ligne AG */
        foreach ($lignes as $ligne) {
            $numCol = 1;
            $sheet->setCellValueByColumnAndRow($numCol, $numRow, ucfirst($ligne->getListeAlimentation()->getMinistere()->getLibelleCourt()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getPropose()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getOrdreProposition()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getCivilite()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper($ligne->getNomUsage()).' '.ucwords($ligne->getPrenom()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::age($ligne->getDateNaissance(), $campagne->getAnneeReference() - 1));

            if (null !== $ligne->getDateEntreeCorpsAC()) {
                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateEntreeCorpsAC()->getTimestamp()));
            } else {
                ++$numCol;
            }

            $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, EnumOrigineRecrutementType::getLibelle($ligne->getOrigineRecrutement()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getPosition1512AnneePrec());
            if (null !== $ligne->getDateAccesHC()) {
                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateAccesHC()->getTimestamp()));
            } else {
                ++$numCol;
            }

            $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getEchelon());
            if (null !== $ligne->getDateEntreeEchelon()) {
                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateEntreeEchelon()->getTimestamp()));
            } else {
                ++$numCol;
            }

            $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, Util::anciennete($ligne->getDateEntreeEchelon(), $campagne->getAnneeReference()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::ouiNon($ligne->getRemplitConditionsEchelon()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateRemplitConditionsEchelon()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::ouiNon($ligne->getRemplitConditionsService()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateRemplitConditionsService()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getTypeFonctionsOccupees())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getFonctionsOccupees())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getIntituleFonctionsOccupees())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getAdministrationEmploi())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getDirection())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getMobilite())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateDebutMobilite()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $this->formatDate($ligne->getDateFinMobilite()))
            ;

            ++$numRow;
        }

        // Ajout de la feuille au classeur
        $objPHPExcel->addSheet($sheet);

        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        if ($returnAsResponse) {
            $response = $this->getStream($objPHPExcel, $fileName);

            return $response;
        }
        if ('' == $tempDirName) {
            throw new \Exception("getAgentsPromouvablesHC le repertoire temp n'a pas été passé en paramètre");
        }

        $this->fileHelper->saveExcelFileToTempDir($fileName, $objPHPExcel, $tempDirName);
    }

    /*
     * Retourne un fichier Excel comprenant l'ensemble des lignes d'une campagne ES
     */
    private function exportLigneAgentES($campagne, $tempDirName = '', $returnAsResponse = true)
    {
        $lignes = $this->em->getRepository(Ligne::class)->getLignesAExporterByCampagne($campagne);

        $template = 'ESministere.xls';
        $fileName = 'Agents_campagne_ES_'.$campagne->getAnneeReference().'.xls';

        $params = ['anneeReference' => $campagne->getAnneeReference(),
            'anneeReference-1' => $campagne->getAnneeReference() - 1, ];

        $premiereLigneTemplate = 4;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        // Copie de la première feuille
        $sheet = $objPHPExcel->getSheet(0)->copy();

        // Renommage de la nouvelle feuille
        $sheet->setTitle('Agents_campagne_ES');

        $numRow = $premiereLigneTemplate;
        /* @var $ligne ES */
        foreach ($lignes as $ligne) {
            $numCol = 1;
            $sheet->setCellValueByColumnAndRow($numCol, $numRow, ucfirst($ligne->getListeAlimentation()->getMinistere()->getLibelleCourt()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getPropose()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getOrdreProposition()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getCivilite()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper($ligne->getNomUsage()).' '.ucwords($ligne->getPrenom()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::age($ligne->getDateNaissance(), $campagne->getAnneeReference()));

            if (null !== $ligne->getDateEntreeCorpsAC()) {
                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateEntreeCorpsAC()->getTimestamp()));
            } else {
                ++$numCol;
            }

            $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, EnumOrigineRecrutementType::getLibelle($ligne->getOrigineRecrutement()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getPosition1512AnneePrec());

            if (null !== $ligne->getDateAccesAG()) {
                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateAccesAG()->getTimestamp()));
            } else {
                ++$numCol;
            }

            $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getEchelon())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::anciennete($ligne->getDateEntreeEchelon(), $campagne->getAnneeReference()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getPeriodeEmploiDecisionGouvernement()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDureeCumuleeEmploiDecisionGouvernement()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getFonctionsOccupees())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getDirection())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getObservations());

            ++$numRow;
        }

        // Ajout de la feuille au classeur
        $objPHPExcel->addSheet($sheet);

        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        if ($returnAsResponse) {
            $response = $this->getStream($objPHPExcel, $fileName);

            return $response;
        }
        if ('' == $tempDirName) {
            throw new \Exception("getAgentsPromouvablesHC le repertoire temp n'a pas été passé en paramètre");
        }

        $this->fileHelper->saveExcelFileToTempDir($fileName, $objPHPExcel, $tempDirName);
    }

    /*
     * Retourne un fichier Excel comprenant l'ensemble des lignes d'une campagne Integration
     */
    private function exportLigneAgentIntegration($campagne, $tempDirName = '', $returnAsResponse = true)
    {
        $lignes = $this->em->getRepository(Ligne::class)->getLignesAExporterByCampagne($campagne);

        $template = 'Integration.xls';
        $params = ['anneeReference' => $campagne->getAnneeReference(),
            'anneeReference-1' => $campagne->getAnneeReference() - 1, ];

        $fileName = 'Agents_demandes_integration_'.$campagne->getAnneeReference().'.xls';
        $premiereLigneTemplate = 4;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        // Copie de la première feuille
        $sheet = $objPHPExcel->getSheet(0)->copy();

        // Renommage de la nouvelle feuille
        $sheet->setTitle('Agents_demandes_integration');

        $numRow = $premiereLigneTemplate;
        /* @var $ligne Integration */
        foreach ($lignes as $ligne) {
            $this->exporterLigneIntegration($ligne, $sheet, $numRow);
            ++$numRow;
        }

        // Ajout de la feuille au classeur
        $objPHPExcel->addSheet($sheet);

        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        if ($returnAsResponse) {
            $response = $this->getStream($objPHPExcel, $fileName);

            return $response;
        }
        if ('' == $tempDirName) {
            throw new \Exception("getAgentsPromouvablesHC le repertoire temp n'a pas été passé par paramèetre");
        }

        $this->fileHelper->saveExcelFileToTempDir($fileName, $objPHPExcel, $tempDirName);
    }

    /*
     * Retourne un fichier Excel comprenant l'ensemble des lignes d'une campagne Détachement
     */
    private function exportLigneAgentDetachement($campagne, $tempDirName = '', $returnAsResponse = true)
    {
        $lignes = $this->em->getRepository(Ligne::class)->getLignesAExporterByCampagne($campagne);

        $template = 'Detachement.xls';
        $params = ['anneeReference' => $campagne->getAnneeReference(),
            'anneeReference-1' => $campagne->getAnneeReference() - 1, ];

        $fileName = 'Agents_accueillis_en_detachement_'.$campagne->getAnneeReference().'.xls';
        $premiereLigneTemplate = 4;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        // Copie de la première feuille
        $sheet = $objPHPExcel->getSheet(0)->copy();

        $sheet->setTitle('Agents_accueillis_detachement');

        $numRow = $premiereLigneTemplate;

        /* @var $ligne Detachement */
        foreach ($lignes as $ligne) {
            $numCol = 1;
            $sheet->setCellValueByColumnAndRow($numCol, $numRow, ucfirst($ligne->getListeAlimentation()->getMinistere()->getLibelleCourt()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getCivilite()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper($ligne->getNomUsage()).' '.ucwords($ligne->getPrenom()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::age($ligne->getDateNaissance(), $campagne->getAnneeReference()));

            if (null !== $ligne->getDateDebut()) {
                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateDebut()->getTimestamp()));
            } else {
                ++$numCol;
            }

            $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDureeDetachement()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getRenouvellement()));

            if (null !== $ligne->getDateRenouvellement()) {
                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateRenouvellement()->getTimestamp()));
            } else {
                ++$numCol;
            }

            $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDureeRenouvellement()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getCorpsOrigine()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getGradeOrigine()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getAccueilMobilite()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getGradeAccueil()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getFonctionAccueil()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDirectionAccueil()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getObservations()));

            ++$numRow;
        }

        // Ajout de la feuille au classeur
        $objPHPExcel->addSheet($sheet);

        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        if ($returnAsResponse) {
            $response = $this->getStream($objPHPExcel, $fileName);

            return $response;
        }
        if ('' == $tempDirName) {
            throw new \Exception("getAgentsPromouvablesHC le repertoire temp n'a pas été passé en paramètre");
        }

        $this->fileHelper->saveExcelFileToTempDir($fileName, $objPHPExcel, $tempDirName);
    }

    /*
     * Retourne un fichier Excel comprenant l'ensemble des lignes d'une campagne Disponibilité
     */
    private function exportLigneAgentDisponibilite($campagne, $tempDirName = '', $returnAsResponse = true)
    {
        $lignes = $this->em->getRepository(Ligne::class)->getLignesAExporterByCampagne($campagne);

        $template = 'Disponibilite.xls';
        $params = ['anneeReference' => $campagne->getAnneeReference(),
            'anneeReference-1' => $campagne->getAnneeReference() - 1, ];

        $fileName = 'Agents_en_disponibilite_'.$campagne->getAnneeReference().'.xls';
        $premiereLigneTemplate = 4;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        // Copie de la première feuille
        $sheet = $objPHPExcel->getSheet(0)->copy();

        // Renommage de la nouvelle feuille
        $sheet->setTitle('Agents_en_disponibilite');

        $numRow = $premiereLigneTemplate;
        /* @var $ligne Disponibilite */
        foreach ($lignes as $ligne) {
            $numCol = 1;
            $sheet->setCellValueByColumnAndRow($numCol, $numRow, ucfirst($ligne->getListeAlimentation()->getMinistere()->getLibelleCourt()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getCivilite()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper($ligne->getNomUsage()).' '.ucwords($ligne->getPrenom()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::age($ligne->getDateNaissance(), $campagne->getAnneeReference()));

            if (null !== $ligne->getDateDebut()) {
                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateDebut()->getTimestamp()));
            } else {
                ++$numCol;
            }

            $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDuree()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getRenouvellement()));

            if (null !== $ligne->getDateRenouvellement()) {
                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateRenouvellement()->getTimestamp()));
            } else {
                ++$numCol;
            }

            $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDureeRenouvellement()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getTypeDisponibilite()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getGrade()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getOrganismeAccueil()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getFonctionAccueil()));

            if (null !== $ligne->getDateCommisionDeontologie()) {
                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, date(self::DATE_FORMAT, $ligne->getDateCommisionDeontologie()->getTimestamp()));
            } else {
                ++$numCol;
            }

            $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getAvisCommisionDeontologie()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getObservations()));

            ++$numRow;
        }

        // Ajout de la feuille au classeur
        $objPHPExcel->addSheet($sheet);

        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        if ($returnAsResponse) {
            $response = $this->getStream($objPHPExcel, $fileName);

            return $response;
        }
        if ('' == $tempDirName) {
            throw new \Exception("getAgentsPromouvablesHC le repertoire temp n'a pas été passé par paramèetre");
        }

        $this->fileHelper->saveExcelFileToTempDir($fileName, $objPHPExcel, $tempDirName);
    }

    /*
     * Retourne un fichier Excel comprenant l'ensemble des lignes d'une campagne Titularisation
     */
    private function exportLigneAgentTitularisation($campagne, $tempDirName = '', $returnAsResponse = true)
    {
        $lignes = $this->em->getRepository(Ligne::class)->getLignesAExporterByCampagne($campagne);

        $template = 'Titularisation.xls';
        $params = ['anneeReference' => $campagne->getAnneeReference(),
            'anneeReference-1' => $campagne->getAnneeReference() - 1, ];

        $fileName = 'Agents_titularises_'.$campagne->getAnneeReference().'.xls';
        $premiereLigneTemplate = 4;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        // Copie de la première feuille
        $sheet = $objPHPExcel->getSheet(0)->copy();

        // Renommage de la nouvelle feuille
        $sheet->setTitle('Agents_titularises');

        $numRow = $premiereLigneTemplate;
        /* @var $ligne Titularisation */
        foreach ($lignes as $ligne) {
            $numCol = 1;
            $sheet->setCellValueByColumnAndRow($numCol, $numRow, ucfirst($ligne->getListeAlimentation()->getMinistere()->getLibelleCourt()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getCivilite()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper($ligne->getNomUsage()).' '.ucwords($ligne->getPrenom()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, Util::age($ligne->getDateNaissance(), $campagne->getAnneeReference()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getAdministrationOrigne()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getCorpsOrigineIngres())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $ligne->getGradeOrigineIngres())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDirectionOrigine()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getFonctionsAnterieures()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getAdministrationAccueil()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getDirectionAccueil()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($ligne->getFonctionsNouvelles()));

            ++$numRow;
        }

        // Ajout de la feuille au classeur
        $objPHPExcel->addSheet($sheet);

        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        if ($returnAsResponse) {
            $response = $this->getStream($objPHPExcel, $fileName);

            return $response;
        }
        if ('' == $tempDirName) {
            throw new \Exception("getAgentsPromouvablesHC le repertoire temp n'a pas été passé par paramètre");
        }

        $this->fileHelper->saveExcelFileToTempDir($fileName, $objPHPExcel, $tempDirName);
    }

    public function genererStatsEffectifs($statsEffectifs, $statsEffectifsParEchelon)
    {
        $template = 'Statistiques/Statistiques effectifs par grade.xls';
        $fileName = 'Statistiques effectifs par grade.xls';

        $params = [];
        $date = new \DateTime();
        $params['annee'] = $date->format('Y');

        $objPHPExcel = $this->createPHPExcel($template, $params);

        /************************* FEUILLE 1 - EFFECTIF TOTAL *************************/

        // Copie de la première feuille
        $sheet = $objPHPExcel->getSheet(0);

        // Écriture de l'année
        $sheet->setCellValueByColumnAndRow(1, 4, $params['annee']);

        // Première ligne de donnée du template
        $numRow = 8;

        $nbTotalPremierGrade = 0;
        $nbTotalDeuxiemeGrade = 0;
        $nbTotalGradeTransitoire = 0;
        $nbTotalTroisiemeGrade = 0;

        foreach ($statsEffectifs as $indicateurs) {
            $numCol = 0;

            $nbTotalPremierGrade += $indicateurs['PremierGrade'];
            $nbTotalDeuxiemeGrade += $indicateurs['DeuxiemeGrade'];
            $nbTotalGradeTransitoire += $indicateurs['Transitoire'];
            $nbTotalTroisiemeGrade += $indicateurs['TroisiemeGrade'];

            $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper(Converter::convertStringToCanonical($indicateurs['libelle'])))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $indicateurs['PremierGrade'])
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $indicateurs['DeuxiemeGrade'])
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $indicateurs['Transitoire'])
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $indicateurs['TroisiemeGrade'])
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $indicateurs['PremierGrade'] + $indicateurs['DeuxiemeGrade'] + $indicateurs['Transitoire'] + $indicateurs['TroisiemeGrade']);

            // Insertion d'une nouvelle ligne
            $sheet->insertNewRowBefore($numRow + 1, 1);
            ++$numRow;
        }

        // Suppression de la dernière ligne car elle est vide
        $sheet->removeRow($numRow);

        $numCol = 1;
        $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, $nbTotalPremierGrade)
            ->setCellValueByColumnAndRow(++$numCol, $numRow, $nbTotalDeuxiemeGrade)
            ->setCellValueByColumnAndRow(++$numCol, $numRow, $nbTotalGradeTransitoire)
            ->setCellValueByColumnAndRow(++$numCol, $numRow, $nbTotalTroisiemeGrade)
            ->setCellValueByColumnAndRow(++$numCol, $numRow, $nbTotalPremierGrade + $nbTotalDeuxiemeGrade + $nbTotalGradeTransitoire + $nbTotalTroisiemeGrade);

        /************************* FEUILLE 2 à 5 - EFFECTIF DES DIFFERENTS GRADES PAR ECHELON *************************/

        $activeSheetNb = 1;

        foreach ($statsEffectifsParEchelon as $gradeLibelle => $statsEchelon) {
            // Copie de la première feuille
            $sheet = $objPHPExcel->getSheet($activeSheetNb);

            // Écriture de l'année
            $sheet->setCellValueByColumnAndRow(1, 4, $params['annee']);

            // Première ligne de donnée du template
            $numRow = 8;

            // Variables pour calculer les totaux par colonne
            $nbTotalByEchelon = array_fill(1, EnumIndicateurType::ECHELONS[$gradeLibelle], 0);

            // total des agents, tout échelon confondu
            $nbTotal = 0;

            foreach ($statsEchelon as $indicateurs) {
                $numCol = 0;
                $totalLigne = 0;

                // Ajout du libellé du ministère dans la colonne
                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper(Converter::convertStringToCanonical($indicateurs['libelle'])));

                for ($i = 1; $i <= EnumIndicateurType::ECHELONS[$gradeLibelle]; $i++) {
                    // Calcul les totaux par colonne (ministère)
                    $nbTotalByEchelon[$i] += $indicateurs[$i];
                    $totalLigne += $indicateurs[$i];

                    // Remplissage des colonnes (ministère) : nombre d'agents par échelon
                    $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, $indicateurs[$i]);
                }

                // Remplissage des colonnes (ministère) : nombre d'agents total
                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, $totalLigne);

                // Calcul le grand total
                $nbTotal += $totalLigne;

                // Insertion d'une nouvelle ligne
                $sheet->insertNewRowBefore($numRow + 1);
                ++$numRow;
            }

            // Suppression de la dernière ligne car elle est vide
            $sheet->removeRow($numRow);

            // Écriture des totaux par colonne (ministère)
            $numCol = 1;
            for ($i = 1; $i <= EnumIndicateurType::ECHELONS[$gradeLibelle]; $i++) {
                $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, $nbTotalByEchelon[$i]);
            }
            $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, $nbTotal);

            $activeSheetNb++;
        }

        $response = $this->getStream($objPHPExcel, $fileName);

        return $response;
    }

    public function extractUsers($utilisateurs)
    {

        $template = 'Export_Utilisateurs.xls';
        $fileName = 'Export_utilisateurs.xls';
        $params = [];

        $premiereLigneTemplate = 6;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        // Copie de la première feuille
        $sheet = $objPHPExcel->getSheet(0)->copy();

        // Renommage de la nouvelle feuille
        $sheet->setTitle('export des utilisateurs');

        $numRow = $premiereLigneTemplate;

        /* @var Utilisateur $utilisateur */
        foreach ($utilisateurs as $utilisateur) {
            $numCol = 1;
            $sheet
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucfirst($utilisateur->getCivilite()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper($utilisateur->getNom()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, ucwords($utilisateur->getPrenom()))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $utilisateur->getEmail())
                ->setCellValueByColumnAndRow(++$numCol, $numRow, mb_strtoupper($utilisateur['roles'][0]))
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $utilisateur['enabled'] ? 'Actif' : 'Inactif');

            // Insertion d'une nouvelle ligne (ceci ralentit l'ecriture)
            $sheet->insertNewRowBefore($numRow + 1, 1);
            ++$numRow;
        }

        // Suppression de la dernière ligne car elle est vide
        $sheet->removeRow($numRow);

        // Ajout de la feuille au classeur
        $objPHPExcel->addSheet($sheet);
        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        $response = $this->getStream($objPHPExcel, $fileName);

        return $response;
    }

    public function extractGestionCompteCourantsEff($gestionComptes)
    {
        $template = 'Classeur1Situations_comptes_MATRICE.xlsx';
        $fileName = 'Classeur1Situations_comptes_MATRICE.xlsx';
        $params = [];

        $premiereLigneTemplate = 5;

        $objPHPExcel = $this->createPHPExcel($template, $params);

        // Copie de la première feuille
        $sheet = $objPHPExcel->getSheet(0)->copy();


        // Renommage de la nouvelle feuille
        $sheet->setTitle('export des comptes ');

        $numRow = $premiereLigneTemplate;
        $libelleCompte = 0;
        $moyendepaiement = 0;
        $receArgent = 0;
        $depensesCourantes = 0;
        /* @var GestionCompteCourant $gestionCompte */
        foreach ($gestionComptes as $gestionCompte) {
            $libelleCompte += $gestionCompte['LibelleCompte'];
            $moyendepaiement += $gestionCompte['Moyendepaiement'];
            $receArgent += $gestionCompte['ReceArgent'];
            $depensesCourantes += $gestionCompte['DepensesCourantes'];
            $numCol = 1;

            $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, $gestionCompte['LibelleCompte'])
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $gestionCompte['Moyendepaiement'])
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $gestionCompte['ReceArgent'])
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $gestionCompte['DepensesCourantes'])
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $gestionCompte['LibelleCompte'] + $gestionCompte['Moyendepaiement'] + $gestionCompte['ReceArgent'] + $gestionCompte['DepensesCourantes']);
            // Insertion d'une nouvelle ligne (ceci ralentit l'ecriture)
            $sheet->insertNewRowBefore($numRow + 1, 1);
            ++$numRow;
        }

        // Suppression de la dernière ligne car elle est vide
        $sheet->removeRow($numRow);

        // Ajout de la feuille au classeur
        $objPHPExcel->addSheet($sheet);
        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        $response = $this->getStream($objPHPExcel, $fileName);

        return $response;
    }

    public function extractGestionCompteCourants($gestionComptes)
    {
        $template = 'Classeur1Situations_comptes_MATRICE.xlsx';
        $fileName = 'Classeur1Situations_comptes_MATRICE.xlsx';

        $params = [];
        $date = new \DateTime();
        $params['annee'] = $date->format('Y');

        $objPHPExcel = $this->createPHPExcel($template, $params);

        /************************* FEUILLE 1 - EFFECTIF TOTAL *************************/

        // Copie de la première feuille
        $sheet = $objPHPExcel->getSheet(0);

        // Écriture de l'année
        $sheet->setCellValueByColumnAndRow(1, 4, $params['annee']);

        // Première ligne de donnée du template
        $numRow = 8;

        $libelleCompte = 0;
        $receArgent = 0;
        $depensesCourantes = 0;
        $moyendepaiement = 0;

        /*  GestionCompteCourant $indicateurs */
        foreach ($gestionComptes as $indicateurs) {
            $numCol = 0;

            $libelleCompte += $indicateurs['LibelleCompte'];
            $moyendepaiement += $indicateurs['Moyendepaiement'];
            $receArgent += $indicateurs['ReceArgent'];
            $depensesCourantes += $indicateurs['DepensesCourantes'];

            $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, $indicateurs['LibelleCompte'])
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $indicateurs['Moyendepaiement'])
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $indicateurs['ReceArgent'])
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $indicateurs['DepensesCourantes'])
                ->setCellValueByColumnAndRow(++$numCol, $numRow, $indicateurs['LibelleCompte'] + $indicateurs['Moyendepaiement'] + $indicateurs['ReceArgent'] + $indicateurs['DepensesCourantes']);

            // Insertion d'une nouvelle ligne
            $sheet->insertNewRowBefore($numRow + 1, 1);
            ++$numRow;
        }

        // Suppression de la dernière ligne car elle est vide
        $sheet->removeRow($numRow);

        $numCol = 1;
        $sheet->setCellValueByColumnAndRow(++$numCol, $numRow, $libelleCompte)
            ->setCellValueByColumnAndRow(++$numCol, $numRow, $receArgent)
            ->setCellValueByColumnAndRow(++$numCol, $numRow, $moyendepaiement)
            ->setCellValueByColumnAndRow(++$numCol, $numRow, $depensesCourantes)
            ->setCellValueByColumnAndRow(++$numCol, $numRow, $libelleCompte + $receArgent + $moyendepaiement + $depensesCourantes);

        /************************* FEUILLE 2 à 5 - EFFECTIF DES DIFFERENTS GRADES PAR ECHELON *************************/

        $response = $this->getStream($objPHPExcel, $fileName);

        return $response;
    }


    private function exporterListeIntegration(GestionCompteCourant $gestionCompteCourant, $tempDirName, $returnAsResponse)
    {


        $template = 'Integration.xls';
        $params = ['anneeReference' => $gestionCompteCourant->getDateExercice(),
            'anneeReference-1' => $gestionCompteCourant->getDateExercice() - 1, ];

        $fileName = 'Agents_demandes_integration_'.$gestionCompteCourant->getDateExercice().'_'.Converter::convertStringToCanonical($gestionCompteCourant->getMinistere()->getLibelleCourt()).'.xls';

        $objPHPExcel = $this->createPHPExcel($template, $params);

        // Copie de la première feuille
        $sheet = $objPHPExcel->getSheet(0)->copy();

        // Renommage de la nouvelle feuille
        $sheet->setTitle($gestionCompteCourant->getMinistere()->getLibelleCourt());

        $this->exporterIntegration($gestionCompteCourant, $sheet);

        // Ajout de la feuille au classeur
        $objPHPExcel->addSheet($sheet);

        // Suppression de la feuille template
        $objPHPExcel->removeSheetByIndex(0);

        if ($returnAsResponse) {
            $response = $this->getStream($objPHPExcel, $fileName);

            return $response;
        }
        if ('' == $tempDirName) {
            throw new \Exception("getAgentsPromouvablesHC le repertoire temp n'a pas été passé par paramèetre");
        }

        $this->fileHelper->saveExcelFileToTempDir($fileName, $objPHPExcel, $tempDirName);
    }


    private function exporterIntegration(GestionCompteCourant $gestionCompteCourant, $sheet)
    {
        $numRow = 4;

        /* @var $ligne Integration */
        foreach ($gestionCompteCourant->getLignes() as $ligne) {
            $this->exporterLigneIntegration($ligne, $sheet, $numRow);

            ++$numRow;
        }

        // Suppression de la dernière ligne car elle est vide
        $sheet->removeRow($numRow);
    }
}
