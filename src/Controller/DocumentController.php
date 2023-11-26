<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Document;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route(path: '/document')]
class DocumentController extends AbstractController
{
    #[IsGranted('ROLE_USER')]
    #[Route(path: '/show/{id}', name: 'document_show', requirements: ['id' => '\d+'])]
    public function show(EntityManagerInterface $entityManager, $id): BinaryFileResponse
    {
        $document = $entityManager->getRepository(Document::class)->findOneDocumentBy($id);

        $filename = $document->getAbsolutePath();


        $response = new BinaryFileResponse($filename, 200, [''], true, 'attachment');

        $response->setContentDisposition(
            ResponseHeaderBag::DISPOSITION_ATTACHMENT,
            $document->getNom()

        );
        return $response;
    }
}
