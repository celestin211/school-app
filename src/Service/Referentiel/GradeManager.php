<?php

namespace App\Service\Referentiel;

use App\Entity\Grade;

class GradeManager extends ReferentielManager
{
    public function getAll()
    {
        return $this->em->getRepository(Grade::class)->getAll();
    }

    public function getGradesAjoutesManuellement()
    {
        return $this->em->getRepository(Grade::class)->getGradesAjoutesManuellement();
    }

    public function delete(Grade $grade)
    {
        $this->em->remove($grade);
        $this->em->flush();
    }

    public function creer($grade)
    {
        $grade->setAjoutManuel(true);
        $this->em->persist($grade);
        $this->em->flush();
    }
}
