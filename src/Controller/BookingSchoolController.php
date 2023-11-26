<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


#[Route(path: '/rendez-vous')]
class BookingSchoolController extends AbstractController
{
    #[Route('/', name: 'app_booking_school')]
    #[IsGranted('ROLE_PROFESSEUR')]
    public function index(): Response
    {
        return $this->render('booking_school/index.html.twig', [
            'controller_name' => 'BookingSchoolController',
        ]);
    }
}
