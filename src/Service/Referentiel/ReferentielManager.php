<?php

namespace App\Service\Referentiel;

use Doctrine\ORM\EntityManagerInterface;

abstract class ReferentielManager
{
    /**
     * @var EntityManagerInterface
     */
    protected $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function save()
    {
        $this->em->flush();
    }

    public function creer($entity)
    {
        $this->em->persist($entity);
        $this->em->flush();
    }
}
