<?php

declare(strict_types=1);

namespace App\Manager;

use App\Entity\Direction;
use App\Entity\Utilisateur;
use App\Service\Mailer;
use App\Twig\AppExtension;
use App\Util\Util;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UtilisateurManager
{
    /** @var EntityManagerInterface */
    private $em;

    /** @var UserPasswordHasherInterface */
    private $passwordHasher;

    /** @var Mailer */
    private $mailer;

    /** @var SecurityManager */
    private $securityManager;

    /** @var Security */
    private $security;

    private $repository;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        Mailer $mailer,
        SecurityManager $securityManager,
        Security $security
    ) {
        $this->em = $entityManager;
        $this->passwordHasher = $passwordHasher;
        $this->mailer = $mailer;
        $this->securityManager = $securityManager;
        $this->security = $security;
        $this->repository = $this->em->getRepository(Utilisateur::class);
    }

    public function creerUtilisateur(Utilisateur $utilisateur, $role)
    {
        // mot de passe généré par defaut
        $motDePasse = $this->securityManager->generateToken();
        $motDePasseEncode = $this->passwordHasher->hashPassword($utilisateur, $motDePasse);

        $utilisateur->setPassword($motDePasseEncode);
        $utilisateur->setConfirmationToken($this->securityManager->generateToken());
        $utilisateur->setRoles([$role]);

        $this->mailer->envoyerEmailCreationCompteUtilisateur($utilisateur);
        $this->em->persist($utilisateur);
        $this->em->flush();
    }

    public function flush()
    {
        $this->em->flush();
    }

    public function getUtilisateurs()
    {
        if ($this->security->isGranted('ROLE_ADMIN_DGAFP')) {
            return $this->repository->getUtilisateursNotAdmin();
        }

        return $this->repository->findAll([], ['email' => 'desc']);
    }

    public function activerUtilisateur(Utilisateur $utilisateur)
    {
        $utilisateur->setEnabled(true);
        $this->em->flush();
    }

    public function desactiverUtilisateur(Utilisateur $utilisateur)
    {
        $utilisateur->setEnabled(false);
        $this->em->flush();
    }

    public function redifinirPasswordUtilisateur(Utilisateur $utilisateur, array $data)
    {
        $utilisateur->setEnabled(true);
        $utilisateur->setLocked(false);
        $utilisateur->setConfirmationToken(null);
        $utilisateur->addRole('ROLE_CHANGE_PASSWORD');
        $utilisateur->setNbConnexionKO(0);
        $utilisateur->setPassword($this->passwordHasher->hashPassword($utilisateur, $data['newPassword']));
        $this->em->flush();
    }

    public function exporterUtilisateurs()
    {
        $utilisateurConnecte = $this->security->getUser();

        $query = $this->repository->getUtilisateurs($utilisateurConnecte, true);

        $iterableResult = $query->iterate();

        $response = new StreamedResponse();
        $response->setCallback(function () use ($iterableResult) {
            $handle = fopen('php://output', 'w+');
            // UTF-8 BOM pour qu'il soit correctement lisible par Excel
            fputs($handle, "\xEF\xBB\xBF");

            // Nom des colonnes du CSV
            fputcsv($handle, [
                'Civilité',
                'Prénom',
                'Nom',
                'Email',
                'Ministère(s)/Direction(s)',
                'Profil',
              ], ';');

            foreach ($iterableResult as $row) {
                /* @var $utilisateur Utilisateur */
                $utilisateur = $row[0];

                //Ecriture dans le CSV
                fputcsv($handle, [
                    Util::twig_title($utilisateur->getCivilite()),
                    Util::twig_title($utilisateur->getPrenom()),
                    Util::twig_upper($utilisateur->getNom()),
                    Util::twig_lower($utilisateur->getEmail()),
                    $this->formatDirections($utilisateur->getDirections()),
                    AppExtension::role($utilisateur->getRole()),
                ], ';');
            }

            fclose($handle);
        });

        $response->setStatusCode(200);
        $response->headers->set('Content-Type', 'text/csv; charset=ISO-8859-1');
        $response->headers->set('Content-Disposition', 'attachment; filename="Utilisateurs.csv"');

        return $response;
    }

    private function formatDirections($directions): string
    {
        $result = '';

        /* @var Direction $direction */
        foreach ($directions as $direction) {
            if (empty($result)) {
                $result .= $direction->getMinistere()->getLibelleCourt().' / '.$direction->getLibelleLong();
            } else {
                $result .= PHP_EOL.$direction->getMinistere()->getLibelleCourt().' / '.$direction->getLibelleLong();
            }
        }

        return $result;
    }
}
