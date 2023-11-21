<?php

declare(strict_types=1);

namespace App\Security;

use App\Entity\Cours;
use App\Entity\Professeur;
use App\Entity\Utilisateur;
use App\Service\RoleService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use function Symfony\Component\String\s;

class ProfesseurVoter extends Voter
{
    protected EntityManagerInterface $em;
    private Security $security;
    private bool $isSsoEnabled;
    private  $roleService;

    // Liste des actions supportées
    final public const CREER = 'new_cours';
    final public const EDIT_COURS = 'edit_cours';
    final public const SUPPRIME = 'supprime_cours';

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
            self::CREER,
            self::EDIT_COURS,
            self::SUPPRIME,
        ])) {
            return false;
        }

        // Si l'objet n'est pas de type Utilisateur, il n'est pas supporté
        if ($subject && !$subject instanceof Professeur) {
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

        /* @var Professeur $professeur */
        $professeur = $subject;

        switch ($attribute) {

            case self::CREER:
                return $this->peutCreerCours();

            case self::EDIT_COURS:
                return $this->peutModifierCours($professeur, );

            case self::SUPPRIME:
                return $this->peutSupprimeCours($professeur);
        }

        throw new \LogicException("Erreur de logique dans UtilisateurVoter : type d'accès ".$attribute.' non géré !');
    }

    private function peutCreerCours(): bool
    {
        if (!$this->isSsoEnabled) {
            return true;
        }
        // Dans tous les autres cas, on refuse l'accès
        return false;
    }

    private function peutModifierCours(Professeur $professeur): bool
    {
        if (!$this->isSsoEnabled && $professeur === $professeur) {
            return true;
        }

        // Dans tous les autres cas, on refuse l'accès
        return false;
    }

    private function peutSupprimeCours(Professeur $professeur): bool
    {
        if ($this->roleService->isGranted('ROLE_ADMIN', $professeur) || $this->roleService->isGranted('ROLE_ADMIN_VIP',$professeur)) {
            return true;
        }

        // Dans tous les autres cas, on refuse l'accès
        return false;
    }
}
