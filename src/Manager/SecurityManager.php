<?php

declare(strict_types=1);

namespace App\Manager;

use App\Entity\Utilisateur;
use App\Security\ChangePasswordAuthenticator;
use App\Service\Mailer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Authentication\UserAuthenticatorInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class SecurityManager
{
    /** @var EntityManagerInterface */
    private $em;

    /** @var UserPasswordHasherInterface */
    private $passwordHasher;

    /** @var Mailer */
    private $mailer;

    /** @var int */
    private $dureeVieToken;

    /**
     * @var UserAuthenticatorInterface
     */
    private $authenticator;

    /**
     * @var ChangePasswordAuthenticator
     */
    private $changePasswordAuthenticator;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        Mailer $mailer,
        int $dureeVieToken,
        ChangePasswordAuthenticator $changePasswordAuthenticator,
        UserAuthenticatorInterface $authenticator
    ) {
        $this->em = $entityManager;
        $this->passwordHasher = $passwordHasher;
        $this->mailer = $mailer;
        $this->dureeVieToken = $dureeVieToken;
        $this->changePasswordAuthenticator = $changePasswordAuthenticator;
        $this->authenticator = $authenticator;
    }

    public function changePassword(Utilisateur $utilisateur, string $nouveauMotdePass)
    {
        $utilisateur->removeRole('ROLE_CHANGE_PASSWORD');
        $hashedPassword = $this->passwordHasher->hashPassword($utilisateur, $nouveauMotdePass);
        $utilisateur->setPassword($hashedPassword);
        $this->em->flush();
    }

    public function demandeReinitialisationMotDePasse(string $email)
    {
        /* @var Utilisateur $utilisateur */
        $utilisateur = $this->em->getRepository(Utilisateur::class)->findOneBy(['email' => $email, 'enabled' => true]);

        if (!$utilisateur) {
            return;
        }

        //@todo : si l'utilisateur est désactivé, il ne ne faut pas lui envoyer de mail de réinitialisation

        // vérifier la présence d'un token récent (moin de 24 h)
        if ($utilisateur->getConfirmationToken()
            && $utilisateur->getPasswordRequestedAt()
            && $utilisateur->getPasswordRequestedAt()->getTimestamp() + $this->dureeVieToken > time()
            && $utilisateur->getNombreDemandeReinitialisationMotDePasse() >= 3
        ) {
            return;
        }

        // Permet de conserver le même token qui est toujours valide
        if (!$utilisateur->getConfirmationToken()) {
            $confirmationToken = $this->generateToken();
            $utilisateur->setConfirmationToken($confirmationToken);
            $utilisateur->setPasswordRequestedAt(new \DateTime());
        }

        $utilisateur->setNombreDemandeReinitialisationMotDePasse($utilisateur->getNombreDemandeReinitialisationMotDePasse() + 1);

        // envoyer email avec le token
        $this->mailer->envoyerEmailReinitialisationMotDePasse($utilisateur);

        $this->em->flush();
    }

    public function reinitialiserMotDePasse(Utilisateur $utilisateur, string $newPassword, Request $request): void
    {
        $hashedPassword = $this->passwordHasher->hashPassword($utilisateur, $newPassword);
        $utilisateur->setPassword($hashedPassword)
            ->setConfirmationToken(null)
            ->setPasswordRequestedAt(null)
            ->setNombreDemandeReinitialisationMotDePasse(0);

        $utilisateur->setLocked(false)
            ->setNbConnexionKO(0);

        $this->em->flush();

        // Authentification de l'utilisateur
        $this->authenticator->authenticateUser(
            $utilisateur,
            $this->changePasswordAuthenticator,
            $request
        );
    }

    public function generateToken(): string
    {
        return hash('sha256', random_bytes(32));
    }
}
