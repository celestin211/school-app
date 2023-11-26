<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VideoGrant;

class TchatVideoController extends AbstractController
{



    #[Route(path: '/access_token', name: 'access_token', methods: ['POST', 'GET'])]
    public function generate_token(Request $request):JsonResponse
    {
        $accountSid   =     putenv('TWILIO_ACCOUNT_SID');
        $apiKeySid    =     putenv('TWILIO_API_KEY_SID');
        $apiKeySecret =     putenv('TWILIO_API_KEY_SECRET');


        $identity = uniqid();

        $roomName = json_decode($request->getContent());

        // Create an Access Token
        $token = new AccessToken(
            $accountSid,
            $apiKeySid,
            $apiKeySecret,
            3600,
            $identity
        );

        // Grant access to Video
        $grant = new VideoGrant();
        $grant->setRoom($roomName->roomName);
        $token->addGrant($grant);
        return $this->json(['token' => $token->toJWT()], 200);
    }


    #[Route(path: 'room', name: 'room', methods: ['GET'])]
    public function index()
    {
        return $this->render('token/index.html.twig', [
            'controller_name' => 'TokenController',
        ]);
    }

    #[Route(path: 'video', name: 'video', methods: ['GET'])]
    public function vidoe()
    {
        return $this->render('token/enter-animation.html.twig', [
            'controller_name' => 'TokenController',
        ]);
    }

    #[Route(path: 'camera', name: 'camera', methods: ['GET'])]
    public function test()
    {
        return $this->render('token/video.html.twig');

    }

}
