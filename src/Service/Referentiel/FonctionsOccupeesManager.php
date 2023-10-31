<?php

namespace App\Service\Referentiel;

use App\Entity\Referentiel\FonctionsOccupees;

class FonctionsOccupeesManager extends ReferentielManager
{
    public function getAll()
    {
        return $this->em->getRepository(FonctionsOccupees::class)->getAll();
    }

    public function getFonctionsOccupeesByTypeFonctionsOccupees($typeFonctionsOccupees)
    {
        return $this->em->getRepository(FonctionsOccupees::class)->getFonctionsOccupeesByTypeFonctionsOccupees($typeFonctionsOccupees);
    }

    public function getActifs()
    {
        return $this->em->getRepository(FonctionsOccupees::class)->getActifs();
    }

    public function getActifsWithTypesFonctions()
    {
        return $this->em->getRepository(FonctionsOccupees::class)->getActifsWithTypesFonctions();
    }
}
