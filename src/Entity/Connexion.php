<?php

declare(strict_types=1);

namespace App\Entity;

use App\Interfaces\GenericTraitInterface;
use App\Traits\GenericTrait;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\Request;

#[ORM\Entity(repositoryClass: 'App\Repository\ConnexionRepository')]
class Connexion implements GenericTraitInterface
{
    use GenericTrait;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $userAgent;

    #[ORM\ManyToOne(targetEntity: Utilisateur::class)]
    #[ORM\JoinColumn(name: 'utilisateur_id', referencedColumnName: 'id')]
    private ?Utilisateur $utilisateur;

    #[ORM\Column(name: 'date_connexion', type: 'date')]
    private ?\DateTimeInterface $dateConnexion;

    public function __construct(?Utilisateur $utilisateur)
    {
        $this->setUtilisateur($utilisateur);
        $this->dateConnexion = new \DateTime();
        //$this->userAgent = $request->headers->get('User-Agent');
    }

    public function setUserAgent(?string $userAgent): self
    {
        $this->userAgent = $userAgent;

        return $this;
    }

    public function getUserAgent(): ?string
    {
        return $this->userAgent;
    }

    public function setUtilisateur(?Utilisateur $utilisateur): static
    {
        $this->utilisateur = $utilisateur;

        return $this;
    }

    public function getUtilisateur(): ?Utilisateur
    {
        return $this->utilisateur;
    }

    public function setDateConnexion(?\DateTimeInterface $dateConnexion): static
    {
        $this->dateConnexion = $dateConnexion;

        return $this;
    }

    public function getDateConnexion(): ?\DateTimeInterface
    {
        return $this->dateConnexion;
    }
}
