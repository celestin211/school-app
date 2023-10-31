<?php

declare(strict_types=1);

namespace App\Entity;

use App\Interfaces\GenericTraitInterface;
use App\Repository\ParametreRepository;
use App\Traits\GenericTrait;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ParametreRepository::class)]

class Parametre implements GenericTraitInterface
{
    use GenericTrait;

    #[ORM\Column(type: 'boolean', nullable: true)]
    private ?bool $tracesActives = false;

    /**
     * @return bool
     */
    public function isTracesActives(): ?bool
    {
        return $this->tracesActives;
    }

    public function setTracesActives(?bool $tracesActives): static
    {
        $this->tracesActives = $tracesActives;

        return $this;
    }
}
