<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Contact;
use App\Entity\Email;
use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\BodyRendererInterface;
use Symfony\Component\Routing\RouterInterface;
use Twig\Environment;

class Mailer
{
    /**
     * @var MailerInterface
     */
    private $mailer;

    /**
     * @var Environment
     */
    private $templating;

    private $em;

    private $appName;

    private $appEmailFrom;

    private $bodyRenderer;

    private $emailSgg;

    private $emailServiceGreco;

    public function __construct(
        MailerInterface $mailer,
        Environment $templating,
        EntityManagerInterface $em,
        $appName,
        $appEmailFrom,
        BodyRendererInterface $bodyRenderer,
        $emailSgg,
        $emailServiceGreco
    ) {
        $this->mailer = $mailer;
        $this->templating = $templating;
        $this->em = $em;
        $this->appName = $appName;
        $this->appEmailFrom = $appEmailFrom;
        $this->bodyRenderer = $bodyRenderer;
        $this->emailSgg = $emailSgg;
        $this->emailServiceGreco = $emailServiceGreco;
    }

    public function envoyerEmailReinitialisationMotDePasse(Utilisateur $utilisateur): Email
    {
        $email = new Email(
            $utilisateur->getEmail(),
            null,
            'Réinitialisation de mot de passe',
            'email/password_resetting.email.twig',
            [
                'confirmationToken' => $utilisateur->getConfirmationToken(),
            ]
        );

        return $this->send($email);
    }

    public function envoyerEmailCreationCompteUtilisateur(Utilisateur $utilisateur): Email
    {
        $email = new Email(
            $utilisateur->getEmail(),
            null,
            'Confirmation de création de compte',
            'email/confirmation_registration.email.twig',
            [
                'confirmationToken' => $utilisateur->getConfirmationToken(),
            ]
        );

        return $this->send($email);
    }

    public function envoyerEmailRedifinirPassword(Utilisateur $utilisateur): Email
    {
        $email = new Email(
            $utilisateur->getEmail(),
            null,
            'Confirmation de création de compte',
            'email/redifinir_password.email.twig',
            [
                'confirmationToken' => $utilisateur->getConfirmationToken(),
            ]
        );

        return $this->send($email);
    }

    public function sendNotificationEnvoyerDgafp(Arrete $arrete): Email
    {
        $email = new Email(
            $this->emailServiceGreco,
            null,
            'Nouvelle demande : '.$arrete->getNumNor(),
            'email/envoyer_dgafp.html.twig',
            [
                'arrete' => $arrete,
            ]
        );

        return $this->send($email);
    }

    public function sendNotificationRenvoyerMinistere(Arrete $arrete, $sujet, $destinataires, $copies, $corps)
    {
        $email = new Email(
            $destinataires,
            $copies,
            $sujet,
            'email/renvoyer_ministere.html.twig',
            [
                'corps' => $corps,
                'arrete' => $arrete,
                'classColorEmail' => 'warning',
            ]
        );

        $this->send($email);
    }

    public function sendNotificationAccuserReception(Arrete $arrete, $sujet, $destinataires, $copies, $corps)
    {
        $email = new Email(
            $destinataires,
            $copies,
            $sujet,
            'email/accuser_reception.html.twig',
            [
                'corps' => $corps,
                'arrete' => $arrete,
            ]
        );

        $this->send($email);
    }

    public function sendNotificationValider(Arrete $arrete, $sujet, $destinataires, $copies, $corps)
    {
        $email = new Email(
            $destinataires,
            $copies,
            $sujet,
            'email/valider.html.twig',
            [
                'corps' => $corps,
                'arrete' => $arrete,
                'classColorEmail' => 'success',
            ]
        );

        $this->send($email);
    }

    public function sendNotificationDevalider(Arrete $arrete, $sujet, $destinataires, $copies, $corps)
    {
        $email = new Email(
            $destinataires,
            $copies,
            $sujet,
            'email/devalider.html.twig',
            [
                'corps' => $corps,
                'arrete' => $arrete,
                'classColorEmail' => 'danger',
            ]
        );

        $this->send($email);
    }

    public function sendNotificationValiderTacitement(Arrete $arrete)
    {
        $destinataires = '';
        $i = 0;
        $copies = $this->emailSgg.';'.$this->emailServiceGreco;
        $sujet = 'Validation tacite de l\'arrêté '.$arrete->getNumNor();
        $corps = 'Bonjour,
        
        Le présent arrêté a fait l\'objet d\'une approbation tacite par le bureau 2REDIV de la DGAFP. 

        Signé, le chef du bureau 2REDIV.';

        /* @var Contact $contact */
        foreach ($arrete->getContacts() as $contact) {
            if ($contact->getNotifier()) {
                if ($i > 0) {
                    $destinataires .= ';';
                }

                $destinataires .= $contact->getEmail();
                ++$i;
            }
        }

        $email = new Email(
            $destinataires,
            $copies,
            $sujet,
            'email/valider_tacitement.html.twig',
            [
                'corps' => $corps,
                'arrete' => $arrete,
                'classColorEmail' => 'success',
            ]
        );

        $this->send($email);
    }

    public function sendNotificationRejeter(Arrete $arrete, $sujet, $destinataires, $copies, $corps)
    {
        $email = new Email(
            $destinataires,
            $copies,
            $sujet,
            'email/rejeter.html.twig',
            [
                'corps' => $corps,
                'arrete' => $arrete,
                'classColorEmail' => 'danger',
            ]
        );

        $this->send($email);
    }

    /**
     * Envoyer et logger les emails.
     */
    private function send(Email $email)
    {
        $email->setSujet('['.$this->appName.'] '.$email->getSujet());

        $emailAenvoyer = (new TemplatedEmail())
            ->from($this->appEmailFrom)
            ->subject($email->getSujet())
            ->htmlTemplate($email->getTemplate())
            ->context($email->getContext());

        $destinataires = str_replace(',', ';', $email->getDestinataires());

        $destinataires = explode(';', $destinataires);

        $copies = [];
        if (!empty($email->getCopies())) {
            $copies = str_replace(',', ';', $email->getCopies());
            $copies = explode(';', $copies);
        }

        foreach ($destinataires as $destinataire) {
            $emailAenvoyer->addTo($destinataire);
        }

        foreach ($copies as $copie) {
            $emailAenvoyer->addCc($copie);
        }

        // Permet de générer le body du mail
        $this->bodyRenderer->render($emailAenvoyer);
        $email->setContenu($emailAenvoyer->getHtmlBody());

        $this->mailer->send($emailAenvoyer);
        $this->em->persist($email);

        return $email;
    }
}
