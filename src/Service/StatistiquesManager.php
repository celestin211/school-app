<?php

namespace App\Service;

use App\Entity\GestionCompteCourant;
use App\Entity\Utilisateur;
use App\EnumTypes\EnumCiviliteType;
use App\Repository\GestionCompteCourantRepository;
use App\Service\Referentiel\TypeFonctionsOccupeesManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class StatistiquesManager
{
    final public const PRECISION = 2;


    private StatistiquesExcel $statistiquesExcel;
    private GestionCompteCourantRepository $gestionCompteCourantRepository;
    private Security $security;
    private AuthorizationCheckerInterface $authorizationChecker;

    public function __construct(
        GestionCompteCourantRepository $gestionCompteCourantRepository,
        CorpsRepository $corpsRepository,
        StatistiquesExcel $statistiquesExcel,
        EntityManagerInterface $em,
        Security $security,
        AuthorizationCheckerInterface $authorizationChecker
    ) {
        $this->gestionCompteCourantRepository = $gestionCompteCourantRepository;
        $this->corpsRepository = $corpsRepository;
        $this->statistiquesExcel = $statistiquesExcel;
        $this->security = $security;
        $this->authorizationChecker = $authorizationChecker;

    }

    public function statistiquesOrigineRecrutement()
    {
        $originesEntreesCorps = EnumOrigineRecrutementType::VALUES;
        $effectifTotal = $this->agentRepository->countOrigineRecrutement($this->ministere);

        $nbEntrees = $nbDepenses = $totaux = [];
        $pourcentagesHommes = $pourcentagesFemmes = [];
        foreach ($originesEntreesCorps as $origineRecrutement) {
            // HOMMES
            if ($origineRecrutement === EnumOrigineRecrutementType::AUTRE) {
                $nb = $this->gestionCompteCourantRepository->countOrigineRecrutement($this->ministere, null, EnumCiviliteType::MONSIEUR, array_keys(EnumOrigineRecrutementType::VALUES));
            } else {
                $nb = $this->agentRepository->countOrigineRecrutement($this->ministere, $origineRecrutement, EnumCiviliteType::MONSIEUR);
            }
            $nbHommes[] = $nb;
            $pourcentagesHommes[] = self::pourcentage($nb, $effectifTotal);

            // FEMMES
            if ($origineRecrutement === EnumOrigineRecrutementType::AUTRE) {
                $nb = $this->agentRepository->countOrigineRecrutement($this->ministere, null, EnumCiviliteType::MADAME, array_keys(EnumOrigineRecrutementType::VALUES));
            } else {
                $nb = $this->agentRepository->countOrigineRecrutement($this->ministere, $origineRecrutement, EnumCiviliteType::MADAME);
            }
            $nbFemmes[] = $nb;
            $pourcentagesFemmes[] = self::pourcentage($nb, $effectifTotal);

            // TOTAL
            if ($origineRecrutement === EnumOrigineRecrutementType::AUTRE) {
                $totaux[] = $this->agentRepository->countOrigineRecrutement($this->ministere, null, null, array_keys(EnumOrigineRecrutementType::VALUES));
            } else {
                $totaux[] = $this->agentRepository->countOrigineRecrutement($this->ministere, $origineRecrutement);
            }
        }

        // TOTAL - HOMMES
        $nb = $this->agentRepository->countOrigineRecrutement($this->ministere, null, EnumCiviliteType::MONSIEUR);
        $nbHommes[] = $nb;
        $pourcentagesHommes[] = self::pourcentage($nb, $effectifTotal);

        // TOTAL - FEMMES
        $nb = $this->agentRepository->countOrigineRecrutement($this->ministere, null, EnumCiviliteType::MADAME);
        $nbFemmes[] = $nb;
        $pourcentagesFemmes[] = self::pourcentage($nb, $effectifTotal);

        // TOTAL
        $totaux[] = $effectifTotal;

        return [
            'originesEntreesCorps' => array_merge($originesEntreesCorps, ['Total']),
            'nbHommes' => $nbHommes,
            'nbFemmes' => $nbFemmes,
            'pourcentagesHommes' => $pourcentagesHommes,
            'pourcentagesFemmes' => $pourcentagesFemmes,
            'totaux' => $totaux,
        ];
    }

    public function exporterStatistiquesOrigineRecrutement()
    {
        $statistiquesOrigineRecrutement = $this->statistiquesOrigineRecrutement();

        return $this->statistiquesExcel->exporterStatistiquesOrigineRecrutement($statistiquesOrigineRecrutement);
    }

    public function exporterStatistiquesPositionStatutaire()
    {
        $statistiquesPositionStatutaire = $this->statistiquesPositionStatutaire();

        return $this->statistiquesExcel->exporterStatistiquesPositionStatutaire($statistiquesPositionStatutaire);
    }

    public function exporterStatistiquesAgeMoyen()
    {
        $statistiques = $this->statistiquesMoyenneAge();

        return $this->statistiquesExcel->exporterStatistiquesAgeMoyen($statistiques);
    }

    public function exporterStatistiquesEffectif()
    {
        $statistiques = $this->statistiquesEffectif();

        return $this->statistiquesExcel->exporterStatistiquesEffectif($statistiques);
    }

    public function exporterStatistiquesTypeFonctionsOccupees()
    {
        $statistiques = $this->statistiquesTypeFonction();

        return $this->statistiquesExcel->exporterStatistiquesTypeFonctionsOccupees($statistiques);
    }

    public function exporterStatistiquesFonctionsOccupees()
    {
        $statistiques = $this->statistiquesFonctionOccupee();

        return $this->statistiquesExcel->exporterStatistiquesFonctionOccupees($statistiques);
    }

    public function exporterStatistiquesEffectifDroitOption()
    {
        $statistiques = $this->statistiquesEffectifDroitOption();

        return $this->statistiquesExcel->exporterStatistiquesEffectifDroitOption($statistiques);
    }

    public function exporterStatistiquesOrigineRecrutementCorpsMisEnExtinctionDroitOption()
    {
        $statistiques = $this->statistiquesOrigineRecrutementCorpsMisEnExtinctionDroitOption();

        return $this->statistiquesExcel->exporterStatistiquesOrigineRecrutementCorpsMisEnExtinctionDroitOption($statistiques);
    }

    public function statistiquesPositionStatutaire()
    {
        $positionsStatutaires = $this->positionManager->getActifs();
        $effectifTotal = $this->agentRepository->countPositionStatutaire($this->ministere);

        $nbHommes = [];
        $pourcentagesHommes = [];
        foreach ($positionsStatutaires as $positionStatutaire) {
            $nb = $this->agentRepository->countPositionStatutaire($this->ministere, $positionStatutaire, EnumCiviliteType::MONSIEUR);
            $nbHommes[] = $nb;
            $pourcentagesHommes[] = self::pourcentage($nb, $effectifTotal);
        }

        $nb = $this->agentRepository->countPositionStatutaire($this->ministere, null, EnumCiviliteType::MONSIEUR, $this->positionManager->getActifs());
        $nbHommes[] = $nb;
        $pourcentagesHommes[] = self::pourcentage($nb, $effectifTotal);

        $nb = $this->agentRepository->countPositionStatutaire($this->ministere, null, EnumCiviliteType::MONSIEUR);
        $nbHommes[] = $nb;
        $pourcentagesHommes[] = self::pourcentage($nb, $effectifTotal);

        $nbFemmes = [];
        $pourcentagesFemmes = [];
        foreach ($positionsStatutaires as $positionsStatutaire) {
            $nb = $this->agentRepository->countPositionStatutaire($this->ministere, $positionsStatutaire, EnumCiviliteType::MADAME);
            $nbFemmes[] = $nb;
            $pourcentagesFemmes[] = self::pourcentage($nb, $effectifTotal);
        }

        $nb = $this->agentRepository->countPositionStatutaire($this->ministere, null, EnumCiviliteType::MADAME, $this->positionManager->getActifs());
        $nbFemmes[] = $nb;
        $pourcentagesFemmes[] = self::pourcentage($nb, $effectifTotal);

        $nb = $this->agentRepository->countPositionStatutaire($this->ministere, null, EnumCiviliteType::MADAME);
        $nbFemmes[] = $nb;
        $pourcentagesFemmes[] = self::pourcentage($nb, $effectifTotal);

        $totaux = [];
        foreach ($positionsStatutaires as $positionsStatutaire) {
            $totaux[] = $this->agentRepository->countPositionStatutaire($this->ministere, $positionsStatutaire);
        }

        $totaux[] = $this->agentRepository->countPositionStatutaire($this->ministere, null, null, $this->positionManager->getActifs());
        $totaux[] = $effectifTotal;

        return [
            'positionsStatutaires' => array_merge($positionsStatutaires, ['Autre', 'Total']),
            'nbHommes' => $nbHommes,
            'nbFemmes' => $nbFemmes,
            'pourcentagesHommes' => $pourcentagesHommes,
            'pourcentagesFemmes' => $pourcentagesFemmes,
            'totaux' => $totaux,
        ];
    }

    public function statistiquesMoyenneAge()
    {
        $grades = EnumGradeType::VALUES;

        $hommes = [];

        foreach ($grades as $keyGrade => $grade) {
            $hommes[] = $this->agentRepository->getMoyenneAge($this->ministere, $keyGrade, null, EnumCiviliteType::MONSIEUR);
            $femmes[] = $this->agentRepository->getMoyenneAge($this->ministere, $keyGrade, null, EnumCiviliteType::MADAME);
            $hommesFemmes[] = $this->agentRepository->getMoyenneAge($this->ministere, $keyGrade);
        }
        $hommes[] = $this->agentRepository->getMoyenneAge($this->ministere, null, null, EnumCiviliteType::MONSIEUR);
        $hommes[] = $this->agentRepository->getMoyenneAgeEntreeCorps($this->ministere, EnumCiviliteType::MONSIEUR);

        $femmes[] = $this->agentRepository->getMoyenneAge($this->ministere, null, null, EnumCiviliteType::MADAME);
        $femmes[] = $this->agentRepository->getMoyenneAgeEntreeCorps($this->ministere, EnumCiviliteType::MADAME);

        $hommesFemmes[] = $this->agentRepository->getMoyenneAge($this->ministere);
        $hommesFemmes[] = $this->agentRepository->getMoyenneAgeEntreeCorps($this->ministere);

        return [
            'grades' => $grades,
            'hommes' => $hommes,
            'femmes' => $femmes,
            'hommesFemmes' => $hommesFemmes,
        ];
    }

    public function statistiquesEffectif()
    {
        $ministeres = $this->ministereRepository->findAllOrderByLibelleCourt();

        $statistiques = [];

        foreach ($ministeres as $ministere) {
            $statistiquesMinistere = [];
            $statistiquesMinistere[] = $this->agentRepository->countAgentsPremierGrade($ministere, EnumCiviliteType::MONSIEUR);
            $statistiquesMinistere[] = $this->agentRepository->countAgentsPremierGrade($ministere, EnumCiviliteType::MADAME);
            $statistiquesMinistere[] = $this->agentRepository->countAgentsPremierGrade($ministere);

            $statistiquesMinistere[] = $this->agentRepository->countAgentsDeuxiemeGrade($ministere, EnumCiviliteType::MONSIEUR);
            $statistiquesMinistere[] = $this->agentRepository->countAgentsDeuxiemeGrade($ministere, EnumCiviliteType::MADAME);
            $statistiquesMinistere[] = $this->agentRepository->countAgentsDeuxiemeGrade($ministere);

            $statistiquesMinistere[] = $this->agentRepository->countAgentsGradeTransitoire($ministere, EnumCiviliteType::MONSIEUR);
            $statistiquesMinistere[] = $this->agentRepository->countAgentsGradeTransitoire($ministere, EnumCiviliteType::MADAME);
            $statistiquesMinistere[] = $this->agentRepository->countAgentsGradeTransitoire($ministere);

            $statistiquesMinistere[] = $this->agentRepository->countAgentsTroisiemeGrade($ministere, EnumCiviliteType::MONSIEUR);
            $statistiquesMinistere[] = $this->agentRepository->countAgentsTroisiemeGrade($ministere, EnumCiviliteType::MADAME);
            $statistiquesMinistere[] = $this->agentRepository->countAgentsTroisiemeGrade($ministere);

            $statistiquesMinistere[] = $this->agentRepository->countAgentsAll($ministere, EnumCiviliteType::MONSIEUR);
            $statistiquesMinistere[] = $this->agentRepository->countAgentsAll($ministere, EnumCiviliteType::MADAME);
            $statistiquesMinistere[] = $this->agentRepository->countAgentsAll($ministere);

            $statistiques[] = ['ministere' => $ministere->getLibelleCourt(), 'statistiques' => $statistiquesMinistere];
        }

        $statistiquesMinistere = [];
        $statistiquesMinistere[] = $this->agentRepository->countAgentsPremierGrade(null, EnumCiviliteType::MONSIEUR);
        $statistiquesMinistere[] = $this->agentRepository->countAgentsPremierGrade(null, EnumCiviliteType::MADAME);
        $statistiquesMinistere[] = $this->agentRepository->countAgentsPremierGrade();

        $statistiquesMinistere[] = $this->agentRepository->countAgentsDeuxiemeGrade(null, EnumCiviliteType::MONSIEUR);
        $statistiquesMinistere[] = $this->agentRepository->countAgentsDeuxiemeGrade(null, EnumCiviliteType::MADAME);
        $statistiquesMinistere[] = $this->agentRepository->countAgentsDeuxiemeGrade();

        $statistiquesMinistere[] = $this->agentRepository->countAgentsGradeTransitoire(null, EnumCiviliteType::MONSIEUR);
        $statistiquesMinistere[] = $this->agentRepository->countAgentsGradeTransitoire(null, EnumCiviliteType::MADAME);
        $statistiquesMinistere[] = $this->agentRepository->countAgentsGradeTransitoire();

        $statistiquesMinistere[] = $this->agentRepository->countAgentsTroisiemeGrade(null, EnumCiviliteType::MONSIEUR);
        $statistiquesMinistere[] = $this->agentRepository->countAgentsTroisiemeGrade(null, EnumCiviliteType::MADAME);
        $statistiquesMinistere[] = $this->agentRepository->countAgentsTroisiemeGrade();

        $statistiquesMinistere[] = $this->agentRepository->countAgentsAll(null, EnumCiviliteType::MONSIEUR);
        $statistiquesMinistere[] = $this->agentRepository->countAgentsAll(null, EnumCiviliteType::MADAME);
        $statistiquesMinistere[] = $this->agentRepository->countAgentsAll();

        $statistiques[] = ['ministere' => 'Total', 'statistiques' => $statistiquesMinistere];

        return $statistiques;
    }

    /**
     * Renvoi les données de statistiques pour les effectifs de droit d'option. Génère les tableaux suivants :
     *  - Effectifs droits d'option au 1 janvier 2023
     *  - Effectifs droits d'option au 1 juillet 2023
     *  - Effectifs droits d'option au 31 décembre 2023
     *  - Effectifs droits d'option avec valeurs comparés
     *  - Effectifs droits d'option avec valeurs additionées
     */
    public function statistiquesEffectifDroitOption(): array
    {
        $corpsOrigine = $this->corpsRepository->getLibellesCorpsByIdentifiantIngres(EnumStatsDroitOptionType::VALUES);
        $datesCampagnes = EnumStatsDroitOptionType::getDatesCampagnes();

        // On ajoute cet index pour calculer le tableau additioné
        $datesCampagnes['addition'] = null;

        $statistiques = [];

        // Recuperation des tableaux d'effectifs simples (1 janvier 2023 / 1 juillet 2023 / 31 décembre 2023)
        // et du tableau avec toutes les campagnes additionées
        foreach ($datesCampagnes as $dateCampagneKey => $dateCampagne) {
            // Initialisation de la ligne des totaux
            $statistiquesTotaux = array_fill(0, 16, 0);

            // Initialisation des données du graphique
            $chartCorpsData[$dateCampagneKey] = [
                'header' => array_values($corpsOrigine),
                'civilite' => [
                    0 => ['label' => 'Homme', 'backgroundColor' => '#0076b2'],
                    1 => ['label' => 'Femme', 'backgroundColor' => '#db311e'],
                ],
                'total' => [
                    0 => ['label' => 'Total', 'backgroundColor' => '#557755'],
                ]
            ];

            foreach ($corpsOrigine as $corpsId => $corps) {
                // Calcul des statistiques du corps
                $statistiquesCorps = [];

                // Premier Grade
                $statistiquesCorps[0] = $this->agentRepository->countAgentsDroitOptionPremierGrade($corpsId, $dateCampagne, EnumCiviliteType::MONSIEUR);
                $statistiquesCorps[1] = $this->agentRepository->countAgentsDroitOptionPremierGrade($corpsId, $dateCampagne, EnumCiviliteType::MADAME);
                $statistiquesCorps[2] = $this->agentRepository->countAgentsDroitOptionPremierGrade($corpsId, $dateCampagne);

                // Deuxième Grade
                $statistiquesCorps[3] = $this->agentRepository->countAgentsDroitOptionDeuxiemeGrade($corpsId, $dateCampagne, EnumCiviliteType::MONSIEUR);
                $statistiquesCorps[4] = $this->agentRepository->countAgentsDroitOptionDeuxiemeGrade($corpsId, $dateCampagne, EnumCiviliteType::MADAME);
                $statistiquesCorps[5] = $this->agentRepository->countAgentsDroitOptionDeuxiemeGrade($corpsId, $dateCampagne);

                // Grade Transitoire
                $statistiquesCorps[6] = $this->agentRepository->countAgentsDroitOptionGradeTransitoire($corpsId, $dateCampagne, EnumCiviliteType::MONSIEUR);
                $statistiquesCorps[7] = $this->agentRepository->countAgentsDroitOptionGradeTransitoire($corpsId, $dateCampagne, EnumCiviliteType::MADAME);
                $statistiquesCorps[8] = $this->agentRepository->countAgentsDroitOptionGradeTransitoire($corpsId, $dateCampagne);

                // 3eme Grade
                $statistiquesCorps[9] = $this->agentRepository->countAgentsDroitOptionTroisiemeGrade($corpsId, $dateCampagne, EnumCiviliteType::MONSIEUR);
                $statistiquesCorps[10] = $this->agentRepository->countAgentsDroitOptionTroisiemeGrade($corpsId, $dateCampagne, EnumCiviliteType::MADAME);
                $statistiquesCorps[11] = $this->agentRepository->countAgentsDroitOptionTroisiemeGrade($corpsId, $dateCampagne);

                // Total
                $statistiquesCorps[12] = $this->agentRepository->countAgentsDroitOptionToutGrade($corpsId, $dateCampagne, EnumCiviliteType::MONSIEUR);
                $statistiquesCorps[13] = $this->agentRepository->countAgentsDroitOptionToutGrade($corpsId, $dateCampagne, EnumCiviliteType::MADAME);
                $statistiquesCorps[14] = $this->agentRepository->countAgentsDroitOptionToutGrade($corpsId, $dateCampagne);

                // Age moyen par corps
                $statistiquesCorps[15] = $this->agentRepository->getMoyenneAgeDroitOption($dateCampagneKey, $corpsId);

                $statistiques[$dateCampagneKey]['data'][] = ['corps' => $corps, 'statistiques' => $statistiquesCorps];

                // Calcul progressif des totaux
                $statistiquesTotaux[0] += $statistiquesCorps[0];
                $statistiquesTotaux[1] += $statistiquesCorps[1];
                $statistiquesTotaux[2] += $statistiquesCorps[2];
                $statistiquesTotaux[3] += $statistiquesCorps[3];
                $statistiquesTotaux[4] += $statistiquesCorps[4];
                $statistiquesTotaux[5] += $statistiquesCorps[5];
                $statistiquesTotaux[6] += $statistiquesCorps[6];
                $statistiquesTotaux[7] += $statistiquesCorps[7];
                $statistiquesTotaux[8] += $statistiquesCorps[8];
                $statistiquesTotaux[9] += $statistiquesCorps[9];
                $statistiquesTotaux[10] += $statistiquesCorps[10];
                $statistiquesTotaux[11] += $statistiquesCorps[11];
                $statistiquesTotaux[12] += $statistiquesCorps[12];
                $statistiquesTotaux[13] += $statistiquesCorps[13];
                $statistiquesTotaux[14] += $statistiquesCorps[14];



                // Ajout des données par corps pour la génération du graphique
                $chartCorpsData[$dateCampagneKey]['civilite'][0]['data'][] = $statistiquesCorps[12];
                $chartCorpsData[$dateCampagneKey]['civilite'][1]['data'][] = $statistiquesCorps[13];
                $chartCorpsData[$dateCampagneKey]['total'][0]['data'][] = $statistiquesCorps[14];
            }

            // Récupération de l'age moyen total
            $statistiquesTotaux[15] = $this->agentRepository->getMoyenneAgeDroitOption($dateCampagneKey);

            $statistiques[$dateCampagneKey]['data'][] = ['corps' => 'TOTAL', 'statistiques' => $statistiquesTotaux];

            // Ajout des données de graphique dans le tableau
            $statistiques[$dateCampagneKey]['chartData'] = $chartCorpsData[$dateCampagneKey];
        }

        // On vérifie que le tableau n'est pas vide
        if (null === array_key_first($statistiques)) {
            return $statistiques;
        }

        // Création du tableau comparatif depuis les données récupérées et ajout a la liste des tableaux
        $comparisonArray = $statistiques[array_key_first($statistiques)];
        foreach ($comparisonArray['data'] as $lineIndex => $line) {
            $comparisonArray['data'][$lineIndex]['multiligne'] = count(EnumStatsDroitOptionType::getDatesCampagnes());
            $comparisonArray['data'][$lineIndex]['statistiques'] = [];
            foreach (EnumStatsDroitOptionType::getDatesCampagnes() as $dateCampagneKey => $dateCampagne) {
                $comparisonArray['data'][$lineIndex]['statistiques'][$dateCampagneKey] = $statistiques[$dateCampagneKey]['data'][$lineIndex]['statistiques'];
            }
        }
        $statistiques['comparison'] = $comparisonArray;

        return $statistiques;
    }

    public function statistiquesOrigineRecrutementCorpsMisEnExtinctionDroitOption(): array
    {
        $corpsOrigine = $this->corpsRepository->getLibellesCorpsByIdentifiantIngres(EnumStatsDroitOptionType::VALUES);
        $originesEntreeCorpsMisEnExtinction = array_values(EnumOrigineEntreeCorpsMisEnExtinctionType::VALUES);

        // Ajout du total des origines par corps
        $originesEntreeCorpsMisEnExtinctionHeader = $originesEntreeCorpsMisEnExtinction;
        $originesEntreeCorpsMisEnExtinctionHeader[] = 'Total';

        $statistiques = [
            'header' => $originesEntreeCorpsMisEnExtinctionHeader,
            'data' => []
        ];

        // Recuperation du tableau des Origines de recrutement dans le corps mis en extinction pour les agents
        // exercant le droit d'option

        // Initialisation de la ligne des totaux
        $statistiquesTotaux = array_fill(0, count($originesEntreeCorpsMisEnExtinction), 0);

        // Initialisation des données du graphique avec le header et le graph origine
        $chartCorpsData = [
            'origineHeader' => array_values($corpsOrigine),
            'origine' => [
                0 => ['backgroundColor' => '#357CA5'],
                1 => ['backgroundColor' => '#00A7D0'],
                2 => ['backgroundColor' => '#008D4C'],
                3 => ['backgroundColor' => '#DB8B0B'],
                4 => ['backgroundColor' => '#D33724'],
                5 => ['backgroundColor' => '#001F3F'],
                6 => ['backgroundColor' => '#555299'],
                7 => ['backgroundColor' => '#CA195A'],
                8 => ['backgroundColor' => '#6e502f'],
                9 => ['backgroundColor' => '#cb227c'],
                10 => ['backgroundColor' => '#b8c04d'],
                11 => ['backgroundColor' => '#a19350'],
                12 => ['backgroundColor' => '#e0a1a8'],
                13 => ['backgroundColor' => '#236e6f'],
                14 => ['backgroundColor' => '#3b7c5c'],
                15 => ['backgroundColor' => '#67b0d5'],
                16 => ['backgroundColor' => '#555555'],
            ],
            'totalHeader' => $originesEntreeCorpsMisEnExtinction
        ];
        // Initialisation des données du graphique total avec les couleurs définis ci-dessus
        $chartCorpsData['total'][0] = [
            'label' => 'Effectif', 'backgroundColor' => array_column($chartCorpsData['origine'], 'backgroundColor'), 'hoverOffset' => 4
        ];

        $corpsIndex = 0;
        foreach ($corpsOrigine as $corpsId => $corps) {

            $statistiquesCorps = [];
            $statistiqueCorpsTotal = 0;
            foreach ($originesEntreeCorpsMisEnExtinction as $index => $origineEntreeCorps) {
                // Calcul des statistiques du corps
                $statistiquesCorps[$index] = $this->agentRepository->countAgentsDroitOptionParOrigineEntreeCorpsMisEnExtinction(
                    $corpsId,
                    $origineEntreeCorps
                );

                // Ajout des données pour la génération du graphique par origine de recrutement
                $chartCorpsData['origine'][$index]['label'] = $origineEntreeCorps;
                $chartCorpsData['origine'][$index]['data'][$corpsIndex] = $statistiquesCorps[$index];

                // Calcul progressif des totaux
                $statistiquesTotaux[$index] += $statistiquesCorps[$index];
                $statistiqueCorpsTotal += $statistiquesCorps[$index];
            }
            // Ajout du total des origines par corps
            $statistiquesCorps[] = $statistiqueCorpsTotal;

            $statistiques['data'][] = ['corps' => $corps, 'statistiques' => $statistiquesCorps];
            $corpsIndex++;
        }

        // Calcul du grand total
        $grandTotal = array_sum($statistiquesTotaux);

        // Calcul du grand total et ajout de la ligne des totaux par origine
        $statistiquesTotauxTableau = $statistiquesTotaux;
        $statistiquesTotauxTableau[] = $grandTotal;
        $statistiques['data'][] = ['corps' => 'TOTAL', 'statistiques' => $statistiquesTotauxTableau];

        // Ajout des données et des pourcentage pour le graphique des totaux
        $chartCorpsData['total'][0]['data'] = $statistiquesTotaux;

        foreach ($chartCorpsData['total'][0]['data'] as $index => $valeur) {
            $percentage = self::pourcentage($valeur, $grandTotal);
            $chartCorpsData['totalHeader'][$index] .= ' (' . $percentage . ' %)';
        }

        // Ajout des données pour la génération du graphique totale
        $statistiques['chartData'] = $chartCorpsData;

        return $statistiques;
    }

    public function statistiquesTypeFonction()
    {
        $typesFonctions = $this->typeFonctionsOccupeesManager->getActifs();

        $statistiques = [];

        foreach ($typesFonctions as $typeFonction) {
            $statistiques[$typeFonction->getLibelle()] = $this->agentRepository->countAgentsByTypeFonctionsOccupees($this->ministere, $typeFonction);
        }

        return $statistiques;
    }

    public function statistiquesFonctionOccupee()
    {
        $fonctionsOccupees = $this->fonctionsOccupeesManager->getActifsWithTypesFonctions();

        $statistiques = [];

        /** @var FonctionsOccupees $fonctionOccupee */
        foreach ($fonctionsOccupees as $fonctionOccupee) {
            $statistiques[$fonctionOccupee->getLibelle()] = ['typeFonctionsOccupees' => $fonctionOccupee->getTypeFonctionsOccupees()->getLibelle(), 'effectif' => $this->agentRepository->countAgentsByFonctionsOccupees($this->ministere, $fonctionOccupee)];
        }

        return $statistiques;
    }

    private static function pourcentage($nb, $total): float
    {
        return $total > 0 ? round(100 * $nb / $total, self::PRECISION) : 0;
    }
}
