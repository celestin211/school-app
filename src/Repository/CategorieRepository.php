<?php

namespace App\Repository;

use App\Entity\Categorie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Categorie>
 *
 * @method Categorie|null find($id, $lockMode = null, $lockVersion = null)
 * @method Categorie|null findOneBy(array $criteria, array $orderBy = null)
 * @method Categorie[]    findAll()
 * @method Categorie[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CategorieRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Categorie::class);
    }

    public function searchCount( string $search = null)
    {
        $qb = $this->createQueryBuilder('categorie')
            ->select('COUNT(categorie)')
        ;

        $qb = $this->addSearchWhere($qb, $search);

        return $qb->getQuery()->getSingleScalarResult();
    }

    public function addSearchWhere(QueryBuilder $qb, ?string $search)
    {
        $colonnesTexte = [ 'categorie.nom', 'categorie.text'];

        if (strlen($search) > 0) {
            $orXSearch = $qb->expr()->orX();
            $conditions = [];

            foreach ($colonnesTexte as $colonne) {
                $conditions[] = $qb->expr()->like($colonne, ':SEARCH');
                $qb->setParameter('SEARCH', '%'.$search.'%');
            }

            $orXSearch->addMultiple($conditions);
            $qb->andWhere($orXSearch);
        }

        return $qb;
    }


    public function search(string $search, int $start, int $length, array $order)
    {
        $colonnes = [ 'categorie.nom', 'categorie.prenom', 'statut'];

        $qb = $this->createQueryBuilder('categorie')
            ->join('categorie.categorie_professeur', 'categorie_professeur')

            ->orderBy($colonnes[$order[0]['column']], $order[0]['dir'])
        ;

        $qb = $this->addSearchWhere($qb, $search);

        $query = $qb->getQuery()->setMaxResults($length)->setFirstResult($start);

        $paginator = new Paginator($query, true);

        return $paginator;
    }

}
