<?php

declare(strict_types=1);

namespace App\Security;

//use App\Entity\CompteBancaire;
use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class CompteBancaireVoter extends Voter
{
    /* @var EntityManager */
    private $em;

    /* @var Security */
    private $security;

    /* @var Utilisateur */
    private $utilisateur;

    // Liste des actions supportées
    const VOIR_INDEX = 'compte';
    const CREER = 'gestion_new';
    const VOIR = 'gestion_show';
    const SUPPRIMER = 'gestion_supprimer';
    const MODIFIER = 'gestion_edit';

    public function __construct(EntityManagerInterface $em, Security $security)
    {
        $this->em = $em;
        $this->security = $security;
        $this->utilisateur = $security->getUser();
    }

    protected function supports($attribute, $subject): bool
    {
        // Si l'attribut n'est pas supporté, return false
        if (!in_array($attribute, [
            self::VOIR_INDEX,
            self::CREER,
            self::VOIR,
            self::SUPPRIMER,
            self::MODIFIER,
        ])) {
            return false;
        }

        /* Si l'objet n'est pas de type Direction, il n'est pas supporté
        if ($subject && !$subject instanceof CompteBancaire) {
            return false;
        }*/

        return true;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token): bool
    {
        if (!$this->utilisateur instanceof Utilisateur) {
            // Si l'utilisateur n'est pas connecté, l'accès est refusé
            return false;
        }

        /* CompteBancaire $direction*/
        $direction = $subject;

        switch ($attribute) {
            case self::VOIR_INDEX:
                return $this->peutVoirIndex();
            case self::CREER:
                return $this->peutCreer();
            case self::VOIR:
                return $this->peutVoir();
            case self::SUPPRIMER:
                return $this->peutSupprimer();
            case self::MODIFIER:
                return $this->peutModifier();
        }

        throw new \LogicException("Erreur de logique dans DirectionVoter : type d'accès ".$attribute.' non géré !');
    }

    private function peutVoirIndex()
    {
        if ($this->security->isGranted('ROLE_ADMIN') || $this->security->isGranted('ROLE_ADMIN') || $this->security->isGranted('ROLE_CONSULT')) {
            return true;
        }

        return false;
    }

    private function peutCreer()
    {
        if ($this->security->isGranted('ROLE_ADMIN') || $this->security->isGranted('ROLE_CONSULT')) {
            return true;
        }

        return false;
    }

    private function peutVoir()
    {
        if ($this->security->isGranted('ROLE_ADMIN') || $this->security->isGranted('ROLE_CONSULT') || $this->security->isGranted('ROLE_CONSULT')) {
            return true;
        }

        return false;
    }

    private function peutSupprimer()
    {
        if ($this->security->isGranted('ROLE_ADMIN') || $this->security->isGranted('ROLE_CONSULT')) {
            return true;
        }

        return false;
    }

    private function peutModifier()
    {
        if ($this->security->isGranted('ROLE_ADMIN') || $this->security->isGranted('ROLE_CONSULT')) {
            return true;
        }

        return false;
    }
}
