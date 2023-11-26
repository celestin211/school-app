<?php

declare(strict_types=1);

namespace App\Manager;

use App\Entity\Cours;
use App\Entity\Contact;
use App\EnumTypes\EnumStatut;
use App\Repository\CoursRepository;
use App\Service\DocumentManager;
use App\Service\Mailer;
use App\Util\Util;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\PersistentCollection;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Twig\Environment;

class CoursManager
{
    /* @var $repository CoursRepository */
    protected $repository;
    /**
     * @var Mailer
     */
    protected $mailer;
    protected $templating;
    protected $security;
    protected RequestStack $requestStack;
    protected $documentManager;

    /* @var $em EntityManagerInterface */
    protected $em;

    public function __construct(
        Mailer $mailer,
        Environment $templating,
        EntityManagerInterface $em,
        DocumentManager $documentManager,
        Security $security,
        RequestStack $requestStack
    ) {
        $this->em = $em;
        $this->mailer = $mailer;
        $this->repository = $this->em->getRepository(Cours::class);
        $this->templating = $templating;
        $this->documentManager = $documentManager;
        $this->security = $security;
        $this->requestStack = $requestStack;
    }

    public function creer(Cours $arrete)
    {
        $utilisateur = $this->security->getUser();

        /* @var Cours $arrete */
        //Set les données de l'arrete
        $arrete->setStatut(EnumStatut::CREE);

        if ($arrete->isTypeOuverture()) {
            $arrete->setNumNorReference($arrete->getNumNor());
        }

        if ($this->security->getToken() && $this->security->isGranted('ROLE_PROFESSEUR')) {
            $arrete->setStatut(EnumStatut::TRANSMIS_PROFESSEUR);
            $arrete->setDateTransmission(new \DateTime());
            $arrete->setTransmisPar($utilisateur);
        }

        // Suppression des documents à supprimper
        /* @var \App\Entity\Document $document */
        foreach ($arrete->getDocuments() as $document) {
            if ($document->isToDelete()) {
                $arrete->removeDocument($document);
            }
        }
        // Ajout des nouveaux documents
        if ($arrete->getNewDocuments()) {
            foreach ($arrete->getNewDocuments() as $document) {
                $arrete->addDocument($document);
            }
        }

        $this->em->persist($arrete);

        $this->em->flush();
    }

    /*
     * Modifie un arreté depuis le Back Office
     *
     */
    public function sauvegarderModification(Cours $arrete, $documentsASupprimer)
    {
        $this->em->getConnection()->beginTransaction();
        try {
            //Gestion documents
            foreach ($documentsASupprimer as $documentASupprimer) {
                $this->documentManager->delete($documentASupprimer);
                $this->documentManager->persistDocument($documentASupprimer);
            }

            //Sauvegarde Documents
            $this->em->flush();

            //Sauvegarde Cours
            $this->em->persist($arrete);
            $this->em->flush();

            $this->em->getConnection()->commit();
        } catch (\Exception $e) {
            $this->em->getConnection()->rollBack();
            throw $e;
        }
    }

    public function delete(Cours $arrete)
    {
        $this->em->remove($arrete);

        $this->em->flush();
    }

    public function getHistorique(Cours $arrete)
    {
        /* @var CoursRepository $repository */
        $repository = $this->em->getRepository(Cours::class);
        $roleUserConnecte = $this->security->getUser()->getRoles();
        $historique = $repository->getHistorique($arrete, $roleUserConnecte[0]);
        $historiqueActions = [];

        /* @var Cours $arrete */
        foreach ($historique as $cours) {
            if ($cours->getDateCreation()) {
                array_push($historiqueActions, ['statut' => EnumStatut::CREE, 'date' => $cours->getDateCreation(), 'par' => $cours->getCreePar(), 'arrete' => $cours]);
            }

            if ($cours->getDateTransmission()) {
                array_push($historiqueActions, ['statut' => EnumStatut::TRANSMIS_PROFESSEUR, 'date' => $cours->getDateTransmission(), 'par' => $cours->getTransmisPar(), 'arrete' => $cours]);
            }

            if ($cours->getDateAccuseReception()) {
                array_push($historiqueActions, ['statut' => EnumStatut::ACCUSE_RECEPTION, 'date' => $cours->getDateAccuseReception(), 'par' => $cours->getAccusePar(), 'arrete' => $cours]);
            }

            if ($cours->getDateValidation()) {
                array_push($historiqueActions, ['statut' => EnumStatut::VALIDE, 'date' => $cours->getDateValidation(), 'par' => $cours->getValidePar(), 'arrete' => $cours]);
            }

            if ($cours->getDateValidationTacite()) {
                array_push($historiqueActions, ['statut' => EnumStatut::VALIDE_T, 'date' => $cours->getDateValidationTacite(), 'par' => null, 'arrete' => $cours]);
            }

            if ($cours->getDateRejet()) {
                array_push($historiqueActions, ['statut' => EnumStatut::REJETE, 'date' => $cours->getDateRejet(), 'par' => $cours->getRejetePar(), 'arrete' => $cours]);
            }

            if ($cours->getDateRetraitAvisConforme()) {
                array_push($historiqueActions, ['statut' => EnumStatut::AVIS_CONFORME_ANNULE, 'date' => $cours->getDateRetraitAvisConforme(), 'par' => $cours->getRetraitAvisConformePar(), 'arrete' => $cours]);
            }
        }

        // Colonnes de tri
        $date = array_column($historiqueActions, 'date');
        $statut = array_column($historiqueActions, 'statut');

        //trie sur la colonne date
        array_multisort($date, SORT_DESC, $statut, SORT_DESC, $historiqueActions);

        return $historiqueActions;
    }

    public function arreteIsDerniereVersionValide(Cours $cours)
    {
        /* @var CoursRepository $repository */
        $repository = $this->em->getRepository(Cours::class);

        /* @var Cours $coursIsDerniereVersion */
        $coursIsDerniereVersion = $repository->findDerniereVersionValideOuNull($cours);

        if (!$coursIsDerniereVersion) {
            return false;
        }

        return $coursIsDerniereVersion->getId() === $cours->getId();
    }

    public function isDerniereVersionConcoursSaisie($cours)
    {
        $derniereVersionCoursSaisie = $this->em->getRepository(Cours::class)->findDerniereVersionConcoursSaisie($cours);

        return null === $derniereVersionCoursSaisie || $derniereVersionCoursSaisie->getId() === $cours->getId();
    }

    public function creerFromArrete(Cours $cours)
    {
        //-------------------------------------------
        //On prealimente les données du nouvel arreté
        //-------------------------------------------
        $newCours = new Cours();

        $newCours->setTypeOuverture(false);

        //Référence
        //---------
        if ($cours->getCoursReference()) {
            $newCours->setCoursReference($cours->getCoursReference());
        } else {
            $newCours->setCoursReference($cours);
        }

        $newCours->setNumNorReference($newCours->getCoursReference()->getNumNor());

        $newCours->setTypePostes($cours->isTypePostes());
        $newCours->setDirection($cours->getDirection());
        $newCours->setCorps($cours->getCorps());
        $newCours->setGrade($cours->getGrade());
        $newCours->setCategorie(($cours->getCategorie()));
        $newCours->setAnneeConcours($cours->getAnneeConcours());

        // La date de Visa CBCM ne doit pas être reprise
        if ($cours->isTypePostes()) {
            $newCours->setDateVisaControleFinancier($cours->getDateVisaControleFinancier());
        }

        //Lieux & Dates
        //-------------
        $newCours->setLieuConcours($cours->getLieuConcours());
        $newCours->setDateOuverture($cours->getDateOuverture());
        $newCours->setDateRetraitDossiers($cours->getDateRetraitDossiers());
        $newCours->setDateClotureInscriptionsCourrier($cours->getDateClotureInscriptionsCourrier());
        $newCours->setDateClotureInscriptionsWeb($cours->getDateClotureInscriptionsWeb());
        $newCours->setDatePremiereEpreuve($cours->getDatePremiereEpreuve());

        //Modalités
        //---------
        $modalite = new Modalite();
        $modalite->setCommun($cours->getModalite()->isCommun());
        $modalite->setNational($cours->getModalite()->isNational());
        $modalite->setNationalAffectationLocale($cours->getModalite()->isNationalAffectationLocale());
        $modalite->setDeconcentre($cours->getModalite()->isDeconcentre());
        $modalite->setSurTitres($cours->getModalite()->isSurTitres());
        $modalite->setSpecialiteEmploiType($cours->getModalite()->isSpecialiteEmploiType());
        $modalite->setAutres($cours->getModalite()->isAutres());
        $modalite->setAutresModalites($cours->getModalite()->getAutresModalites());
        $newCours->setModalite($modalite);

        //Voies d'accès Droit
        //-------------------
        $voieAccesDroitCommun = new VoieAccesNbPostesDroitCommun();
        $voieAccesDroitCommun->setExterne($cours->getVoieAccesNbPostesDroitCommun()->getExterne());
        $voieAccesDroitCommun->setNbExterne($cours->getVoieAccesNbPostesDroitCommun()->getNbExterne());
        $voieAccesDroitCommun->setInterne($cours->getVoieAccesNbPostesDroitCommun()->getInterne());
        $voieAccesDroitCommun->setNbInterne($cours->getVoieAccesNbPostesDroitCommun()->getNbInterne());
        $voieAccesDroitCommun->setTroisiemeConcours($cours->getVoieAccesNbPostesDroitCommun()->getTroisiemeConcours());
        $voieAccesDroitCommun->setNbTroisiemeConcours($cours->getVoieAccesNbPostesDroitCommun()->getNbTroisiemeConcours());
        $voieAccesDroitCommun->setUnik($cours->getVoieAccesNbPostesDroitCommun()->getUnik());
        $voieAccesDroitCommun->setNbUnik($cours->getVoieAccesNbPostesDroitCommun()->getNbUnik());
        $voieAccesDroitCommun->setExapro($cours->getVoieAccesNbPostesDroitCommun()->getExapro());
        $voieAccesDroitCommun->setNbExapro($cours->getVoieAccesNbPostesDroitCommun()->getNbExapro());
        $voieAccesDroitCommun->setSansConcoursExterne($cours->getVoieAccesNbPostesDroitCommun()->getSansConcoursExterne());
        $voieAccesDroitCommun->setNbSansConcoursExterne($cours->getVoieAccesNbPostesDroitCommun()->getNbSansConcoursExterne());
        $voieAccesDroitCommun->setPacte($cours->getVoieAccesNbPostesDroitCommun()->getPacte());
        $voieAccesDroitCommun->setNbPacte($cours->getVoieAccesNbPostesDroitCommun()->getNbPacte());
        $voieAccesDroitCommun->setSelectionProfessionnelle($cours->getVoieAccesNbPostesDroitCommun()->getSelectionProfessionnelle());
        $voieAccesDroitCommun->setNbSelectionProfessionnelle($cours->getVoieAccesNbPostesDroitCommun()->getNbSelectionProfessionnelle());
        $voieAccesDroitCommun->setConcoursSpecial($cours->getVoieAccesNbPostesDroitCommun()->getConcoursSpecial());
        $voieAccesDroitCommun->setNbConcoursSpecial($cours->getVoieAccesNbPostesDroitCommun()->getNbConcoursSpecial());
        $voieAccesDroitCommun->setNatureConcours($cours->getVoieAccesNbPostesDroitCommun()->getNatureConcours());
        $newCours->setVoieAccesNbPostesDroitCommun($voieAccesDroitCommun);

        //Voies d 'accès Autres
        //---------------------
        $voieAccesAutreInterneExterne = new VoieAccesNbPostesAutreModeIntExt();
        $voieAccesAutreInterneExterne->setAutres($cours->getVoieAccesNbPostesAutreModeIntExt()->getAutres());
        $voieAccesAutreInterneExterne->setNbAutres($cours->getVoieAccesNbPostesAutreModeIntExt()->getNbAutres());
        $voieAccesAutreInterneExterne->setNatureConcours($cours->getVoieAccesNbPostesAutreModeIntExt()->getNatureConcours());
        $voieAccesAutreInterneExterne->setConcoursReserve($cours->getVoieAccesNbPostesAutreModeIntExt()->getConcoursReserve());
        $voieAccesAutreInterneExterne->setNbConcoursReserve($cours->getVoieAccesNbPostesAutreModeIntExt()->getNbConcoursReserve());
        $voieAccesAutreInterneExterne->setSansConcoursInterneReserve($cours->getVoieAccesNbPostesAutreModeIntExt()->getSansConcoursInterneReserve());
        $voieAccesAutreInterneExterne->setNbSansConcoursInterneReserve($cours->getVoieAccesNbPostesAutreModeIntExt()->getNbSansConcoursInterneReserve());
        $voieAccesAutreInterneExterne->setExamenProReserve($cours->getVoieAccesNbPostesAutreModeIntExt()->getExamenProReserve());
        $voieAccesAutreInterneExterne->setNbExamenProReserve($cours->getVoieAccesNbPostesAutreModeIntExt()->getNbExamenProReserve());
        $voieAccesAutreInterneExterne->setInterneExcept($cours->getVoieAccesNbPostesAutreModeIntExt()->getInterneExcept());
        $voieAccesAutreInterneExterne->setNbInterneExcept($cours->getVoieAccesNbPostesAutreModeIntExt()->getNbInterneExcept());
        $newCours->setVoieAccesNbPostesAutreModeIntExt($voieAccesAutreInterneExterne);

        //NbPostes
        //--------
        $newCours->setNbPostesTH($cours->getNbPostesTH());
        $newCours->setNbPostesACVG($cours->getNbPostesACVG());

        //Commun : Répartition NbPostes
        //-----------------------------
        //Vide la collection au cas où
        $newCours->clearNbPostesVentiles();
        $allNbPostesVentiles = $cours->getNbPostesVentiles();

        /* @var $allNbPostesVentile NbPostesVentile */
        foreach ($allNbPostesVentiles as $allNbPostesVentile) {
            //ajoute une collection pour le ministère porteur
            $nbpostesVentileMinistere = new NbPostesVentile();

            $nbpostesVentileMinistere->setMinistere($allNbPostesVentile->getMinistere());
            $nbpostesVentileMinistere->setCorps($allNbPostesVentile->getCorps());
            $nbpostesVentileMinistere->setNbExterne($allNbPostesVentile->getNbExterne());
            $nbpostesVentileMinistere->setNbInterne($allNbPostesVentile->getNbInterne());
            $nbpostesVentileMinistere->setNbTroisiemeConcours($allNbPostesVentile->getNbTroisiemeConcours());
            $nbpostesVentileMinistere->setNbUnik($allNbPostesVentile->getNbUnik());
            $nbpostesVentileMinistere->setNbExapro($allNbPostesVentile->getNbExapro());
            $nbpostesVentileMinistere->setNbSansConcoursExterne($allNbPostesVentile->getNbSansConcoursExterne());
            $nbpostesVentileMinistere->setNbPacte($allNbPostesVentile->getNbPacte());
            $nbpostesVentileMinistere->setNbConcoursSpecial($allNbPostesVentile->getNbConcoursSpecial());
            $nbpostesVentileMinistere->setNbAutres($allNbPostesVentile->getNbAutres());
            $nbpostesVentileMinistere->setNbConcoursReserve($allNbPostesVentile->getNbConcoursReserve());
            $nbpostesVentileMinistere->setNbSansConcoursInterneReserve($allNbPostesVentile->getNbSansConcoursInterneReserve());
            $nbpostesVentileMinistere->setNbExamenProReserve($allNbPostesVentile->getNbExamenProReserve());
            $nbpostesVentileMinistere->setNbInterneExcept($allNbPostesVentile->getNbInterneExcept());
            $nbpostesVentileMinistere->setNbPostesACVG($allNbPostesVentile->getNbPostesACVG());
            $nbpostesVentileMinistere->setNbPostesTH($allNbPostesVentile->getNbPostesTH());
            // La date de Visa CBCM ne doit pas être reprise
//            $nbpostesVentileMinistere->setDateVisaControleFinancier($allNbPostesVentile->getDateVisaControleFinancier());

            $newCours->addNbPostesVentile($nbpostesVentileMinistere);
        }

        $newCours->setCommentaire($cours->getCommentaire());

        // Les contacts ne doivents pas être repris
        $utilisateur = $this->security->getUser();
        if ($utilisateur->hasRole('ROLE_CORRESP_MIN')) {
            $contact = (new Contact())
                ->setNom(Util::identite($utilisateur))
                ->setEmail($utilisateur->getEmail());
            $newCours->addContact($contact);
        }

        foreach ($cours->getDocuments() as $document) {
            $nouveauDocument = clone $document;
            $newCours->addDocument($nouveauDocument);
        }

        if ($cours->isTypePostes() && $cours->getDocumentAnnexeFinanciere()) {
            $annexeFinanciere = clone $cours->getDocumentAnnexeFinanciere();
            $newCours->setDocumentAnnexeFinanciere($annexeFinanciere);
        }

        return $newCours;
    }

    public function getCourssByStatut($statut)
    {
        return $this->em->getRepository(Cours::class)->getCourssByStatut($statut);
    }

    public function exportBrutFromSearchResult($parameters)
    {
        $utilisteur = $this->security->getUser();

        $isDgafp = false;

        if ($utilisteur->hasRole('ROLE_ADMIN_DGAFP') || $utilisteur->hasRole('ROLE_CONSULT_DGAFP')) {
            $isDgafp = true;
        }

        $ministere = $this->getRestrictionDirections();

        /* @var CoursRepository $coursRepository */
        $coursRepository = $this->em->getRepository(Cours::class);
        $query = $coursRepository->initQueryBuilder($parameters, $ministere, $isDgafp)
            ->getQuery();

        $iterableResult = $query->iterate();

        $response = new StreamedResponse();
        $response->setCallback(function () use ($iterableResult) {
            $handle = fopen('php://output', 'w+');
            // UTF-8 BOM pour qu'il soit correctement lisible par Excel
            fputs($handle, "\xEF\xBB\xBF");

            // Nom des colonnes du CSV
            fputcsv($handle, ['N° NOR',
                'N° NOR de référence',
                'Ministère',
                'Ministère (saisie initiale)',
                'Catégorie',
                'Corps',
                'Grade',
                'Corps/Grade (saisie initiale)',
                'Direction/Établissement',
                'Année de référence',
                'Statut',
                'Date de première épreuve',
                'National',
                'National à affectation locale',
                'Déconcentré',
                'Externe',
                'Interne',
                'Troisieme Concours',
                'Unique',
                'Examen professionnel',
                'Sans concours externe',
                'Pacte',
                'Sélection professionnelle',
                'Concours spécial',
                'Concours réservé',
                'Sans concours interne réservé',
                'Examen professionnalisé réservé',
                'Interne exceptionnel',
                'Apprenti BOETH',
                'Promotion BOETH',
                'Autres',
                'Nb postes ACVG',
                'Nb postes TH',
                'Nb postes total',
            ], ';');

            foreach ($iterableResult as $row) {
                /* @var $cours Cours */
                $cours = $row[0];


                //Calcul du nombre de postes total
                $nbtotalPostes = $cours->getNombreCours();

                //Ecriture dans le CSV
                fputcsv($handle, [
                    $cours->getCoursReference(),

                    Util::formatCategorie($cours->getCategorie()),
                    $cours->getDescription(),
                    $cours->getCoursReference(),
                    $cours->getStatut(),
                    $cours->getNom(),
                    $cours->getProfesseur(),
                    $cours->getDateDebut()->format('d/y/m'),
                    $cours->getDateCreation()->format('d/m/y H:i'),
                    $cours->getContacts(),
                    $nbtotalPostes,
                ], ';');
            }

            fclose($handle);
        });

        $response->setStatusCode(200);
        //        $response->headers->set('Content-Type', 'application/force-download');
        $response->headers->set('Content-Type', 'text/csv; charset=ISO-8859-1');
        $response->headers->set('Content-Disposition', 'attachment; filename="export.csv"');

        return $response;
    }

    public function search($start, $length)
    {
        $session = $this->requestStack->getSession();
        $directions = $this->getRestrictionDirections();

        return $this->em->getRepository(Cours::class)->search($session->get('arrete_search'), $start, $length, $directions, $this->isDgafp());
    }

    public function countSearch()
    {
        $session = $this->requestStack->getSession();
        $directions = $this->getRestrictionDirections();

        return $this->em->getRepository(Cours::class)->countSearch($session->get('arrete_search'), $directions, $this->isDgafp());
    }

    public function countTotalSearch()
    {
        $directions = $this->getRestrictionDirections();

        return $this->em->getRepository(Cours::class)->countSearch([], $directions, $this->isDgafp());
    }

    private function getRestrictionDirections()
    {
        $directions = null;

        if ($this->security->isGranted('ROLE_CORRESP_MIN') || $this->security->isGranted('ROLE_CONSULT_MIN')) {
            $directions = $this->security->getUser()->getDirections();
        }

        return $directions;
    }

    public function envoyerDgafp(Cours $cours)
    {
        $utilisateur = $this->security->getUser();
        $cours->setStatut(EnumStatut::TRANSMIS_PROFESSEUR)
            ->setDateTransmission(new \DateTime())
            ->setTransmisPar($utilisateur);

        $this->mailer->sendNotificationEnvoyerDgafp($cours);
        $this->em->flush();
    }

    public function renvoyerMinistere(Cours $cours, $sujet, $destinataires, $copies, $corps)
    {
        $cours->setStatut(EnumStatut::CREE)
            ->setDateTransmission(null)
            ->setTransmisPar(null)
            ->setDateAccuseReception(null)
            ->setAccusePar(null)
            ->setDateRenvoiMinistere(new \DateTime());

        $this->mailer->sendNotificationRenvoyerMinistere($cours, $sujet, $destinataires, $copies, $corps);
        $this->em->flush();
    }

    public function accuserReception(Cours $cours, $sujet, $destinataires, $copies, $corps)
    {
        $utilisateur = $this->security->getUser();
        $cours->setStatut(EnumStatut::ACCUSE_RECEPTION)
            ->setDateAccuseReception(new \DateTime())
            ->setAccusePar($utilisateur);
        $this->mailer->sendNotificationAccuserReception($cours, $sujet, $destinataires, $copies, $corps);
        $this->em->flush();
    }

    public function valider(Cours $cours, $sujet, $destinataires, $copies, $corps)
    {
        $utilisateur = $this->security->getUser();
        $cours->setStatut(EnumStatut::VALIDE)
            ->setDateValidation(new \DateTime())
            ->setValidePar($utilisateur);

        $this->mailer->sendNotificationValider($cours, $sujet, $destinataires, $copies, $corps);
        $this->em->flush();
    }

    public function devalider(Cours $cours, $sujet, $destinataires, $copies, $corps)
    {
        $utilisateur = $this->security->getUser();

        $cours->setStatut(EnumStatut::AVIS_CONFORME_ANNULE)
            ->setDateRetraitAvisConforme(new \DateTime())
            ->setRetraitAvisConformePar($utilisateur);

        $this->mailer->sendNotificationDevalider($cours, $sujet, $destinataires, $copies, $corps);
        $this->em->flush();
    }

    public function annulerRejet(Cours $cours)
    {
        $cours->setStatut(EnumStatut::ACCUSE_RECEPTION)
            ->setDateRejet(null)
            ->setRejetePar(null);

        $this->em->flush();
    }

    public function validerTacitement(Cours $cours)
    {
        $cours->setStatut(EnumStatut::VALIDE_T)
            ->setDateValidation(new \DateTime())
            ->setValidePar(null);

        $this->mailer->sendNotificationValiderTacitement($cours);
        $this->em->flush();
    }

    public function rejeter(Cours $cours, $sujet, $destinataires, $copies, $corps)
    {
        $utilisateur = $this->security->getUser();
        $cours->setStatut(EnumStatut::REJETE)
            ->setDateRejet(new \DateTime())
            ->setRejetePar($utilisateur);

        $this->mailer->sendNotificationRejeter($cours, $sujet, $destinataires, $copies, $corps);
        $this->em->flush();
    }

    public function getIndicateursDgafp()
    {
        $indicateurs = $this->getIndicateurs();

        $indicateurs['nbCourssUrgents'] = $this->repository->countCours([EnumStatut::TRANSMIS_PROFESSEUR, EnumStatut::ACCUSE_RECEPTION], null, true);

        return $indicateurs;
    }

    public function getIndicateursMinistere(PersistentCollection $directions)
    {
        $indicateurs = $this->getIndicateurs($directions);

        $indicateurs['nbArretesCrees'] = $this->repository->countArretes([EnumStatut::CREE], $directions);

        return $indicateurs;
    }

    private function getIndicateurs(?PersistentCollection $directions = null): array
    {
        $indicateurs = [];

        $indicateurs['nbArretesTransmis'] = $this->repository->countArretes([EnumStatut::TRANSMIS_PROFESSEUR], $directions);
        $indicateurs['nbArretesAccuses'] = $this->repository->countArretes([EnumStatut::ACCUSE_RECEPTION], $directions);
        $indicateurs['nbArretesValides'] = $this->repository->countArretes([EnumStatut::VALIDE, EnumStatut::VALIDE_T], $directions);
        $indicateurs['nbArretesEnAttenteTraitementDgafp'] = $this->repository->countArretes([EnumStatut::TRANSMIS_PROFESSEUR, EnumStatut::ACCUSE_RECEPTION], $directions);

        return $indicateurs;
    }

    public function getArreteFromNumeroNorPourMiseAJour($numNor, ?PersistentCollection $directions = null)
    {
        return $this->repository->getArreteFromNumeroNorPourMiseAJour($numNor, $directions);
    }

    public function save(Arrete $cours)
    {
        if ($arrete->isTypeOuverture()) {
            $arrete->setNumNorReference($arrete->getNumNor());
        }

        // Suppression des documents à supprimper
        if ($arrete->getDocumentArrete() && $arrete->getDocumentArrete()->isToDelete()) {
            $arrete->setDocumentArrete(null);
        }

        if ($arrete->getDocumentExtrait() && $arrete->getDocumentExtrait()->isToDelete()) {
            $arrete->setDocumentExtrait(null);
        }

        if ($arrete->getDocumentAnnexeFinanciere() && $arrete->getDocumentAnnexeFinanciere()->isToDelete()) {
            $arrete->setDocumentAnnexeFinanciere(null);
        }

        /* @var \App\Entity\Document $document */
        foreach ($arrete->getDocuments() as $document) {
            if ($document->isToDelete()) {
                $arrete->removeDocument($document);
            }
        }

        // Ajout des nouveaux documents
        if ($arrete->getNewDocuments()) {
            foreach ($arrete->getNewDocuments() as $document) {
                $arrete->addDocument($document);
            }
        }

        $this->em->flush();
    }

    private function isDgafp()
    {
        return $this->security->isGranted('ROLE_ADMIN_DGAFP') || $this->security->isGranted('ROLE_CONSULT_DGAFP');
    }
}
