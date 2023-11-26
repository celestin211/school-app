<?php

declare(strict_types=1);

namespace App\Manager;

use App\Entity\Connexion;
use App\Repository\ConnexionRepository;
use Doctrine\ORM\EntityManagerInterface;

class ConnexionManager
{
    /** @var EntityManagerInterface */
    protected $em;

    /** @var ConnexionRepository */
    protected $repository;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function save(Connexion $connexion, bool $flush = true): void
    {
        $this->em->persist($connexion);

        if ($flush) {
            $this->em->flush();
        }
    }
}
