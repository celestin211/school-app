<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Arrete;
use App\Entity\Contact;
use App\Entity\Cours;
use App\Entity\Modalite;
use App\Entity\NbPostesVentile;
use App\Entity\VoieAccesNbPostesAutreModeIntExt;
use App\Entity\VoieAccesNbPostesDroitCommun;
use App\EnumTypes\EnumStatut;
use App\Repository\ArreteRepository;
use App\Util\Util;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\PersistentCollection;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Twig\Environment;

class CourManager
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

        if ($this->security->getToken() && $this->security->isGranted('ROLE_ADMIN_DGAFP')) {
            $arrete->setStatut(EnumStatut::TRANSMIS_DGAFP);
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
        foreach ($historique as $arrete) {
            if ($arrete->getDateCreation()) {
                array_push($historiqueActions, ['statut' => EnumStatut::CREE, 'date' => $arrete->getDateCreation(), 'par' => $arrete->getCreePar(), 'arrete' => $arrete]);
            }

            if ($arrete->getDateTransmission()) {
                array_push($historiqueActions, ['statut' => EnumStatut::TRANSMIS_DGAFP, 'date' => $arrete->getDateTransmission(), 'par' => $arrete->getTransmisPar(), 'arrete' => $arrete]);
            }

            if ($arrete->getDateAccuseReception()) {
                array_push($historiqueActions, ['statut' => EnumStatut::ACCUSE_RECEPTION, 'date' => $arrete->getDateAccuseReception(), 'par' => $arrete->getAccusePar(), 'arrete' => $arrete]);
            }

            if ($arrete->getDateValidation()) {
                array_push($historiqueActions, ['statut' => EnumStatut::VALIDE, 'date' => $arrete->getDateValidation(), 'par' => $arrete->getValidePar(), 'arrete' => $arrete]);
            }

            if ($arrete->getDateValidationTacite()) {
                array_push($historiqueActions, ['statut' => EnumStatut::VALIDE_T, 'date' => $arrete->getDateValidationTacite(), 'par' => null, 'arrete' => $arrete]);
            }

            if ($arrete->getDateRejet()) {
                array_push($historiqueActions, ['statut' => EnumStatut::REJETE, 'date' => $arrete->getDateRejet(), 'par' => $arrete->getRejetePar(), 'arrete' => $arrete]);
            }

            if ($arrete->getDateRetraitAvisConforme()) {
                array_push($historiqueActions, ['statut' => EnumStatut::AVIS_CONFORME_ANNULE, 'date' => $arrete->getDateRetraitAvisConforme(), 'par' => $arrete->getRetraitAvisConformePar(), 'arrete' => $arrete]);
            }
        }

        // Colonnes de tri
        $date = array_column($historiqueActions, 'date');
        $statut = array_column($historiqueActions, 'statut');

        //trie sur la colonne date
        array_multisort($date, SORT_DESC, $statut, SORT_DESC, $historiqueActions);

        return $historiqueActions;
    }

    public function arreteIsDerniereVersionValide(Cours $arrete)
    {
        /* @var CoursRepository $repository */
        $repository = $this->em->getRepository(Cours::class);

        /* @var Cours $arreteIsDerniereVersion */
        $arreteIsDerniereVersion = $repository->findDerniereVersionValideOuNull($arrete);

        if (!$arreteIsDerniereVersion) {
            return false;
        }

        return $arreteIsDerniereVersion->getId() === $arrete->getId();
    }

    public function isDerniereVersionConcoursSaisie($arrete)
    {
        $derniereVersionCoursSaisie = $this->em->getRepository(Cours::class)->findDerniereVersionConcoursSaisie($arrete);

        return null === $derniereVersionCoursSaisie || $derniereVersionCoursSaisie->getId() === $arrete->getId();
    }

    public function creerFromArrete(Cours $arrete)
    {
        //-------------------------------------------
        //On prealimente les données du nouvel arreté
        //-------------------------------------------
        $newCours = new Cours();

        $newCours->setTypeOuverture(false);

        //Référence
        //---------
        if ($arrete->getCoursReference()) {
            $newCours->setCoursReference($arrete->getCoursReference());
        } else {
            $newCours->setCoursReference($arrete);
        }

        $newCours->setNumNorReference($newCours->getCoursReference()->getNumNor());

        $newCours->setTypePostes($arrete->isTypePostes());
        $newCours->setDirection($arrete->getDirection());
        $newCours->setCorps($arrete->getCorps());
        $newCours->setGrade($arrete->getGrade());
        $newCours->setCategorie(($arrete->getCategorie()));
        $newCours->setAnneeConcours($arrete->getAnneeConcours());

        // La date de Visa CBCM ne doit pas être reprise
        if ($arrete->isTypePostes()) {
            $newCours->setDateVisaControleFinancier($arrete->getDateVisaControleFinancier());
        }

        //Lieux & Dates
        //-------------
        $newCours->setLieuConcours($arrete->getLieuConcours());
        $newCours->setDateOuverture($arrete->getDateOuverture());
        $newCours->setDateRetraitDossiers($arrete->getDateRetraitDossiers());
        $newCours->setDateClotureInscriptionsCourrier($arrete->getDateClotureInscriptionsCourrier());
        $newCours->setDateClotureInscriptionsWeb($arrete->getDateClotureInscriptionsWeb());
        $newCours->setDatePremiereEpreuve($arrete->getDatePremiereEpreuve());

        //Modalités
        //---------
        $modalite = new Modalite();
        $modalite->setCommun($arrete->getModalite()->isCommun());
        $modalite->setNational($arrete->getModalite()->isNational());
        $modalite->setNationalAffectationLocale($arrete->getModalite()->isNationalAffectationLocale());
        $modalite->setDeconcentre($arrete->getModalite()->isDeconcentre());
        $modalite->setSurTitres($arrete->getModalite()->isSurTitres());
        $modalite->setSpecialiteEmploiType($arrete->getModalite()->isSpecialiteEmploiType());
        $modalite->setAutres($arrete->getModalite()->isAutres());
        $modalite->setAutresModalites($arrete->getModalite()->getAutresModalites());
        $newCours->setModalite($modalite);

        //Voies d'accès Droit
        //-------------------
        $voieAccesDroitCommun = new VoieAccesNbPostesDroitCommun();
        $voieAccesDroitCommun->setExterne($arrete->getVoieAccesNbPostesDroitCommun()->getExterne());
        $voieAccesDroitCommun->setNbExterne($arrete->getVoieAccesNbPostesDroitCommun()->getNbExterne());
        $voieAccesDroitCommun->setInterne($arrete->getVoieAccesNbPostesDroitCommun()->getInterne());
        $voieAccesDroitCommun->setNbInterne($arrete->getVoieAccesNbPostesDroitCommun()->getNbInterne());
        $voieAccesDroitCommun->setTroisiemeConcours($arrete->getVoieAccesNbPostesDroitCommun()->getTroisiemeConcours());
        $voieAccesDroitCommun->setNbTroisiemeConcours($arrete->getVoieAccesNbPostesDroitCommun()->getNbTroisiemeConcours());
        $voieAccesDroitCommun->setUnik($arrete->getVoieAccesNbPostesDroitCommun()->getUnik());
        $voieAccesDroitCommun->setNbUnik($arrete->getVoieAccesNbPostesDroitCommun()->getNbUnik());
        $voieAccesDroitCommun->setExapro($arrete->getVoieAccesNbPostesDroitCommun()->getExapro());
        $voieAccesDroitCommun->setNbExapro($arrete->getVoieAccesNbPostesDroitCommun()->getNbExapro());
        $voieAccesDroitCommun->setSansConcoursExterne($arrete->getVoieAccesNbPostesDroitCommun()->getSansConcoursExterne());
        $voieAccesDroitCommun->setNbSansConcoursExterne($arrete->getVoieAccesNbPostesDroitCommun()->getNbSansConcoursExterne());
        $voieAccesDroitCommun->setPacte($arrete->getVoieAccesNbPostesDroitCommun()->getPacte());
        $voieAccesDroitCommun->setNbPacte($arrete->getVoieAccesNbPostesDroitCommun()->getNbPacte());
        $voieAccesDroitCommun->setSelectionProfessionnelle($arrete->getVoieAccesNbPostesDroitCommun()->getSelectionProfessionnelle());
        $voieAccesDroitCommun->setNbSelectionProfessionnelle($arrete->getVoieAccesNbPostesDroitCommun()->getNbSelectionProfessionnelle());
        $voieAccesDroitCommun->setConcoursSpecial($arrete->getVoieAccesNbPostesDroitCommun()->getConcoursSpecial());
        $voieAccesDroitCommun->setNbConcoursSpecial($arrete->getVoieAccesNbPostesDroitCommun()->getNbConcoursSpecial());
        $voieAccesDroitCommun->setNatureConcours($arrete->getVoieAccesNbPostesDroitCommun()->getNatureConcours());
        $newCours->setVoieAccesNbPostesDroitCommun($voieAccesDroitCommun);

        //Voies d 'accès Autres
        //---------------------
        $voieAccesAutreInterneExterne = new VoieAccesNbPostesAutreModeIntExt();
        $voieAccesAutreInterneExterne->setAutres($arrete->getVoieAccesNbPostesAutreModeIntExt()->getAutres());
        $voieAccesAutreInterneExterne->setNbAutres($arrete->getVoieAccesNbPostesAutreModeIntExt()->getNbAutres());
        $voieAccesAutreInterneExterne->setNatureConcours($arrete->getVoieAccesNbPostesAutreModeIntExt()->getNatureConcours());
        $voieAccesAutreInterneExterne->setConcoursReserve($arrete->getVoieAccesNbPostesAutreModeIntExt()->getConcoursReserve());
        $voieAccesAutreInterneExterne->setNbConcoursReserve($arrete->getVoieAccesNbPostesAutreModeIntExt()->getNbConcoursReserve());
        $voieAccesAutreInterneExterne->setSansConcoursInterneReserve($arrete->getVoieAccesNbPostesAutreModeIntExt()->getSansConcoursInterneReserve());
        $voieAccesAutreInterneExterne->setNbSansConcoursInterneReserve($arrete->getVoieAccesNbPostesAutreModeIntExt()->getNbSansConcoursInterneReserve());
        $voieAccesAutreInterneExterne->setExamenProReserve($arrete->getVoieAccesNbPostesAutreModeIntExt()->getExamenProReserve());
        $voieAccesAutreInterneExterne->setNbExamenProReserve($arrete->getVoieAccesNbPostesAutreModeIntExt()->getNbExamenProReserve());
        $voieAccesAutreInterneExterne->setInterneExcept($arrete->getVoieAccesNbPostesAutreModeIntExt()->getInterneExcept());
        $voieAccesAutreInterneExterne->setNbInterneExcept($arrete->getVoieAccesNbPostesAutreModeIntExt()->getNbInterneExcept());
        $newCours->setVoieAccesNbPostesAutreModeIntExt($voieAccesAutreInterneExterne);

        //NbPostes
        //--------
        $newCours->setNbPostesTH($arrete->getNbPostesTH());
        $newCours->setNbPostesACVG($arrete->getNbPostesACVG());

        //Commun : Répartition NbPostes
        //-----------------------------
        //Vide la collection au cas où
        $newCours->clearNbPostesVentiles();
        $allNbPostesVentiles = $arrete->getNbPostesVentiles();

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

        $newCours->setCommentaire($arrete->getCommentaire());

        // Les contacts ne doivents pas être repris
        $utilisateur = $this->security->getUser();
        if ($utilisateur->hasRole('ROLE_CORRESP_MIN')) {
            $contact = (new Contact())
                ->setNom(Util::identite($utilisateur))
                ->setEmail($utilisateur->getEmail());
            $newCours->addContact($contact);
        }

        foreach ($arrete->getDocuments() as $document) {
            $nouveauDocument = clone $document;
            $newCours->addDocument($nouveauDocument);
        }

        if ($arrete->isTypePostes() && $arrete->getDocumentAnnexeFinanciere()) {
            $annexeFinanciere = clone $arrete->getDocumentAnnexeFinanciere();
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

        /* @var CoursRepository $arreteRepository */
        $arreteRepository = $this->em->getRepository(Cours::class);
        $query = $arreteRepository->initQueryBuilder($parameters, $ministere, $isDgafp)
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
                /* @var $arrete Cours */
                $arrete = $row[0];

                //Gestion des string potientllement
                $ministere = $arrete->getDirection() ? $arrete->getDirection()->getMinistere() : null;
                $direction = $arrete->getDirection() ? $arrete->getDirection()->getLibelleCourt() : $arrete->getDirectionTxt();

                $corps = $arrete->getCorps();
                $grade = $arrete->getGrade();

                if (null == $ministere) {
                    $ministere = '';
                } else {
                    $ministere = $arrete->getDirection()->getMinistere()->getLibelleLong();
                }

                if (null == $corps) {
                    $corps = '';
                } else {
                    $corps = $arrete->getCorps()->getLibelleLong();
                }

                if (null == $grade) {
                    $grade = '';
                } else {
                    $grade = $arrete->getGrade()->getLibelleLong();
                }

                if (null == $arrete->getMinistereTxt()) {
                    $arrete->setMinistereTxt('');
                }

                if (null == $arrete->getCorpsGradeTxt()) {
                    $arrete->setCorpsGradeTxt('');
                }

                //Calcul du nombre de postes total
                $nbtotalPostes = $arrete->getNbPostes() + $arrete->getNbPostesTH() + $arrete->getNbPostesACVG();

                $datePremiereEpreuve = $arrete->getDatePremiereEpreuve() ? $arrete->getDatePremiereEpreuve()->format('d/m/Y') : '';
                //Ecriture dans le CSV
                fputcsv($handle, [$arrete->getNumNor(),
                    $arrete->getCoursReference() ? $arrete->getCoursReference()->getNumNor() : null,
                    $ministere,
                    $arrete->getMinistereTxt(),
                    Util::formatCategorie($arrete->getCategorie()),
                    $corps,
                    $grade,
                    $arrete->getCorpsGradeTxt(),
                    $direction,
                    $arrete->getAnneeConcours(),
                    $arrete->getStatut(),
                    $datePremiereEpreuve,
                    $arrete->getModalite()->isNational() ? 'Oui' : 'Non',
                    $arrete->getModalite()->isNationalAffectationLocale() ? 'Oui' : 'Non',
                    $arrete->getModalite()->isDeconcentre() ? 'Oui' : 'Non',
                    $arrete->getVoieAccesNbPostesDroitCommun()->getNbExterne(),
                    $arrete->getVoieAccesNbPostesDroitCommun()->getNbInterne(),
                    $arrete->getVoieAccesNbPostesDroitCommun()->getNbTroisiemeConcours(),
                    $arrete->getVoieAccesNbPostesDroitCommun()->getNbUnik(),
                    $arrete->getVoieAccesNbPostesDroitCommun()->getNbExapro(),
                    $arrete->getVoieAccesNbPostesDroitCommun()->getNbSansConcoursExterne(),
                    $arrete->getVoieAccesNbPostesDroitCommun()->getNbPacte(),
                    $arrete->getVoieAccesNbPostesDroitCommun()->getNbSelectionProfessionnelle(),
                    $arrete->getVoieAccesNbPostesDroitCommun()->getNbConcoursSpecial(),
                    $arrete->getVoieAccesNbPostesAutreModeIntExt()->getNbConcoursReserve(),
                    $arrete->getVoieAccesNbPostesAutreModeIntExt()->getNbSansConcoursInterneReserve(),
                    $arrete->getVoieAccesNbPostesAutreModeIntExt()->getNbExamenProReserve(),
                    $arrete->getVoieAccesNbPostesAutreModeIntExt()->getNbInterneExcept(),
                    $arrete->getVoieAccesNbPostesAutreModeIntExt()->getNbApprentiBoeth(),
                    $arrete->getVoieAccesNbPostesAutreModeIntExt()->getNbPromotionBoeth(),
                    $arrete->getVoieAccesNbPostesAutreModeIntExt()->getNbAutres(),
                    $arrete->getNbPostesACVG(),
                    $arrete->getNbPostesTH(),
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
        $cours->setStatut(EnumStatut::TRANSMIS_DGAFP)
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

    public function devalider(Cours $arrete, $sujet, $destinataires, $copies, $corps)
    {
        $utilisateur = $this->security->getUser();

        $arrete->setStatut(EnumStatut::AVIS_CONFORME_ANNULE)
            ->setDateRetraitAvisConforme(new \DateTime())
            ->setRetraitAvisConformePar($utilisateur);

        $this->mailer->sendNotificationDevalider($cours, $sujet, $destinataires, $copies, $corps);
        $this->em->flush();
    }

    public function annulerRejet(Cours $arrete)
    {
        $arrete->setStatut(EnumStatut::ACCUSE_RECEPTION)
            ->setDateRejet(null)
            ->setRejetePar(null);

        $this->em->flush();
    }

    public function validerTacitement(Cours $arrete)
    {
        $arrete->setStatut(EnumStatut::VALIDE_T)
            ->setDateValidation(new \DateTime())
            ->setValidePar(null);

        $this->mailer->sendNotificationValiderTacitement($arrete);
        $this->em->flush();
    }

    public function rejeter(Cours $arrete, $sujet, $destinataires, $copies, $corps)
    {
        $utilisateur = $this->security->getUser();
        $arrete->setStatut(EnumStatut::REJETE)
            ->setDateRejet(new \DateTime())
            ->setRejetePar($utilisateur);

        $this->mailer->sendNotificationRejeter($arrete, $sujet, $destinataires, $copies, $corps);
        $this->em->flush();
    }

    public function getIndicateursDgafp()
    {
        $indicateurs = $this->getIndicateurs();

        $indicateurs['nbCourssUrgents'] = $this->repository->countCours([EnumStatut::TRANSMIS_DGAFP, EnumStatut::ACCUSE_RECEPTION], null, true);

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

        $indicateurs['nbArretesTransmis'] = $this->repository->countArretes([EnumStatut::TRANSMIS_DGAFP], $directions);
        $indicateurs['nbArretesAccuses'] = $this->repository->countArretes([EnumStatut::ACCUSE_RECEPTION], $directions);
        $indicateurs['nbArretesValides'] = $this->repository->countArretes([EnumStatut::VALIDE, EnumStatut::VALIDE_T], $directions);
        $indicateurs['nbArretesEnAttenteTraitementDgafp'] = $this->repository->countArretes([EnumStatut::TRANSMIS_DGAFP, EnumStatut::ACCUSE_RECEPTION], $directions);

        return $indicateurs;
    }

    public function getArreteFromNumeroNorPourMiseAJour($numNor, ?PersistentCollection $directions = null)
    {
        return $this->repository->getArreteFromNumeroNorPourMiseAJour($numNor, $directions);
    }

    public function save(Arrete $arrete)
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
