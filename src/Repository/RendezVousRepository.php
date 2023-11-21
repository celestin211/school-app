<?php

namespace App\Repository;

use App\Entity\RendezVous;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<RendezVous>
 *
 * @method RendezVous|null find($id, $lockMode = null, $lockVersion = null)
 * @method RendezVous|null findOneBy(array $criteria, array $orderBy = null)
 * @method RendezVous[]    findAll()
 * @method RendezVous[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RendezVousRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, RendezVous::class);
    }


    public function findAppointmentBySchedule($schedule)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.schedule = :val')
            ->setParameter('val', $schedule)
            ->getQuery()
            ->getResult()
            ;

    }

    public function findAppointmentById(int $id)
    {
        return $this->createQueryBuilder('a')
            ->innerJoin('a.utilisateurs', 'u')
            ->addSelect('u')
            ->getQuery()
            ->getResult()
            ;
    }

    public function trouvelappointment(int $id)
    {
        $query = $this->createQueryBuilder('a')
            ->andWhere('a.schedule = :val')
            ->setParameter('val', $id)
            ->getQuery()
            ->getResult()
        ;
        $query->execute();
    }
}
