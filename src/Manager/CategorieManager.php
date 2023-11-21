<?php

declare(strict_types=1);

namespace App\Manager;

use App\Entity\Categorie;
use App\Repository\ConnexionRepository;
use Doctrine\ORM\EntityManagerInterface;

class CategorieManager
{
    /** @var EntityManagerInterface */
    protected $em;

    /** @var ConnexionRepository */
    protected $repository;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function save(Categorie $categorie, bool $flush = true): void
    {
        $this->em->persist($categorie);

        if ($flush) {
            $this->em->flush();
        }
    }
    public function remove(Categorie $categorie):void
    {
        $this->em->remove($categorie);
       $this->em->flush();
    }

}
