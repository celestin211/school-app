<?php

namespace App\Service;
use App\Repository\GestionCompteCourantRepository;

class ServiceCalcule
{

    /** @var GestionCompteCourantRepository */
    private $gestionCompteCourantRepository;


    public function __construct(GestionCompteCourantRepository $gestionCompteCourantRepository)
    {

        $this->gestionCompteCourantRepository = $gestionCompteCourantRepository;

    }

    /**
     * ajout d'un produit dans le panier
     *
     * @return void
     */
    function getResultRecettes(): void
    {
        $nbentreeArgents =  $this->gestionCompteCourantRepository->getReceArgent();
        $nbentreeDepenses = $this->gestionCompteCourantRepository->getDepensesCourantes();

        for($i = 1; $i< count($nbentreeDepenses); $i++)
        {
            foreach ($nbentreeDepenses as &$nbentreeDepense)
            {

                var_dump($nbentreeDepense['DepensesCourantes']);
            }
            dd($nbentreeDepenses);
        }
        }


}
