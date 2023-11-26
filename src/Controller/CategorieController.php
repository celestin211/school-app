<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Entity\Utilisateur;
use App\Repository\CategorieRepository;
use App\Security\CategorieVoter;
use App\Form\CategorieType;
use App\Manager\CategorieManager;
use App\Repository\UtilisateurRepository;
use App\Service\UtilisateurManager;
use App\Util\Util;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;



#[Route(path: '/categorie')]
class CategorieController extends AbstractController
{
    /**
     * Lists all Utilisateur entities.
     *
     */
    #[Route(path: '/', name: 'categorie_index', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN')]
    public function index()
    {
        $categorie = new Categorie();
        $form = $this->createForm(CategorieType::class, $categorie);
        return $this->render('categorie/index.html.twig'
        , ['form'=>$form->createView()]);
    }
    /**
     * Displays a form to edit an existing Categorie entity.
     *
     */
    #[Route(path: '/{id}/edit', name: 'categorie_creer',  methods: ['GET', 'POST', 'PUT'])]
    #[IsGranted('ROLE_ADMIN')]
    public function edit( Request $request, $id, EntityManagerInterface $em, CategorieManager $categorieManager)
    {
        $this->denyAccessUnlessGranted(CategorieVoter::MODIFIER);
        $categorie = $em->getRepository(Categorie::class)->findOneBy(['id'=>$id]);
        $form = $this->createForm(CategorieType::class, $categorie);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $role = $form->get('role')->getData();
            $categorieManager->peutModifier($categorie);
            $categorie->setRoles([$role]);
            $em->flush();
            $this->addFlash('success', 'Categorie "'.$categorie->getNom().'" mis à jour avec succès !');

            return $this->redirectToRoute('categorie');
        }

        return $this->render('Utilisateur/new-user.html.twig', [
            'categorie' => $categorie,
            'form' => $form->createView(),
        ]);
    }

    #[Route('{id}/show', name: 'categorie_voir', methods: ['GET'])]
    #[IsGranted('ROLE_PROFESSEUR')]
    public function show()
    {

    }


    #[Route('/new', name: 'categorie_creer', methods: ['GET', 'POST'])]
    #[IsGranted('ROLE_PROFESSEUR')]
    public  function new(Request $request, CategorieManager $categorieManager)
    {
        $categorie = new Categorie();
        $form = $this->createForm(CategorieType::class, $categorie);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $role = $form->get('role')->getData();
            //Todo: Créer un voter
            $categorieManager->save($categorie, $role);
            $this->addFlash('success', 'Categorie "'.$categorie->getNom().'" créé avec succès !');

            return $this->redirectToRoute('cours_show');
        }

        return $this->render('categorie/index.html.twig', [
            'categorie' => $categorie,
            'form' => $form->createView(),
        ]);
    }

    #[Route(path: '/pagination', name: 'pagination', methods: ['GET', 'POST'])]
    #[IsGranted('ROLE_PROFESSEUR')]
    public function pagination(Request $request, UtilisateurRepository $utilisateurRepository): \Symfony\Component\HttpFoundation\JsonResponse
    {
        $draw = $request->get('draw', 1);
        $start = $request->get('start', 0);
        $length = $request->get('length', 10);
        $search = $request->get('search', ['value' => ''])['value'];
        $order = $request->get('order', [['column' => 1, 'dir' => 'asc']]);

        $nbUtilisateurs = $utilisateurRepository->searchCount($this->isGranted('ROLE_PROFESSEUR'));

        $lignes = $utilisateurRepository->search($search, $start, $length, $order, $this->isGranted('ROLE_ADMIN'));

        $recordsFiltered = $utilisateurRepository->searchCount($this->isGranted('ROLE_ADMIN'), $search);


        $data = [];

        /* @var Categorie $categorie */
        foreach ($lignes as $ligne) {

            $categorie = $ligne[0];
            $statut = $ligne['statut'];

            $data[] = [
                Util::twig_title($categorie->getNom()),
                Util::twig_title($categorie->getText()),
                $this->render('Utilisateur/_include/statut.html.twig', ['utilisateur' => $categorie, 'statut' => $statut])->getContent(),
                $this->render('Utilisateur/_include/actions.html.twig', ['utilisateur' => $categorie,
                    'deleteForm' => $this->createDeleteForm($categorie)->createView(),
                    'editForm' => $this->createEditForm($categorie)->createView(),
                    'DeleteForm'=>$this->DeleteForm($categorie)->createView(),
                ])->getContent(),
            ];
        }

        $response = [
            'draw' => $draw,
            'recordsTotal' => $nbUtilisateurs,
            'recordsFiltered' => $recordsFiltered,
            'data' => $data,
        ];

        return $this->json($response);

    }

    /**
     * Creates a form to unlock a Utilisateur entity by id.
     *
     * @param $id
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('categorie_delete', ['id' => $id]))
            ->setMethod(Request::METHOD_PUT)
            ->getForm();
    }


    /**
     * Creates a form to unlock a Utilisateur entity by id.
     *
     * @param $id
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    private function createEditForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('categorie_edit', ['id' => $id]))
            ->setMethod(Request::METHOD_PUT)
            ->getForm();
    }

    /**
     * Creates a form to unlock a Utilisateur entity by id.
     *
     * @param $id
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    private function DeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('categorie_edit', ['id' => $id]))
            ->setMethod(Request::METHOD_PUT)
            ->getForm();
    }

    /**
     * Deletes a Utilisateur entity.
     *
     */
    #[Route(path: '/{id}/delete', name: 'categorie_supprimer',  methods: ['POST', 'DELETE'])]
    #[IsGranted('ROLE_PROFESSEUR')]
    public function delete($id, CategorieRepository $categorieRepository, Request $request, Utilisateur $utilisateur, CategorieManager $categorieManager, EntityManagerInterface $em)
    {
        //Voter

        $this->denyAccessUnlessGranted(CategorieVoter::SUPPRIMER);
        $categorie = $categorieRepository->findOne($id);

        $form = $this->createDeleteForm($categorie);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
                try {
                    $categorieManager->remove($categorie);
                    $em->flush();
                    $this->addFlash('success', 'Catégorie "' . $categorie->getNom() . ' " supprimé !');
                } catch (\Exception $e) {
                    $this->addFlash('danger', "La catégorie " . $utilisateur->getNom() .  " ne peut pas être supprimé car il dispose d'un historique. Il a cependant été désactivé.");
                }
            }

        return $this->redirectToRoute('categorie_index');
    }
}
