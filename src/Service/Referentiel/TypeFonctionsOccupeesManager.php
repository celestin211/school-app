<?php

namespace App\Service\Referentiel;

use App\Entity\Referentiel\TypeFonctionsOccupees;

class TypeFonctionsOccupeesManager extends ReferentielManager
{
    public function getAll()
    {
        return $this->em->getRepository(TypeFonctionsOccupees::class)->getAll();
    }

    public function getActifs()
    {
        return $this->em->getRepository(TypeFonctionsOccupees::class)->getActifs();
    }
}
