<?php

namespace App\Service\Referentiel;

use App\Entity\Corps;

class CorpsManager extends ReferentielManager
{
    public function getAll()
    {
        return $this->em->getRepository(Corps::class)->getAll();
    }

    public function getCorpsAjoutesManuellement()
    {
        return $this->em->getRepository(Corps::class)->getCorpsAjoutesManuellement();
    }

    public function delete(Corps $corps)
    {
        $this->em->remove($corps);
        $this->em->flush();
    }

    public function creer($corps)
    {
        $corps->setAjoutManuel(true);
        $this->em->persist($corps);
        $this->em->flush();
    }
}
