<?php

declare(strict_types=1);

namespace App\Entity;

use App\Interfaces\GenericTraitInterface;
use App\Repository\ContactRepository;
use App\Traits\GenericTrait;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Table(name: 'contact')]
#[ORM\Entity(repositoryClass: ContactRepository::class)]
class Contact implements GenericTraitInterface
{
    use GenericTrait;

    #[ORM\Column(name: 'nom', type: 'string', length: 255, nullable: true)]
    #[Assert\Length(max: 255, maxMessage: 'La valeur ne doit pas dépasser {{ limit }} caractères')]
    private ?string $nom;

    #[ORM\Column(name: 'fonction', type: 'string', length: 255, nullable: true)]
    #[Assert\Length(max: 255, maxMessage: 'La valeur ne doit pas dépasser {{ limit }} caractères')]
    private ?string $fonction;

    #[ORM\Column(name: 'telephone', type: 'string', length: 50, nullable: true)]
    #[Assert\Length(max: 50, maxMessage: 'La valeur ne doit pas dépasser {{ limit }} caractères')]
    #[Assert\Regex(pattern: '/(0|\+33|0033)[1-9]([-. ]?[0-9]{2}){4}$/', message: "Le numéro de téléphone n'est pas valide")]
    private ?string $telephone;

    #[ORM\Column(name: 'email', type: 'string', length: 255)]
    #[Assert\NotBlank(message: 'Champ obligatoire')]
    #[Assert\Email(message: 'Adresse email non valide', mode: 'strict')]
    #[Assert\Length(max: 255, maxMessage: 'La valeur ne doit pas dépasser {{ limit }} caractères')]
    private ?string $email;

    #[ORM\Column(name: 'notifier', type: 'boolean', length: 1)]
    private ?bool $notifier = false;

    #[ORM\ManyToOne(targetEntity: Professeur::class, inversedBy: 'contacts')]
    private ?Professeur $professeur = null;

    public function setNom(?string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setFonction(?string $fonction): static
    {
        $this->fonction = $fonction;

        return $this;
    }

    public function getFonction(): ?string
    {
        return $this->fonction;
    }

    public function setTelephone(?string $telephone): static
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setEmail(?string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setNotifier(?bool $notifier): static
    {
        $this->notifier = $notifier;

        return $this;
    }

    public function getNotifier(): ?bool
    {
        return $this->notifier;
    }

    public function setProfesseur(?Professeur $professeur = null): static
    {
        $this->$professeur = $professeur;

        return $this;
    }

    public function getProfesseur(): ?Professeur
    {
        return $this->professeur;
    }

    public function isNotifier(): ?bool
    {
        return $this->notifier;
    }
}
