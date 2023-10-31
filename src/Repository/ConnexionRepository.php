<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Connexion;
use App\Entity\Utilisateur;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ConnexionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Connexion::class);
    }

    public function findDernieresConnexions(Utilisateur $utilisateur, int $maxResults = 10)
    {
        $qb = $this->createQueryBuilder('connexion');

        $qb->where('connexion.utilisateur = :UTILISATEUR')
            ->orderBy('connexion.dateCreation', 'DESC')
            ->setParameter('UTILISATEUR', $utilisateur)
            ->setMaxResults($maxResults)
        ;

        return $qb->getQuery()->getResult();
    }

    public function getNbConnexionsByDate(\DateTime $dateConnexion)
    {
        $dateConnexion->setTime(0, 0);

        $qb = $this->createQueryBuilder('connexion');
        $qb->select('COUNT(connexion)')
            ->where('connexion.dateConnexion = :DATE_CONNEXION')
            ->setParameter('DATE_CONNEXION', $dateConnexion);

        return $qb->getQuery()->getSingleScalarResult();
    }

    public function getNbConnexions()
    {
        $qb = $this->createQueryBuilder('connexion');
        $qb->select('connexion.dateConnexion, COUNT(connexion) nbConnexions')
            ->groupBy('connexion.dateConnexion')
            ->orderBy('connexion.dateConnexion', 'DESC')
            ->setMaxResults(100);

        return $qb->getQuery()->getResult();
    }
}
