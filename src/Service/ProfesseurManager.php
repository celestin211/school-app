<?php

namespace App\Service;

use App\Entity\Cours;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;


class ProfesseurManager
{

    /**
     * @var AuthorizationCheckerInterface
     */
    private $roleService;
    /**
     * @var EntityManagerInterface
     */
    private $em;


    public function __construct(
        AuthorizationCheckerInterface $roleService,
        EntityManagerInterface $em,

    ) {
        $this->roleService = $roleService;
        $this->em = $em;

    }

    /*
     * Cette fonction évalue si l'utilisateur connecté ($utilisateurConnecte) peut voir
     *  l'utilisateur ($utilisateurAction) et selon son rôle passé en paramètre
     */
    public function peutVoir(Cours $cours)
    {

        if ($this->roleService->isGranted('ROLE_PROFESSEUR', $cours) || $this->roleService->isGranted('ROLE_ELEVE')) {
            return true;
        }

        return false;
    }

    public function peutcreerUCours(Cours $cours)
    {

        $cours->setDateDebut(
            new \DateTime()
        );
        $this->em->persist($cours);
        $this->em->flush();
    }

}
