<?php

namespace App\Service;


use App\EnumTypes\EnumCiviliteType;
use App\EnumTypes\EnumIndicateurType;
use App\EnumTypes\EnumStatutCampagneType;
use App\EnumTypes\EnumTypeCampagneType;
use App\Util\Converter;
use App\Util\FileHelper;
use App\Util\Util;

class WordFileWriter
{
    private $tmpDir;
    private $templatesDir;
    private $avancementRepository;
    private $integrationRepository;
    private $titularisationRepository;
    private $ligneRepository;
    private $fileHelper;

    public function __construct(
        $tmpDir,
        $templatesDir,
        AvancementRepository $avancementRepository,
        IntegrationRepository $integrationRepository,
        TitularisationRepository $titularisationRepository,
        LigneRepository $ligneRepository,
        FileHelper $fileHelper
    ) {
        $this->tmpDir = $tmpDir;
        $this->templatesDir = $templatesDir.'Maquettes/';
        $this->avancementRepository = $avancementRepository;
        $this->integrationRepository = $integrationRepository;
        $this->titularisationRepository = $titularisationRepository;
        $this->ligneRepository = $ligneRepository;
        $this->fileHelper = $fileHelper;
    }

    public function generateCapiDocFilesForCampagne(Campagne $campagne, $randomDirName)
    {
        switch ($campagne->getTypeCampagne()) {
            case EnumTypeCampagneType::AVANCEMENT_HC:
                if ($this->isCampagneClosedFinished($campagne)) {
                    $this->createArretePromotion($campagne, $randomDirName);
                    $this->createArretePromotionExtrait($campagne, $randomDirName);
                }
                break;
            case EnumTypeCampagneType::AVANCEMENT_AG:
                if ($this->isCampagneClosedFinished($campagne)) {
                    $this->createArretePromotion($campagne, $randomDirName);
                    $this->createArretePromotionExtrait($campagne, $randomDirName);
                }
                break;
            case EnumTypeCampagneType::AVANCEMENT_ES:
                if ($this->isCampagneClosedFinished($campagne)) {
                    $this->createArretePromotion($campagne, $randomDirName);
                    $this->createArretePromotionExtrait($campagne, $randomDirName);
                }
                break;
            case EnumTypeCampagneType::INTEGRATION:
                if ($this->isCampagneClosedFinished($campagne)) {
                    $this->createDecretIntegration($campagne, $randomDirName);
                    $this->createDecretIntegrationExtrait($campagne, $randomDirName);
                }
                break;
            case EnumTypeCampagneType::DETACHEMENT:
                break;
            case EnumTypeCampagneType::DISPONIBILITE:
                break;
            case EnumTypeCampagneType::TITULARISATION:
                if ($this->isCampagneClosedFinished($campagne)) {
                    $this->createDecretTitularisation($campagne, $randomDirName);
                    $this->createDecretTitularisationExtrait($campagne, $randomDirName);
                }
                break;
            default:
                throw new \Exception('generateFilesForCampagne : Type de campagne non valide');
        }
    }

    private function isCampagneClosedFinished($campagne)
    {
        return in_array($campagne->getStatut(), [EnumStatutCampagneType::TERMINEE, EnumStatutCampagneType::CLOTUREE]);
    }

    private function createDecretIntegration(Campagne $campagne, $randomDirName = '', $dateDecret = null)
    {
        if (EnumTypeCampagneType::INTEGRATION != $campagne->getTypeCampagne()) {
            throw new \Exception('Appel au methode createDecretIntegration sur campagne (avec id = '.$campagne->getId().") n'est pas de type Integration");
        }

        $retenus = $this->integrationRepository->findLignesAcceptes($campagne);

        $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor($this->templatesDir.'AC_Maquette_decret_integration_sup2.docx');

        $listeAgentsStr = '';
        /* @var $agent Agent */
        foreach ($retenus as $agent) {
            $listeAgentsStr = $listeAgentsStr.'- '.ucfirst($agent->getCivilite()).' '.
                    strtoupper($agent->getNomUsage()).' '.
                    ucwords($agent->getPrenom()).
                    ', '.$agent->getCorpsOrigineIngres();

            if ($agent->getId() == $retenus[count($retenus) - 1]->getId()) {
                $listeAgentsStr = $listeAgentsStr.'.';
            } else {
                $listeAgentsStr = $listeAgentsStr.'<w:br/>';
            }
        }

        $templateProcessor->setValue('agentList', $listeAgentsStr);

        setlocale(LC_TIME, 'fr', 'fr_FR', 'fr_FR.ISO8859-1');
        $templateProcessor->setValue('dateDecret', $dateDecret);

        $targetDir = $this->tmpDir.$randomDirName.'/';
        $templateProcessor->saveAs($targetDir.'Decret_integration_'.$campagne->getAnneeReference().'.docx');
    }

    private function createDecretIntegrationExtrait(Campagne $campagne, $randomDirName, $dateDecret = null)
    {
        if (EnumTypeCampagneType::INTEGRATION != $campagne->getTypeCampagne()) {
            throw new \Exception('Appel au methode createDecretIntegrationExtrait sur campagne (avec id = '.$campagne->getId().") n'est pas de type Integration");
        }

        // Template processor instance creation
        $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor($this->templatesDir.'AC_Maquette_decret_integration_extrait.docx');

        // $retenus = $this->integrationRepository->findLignesRetenu($campagne);
        $retenus = $this->integrationRepository->findLignesAcceptes($campagne);

        if (count($retenus) > 2) {
            $listeAgentsStr = ' : <w:br/><w:br/>';
            /* @var $agent Agent */
            foreach ($retenus as $agent) {
                $listeAgentsStr = $listeAgentsStr.'- '.ucfirst($agent->getCivilite()).' '.strtoupper($agent->getNomUsage()).' '.ucwords($agent->getPrenom()).', '.$agent->getCorpsOrigineIngres();

                if ($agent->getId() == $retenus[count($retenus) - 1]->getId()) {
                    $listeAgentsStr = $listeAgentsStr.'.';
                } else {
                    $listeAgentsStr = $listeAgentsStr.'<w:br/>';
                }
            }
        } else {
            $listeAgentsStr = '';
            foreach ($retenus as $agent) {
                /* @var $agent Agent */
                $listeAgentsStr = ('' == $listeAgentsStr ? ', ' : $listeAgentsStr.', ').ucfirst($agent->getCivilite()).' '.
                        strtoupper($agent->getNomUsage()).' '.
                        ucwords($agent->getPrenom()).
                        ', '.$agent->getCorpsOrigineIngres();
            }
            $listeAgentsStr = $listeAgentsStr.'.';
        }

        $templateProcessor->setValue('agentList', $listeAgentsStr);
        $phrase = count($retenus) > 1 ? 'sont intégrés, sur leur demande' : 'est intégré, sur sa demande';
        $templateProcessor->setValue('phraseConjugee', $phrase);
        $templateProcessor->setValue('dateDecret', $dateDecret);

        $targetDir = $this->tmpDir.$randomDirName.'/';
        $templateProcessor->saveAs($targetDir.'Decret_integration_extrait_'.$campagne->getAnneeReference().'.docx');
    }

    private function createDecretTitularisationExtrait(Campagne $campagne, $randomDirName, $dateDecret = null)
    {
        if (EnumTypeCampagneType::TITULARISATION != $campagne->getTypeCampagne()) {
            throw new \Exception('Appel au methode createDecretTitularisation sur campagne (avec id = '.$campagne->getId().") n'est pas de type Titularisation");
        }

        // Template processor instance creation
        $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor($this->templatesDir.'AC_Maquette_decret_titularisation_tour_extrait.docx');

        // $retenus = $this->titularisationRepository->findLignesRetenu($campagne);
        $retenus = $this->titularisationRepository->findLignesAcceptes($campagne);

        $listeAgentsStr = '';
        foreach ($retenus as $agent) {
            /* @var $agent Agent */
            $civilite = $agent->getCivilite();
            $nomUsage = $agent->getNomUsage();
            $nomNaissance = $agent->getNomNaissance();
            $listeAgentsStr = ('' == $listeAgentsStr ? '' : $listeAgentsStr.',<w:br/>').ucfirst($agent->getCivilite()).' '.strtoupper($agent->getNomUsage()).' ';
            if (EnumCiviliteType::MADAME == $civilite && 0 == strcmp($nomUsage, $nomNaissance)) {
                // $listeAgentsStr = $listeAgentsStr . strtoupper($nomNaissance) . ' (' . strtoupper($nomUsage) . ')';
                $listeAgentsStr = $listeAgentsStr.' ('.strtoupper($nomUsage).') '.ucwords($agent->getPrenom());
            } else {
                $listeAgentsStr = $listeAgentsStr.ucwords($agent->getPrenom());
            }
        }
        $listeAgentsStr = $listeAgentsStr.'.';

        $templateProcessor->setValue('agentList', $listeAgentsStr);
        $templateProcessor->setValue('currentYear', date('Y'));

        $targetDir = $this->tmpDir.$randomDirName.'/';
        $templateProcessor->saveAs($targetDir.'Decret_titularisation_extrait_'.$campagne->getAnneeReference().'.docx');
    }

    private function createDecretTitularisation(Campagne $campagne, $randomDirName, $currentYear = null)
    {
        if (EnumTypeCampagneType::TITULARISATION != $campagne->getTypeCampagne()) {
            throw new \Exception('Appel au methode createDecretTitularisation sur campagne (avec id = '.$campagne->getId().") n'est pas de type Titularisation");
        }

        // Template processor instance creation
        $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor($this->templatesDir.'AC_Maquette_decret_titularisation_tour.docx');

        $retenus = $this->titularisationRepository->findLignesAcceptes($campagne);

        $listeAgentsStr = '';

        foreach ($retenus as $agent) {
            /* @var $agent Agent */
            $civilite = $agent->getCivilite();
            $nomUsage = $agent->getNomUsage();
            $nomNaissance = $agent->getNomNaissance();
            $listeAgentsStr = ('' == $listeAgentsStr ? '' : $listeAgentsStr.',<w:br/>').ucfirst($agent->getCivilite()).' '.strtoupper($agent->getNomUsage()).' ';
            if (EnumCiviliteType::MADAME == $civilite && 0 == strcmp($nomUsage, $nomNaissance)) {
                // $listeAgentsStr = $listeAgentsStr . strtoupper($nomNaissance) . ' (' . strtoupper($nomUsage) . ')';
                $listeAgentsStr = $listeAgentsStr.' ('.ucwords($nomUsage).')'.ucwords($agent->getPrenom());
            } else {
                $listeAgentsStr = $listeAgentsStr.ucwords($agent->getPrenom());
            }
        }
        $listeAgentsStr = $listeAgentsStr.'.';

        setlocale(LC_TIME, 'fr', 'fr_FR', 'fr_FR.ISO8859-1');

        $templateProcessor->setValue('agentList', $listeAgentsStr);
        $templateProcessor->setValue('anneeRef', $campagne->getAnneeReference());

        $targetDir = $this->tmpDir.$randomDirName.'/';
        $templateProcessor->saveAs($targetDir.'Decret_titularisation_'.$campagne->getAnneeReference().'.docx');
    }

    private function createArretePromotion(Campagne $campagne, $randomDirName)
    {
        if (!in_array($campagne->getTypeCampagne(), ['avancement ag', 'avancement es', 'avancement hc'])) {
            throw new \Exception('La Campagne (avec id = '.$campagne->getId().") n'est pas de type Avancement");
        }

        // Template processor instance creation
        $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor($this->templatesDir.'Arrete_promotion_'.$campagne->getTypeCampagne().'.docx');

        $retenus = $this->avancementRepository->findLignesRetenu($campagne);

        $templateProcessor->cloneRow('ministere', count($retenus));
        // $templateProcessor->cloneRow('agent', count($retenus));
        $i = 1;
        foreach ($retenus as $ligneAgent) {
            /* @var $ligneAgent Agent */
            $templateProcessor->setValue('civilite#'.$i, ucfirst($ligneAgent->getCivilite()));
            $templateProcessor->setValue('nomAgent#'.$i, mb_convert_case($ligneAgent->getNomUsage(), MB_CASE_UPPER, 'UTF-8'));
            $templateProcessor->setValue('prenomAgent#'.$i, mb_convert_case($ligneAgent->getPrenom(), MB_CASE_TITLE, 'UTF-8'));
            $agent = mb_convert_case($ligneAgent->getNomUsage(), MB_CASE_UPPER, 'UTF-8').' '.mb_convert_case($ligneAgent->getPrenom(), MB_CASE_TITLE, 'UTF-8');
            $templateProcessor->setValue('agent#'.$i, $agent);
            $templateProcessor->setValue('ministere#'.$i, $ligneAgent->getAgent()->getMinistereRattachement()->getLibelleOfficiel());
            ++$i;
        }

        setlocale(LC_TIME, 'fr', 'fr_FR', 'fr_FR.ISO8859-1');

        $templateProcessor->setValue('anneeRef', $campagne->getAnneeReference());

        $targetDir = $this->tmpDir.$randomDirName.'/';

        $fileName = 'Arrete_'.Converter::convertStringToCanonical($campagne->getTypeCampagneImpression()).'_'.$campagne->getAnneeReference().'.docx';
        $templateProcessor->saveAs($targetDir.$fileName);
    }

    private function createArretePromotionExtrait(Campagne $campagne, $randomDirName)
    {
        if (!in_array($campagne->getTypeCampagne(), [EnumTypeCampagneType::AVANCEMENT_AG, EnumTypeCampagneType::AVANCEMENT_HC, EnumTypeCampagneType::AVANCEMENT_ES])) {
            throw new \Exception('createArretePromotionExtrait : la Campagne (avec id = '.$campagne->getId().") n'est pas de type Avancement");
        }

        // Template processor instance creation
        $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor($this->templatesDir.'Arrete_promotion_extrait_'.$campagne->getTypeCampagne().'.docx');

        $retenus = $this->avancementRepository->findLignesRetenu($campagne);

        $templateProcessor->cloneRow('ministere', count($retenus));

        $i = 1;
        foreach ($retenus as $ligneAgent) {
            /* @var $ligneAgent Agent */
            $templateProcessor->setValue('civilite#'.$i, ucfirst($ligneAgent->getCivilite()));
            $templateProcessor->setValue('nomAgent#'.$i, mb_convert_case($ligneAgent->getNomUsage(), MB_CASE_UPPER, 'UTF-8'));
            $templateProcessor->setValue('prenomAgent#'.$i, mb_convert_case($ligneAgent->getPrenom(), MB_CASE_TITLE, 'UTF-8'));
            $agent = mb_convert_case($ligneAgent->getNomUsage(), MB_CASE_UPPER, 'UTF-8').' '.mb_convert_case($ligneAgent->getPrenom(), MB_CASE_TITLE, 'UTF-8');
            $templateProcessor->setValue('agent#'.$i, $agent);
            $templateProcessor->setValue('ministere#'.$i, $ligneAgent->getAgent()->getMinistereRattachement()->getLibelleOfficiel());
            ++$i;
        }

        setlocale(LC_TIME, 'fr', 'fr_FR', 'fr_FR.ISO8859-1');

        $templateProcessor->setValue('anneeRef', $campagne->getAnneeReference());

        $targetDir = $this->tmpDir.$randomDirName.'/';

        $fileName = 'Arrete_Extrait_'.Converter::convertStringToCanonical($campagne->getTypeCampagneImpression()).'_'.$campagne->getAnneeReference().'.docx';
        $templateProcessor->saveAs($targetDir.$fileName);
    }

    public function genererFicheProposition(Agent $agent)
    {
        return $this->genererFiche($agent, 'proposition');
    }

    public function genererFicheIntegration(Agent $agent)
    {
        return $this->genererFiche($agent, 'integration');
    }

    private function genererFiche(Agent $agent, $typeFiche)
    {
        $typeCampagne = 'hc';

        switch ($agent->getGrade()) {
            case EnumIndicateurType::ADMINISTRATEUR:
                $typeCampagne = 'hc';
                break;
            case EnumIndicateurType::HORS_CLASSE:
                $typeCampagne = 'ag';
                break;
        }

        switch ($typeFiche) {
            case 'proposition':
                $fileNamePrefix = 'Fiche_proposition_';
                $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor($this->templatesDir.'Modele_de_fiche_proposition_avancement '.$typeCampagne.'.docx');
                break;
            case 'integration':
                $fileNamePrefix = 'Fiche_integration_';
                $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor($this->templatesDir.'AC_Modele_fiche_renseignement_integration.docx');
                break;
            default:
                throw new \Exception("WordFileWriter.genererFiche : type de fiche '".$typeFiche."' non valide");
        }

        $anneeReference = date('Y');

        $templateProcessor->setValue('matricule', $agent->getMatricule());
        $templateProcessor->setValue('ministere', $agent->getMinistereRattachement());
        $templateProcessor->setValue('civilite', ucfirst($agent->getCivilite()));
        $templateProcessor->setValue('nomUsage', mb_convert_case($agent->getNomUsage(), MB_CASE_UPPER, 'UTF-8'));
        $templateProcessor->setValue('nomNaissance', mb_convert_case($agent->getNomNaissance(), MB_CASE_UPPER, 'UTF-8'));
        $templateProcessor->setValue('dateNaissance', $agent->getDateNaissance()->format('d/m/Y'));
        $templateProcessor->setValue('prenom', mb_convert_case($agent->getPrenom(), MB_CASE_TITLE, 'UTF-8'));
        $templateProcessor->setValue('anneeReference', $anneeReference);
        $templateProcessor->setValue('anneeReference-1', $anneeReference - 1);
        $templateProcessor->setValue('position', utf8_decode($agent->getPosition()));
        $templateProcessor->setValue('origineRecrutement', $agent->getOrigineRecrutement());
        $templateProcessor->setValue('fonctionsActuelles', utf8_decode($agent->getFonctionsOccupees()));
        $templateProcessor->setValue('echelon', $agent->getEchelon());
        $templateProcessor->setValue('age', Util::age($agent->getDateNaissance(), $anneeReference, 1, 1)); // age au AAAA/01/01
        $templateProcessor->setValue('ancienneteEchelon', Util::age($agent->getDateEntreeEchelon(), $anneeReference, 1, 1)); // ancienneté au AAAA/01/01
        $templateProcessor->setValue('gradeOrigine', utf8_decode($agent->getGradeOrigineIngres()));
        $templateProcessor->setValue('corpsOrigine', utf8_decode($agent->getCorpsOrigineIngres()));
        $templateProcessor->setValue('dateDebutMobilite', Util::formatDate($agent->getDateDebutMobilite()));
        $templateProcessor->setValue('dateFinMobilite', Util::formatDate($agent->getDateFinMobilite()));
        $templateProcessor->setValue('typeMobilite', utf8_decode($agent->getMobilite()));

        if (null !== $agent->getDateEntreeCorpsAC()) {
            $templateProcessor->setValue('dateEntreeCorpsAC', $agent->getDateEntreeCorpsAC()->format('d/m/Y'));
        }

        $templateProcessor->setValue('dateEntreeGrade', $agent->getDateEntreeGrade()->format('d/m/Y'));

        if ('proposition' == $typeFiche) {
            $templateProcessor->setValue('dateEntreeEchelon', $agent->getDateEntreeEchelon()->format('d/m/Y'));
        }

        $nomUsage = strtoupper(Converter::convertStringToCanonical($agent->getNomUsage()));
        $prenom = ucfirst(Converter::convertStringToCanonical($agent->getPrenom()));
        $dateNaissance = $agent->getDateNaissance()->format('Y-m-d');

        $fileName = $fileNamePrefix.$nomUsage.'_'.$prenom.'_'.$dateNaissance.'.docx';

        $filePath = $this->tmpDir.date('Ymdhis').$fileName;
        // Save the file in tmp dir
        $templateProcessor->saveAs($filePath);
        // We serve the file as response

        return $this->fileHelper->serveFileAsStream($filePath, $fileName);
    }

    /**
     * Génère une fiche d'intégration à partir d'une ligne Integration sur la base d'un modèle.
     */
    public function genererFicheLigneIntegration(Integration $ligneIntegration)
    {
        $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor($this->templatesDir.'AC_Modele_fiche_renseignement_integration.docx');

        $anneeReference = date('Y');

        $templateProcessor->setValue('matricule', $ligneIntegration->getMatricule());
        $templateProcessor->setValue('ministere', $ligneIntegration->getListeAlimentation()->getMinistere()->getLibelleCourt());
        $templateProcessor->setValue('civilite', ucfirst($ligneIntegration->getCivilite()));
        $templateProcessor->setValue('nomUsage', mb_convert_case($ligneIntegration->getNomUsage(), MB_CASE_UPPER, 'UTF-8'));
        $templateProcessor->setValue('nomNaissance', mb_convert_case($ligneIntegration->getNomNaissance(), MB_CASE_UPPER, 'UTF-8'));
        $templateProcessor->setValue('dateNaissance', Util::formatDate($ligneIntegration->getDateNaissance()));
        $templateProcessor->setValue('prenom', mb_convert_case($ligneIntegration->getPrenom(), MB_CASE_TITLE, 'UTF-8'));
        $templateProcessor->setValue('anneeReference', $anneeReference);
        $templateProcessor->setValue('anneeReference-1', $anneeReference - 1);
        $templateProcessor->setValue('position', utf8_decode($ligneIntegration->getPosition()));
        $templateProcessor->setValue('origineRecrutement', $ligneIntegration->getOrigineRecrutement());
        $templateProcessor->setValue('fonctionsActuelles', utf8_decode($ligneIntegration->getFonctionsOccupees()));
        $templateProcessor->setValue('echelon', $ligneIntegration->getEchelon());
        $templateProcessor->setValue('age', Util::age($ligneIntegration->getDateNaissance(), $anneeReference, 1, 1)); // age au AAAA/01/01
        $templateProcessor->setValue('ancienneteEchelon', Util::age($ligneIntegration->getDateEntreeEchelon(), $anneeReference, 1, 1)); // ancienneté au AAAA/01/01
        $templateProcessor->setValue('gradeOrigine', utf8_decode($ligneIntegration->getGradeOrigineIngres()));
        $templateProcessor->setValue('corpsOrigine', utf8_decode($ligneIntegration->getCorpsOrigineIngres()));
        $templateProcessor->setValue('dateDebutMobilite', Util::formatDate($ligneIntegration->getDateDebutMobilite()));
        $templateProcessor->setValue('dateFinMobilite', Util::formatDate($ligneIntegration->getDateFinMobilite()));
        $templateProcessor->setValue('typeMobilite', utf8_decode($ligneIntegration->getMobilite()));
        $templateProcessor->setValue('dateEntreeCorpsAC', Util::formatDate($ligneIntegration->getDateEntreeCorpsAC()));
        $templateProcessor->setValue('dateEntreeGrade', Util::formatDate($ligneIntegration->getDateEntreeGrade()));

        $nomUsage = strtoupper(Converter::convertStringToCanonical($ligneIntegration->getNomUsage()));
        $prenom = ucfirst(Converter::convertStringToCanonical($ligneIntegration->getPrenom()));
        $dateNaissance = $ligneIntegration->getDateNaissance()->format('Y-m-d');

        $fileName = 'Fiche_integration_'.$nomUsage.'_'.$prenom.'_'.$dateNaissance.'.docx';

        $filePath = $this->tmpDir.date('Ymdhis').$fileName;
        // Save the file in tmp dir
        $templateProcessor->saveAs($filePath);
        // We serve the file as response

        return $this->fileHelper->serveFileAsStream($filePath, $fileName);
    }
}
