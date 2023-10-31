<?php

namespace App\Service\Referentiel;

use App\Entity\Referentiel\Position;

class PositionManager extends ReferentielManager
{
    public function getAll()
    {
        return $this->em->getRepository(Position::class)->getAll();
    }

    public function getActifs()
    {
        return $this->em->getRepository(Position::class)->getActifs();
    }
}
