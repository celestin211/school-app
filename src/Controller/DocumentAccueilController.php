<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\DocumentAccueil;
use App\Form\DocumentAccueilType;
use App\Service\DocumentAccueilManager;
use App\Service\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\ExpressionLanguage\Expression;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route(path: '/document')]
class DocumentAccueilController extends AbstractController
{
    #[IsGranted('ROLE_USER')]
    #[Route(path: '/', name: 'documents_index', methods: ['GET'])]
    public function index(DocumentAccueilManager $documentAccueilManager): Response
    {
        $documents = $documentAccueilManager->findAll();

        $deleteForms = $this->createDeleteForms($documents);

        return $this->render('documents/index.html.twig', [
            'documents' => $documents,
            'deleteForms' => $deleteForms,
        ]);
    }

    #[IsGranted(new Expression('is_granted("ROLE_ADMIN") or is_granted("ROLE_ADMIN_DGAFP")'))]
    #[Route(path: '/new', name: 'documents_new', methods: ['GET', 'POST'])]
    public function new(Request $request, DocumentAccueilManager $documentAccueilManager): RedirectResponse|Response
    {
        $documentAccueil = new DocumentAccueil();
        $form = $this->createForm(DocumentAccueilType::class, $documentAccueil);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $documentAccueilManager->save($documentAccueil);
            $this->addFlash('notice', 'Document enregistré avec succés');

            return $this->redirectToRoute('documents_index');
        }

        return $this->render('documents/new.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    private function createDeleteForms($documents): array
    {
        $deleteForms = [];

        foreach ($documents as $document) {
            $deleteForms[] = $this->createDeleteForm($document)->createView();
        }

        return $deleteForms;
    }

    private function createDeleteForm(DocumentAccueil $document): FormInterface
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('document_delete', ['id' => $document->getId()]))
            ->setMethod('DELETE')
            ->getForm();
    }

    #[IsGranted(new Expression('is_granted("ROLE_ADMIN"'))]
    #[Route(path: '/delete/{id}', name: 'document_delete')]
    public function delete(DocumentAccueil $document, DocumentAccueilManager $documentManager): RedirectResponse
    {
        $documentManager->delete($document);

        $this->addFlash('notice', 'Arrêté supprimé avec succès !');

        return $this->redirectToRoute('documents_index');
    }
}
