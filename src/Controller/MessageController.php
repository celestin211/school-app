<?php

namespace App\Controller;

use _HumbugBox373c0874430e\Nette\Utils\DateTime;
use App\Entity\Message;
use App\Entity\Utilisateur;
use App\Form\MailRechercheType;
use App\Service\MessageManager;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Http\Attribute\IsGranted;

/**
 * Message controller.
 */
#[Route(path: '/messagerie')]
class MessageController extends AbstractController
{
    const PARAM_NB_MESSAGES_PAR_PAGE='12';

    /**
     * Retourne la vue avec l'ensemble des mails de l'utilisateur (la boîte de réception).
     *
     */
    #[IsGranted('ROLE_ELEVE')]
    #[Route('/{page}', name: 'messagerie', requirements: ['id' => '\d+'], defaults: ['page' => 1], methods: ['GET'])]
    public function index($page, SessionInterface $session, EntityManagerInterface $em)
    {
        $session->set('dossier', 'messagerie');

        //Récupérer l'utilisateur connecté
        /** @var Utilisateur $currentUser */
        $currentUser = $this->getUser();

        $repository = $em->getRepository(Message::class);

        //Nombre de messages affichés par page,
        //paramètre à configurer dans le fichier parameters.yml
        $limit = 10;

        //L'indice du dernier message à afficher
        if (0 == $page) {
            $indicePremierMessage = 1;
            $page = 1;
        } else {
            $indicePremierMessage = $limit * ($page - 1) + 1;
        }

        //Récupérer les messages non supprimés reçu par $currentUser (pour la page demandée uniquement)
        $messages = $repository->getMessageFromOffset($currentUser, $limit, $indicePremierMessage - 1);

        //Nombre de messages reçus par l'utilisateur
        $nbMessagesRecus = $repository->getNbMessagesRecus($currentUser);

        if (0 == $nbMessagesRecus) {
            $indicePremierMessage = 0;
        }

        // L'indice du dernier message à afficher
        // Si l'utilisateur a moins de messages que le nombre de messages par pages, on n'affiche juste le nb de messages qu'il a
        // exemple: 5 messages dans la boite de réception et 12 messages possibles par page, on n'affiche 1-5 sur 5, et pas 1-12 sur 5
        $indiceDernierMessage = ($page * $limit > $nbMessagesRecus) ? $nbMessagesRecus : $page * $limit;

        //Nombre de pages
        $nbPages = ceil($nbMessagesRecus / $limit);

        // Si la page demandee est superieure au nombre de pages ou < 1
        if (($page > $nbPages || $page < 1) && 0 != $nbPages) {
            return $this->redirectToRoute('bac_erreur', ['code_erreur' => '404']);
        }

        //Créer le formulaire de suppression: un formulaire contient plusieurs checkbox pour sélectionner plusieurs messages
        //à supprimer à chaque fois
        $formDelete = $this->createDeleteMessagesForm($messages);

        $response = $this->render('messages/index/boite_de_reception.html.twig', [
            'messages' => $messages,
            'form' => $formDelete->createView(),
            'nbMessages' => $nbMessagesRecus,
            'indicePremierMessage' => $indicePremierMessage,
            'indiceDernierMessage' => $indiceDernierMessage,
            'page' => $page,
            'nbPages' => $nbPages,
        ]);

        $response->headers->set('Cache-Control', 'no-cache, no-store, must-revalidate');

        return $response;
    }

    /**
     * Créer des formulaires pour chaque checkbox qui s'affiche à côté d'un message
     * les checkbox sont utilisées pour faire une sélection multiple sur des messages à supprimer.
     */
    private function createDeleteMessagesForm($messages)
    {
        $formBuilder = $this->createFormBuilder()
            ->setAction($this->generateUrl('messages_delete'))
            ->setMethod(Request::METHOD_POST);

        foreach ($messages as $message) {
            //L'id de chaque checkbox serait de la forme: message_$idmessage
            $formBuilder->add('message_'.$message->getId(), CheckboxType::class, ['label' => false, 'required' => false]);
        }

        return $formBuilder->getForm();
    }

    /**
     * @param $id
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    private function createDeleteForm($id)
    {
        //Ce formulaire ne contient aucun champ, on récupère juste l'id du message à supprimer
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('message_delete', ['id' => $id]))
            ->setMethod(Request::METHOD_DELETE)
            ->getForm();
    }

    /**
     * Créer un formulaire pour restaurer un seule message par id.
     *
     * @param $id
     *
     * @return \Symfony\Component\Form\FormInterface
     */
    private function createRestaurerForm($id)
    {
        //Ce formulaire ne contient aucun champ, on récupère juste l'id du message à supprimer
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('message_restaurer', ['id' => $id]))
            ->setMethod(Request::METHOD_POST)
            ->getForm();
    }

    /**
     * Récupérer la sélection des messages à supprimer.
     *
     */
    #[IsGranted('ROLE_USER')]
    #[Route('/messages/delete', name: 'messages_delete', methods: ['POST'])]
    public function deleteMessages(Request $request, MessageManager $messageManager, LoggerInterface $logger, SessionInterface $session, EntityManagerInterface $em): RedirectResponse
    {
        $repository = $em->getRepository(Message::class);

        //Récupérer l'utilisateur connecté
        /* @var $currentUser Utilisateur */
        $currentUser = $this->getUser();

        //Récupérer les données du formulaire
        //le formulaire contient les ids des messages sélectionnés sous la forme:
        //$request->get('form') est un tableau: les clés sont de la forme: message_$idMessage je les stocke dans la variable $nomChamp
        //pour faire un parse (substr) et récupérer la valeur de l'id du message
        foreach ($request->get('form') as $nomChamp => $contenu) {
            //Le formulaire contient une autre variable aussi qui est le token
            //Je fais un if pour éviter de faire un traitement sur cette variable
            if ('message_' == substr($nomChamp, 0, 8)) {
                //Faire le parse pour récupérer l'id du message
                $idMessage = substr($nomChamp, 8, strlen($nomChamp));

                //Récupérer le message
                /* @var $message Message */
                $message = $repository->findOneBy(['id' => $idMessage, 'supprime' => 0]);

                if (null === $message) {
                    $erreur = 'MessageController.deleteMessagesAction(): le message '.$idMessage." n'a pas été trouvé";
                    $logger->error($erreur);
                    $this->createNotFoundException($erreur);
                }

                if (!$messageManager->peutSupprimer($currentUser, $message)) {
                    $erreur = 'MessageController.deleteMessagesAction(): '.$currentUser->getPrenom().' '.$currentUser->getNom().' tente de supprimer le message '.$message->getId();
                    $logger->error($erreur);
                    throw new AccessDeniedException($erreur);
                }

                //Mettre le flag supprime à 1
                $message->setSupprime(1);
            }

            // Faire le flush une seule fois, en dehors de la boucle
            $em->flush();
        }

        $dossier = $session->get('dossier');

        //Renvoyer vers la boîte de réception
        return $this->redirectToRoute($dossier);
    }

    /**
     * Deletes a Message entity.
     *
     */
    #[IsGranted('ROLE_USER')]
    #[Route('/{id}/delete', name: 'message_delete', requirements: ['id' => '\d+'], methods: ['POST', 'DELETE'])]
    public function delete(Request $request, Message $message, SessionInterface $session, MessageManager $messageManager, LoggerInterface $logger, EntityManagerInterface $em): RedirectResponse
    {
        $dossier = $session->get('dossier');

        /** @var Utilisateur $currentUser */
        $currentUser = $this->getUser();

        //Si l'utilisateur n'a pas le droit de supprimer le message, on lève une exception
        if (!$messageManager->peutSupprimer($currentUser, $message)) {
            $erreur = 'MessageController.deleteMessagesAction(): '.$currentUser->getPrenom().' '.$currentUser->getNom().' tente de supprimer le message '.$message->getId();
            $logger->error($erreur);
            throw new AccessDeniedException("Accès refusé !. L'administrateur est informé de cette action.");
        }

        $form = $this->createDeleteForm($message->getId());
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $message->setSupprime(1);
            $em->flush();
        }

        return $this->redirectToRoute($dossier);
    }

    /**
     * Afficher un message qui est dans la boite de réception.
     *
     */
    #[IsGranted('ROLE_USER')]
    #[Route('/{id}/boite_de_reception', name: 'show_message_boite_reception', requirements: ['id' => '\d+'], methods: ['GET'])]
    public function showBoiteRecepetion($id, MessageManager $messageManager, LoggerInterface $logger, SessionInterface $session, EntityManagerInterface $em): Response
    {
        /* @var $message Message */
        $message = $em->getRepository(Message::class)->findOneBy(['id' => $id, 'supprime' => 0]);

        if (!$message) {
            throw $this->createNotFoundException('Message non trouvé dans la boite de réception.');
        }

        /** @var Utilisateur $currentUser */
        $currentUser = $this->getUser();

        if (!$messageManager->peutConsulter($currentUser, $message)) {
            $erreur = 'MessageController.showBoiteRecepetionAction(): '.$currentUser->getPrenom().' '.$currentUser->getNom().' tente de consulter le message '.$message->getId();
            $logger->error($erreur);
            throw new AccessDeniedException($erreur);
        }

        // Mettre à jour la variable dossier de la session : le message demandé est dans le répertoire messagerie
        $session->set('dossier', 'messagerie');

        //Quand on appelle le show d'un message, son statut passe à Lu (s'il ne l'est pas déjà)
        if (0 == $message->getLu()) {
            $message->setLu(1);
            $message->setDateLecture(new \DateTime());
            $em->flush();
        }

        // On crée un formulaire de suppression
        $form = $this->createDeleteForm($message->getId());

        return $this->render(
            'messages/show/message_boite_reception.html.twig',
            ['message' => $message,
                'dossier' => 'messagerie',
                'form' => $form->createView(), ]
        );
    }

    /**
     * Afficher un message qui est dans les favoris.
     *
     */
    #[IsGranted('ROLE_USER')]
    #[Route('/{id}/favoris', name: 'show_message_favoris', requirements: ['id' => '\d+'], methods: ['GET'])]
    public function showFavoris($id, MessageManager $messageManager, LoggerInterface $logger, SessionInterface $session, EntityManagerInterface $em): Response
    {
        $message = $em->getRepository(Message::class)->findOneBy(['id' => $id, 'favoris' => 1]);

        if (!$message) {
            throw $this->createNotFoundException('Message non trouvé dans les favoris.');
        }

        /** @var Utilisateur $currentUser */
        $currentUser = $this->getUser();

        if (!$messageManager->peutConsulter($currentUser, $message)) {
            $erreur = 'MessageController.showBoiteFavorisAction(): '.$currentUser->getPrenom().' '.$currentUser->getNom().' tente de consulter le message '.$message->getId();
            $logger->error($erreur);
            throw new AccessDeniedException($erreur);
        }

        // Mettre à jour la variable dossier de la session : le message demandé est dans le répertoire favoris
        $session->set('dossier', 'message_favoris');

        //Quand on appelle le show d'un message, son statut passe à Lu (s'il ne l'est pas déjà)
        if (0 == $message->getLu()) {
            $message->setLu(1);
            $message->setDateLecture(new \DateTime());
            $em->flush();
        }

        // On crée un formulaire de suppression
        $form = $this->createDeleteForm($id);

        return $this->render(
            'messages/show/message_favoris.html.twig',
            ['message' => $message,
                'dossier' => 'message_favoris',
                'form' => $form->createView(), ]
        );
    }

    /**
     * Afficher un message qui est dans la corbeille.
     *
     */
    #[IsGranted('ROLE_USER')]
    #[Route('/{id}/corbeille', name: 'show_message_corbeille', requirements: ['id' => '\d+'], methods: ['GET'])]
    public function showCorbeille($id, MessageManager $messageManager, LoggerInterface $logger, SessionInterface $session, EntityManagerInterface $em): Response
    {
        $message = $em->getRepository(Message::class)->findOneBy(['id' => $id, 'supprime' => 1]);

        if (!$message) {
            throw $this->createNotFoundException('Message non trouvé dans la corbeille.');
        }

        /** @var Utilisateur $currentUser */
        $currentUser = $this->getUser();

        if (!$messageManager->peutConsulter($currentUser, $message)) {
            $erreur = 'MessageController.showCorbeilleAction(): '.$currentUser->getPrenom().' '.$currentUser->getNom().' tente de consulter le message '.$message->getId();
            $logger->error($erreur);
            throw new AccessDeniedException($erreur);
        }

        // Mettre à jour la variable dossier de la session : le message demandé est dans le répertoire favoris
        $session->set('dossier', 'message_corbeille');

        //Quand on appelle le show d'un message, son statut passe à Lu (s'il ne l'est pas déjà)
        if (0 == $message->getLu()) {
            $message->setLu(1);
            $message->setDateLecture(new \DateTime());
            $em->flush();
        }

        // On crée un formulaire de restauration
        $form = $this->createRestaurerForm($id);

        return $this->render(
            'messages/show/message_corbeille.html.twig',
            ['message' => $message,
                'dossier' => 'message_corbeille',
                'form' => $form->createView(), ]
        );
    }

    /**
     * Retourne les messages favoris d'un utilisateur.
     *
     */
    #[IsGranted('ROLE_USER')]
    #[Route('/{page}/index_favoris', name: 'message_favoris', defaults: ['page' => 1], requirements: ['id' => '\d+'], methods: ['GET'])]
    public function indexFavoris($page, SessionInterface $session, EntityManagerInterface $em)
    {
        $session->set('dossier', 'message_favoris');

        $repository = $em->getRepository(Message::class);

        //Récupérer l'utilisateur connecté
        /** @var Utilisateur $currentUser */
        $currentUser = $this->getUser();

        //Récupérer message repository
        $em = $em->getRepository(Message::class);

        //Nombre de messages affichés par page,
        //paramètre à configurer dans le fichier parameters.yml
        $limit = 12;

        //L'indice du dernier message à afficher
        if (0 == $page) {
            $indicePremierMessage = 1;
            $page = 1;
        } else {
            $indicePremierMessage = $limit * ($page - 1) + 1;
        }

        //Récupérer les messages favoris reçu par $currentUser (pour la page demandée uniquement)
        $messages = $repository->getMessageFavorisFromOffset($currentUser, $limit, $indicePremierMessage - 1);

        //Nombre de messages favoris de l'utilisateur
        $nbMessagesFavoris = $repository->getNbMessagesFavoris($currentUser);

        if (0 == $nbMessagesFavoris) {
            $indicePremierMessage = 0;
        }

        // L'indice du dernier message à afficher
        // Si l'utilisateur a moins de messages que le nombre de messages par pages, on n'affiche juste le nb de messages qu'il a
        // exemple: 5 messages dans la boite de réception et 12 messages possibles par page, on n'affiche 1-5 sur 5, et pas 1-12 sur 5
        $indiceDernierMessage = ($page * $limit > $nbMessagesFavoris) ? $nbMessagesFavoris : $page * $limit;

        //Nombre de pages
        $nbPages = ceil($nbMessagesFavoris / $limit);

        // Si la page demandee est superieure au nombre de pages ou < 1
        if (($page > $nbPages || $page < 1) && 0 != $nbPages) {
            return $this->redirectToRoute('bac_erreur', ['code_erreur' => '404']);
        }

        $formDelete = $this->createDeleteMessagesForm($messages);

        return $this->render(
            'messages/index/favoris.html.twig',
            ['messages' => $messages,
                'form' => $formDelete->createView(),
                'nbMessages' => $nbMessagesFavoris,
                'indicePremierMessage' => $indicePremierMessage,
                'indiceDernierMessage' => $indiceDernierMessage,
                'page' => $page,
                'nbPages' => $nbPages,
            ]
        );
    }

    /**
     * Ajoute ou retire un message des favoris d'un utilisateur.
     *
     */
    #[IsGranted('ROLE_USER')]
    #[Route('/update/favoris', name: 'message_update_favoris', methods: ['POST'])]
    public function updateFavoris(MessageManager $messageManager, LoggerInterface $logger, EntityManagerInterface $em): RedirectResponse
    {
        $idMessage = $_POST['idMessage'];

        /** @var $message Message */
        $message = $em->getRepository(Message::class)->findOneBy(['id' => $idMessage, 'supprime' => 0]);

        if (!$message) {
            throw $this->createNotFoundException("MessageController.addFavorisAction: aucun message n'est trouvé avec l'id: ".$message);
        }

        /** @var Utilisateur $currentUser */
        $currentUser = $this->getUser();

        if (!$messageManager->peutConsulter($currentUser, $message)) {
            $erreur = 'MessageController.showBoiteFavorisAction(): '.$currentUser->getPrenom().' '.$currentUser->getNom()." tente d'ajouter le message ".$message->getId().'aux faovris';
            $logger->error($erreur);
            throw new AccessDeniedException($erreur);
        }

        //Récupérer le flag de favoris actuel
        $flagFavorisActuel = $message->getFavoris();

        //Si favorisActuel == 1 : favorisNew = 0
        //Si favorisActuel == 0 : favorisNew = 1
        $favorisNew = !$flagFavorisActuel;
        $message->setFavoris($favorisNew);

        $em->flush();

        //Renvoyer vers la page de réception
        return $this->redirectToRoute('messagerie');
    }

    /**
     * Retourne la vue avec l'ensemble des mails supprimés d'un utilisateur.
     *
     */
    #[IsGranted('ROLE_USER')]
    #[Route('/{page}/index_corbeille', name: 'message_corbeille', defaults: ['page' => 1], requirements: ['id' => '\d+'], methods: ['GET'])]
    public function indexCorbeille($page, SessionInterface $session, EntityManagerInterface $em)
    {
        $session->set('dossier', 'message_corbeille');

        //Récupérer l'utilisateur connecté
        /** @var Utilisateur $currentUser */
        $currentUser = $this->getUser();

        $repository = $em->getRepository(Message::class);

        //Nombre de messages affichés par page,
        //paramètre à configurer dans le fichier parameters.yml
        $limit = 12;

        //L'indice du dernier message à afficher
        if (0 == $page) {
            $indicePremierMessage = 1;
            $page = 1;
        } else {
            $indicePremierMessage = $limit * ($page - 1) + 1;
        }

        //Récupérer les messages  supprimés  par $currentUser (pour la page demandée uniquement)
        $messages = $repository->getMessageCorbeilleFromOffset($currentUser, $limit, $indicePremierMessage - 1);

        //Nombre de messages supprimés par l'utilisateur
        $nbMessagesCorbeille = $repository->getNbMessagesCorbeille($currentUser);

        if (0 == $nbMessagesCorbeille) {
            $indicePremierMessage = 0;
        }

        // L'indice du dernier message à afficher
        // Si l'utilisateur a moins de messages que le nombre de messages par pages, on n'affiche juste le nb de messages qu'il a
        // exemple: 5 messages dans la corbeille et 12 messages possibles par page, on n'affiche '1-5 sur 5', et pas '1-12 sur 5'
        $indiceDernierMessage = ($page * $limit > $nbMessagesCorbeille) ? $nbMessagesCorbeille : $page * $limit;

        //Nombre de pages
        $nbPages = ceil($nbMessagesCorbeille / $limit);

        // Si la page demandee est superieure au nombre de pages ou < 1
        if (($page > $nbPages || $page < 1) && 0 != $nbPages) {
            return $this->redirectToRoute('bac_erreur', ['code_erreur' => '404']);
        }

        //Créer le formulaire de suppression: un formulaire contient plusieurs checkbox pour sélectionner plusieurs messages
        //à supprimer à chaque fois
        $formDelete = $this->createRestaurerMessagesForm($messages);

        return $this->render('messages/index/corbeille.html.twig', [
            'messages' => $messages,
            'form' => $formDelete->createView(),
            'nbMessages' => $nbMessagesCorbeille,
            'indicePremierMessage' => $indicePremierMessage,
            'indiceDernierMessage' => $indiceDernierMessage,
            'page' => $page,
            'nbPages' => $nbPages,
        ]);
    }

    /**
     * Créer des formulaires pour chaque checkbox qui s'affiche à côté d'un message
     * les checkbox sont utilisées pour faire une sélection multiple sur des messages à restaurer.
     */
    private function createRestaurerMessagesForm($messages)
    {
        $formBuilder = $this->createFormBuilder()
            ->setAction($this->generateUrl('messages_restaurer'))
            ->setMethod(Request::METHOD_POST);

        foreach ($messages as $message) {
            //L'id de chaque checkbox serait de la forme: message_$idmessage
            $formBuilder->add('message_'.$message->getId(), CheckboxType::class, ['label' => false, 'required' => false]);
        }

        return $formBuilder->getForm();
    }

    /**
     * Restaurer des messages supprimés.
     */
    #[Route('/messages/restaurer', name: 'messages_restaurer', methods: ['POST'])]
    public function restaurerMessages(Request $request, MessageManager $messageManager, LoggerInterface $logger, EntityManagerInterface $em): RedirectResponse
    {
        $repository = $em->getRepository(Message::class);

        /** @var Utilisateur $currentUser */
        $currentUser = $this->getUser();

        //Récupérer les données du formulaire
        //le formulaire contient les ids des messages sélectionnés sous la forme:
        //$request->get('form') est un tableau: les clés sont de la forme: message_$idMessage je les stocke dans la variable $nomChamp
        //pour faire un parse (substr) et récupérer la valeur de l'id du message
        foreach ($request->get('form') as $nomChamp => $contenu) {
            //Le formulaire contient une autre variable aussi qui est le token
            //Je fais un if pour éviter de faire un traitement sur cette variable
            if ('message_' == substr($nomChamp, 0, 8)) {
                //Faire le parse pour récupérer l'id du message
                $idMessage = substr($nomChamp, 8, strlen($nomChamp));

                //Récupérer le message
                $message = $repository->findOneBy(['id' => $idMessage, 'supprime' => 1]);

                if (!$messageManager->peutRestaurer($currentUser, $message)) {
                    $erreur = 'MessageController.showCorbeilleAction(): '.$currentUser->getPrenom().' '.$currentUser->getNom().' tente de restaurer le message '.$message->getId();
                    $logger->error($erreur);
                    throw new AccessDeniedException($erreur);
                }

                //Mettre le flag supprime à 1
                $message->setSupprime(0);
            }

            // Faire le flush une seule fois, en dehors de la boucle
            $em->flush();
        }

        //Renvoyer vers la boîte de réception
        return $this->redirectToRoute('message_corbeille');
    }

    /*
     * Restaurer le message $message
     */
    #[Route('/{id}/message/restaurer', name: 'message_restaurer', requirements: ['id' => '\d+'], methods: ['POST'])]
    public function restaurer(Request $request, $id, MessageManager $messageManager, LoggerInterface $logger, EntityManagerInterface $em): RedirectResponse
    {
        $form = $this->createRestaurerForm($id);
        $form->handleRequest($request);
        /** @var Utilisateur $currentUser */
        $currentUser = $this->getUser();

        if ($form->isSubmitted() && $form->isValid()) {
            $message = $em->getRepository(Message::class)->findOneBy(['id' => $id, 'supprime' => 1]);

            if (!$messageManager->peutRestaurer($currentUser, $message)) {
                $erreur = 'MessageController.showCorbeilleAction(): '.$currentUser->getPrenom().' '.$currentUser->getNom().' tente de restaurer le message '.$message->getId();
                $logger->error($erreur);
                throw new AccessDeniedException($erreur);
            }

            $message->setSupprime(0);

            $em->flush();
        }

        return $this->redirectToRoute('message_corbeille');
    }

    /**
     *
     * La variable dossier represente le dossier depuis lequel on fait la recherche (favoris, boite de réception ou corbeille)
     */
    public function createSearchForm()
    {
        $form = $this->createForm(MailRechercheType::class, null, [
            'action' => $this->generateUrl('mail_rechercher'),
            'method' => 'POST',
        ]);

        return $this->render('messages/search/form.html.twig', ['form' => $form->createView()]);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('/{page}/search', name: 'mail_rechercher', defaults: ['page' => 1])]
    public function searchMail(Request $request, $page, SessionInterface $session, EntityManagerInterface $em)
    {
        //Récupérer l'utilisateur connecté
        /** @var Utilisateur $currentUser */
        $currentUser = $this->getUser();

        $dossier = $session->get('dossier');

        //On peut avoir plusieurs pages de résultat lors d'une recherche (on perd le mot clé en changeant les pages, d'où l'intrêt de le mettre dans une variable de session à la première requête

        if (isset($request->request->all('cisirh_bacbundle_mail_search')['motcle'])) {
            $motcle = $request->request->all('cisirh_bacbundle_mail_search')['motcle'];
            $session->set('motcle', $motcle);
        } else {
            //Au passage à une autre page, on recupère le mot clé depuis la variable de session
            $motcle = $session->get('motcle');

        }

        $repository = $em->getRepository(Message::class);

        //Nombre de messages affichés par page,
        //paramètre à configurer dans le fichier parameters.yml
        $limit = 12;

        //L'indice du dernier message à afficher
        $indicePremierMessage = $limit * ($page - 1) + 1;

        //La requete search: search (Utilisateur $user,$limit,$offset, $motcle, $supprime = null,$favoris=null)
        switch ($dossier) {
            case 'messagerie':
                //Si la recherche a été faite depuis la boite de réception, on cherche les messages non supprimés
                $messages = $repository->search($currentUser, $limit, $indicePremierMessage - 1, $motcle, false);

                //Nombre de messages trouvés après la recherche
                $nbMessagesTrouves = $repository->getNbsearch($currentUser, $motcle, false);

                //Créer le formulaire de suppression
                $form = $this->createDeleteMessagesForm($messages);

                $vue = 'boite_de_reception.html.twig';

                break;

            case 'message_favoris':
                //Si la recherche a été faite depuis les favoris, on cherche les messages favoris non supprimés uniquement
                $messages = $repository->search($currentUser, $limit, $indicePremierMessage - 1, $motcle, false, true);

                //Nombre de messages trouvés après la recherche
                $nbMessagesTrouves = $repository->getNbsearch($currentUser, $motcle, false, true);

                //Créer le formulaire de suppression
                $form = $this->createDeleteMessagesForm($messages);

                $vue = 'favoris.html.twig';

                break;

            case 'message_corbeille':
                //Si la recherche a été faite depuis la corbeille, on cherche les messages supprimés uniquement
                $messages = $repository->search($currentUser, $limit, $indicePremierMessage - 1, $motcle, true);

                //Nombre de messages trouvés après la recherche
                $nbMessagesTrouves = $repository->getNbsearch($currentUser, $motcle, true);

                //Si on est dans la corbeille, on crée un formulaire de restauration
                $form = $this->createRestaurerMessagesForm($messages);

                $vue = 'corbeille.html.twig';

                break;

            default:
                throw new \Exception('MessageController.searchMailAction(): dossier inconnu !!');
        }

        if (0 == $nbMessagesTrouves) {
            $indicePremierMessage = 0;
        }

        // L'indice du dernier message à afficher
        // Si l'utilisateur a moins de messages que le nombre de messages par pages, on n'affiche juste le nb de messages qu'il a
        // exemple: 5 messages dans la boite de réception et 12 messages possibles par page, on n'affiche 1-5 sur 5, et pas 1-12 sur 5
        $indiceDernierMessage = ($page * $limit > $nbMessagesTrouves) ? $nbMessagesTrouves : $page * $limit;

        //Nombre de pages
        $nbPages = ceil($nbMessagesTrouves / $limit);

        // Si la page demandee est superieure au nombre de pages ou < 1
        if (($page > $nbPages || $page < 1) && 0 != $nbPages) {
            return $this->redirectToRoute('bac_erreur', ['code_erreur' => '404']);
        }

        return $this->render('Message/search/'.$vue, [
            'messages' => $messages,
            'form' => $form->createView(),
            'nbMessages' => $nbMessagesTrouves,
            'indicePremierMessage' => $indicePremierMessage,
            'indiceDernierMessage' => $indiceDernierMessage,
            'page' => $page,
            'nbPages' => $nbPages,
            'motcle' => $motcle,
            'dossier' => $dossier,
        ]);
    }
}
