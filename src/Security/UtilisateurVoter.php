<?php

declare(strict_types=1);

namespace App\Security;

use App\Entity\Utilisateur;
use App\Service\RoleService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;

class UtilisateurVoter extends Voter
{
    protected EntityManagerInterface $em;
    private Security $security;
    private bool $isSsoEnabled;
    private  $roleService;

    // Liste des actions supportées
    final public const ACTIVER_ET_REDEFINIR_MOT_DE_PASSE = 'active_et_redefinir_mot_passe';
    final public const REDEFINIR_MOT_DE_PASSE = 'redefinir_mo_de_passe';
    final public const MODIFIER_COMPTE_UTILISATEUR = 'utilisateur_edit';

    public function __construct(EntityManagerInterface $em, Security $security, bool $isSsoEnabled, RoleService $roleService)
    {
        $this->em = $em;
        $this->security = $security;
        $this->isSsoEnabled = $isSsoEnabled;
        $this->roleService = $roleService;
    }

    protected function supports($attribute, $subject): bool
    {
        // Si l'attribut n'est pas supporté, return false
        if (!in_array($attribute, [
            self::ACTIVER_ET_REDEFINIR_MOT_DE_PASSE,
            self::REDEFINIR_MOT_DE_PASSE,
            self::MODIFIER_COMPTE_UTILISATEUR,
        ])) {
            return false;
        }

        // Si l'objet n'est pas de type Utilisateur, il n'est pas supporté
        if ($subject && !$subject instanceof Utilisateur) {
            return false;
        }

        return true;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token): bool
    {
        $utilisateurConnecte = $this->security->getUser();

        if (!$utilisateurConnecte instanceof Utilisateur) {
            // Si l'utilisateur n'est pas connecté, l'accès est refusé
            return false;
        }

        /* @var Utilisateur $utilisateur */
        $utilisateur = $subject;

        switch ($attribute) {

            case self::ACTIVER_ET_REDEFINIR_MOT_DE_PASSE:
                return $this->peutActiverEtRedefinirMotDePasse();

            case self::REDEFINIR_MOT_DE_PASSE:
                return $this->peutRedefinirMotDePasse($utilisateur, $utilisateurConnecte);

            case self::MODIFIER_COMPTE_UTILISATEUR:
                return $this->peutModifier($utilisateurConnecte, $utilisateur);
        }

        throw new \LogicException("Erreur de logique dans UtilisateurVoter : type d'accès ".$attribute.' non géré !');
    }

    private function peutActiverEtRedefinirMotDePasse()
    {
        if (!$this->isSsoEnabled) {
            return true;
        }
        // Dans tous les autres cas, on refuse l'accès
        return false;
    }

    private function peutRedefinirMotDePasse(Utilisateur $utilisateur, Utilisateur $utilisateurConnecte)
    {
        if (!$this->isSsoEnabled && $utilisateur === $utilisateurConnecte) {
            return true;
        }

        // Dans tous les autres cas, on refuse l'accès
        return false;
    }

    private function peutModifier(?Utilisateur $utilisateur, ?Utilisateur $utilisateurConnecte): bool
    {
        if ($this->roleService->isGranted('ROLE_ADMIN', $utilisateur) || $this->roleService->isGranted('ROLE_ADMIN_VIP',$utilisateur)) {
            return true;
        }

        // Dans tous les autres cas, on refuse l'accès
        return false;
    }
}
