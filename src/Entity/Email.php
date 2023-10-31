<?php

declare(strict_types=1);

namespace App\Entity;

use App\Interfaces\GenericTraitInterface;
use App\Traits\GenericTrait;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: 'App\Repository\EmailRepository')]
class Email implements GenericTraitInterface
{
    use GenericTrait;

    #[ORM\Column(type: 'string', length: 512, nullable: true)]
    private ?string $destinataires;

    #[ORM\Column(type: 'string', length: 512, nullable: true)]
    private ?string $copies;

    #[ORM\Column(type: 'string')]
    private ?string $sujet;

    private ?string $template;

    private ?array $context;

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $contenu = null;

    public function __construct(?string $destinataires, ?string $copies, string $sujet, string $template, array $context)
    {
        $this->destinataires = $destinataires;
        $this->copies = $copies;
        $this->sujet = $sujet;
        $this->template = $template;
        $this->context = $context;
    }

    public function getDestinataires(): ?string
    {
        return $this->destinataires;
    }

    public function setDestinataires(?string $destinataires): static
    {
        $this->destinataires = $destinataires;

        return $this;
    }

    public function getCopies(): ?string
    {
        return $this->copies;
    }

    public function setCopies(?string $copies): static
    {
        $this->copies = $copies;

        return $this;
    }

    public function getSujet(): ?string
    {
        return $this->sujet;
    }

    public function setSujet(?string $sujet): static
    {
        $this->sujet = $sujet;

        return $this;
    }

    public function getTemplate(): ?string
    {
        return $this->template;
    }

    public function setTemplate(?string $template): static
    {
        $this->template = $template;

        return $this;
    }

    public function getContext(): ?array
    {
        return $this->context;
    }

    public function setContext(?array $context): static
    {
        $this->context = $context;

        return $this;
    }

    public function getContenu(): ?string
    {
        return $this->contenu;
    }

    public function setContenu(?string $contenu): static
    {
        $this->contenu = $contenu;

        return $this;
    }
}
