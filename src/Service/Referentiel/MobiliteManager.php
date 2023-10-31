<?php

namespace App\Service\Referentiel;

use App\Entity\Referentiel\Mobilite;

class MobiliteManager extends ReferentielManager
{
    public function getAll()
    {
        return $this->em->getRepository(Mobilite::class)->getAll();
    }

    public function getActifs()
    {
        return $this->em->getRepository(Mobilite::class)->getActifs();
    }
}
