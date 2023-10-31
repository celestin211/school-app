<?php

namespace App\Repository;

use App\Entity\Parametre;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ParametreRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Parametre::class);
    }

    public function getParametres()
    {
        $qb = $this->createQueryBuilder('parametre')
            ->where('parametre.id = 1')
        ;

        return $qb->getQuery()
            ->setResultCacheLifetime(3600) // améliore les performances avec un cache de 3600 secondes
            ->setResultCacheId('parametre')
            ->getOneOrNullResult();
    }
}
