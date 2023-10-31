<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Document;
use App\Entity\DocumentAccueil;
use App\Repository\DocumentAccueilRepository;
use Doctrine\ORM\EntityManagerInterface;

class DocumentAccueilManager
{
    /* @var $repository DocumentAccueilRepository */
    protected $repository;

    protected $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->repository = $this->em->getRepository(DocumentAccueil::class);
    }

    /**
     * Sauvegarder l'entité.
     */
    public function save(DocumentAccueil $documentAccueil)
    {
        $this->em->persist($documentAccueil);
        $this->em->flush();
    }

    /**
     * Supprimer le document.
     */
    public function delete(DocumentAccueil $document)
    {
        $this->em->remove($document);
        $this->em->flush();
    }

    public function findAll()
    {
        return $this->repository->findAll();
    }
}
