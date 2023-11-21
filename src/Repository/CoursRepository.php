<?php

namespace App\Repository;

use App\Entity\Cours;
use App\Entity\Eleve;
use App\Entity\Professeur;
use App\Entity\Utilisateur;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Cours>
 *
 * @method Cours|null find($id, $lockMode = null, $lockVersion = null)
 * @method Cours|null findOneBy(array $criteria, array $orderBy = null)
 * @method Cours[]    findAll()
 * @method Cours[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CoursRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Cours::class);
    }

   /**
     * @return Cours[] Returns an array of Cours objects
    */

    public function findAllCourByProfesseur(Professeur $professeur)
    {
        $qb = $this->createQueryBuilder('p')
            ->leftjoin('p.cours', 'crs')
            ->where('crs.professeur = :professeur')
            ->andWhere('lst.statutAvancement = :VALIDEE_DGAFP')
            ->andWhere('p.email = :email')
            ->setParameter('professeur', $professeur)
            ->orderBy('p.nom')
            ->addOrderBy('p.prenom');

        $query = $qb->getQuery();

        return $query->getResult();
    }

}
