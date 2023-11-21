<?php

namespace App\Controller;

use App\Entity\Cours;
use App\Entity\Document;
use App\Entity\Professeur;
use App\Entity\Utilisateur;
use App\Form\CoursEditType;
use App\Repository\ProfesseurRepository;
use App\Security\CoursVoter;
use App\Manager\CoursManager;
use App\Service\UtilisateurManager;
use App\Util\Util;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Annotation\Route;
use App\EnumTypes\EnumFlashType;
use App\Security\ProfesseurVoter;
use App\Service\ProfesseurManager;
use App\Form\CoursType;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * Cours controller.
 */
#[Route(path: '/cours')]
class CoursPourEleveController extends AbstractController
{
    #[Route(path: '/', name: 'cours', methods: ['GET', 'POST'])]
    public function index(): Response
    {

        return $this->render('cours_pour_eleve/index.html.twig', [
            'controller_name' => 'CoursPourEleveController',
        ]);
    }

    /**
     * Finds and displays a Utilisateur entity.
     *
     */
    #[Route(path: '/{id}/show', name: 'cours_show', methods: ['GET'])]
    #[IsGranted('ROLE_PROFESSEUR')]
    public function show( EntityManagerInterface $em)
    {
        /* @var Cours $cours */

        $coursAndStudent = $em->getRepository(Cours::class)->findAll();

        return $this->render('cours/show.html.twig', [
            'coursAndStudent' => $coursAndStudent,
        ]);
    }

    #[Route("/new", name: "new_cours", methods: ['GET', 'POST'])]
    #[IsGranted('ROLE_PROFESSEUR')]
    public function new(Request $request, ProfesseurManager $professeurManager, EntityManagerInterface $em): Response
    {

        $cours = new Cours();
        //$this->denyAccessUnlessGranted(ProfesseurVoter::CREER, $cours);
        $form = $this->createForm(CoursType::class, $cours);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $professeurManager->peutcreerUCours($cours);
            $this->addFlash(EnumFlashType::SUCCES, 'Le cours a bien été ajouté');

            return $this->redirectToRoute('cours');
        }

        return $this->render(
            'cours_pour_eleve/new_cours.html.twig',
            [
                'cours' => $cours,
                'form' => $form->createView(),
               ]);

    }

    #[Route(path: '/{id}/edit', name: 'cours_edit', methods: ['GET'])]
    #[IsGranted('ROLE_PROFESSEUR')]
    public function edit(Request $request)
    {

        return $this->render('cours_pour_eleve/edit.html.twig', [

        ]);
    }
    /**
     * Deletes a Utilisateur entity.
     *
     */
    #[Route(path: '/{id}/delete', name: 'utilisateur_delete',  methods: ['POST', 'DELETE'])]
    #[IsGranted('ROLE_PROFESSEUR')]
    public function delete(Request $request, Cours $cours, UtilisateurManager $utilisateurManager, EntityManagerInterface $em)
    {
        //Voter
        /* @var Utilisateur $utilisateur */
        $roleUtilisateurASupprimer = $utilisateur->getRoles()[0];
        $utilisateurManager->peutFaireActionDGAFP($this->getUser(), $roleUtilisateurASupprimer);

        $form = $this->createDeleteForm($cours);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if ($utilisateur->getId() != $this->getUser()->getId()) {
                $utilisateur->setEnabled(false);
                $em->flush();
                try {
                    $em->remove($cours);
                    $em->flush();
                    $this->addFlash('success', 'cours "' . $cours->getNom() . ' " supprimé !');
                } catch (\Exception $e) {
                    $this->addFlash('danger', "Le " . $cours->getNom() .  " ne peut pas être supprimé car il dispose d'un historique. Il a cependant été désactivé.");
                }
            }
        }

        return $this->redirectToRoute('utilisateur');
    }


   private function createEditForm(Cours $cours)
   {
       return $this->createFormBuilder()
           ->setAction($this->generateUrl('cours_edit', ['id' => $cours->getId()]))
           ->setMethod(Request::METHOD_DELETE)
           ->getForm();
   }

    private function createDeleteForm(Cours $cours)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('cours_delete', ['id' => $cours->getId()]))
            ->setMethod(Request::METHOD_DELETE)
            ->getForm();
    }


    #[Route(path: '/cours-pagination', name: 'cours-pagination', methods: ['GET', 'POST'])]
    #[IsGranted('ROLE_PROFESSEUR')]
    public function pagination(Request $request, ProfesseurRepository $professeurRepository): \Symfony\Component\HttpFoundation\JsonResponse
    {
        $draw = $request->get('draw', 1);
        $start = $request->get('start', 0);
        $length = $request->get('length', 10);
        $search = $request->get('search', ['value' => ''])['value'];
        $order = $request->get('order', [['column' => 1, 'dir' => 'asc']]);

        $nbCours = $professeurRepository->searchCount($this->isGranted('ROLE_PROFESSEUR'));

        $professeurs = $professeurRepository->search($search, $start, $length, $order, $this->isGranted('ROLE_PROFESSEUR'));

        $recordsFiltered = $professeurRepository->searchCount($this->isGranted('ROLE_PROFESSEUR'), $search);

        $data = [];

        /* @var Professeur $professeur */
        foreach ($professeurs as $prof) {

            $professeur = $prof[0];
            $statut = $prof['statut'];

            $data[] = [
                Util::twig_upper($professeur->getTelephone()),
                Util::twig_upper($professeur->getNom()),
                Util::twig_title($professeur->getPrenom()),
                Util::twig_lower($professeur->getEmail()),
                Util::twig_lower($professeur->getEmail()),
                Util::twig_lower($professeur->getEleves()),
                Util::twig_lower($professeur->getExperience()),
                Util::twig_lower($professeur->getCours()),
                $prof['role'],
                $this->render('Utilisateur/_include/statut.html.twig', ['utilisateur' => $professeur, 'statut' => $statut])->getContent(),
                $this->render('Utilisateur/_include/actions.html.twig', ['utilisateur' => $professeur,
                    'deleteForm' => $this->createDeleteForm($professeur)->createView(),
                    'editForm'=> $this->createEditForm($professeur->createView())
                ])->getContent(),
            ];
        }

        $response = [
            'draw' => $draw,
            'recordsTotal' => $nbCours,
            'recordsFiltered' => $recordsFiltered,
            'data' => $data,
        ];

        return $this->json($response);
    }
    #[Route(path: '/cours-envoyer-professeur/{id}', name: 'cours_envoyer_professeur', requirements: ['id' => '\d+'], methods: ['PUT'])]
    public function envoyerours(Request $request, Cours $cours, CoursManager $coursManager, ValidatorInterface $validator): RedirectResponse|Response
    {
        $this->denyAccessUnlessGranted(CoursVoter::ENVOYER_PROFESSEUR, $cours);

        $form = $this->createEnvoyerCoursForm($cours);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $errors = $validator->validate($cours, null, ['envoyerProfesseur']);

            if ($errors->count() > 0) {
                $editForm = $this->createForm(
                    CoursEditType::class,
                    $cours,
                    [
                        'action' => $this->generateUrl('cours_edit', ['id' => $cours->getId()]),
                        'validation_groups' => ['envoyerProfesseur'],
                    ]
                );

                $editForm->submit([], false);
                $editForm->isValid();
                $formErrors = $editForm->getErrors(true);

                return $this->render('cours/edit.html.twig', [
                    'cours' => $cours,
                    'form' => $editForm->createView(),
                    'errors' => $formErrors,
                ]);
            }
            //$professeur = $professeurRepository->findOneBy();
            $coursManager->envoyerCours($cours);
            $this->addFlash('notice', "Le cours  a bien été transmis par votre ");
        }
        return $this->redirectToRoute('bac_homepage');
    }
}
