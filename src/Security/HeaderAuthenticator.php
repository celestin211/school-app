<?php

namespace App\Security;

use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Twig\Environment;

class HeaderAuthenticator extends AbstractLoginFormAuthenticator
{
    private Security $security;
    private UserProviderInterface $userProvider;
    private string $ssoUrl;
    private Environment $twig;

    public function __construct(Security $security, UserProviderInterface $userProvider, string $ssoUrl, Environment $twig)
    {
        $this->security = $security;
        $this->userProvider = $userProvider;
        $this->ssoUrl = $ssoUrl;
        $this->twig = $twig;
    }

    protected function getLoginUrl(Request $request): string
    {
        return $this->ssoUrl;
    }

    public function supports(Request $request): bool
    {
//        $request->headers->set('USER', base64_encode('karim.ben-daali@finances.gouv.fr'));
        //return false;

        if ($request->headers->has('USER')) {
            if ($user = $this->security->getUser()) {
                // la session existe déjà, on n'a pas besoin de réauthentifier
                if ($user->getUserIdentifier() === base64_decode($request->headers->get('USER'))) {
                    return false;
                }

                return true;
            }
        }

        return $request->headers->has('USER');
    }

    public function authenticate(Request $request): Passport
    {
        $userIdentifier = base64_decode($request->headers->get('USER'));

        $userBadge = new UserBadge($userIdentifier, function ($userIdentifier) {
            return $this->userProvider->loadUserByIdentifier($userIdentifier);
        });

        return new SelfValidatingPassport($userBadge);
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): Response
    {
        // pas d'utilisateur en base => page d'erreur "utilisateur_not_found"
        return new Response($this->twig->render('Utilisateur/UserNotFound.html.twig'));
    }
}
