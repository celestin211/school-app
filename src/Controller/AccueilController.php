<?php

namespace App\Controller;

use App\Entity\Connexion;
use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Request;


/**
 * Accueil controller.
 */
class AccueilController extends AbstractController
{

    /**
     * Retourne la vue Accueil.
     *
     */
    #[Route(path: '/', name: 'bac_homepage', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function index(
        EntityManagerInterface $entityManager, int $montant = 1): Response
    {

        /* @var Utilisateur $utilisateur */
        $utilisateur = $this->getUser();


        $connexionRepository = $entityManager->getRepository(Connexion::class);

        $connexions = $connexionRepository->getNbConnexions($utilisateur);

        $labels  = [];
        $data = [];
        foreach ($connexions as $connexion) {
            array_unshift($labels, $connexion['dateConnexion']->format('d/m/Y'));
            array_unshift($data, $connexion['nbConnexions']);

        }

        return $this->render('accueil/index.html.twig', [
            'labels' => $labels,
            'data' => $data,
        ]);
    }


    /**
     * Retourne la vue Accueil.
     *
     */
    #[Route(path: '/test', name: 'test', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function test(): Response
    {

        return $this->render('accueil/test.html.twig', [
        ]);
    }

    #[Route(path: '/home', name: 'home', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function home(): Response
    {

        return $this->render('base.priceless.html.twig', [
        ]);
    }

    #[Route(path: '/task', name: 'task', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function task(): Response
    {

        return $this->render('task/index.html.twig', [
        ]);
    }

    #[Route(path: '/annuaire-rgaa', name: 'annuaire_index', methods: ['GET'])]
    public function annuaire(Request $request)
    {
        return $this->render('', [

        ]);
    }

    #[Route(path: '/texte_reference', name: 'texte_reference', methods: ['GET'])]
    public function texte_reference(Request $request)
    {
        return $this->render('', [

        ]);
    }

    #[Route(path: '/documents_complementaire', name: 'documents_complementaire', methods: ['GET'])]
    public function documents_complementaire(Request $request)
    {
        return $this->render('', [

        ]);
    }

    #[Route(path: '/cap', name: 'cap', methods: ['GET'])]
    public function cap(Request $request)
    {
        return $this->render('', [

        ]);
    }

    #[Route(path: '/faq', name: 'faq', methods: ['GET'])]
    public function faq(Request $request)
    {
        return $this->render('', [

        ]);
    }

    #[Route(path: '/guide_utilisateur', name: 'guide_utilisateur', methods: ['GET'])]
    public function guide_utilisateur(Request $request)
    {
        return $this->render('', [

        ]);
    }

    #[Route(path: '/toggle-menu', name: 'toggle_menu', methods: ['GET'])]
    public function toggleMenu(Request $request): JsonResponse
    {
        if ($request->isXmlHttpRequest()) {
            /* @var $session Session */
            $session = $request->getSession();
            $status = $session->get('toggleMenu', true);
            $session->set('toggleMenu', !$status);

            return new JsonResponse(['status' => 'ok']);
        }

        return new JsonResponse(['status' => 'ko'], 404);
    }

    #[Route(path: '/plan-site', name: 'page_plan_site', methods: ['GET'])]
    public function planSite(): Response
    {
        return $this->render('Accueil/plan_site.html.twig');
    }

}
