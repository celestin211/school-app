<?php

namespace App\Repository;

use App\Entity\CategorieProfesseur;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CategorieProfesseur>
 *
 * @method CategorieProfesseur|null find($id, $lockMode = null, $lockVersion = null)
 * @method CategorieProfesseur|null findOneBy(array $criteria, array $orderBy = null)
 * @method CategorieProfesseur[]    findAll()
 * @method CategorieProfesseur[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CategorieProfesseurRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CategorieProfesseur::class);
    }

//    /**
//     * @return CategorieProfesseur[] Returns an array of CategorieProfesseur objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CategorieProfesseur
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
