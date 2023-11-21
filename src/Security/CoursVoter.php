<?php

declare(strict_types=1);

namespace App\Security;

use App\Entity\Cours;
use App\Entity\Utilisateur;
use App\EnumTypes\EnumStatut;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use App\Manager\CoursManager;

class CoursVoter extends Voter
{
    /** @var EntityManagerInterface */
    protected $em;

    /** @var Security */
    private $security;

    // Liste des actions supportées
    const NOUVEAU = 'arrete_new';
    const EDIT = 'arrete_edit';
    const VOIR = 'arrete_voir';
    const SUPPRIMER = 'arrete_supprimer';
    const ACCUSER_RECEPTION = 'arrete_accuse_reception';
    const VALIDER = 'arrete_valider';
    const REJETER = 'arrete_rejeter';
    const METTRE_A_JOUR = 'arrete_mettre_a_jour_concours';
    const VOIR_CHRONOLOGIE = 'arrete_voir_chronologie';
    const RECHERCHER = 'arrete_rechercher';
    const ENVOYER_PROFESSEUR = 'cours_trasmettre_professeur';
    const RENVOYER_MIN = 'arrete_renvoyer_ministere';
    const DEVALIDER = 'arrete_devalider';
    const ANNULER_REJET = 'arrete_annuler_rejet';
    const EXPORTER = 'arrete_exporter';

    /**
     * @var CoursManager
     */
    private $coursManager;

    public function __construct(EntityManagerInterface $em, Security $security, CoursManager $coursManager)
    {
        $this->em = $em;
        $this->security = $security;
        $this->arreteManager = $coursManager;
    }

    protected function supports($attribute, $subject): bool
    {
        // Si l'attribut n'est pas supporté, return false
        if (!in_array($attribute, [
            self::NOUVEAU,
            self::EDIT,
            self::VOIR,
            self::SUPPRIMER,
            self::ACCUSER_RECEPTION,
            self::VALIDER,
            self::REJETER,
            self::METTRE_A_JOUR,
            self::VOIR_CHRONOLOGIE,
            self::RECHERCHER,
            self::ENVOYER_PROFESSEUR,
            self::RENVOYER_MIN,
            self::DEVALIDER,
            self::ANNULER_REJET,
            self::EXPORTER,
        ])) {
            return false;
        }

        // Si l'objet n'est pas de type Arrete, il n'est pas supporté
        if ($subject && !$subject instanceof Cours) {
            return false;
        }

        return true;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token): bool
    {
        $utilisateur = $token->getUser();

        if (!$utilisateur instanceof Utilisateur) {
            // Si l'utilisateur n'est pas connecté, l'accès est refusé
            return false;
        }

        /* @var Cours $cours */
        $cours = $subject;

        switch ($attribute) {
            case self::NOUVEAU:
                return $this->peutCreer($utilisateur);
            case self::EDIT:
                return $this->peutCorriger($cours, $utilisateur);
            case self::VOIR:
                return $this->peutVoir($cours, $utilisateur);
            case self::SUPPRIMER:
                return $this->peutSupprimer($cours, $utilisateur);
            case self::ACCUSER_RECEPTION:
                return $this->peutAccuserReception($cours, $utilisateur);
            case self::VALIDER:
                return $this->peutValider($cours, $utilisateur);
            case self::REJETER:
                return $this->peutRejeter($cours, $utilisateur);
            case self::METTRE_A_JOUR:
                return $this->peutMettreAJour($cours, $utilisateur);
            case self::VOIR_CHRONOLOGIE:
                return $this->peutVoirChronologie($cours, $utilisateur);
            case self::RECHERCHER:
                return $this->peutRechercher($utilisateur);
            case self::ENVOYER_PROFESSEUR:
                return $this->peutEnvoyerDgafp($cours, $utilisateur);
            case self::RENVOYER_MIN:
                return $this->peutRenvoyerMinistere($cours, $utilisateur);
            case self::DEVALIDER:
                return $this->peutDevalider($cours, $utilisateur);
            case self::ANNULER_REJET:
                return $this->peutAnnulerRejet($cours, $utilisateur);
            case self::EXPORTER:
                return $this->peutExporter($utilisateur);
        }

        throw new \LogicException("Erreur de logique dans CrepVoter : type d'accès ".$attribute.' non géré !');
    }

    private function peutCreer(Utilisateur $utilisateur)
    {
        if ($this->security->isGranted('ROLE_ADMIN') || $this->security->isGranted('ROLE_ADMIN_DGAFP') || $this->security->isGranted('ROLE_CORRESP_MIN')) {
            return true;
        }

        // Dans tous les autres cas, on refuse l'accès
        return false;
    }

    private function peutCorriger(Arrete $cours, Utilisateur $utilisateur)
    {
        if ($this->security->isGranted('ROLE_ADMIN')) {
            return true;
        }

        if ($this->security->isGranted('ROLE_ADMIN_DGAFP')) {
            return true;
        }

        $isDerniereVersion = $this->arreteManager->isDerniereVersionConcoursSaisie($cours);

        if ($this->security->isGranted('ROLE_CORRESP_MIN') && $isDerniereVersion && EnumStatut::CREE === $cours->getStatut()) {
            if ($utilisateur->getDirections()->contains($cours->getDirection())) {
                return true;
            }
        }

        // Dans tous les autres cas, on refuse l'accès
        return false;
    }

    private function peutVoir(Arrete $cours, Utilisateur $utilisateur)
    {
        if ($this->security->isGranted('ROLE_ADMIN')) {
            return true;
        }

        if ($this->security->isGranted('ROLE_BT')) {
            return true;
        }

        if ($this->security->isGranted('ROLE_ADMIN_DGAFP') && EnumStatut::CREE !== $cours->getStatut()) {
            return true;
        }

        if ($this->security->isGranted('ROLE_CONSULT_DGAFP') && EnumStatut::CREE !== $cours->getStatut()) {
            return true;
        }

        if ($this->security->isGranted('ROLE_CORRESP_MIN') && $utilisateur->getDirections()->contains($cours->getDirection())) {
            return true;
        }

        if ($this->security->isGranted('ROLE_CONSULT_MIN') && $utilisateur->getDirections()->contains($cours->getDirection())) {
            return true;
        }

        if ($this->security->isGranted('ROLE_CORRESP_MIN') && $cours->getCreePar() === $utilisateur) {
            return true;
        }

        // Dans tous les autres cas, on refuse l'accès
        return false;
    }

    private function peutSupprimer(Arrete $cours, Utilisateur $utilisateur)
    {
        // En cas de rejet par la DGAFP, le correspondant ministériel peut supprimer l'arrêté afin de créer un autre avec le même NOR
        if (EnumStatut::REJETE === $cours->getStatut() && $utilisateur->getDirections()->contains($cours->getDirection())) {
            return true;
        }

        if ($utilisateur->hasRole('ROLE_ADMIN')) {
            return true;
        }

        if ($utilisateur->hasRole('ROLE_CORRESP_MIN') && $utilisateur->getDirections()->contains($cours->getDirection())) {
            return true;
        }

        // Dans tous les autres cas, on refuse l'accès
        return false;
    }

    private function peutAccuserReception(Arrete $cours, Utilisateur $utilisateur)
    {
        if ($this->security->isGranted('ROLE_ADMIN') && EnumStatut::TRANSMIS_DGAFP === $cours->getStatut()) {
            return true;
        }

        if ($this->security->isGranted('ROLE_ADMIN_DGAFP') && EnumStatut::TRANSMIS_DGAFP === $cours->getStatut()) {
            return true;
        }

        // Dans tous les autres cas, on refuse l'accès
        return false;
    }

    private function peutValider(Arrete $cours, Utilisateur $utilisateur)
    {
        if ($this->security->isGranted('ROLE_ADMIN') && EnumStatut::ACCUSE_RECEPTION === $cours->getStatut()) {
            return true;
        }

        if ($this->security->isGranted('ROLE_ADMIN_DGAFP') && EnumStatut::ACCUSE_RECEPTION === $cours->getStatut()) {
            return true;
        }

        // Dans tous les autres cas, on refuse l'accès
        return false;
    }

    private function peutDevalider(Arrete $cours, Utilisateur $utilisateur)
    {
        if ($this->security->isGranted('ROLE_ADMIN') && EnumStatut::VALIDE === $cours->getStatut()) {
            return true;
        }

        if ($this->security->isGranted('ROLE_ADMIN_DGAFP') && EnumStatut::VALIDE === $cours->getStatut()) {
            return true;
        }

        // Dans tous les autres cas, on refuse l'accès
        return false;
    }

    private function peutAnnulerRejet(Arrete $cours, Utilisateur $utilisateur)
    {
        if ($this->security->isGranted('ROLE_ADMIN') && EnumStatut::REJETE === $cours->getStatut()) {
            return true;
        }

        // Dans tous les autres cas, on refuse l'accès
        return false;
    }

    private function peutRejeter(Arrete $cours, Utilisateur $utilisateur)
    {
        if ($this->security->isGranted('ROLE_ADMIN') && EnumStatut::ACCUSE_RECEPTION === $cours->getStatut()) {
            return true;
        }

        if ($this->security->isGranted('ROLE_ADMIN_DGAFP') && EnumStatut::ACCUSE_RECEPTION === $cours->getStatut()) {
            return true;
        }

        // Dans tous les autres cas, on refuse l'accès
        return false;
    }

    private function peutMettreAJour(Arrete $cours, Utilisateur $utilisateur)
    {
        $isDerniereVersion = $this->arreteManager->arreteIsDerniereVersionValide($cours);

        if ($this->security->isGranted('ROLE_ADMIN') && $isDerniereVersion && (EnumStatut::VALIDE === $cours->getStatut() || EnumStatut::VALIDE_T === $cours->getStatut())) {
            return true;
        }

        if ($this->security->isGranted('ROLE_ADMIN_DGAFP') && $isDerniereVersion && (EnumStatut::VALIDE === $cours->getStatut() || EnumStatut::VALIDE_T === $cours->getStatut())) {
            return true;
        }

        if ($this->security->isGranted('ROLE_CORRESP_MIN') && $isDerniereVersion && (EnumStatut::VALIDE === $cours->getStatut() || EnumStatut::VALIDE_T === $cours->getStatut())) {
            if ($utilisateur->getDirections()->contains($cours->getDirection())) {
                return true;
            }
        }

        // Dans tous les autres cas, on refuse l'accès
        return false;
    }

    private function peutVoirChronologie(Arrete $cours, Utilisateur $utilisateur)
    {
        if ($this->security->isGranted('ROLE_ADMIN') || $this->security->isGranted('ROLE_ADMIN_DGAFP') || $this->security->isGranted('ROLE_CONSULT_DGAFP')) {
            return true;
        }

        if ($this->security->isGranted('ROLE_CORRESP_MIN') || $this->security->isGranted('ROLE_CONSULT_MIN')) {
            if ($utilisateur->getDirections()->contains($cours->getDirection())) {
                return true;
            }
        }

        // Dans tous les autres cas, on refuse l'accès
        return false;
    }

    private function peutRechercher(Utilisateur $utilisateur)
    {
        if ($this->security->isGranted('ROLE_ADMIN') || $this->security->isGranted('ROLE_ADMIN_DGAFP') || $this->security->isGranted('ROLE_CONSULT_DGAFP') || $this->security->isGranted('ROLE_CORRESP_MIN') || $this->security->isGranted('ROLE_CONSULT_MIN')) {
            return true;
        }

        // Dans tous les autres cas, on refuse l'accès
        return false;
    }

    private function peutEnvoyerDgafp(Arrete $cours, Utilisateur $utilisateur)
    {
        if (EnumStatut::CREE !== $cours->getStatut()) {
            return false;
        }

        if ($this->security->isGranted('ROLE_ADMIN')) {
            return true;
        }

        if ($this->security->isGranted('ROLE_CORRESP_MIN') && $utilisateur->getDirections()->contains($cours->getDirection())) {
            return true;
        }

        // Dans tous les autres cas, on refuse l'accès
        return false;
    }

    private function peutRenvoyerMinistere(Arrete $cours, Utilisateur $utilisateur)
    {
        if ($this->security->isGranted('ROLE_ADMIN') && EnumStatut::ACCUSE_RECEPTION === $cours->getStatut()) {
            return true;
        }

        if ($this->security->isGranted('ROLE_ADMIN_DGAFP') && EnumStatut::ACCUSE_RECEPTION === $cours->getStatut()) {
            return true;
        }

        return false;
    }

    private function peutExporter(Utilisateur $utilisateur): bool
    {
        if ($this->security->isGranted('ROLE_BT')) {
            return false;
        }

        return true;
    }
}
