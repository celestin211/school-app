<?php

namespace App\Entity;

use App\EnumTypes\EnumStatut;
use App\Interfaces\GenericTraitInterface;
use App\Repository\CoursRepository;
use App\Traits\GenericTrait;
use App\Util\Util;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CoursRepository")
 * @ORM\HasLifecycleCallbacks()
 * @UniqueEntity(
 *      fields={"nom"},
 *
 *      message="Ce cours existe déjà."
 * )
 */
#[ORM\Entity(repositoryClass: CoursRepository::class)]
class Cours implements  GenericTraitInterface
{
  use GenericTrait;


    #[ORM\Column(length: 255)]
    private ?string $nom = null;
    #[ORM\Column(type: 'boolean')]
    private bool $typeOuverture = true;

    #[ORM\Column(type: 'boolean')]
    private bool $typeModificatif = false;

    #[ORM\Column(type: 'boolean')]
    private bool $typeCours = false;

    #[ORM\Column(type: 'string')]
    private ?string $statut = null;

    #[ORM\ManyToOne(targetEntity: Cours::class)]
    #[ORM\JoinColumn(nullable: true)]
    private ?Cours $coursReference = null;

    #[ORM\Column]
    private ?int $nombreCours = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image = null;

    #[ORM\Column(type:  Types::DATETIME_MUTABLE, nullable: true)]
    #[Assert\GreaterThan('today')]
    #[Assert\Range(max: '2099-12-31', notInRangeMessage: 'La date non valide')]
    private ?\DateTimeInterface $dateDebut = null;

    #[ORM\ManyToOne(inversedBy: 'cours')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Categorie $categorie = null;

    #[ORM\OneToMany(mappedBy: 'cours', targetEntity: Professeur::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $professeur;

    #[ORM\OneToMany(mappedBy: 'coursImage', targetEntity: Image::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $images;
    /**
     * @Assert\Image(
     *      maxSize = "1M",
     *      maxSizeMessage = "Votre avatar ne doit pas dépasser 1 Mo",
     * )
     */
    private $file;
    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $dateAccuseReception;
    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $dateTransmission;
    #[ORM\OneToMany(mappedBy: 'cours', targetEntity: Contact::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[Assert\Count(min: 1, minMessage: 'Veuillez saisir au moins un contact', groups: ['envoyerProfesseur'])]
    #[Assert\Valid]
    protected ?Collection $contacts;

    #[ORM\ManyToMany(targetEntity: Document::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[ORM\OrderBy(['nom' => 'ASC'])]
    #[Assert\Valid]
    private ?Collection $documents;
    #[ORM\OneToOne(targetEntity: Document::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[Assert\Valid]
    private ?UploadDocument $documentArrete = null;
    #[Assert\Valid]
    private ?ArrayCollection $newDocuments = null;

    #[ORM\ManyToOne(targetEntity: Utilisateur::class)]
    private ?Utilisateur $transmisPar;
    #[ORM\ManyToOne(targetEntity: Utilisateur::class)]
    private ?Utilisateur $accusePar;
    private $path;

    public function __construct()
    {
        $this->professeur = new ArrayCollection();
        $this->images = new ArrayCollection();
        $this->contacts = new ArrayCollection();
        $this->documents = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getNombreCours(): ?int
    {
        return $this->nombreCours;
    }

    public function setNombreCours(int $nombreCours): static
    {
        $this->nombreCours = $nombreCours;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getDateDebut(): ?\DateTimeInterface
    {
        return $this->dateDebut;
    }

    public function setDateDebut(\DateTimeInterface $dateDebut): static
    {
        $this->dateDebut = $dateDebut;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getCategorie(): ?Categorie
    {
        return $this->categorie;
    }

    public function setCategorie(?Categorie $categorie): static
    {
        $this->categorie = $categorie;

        return $this;
    }

    /**
     * @return Collection<int, Professeur>
     */
    public function getProfesseur(): Collection
    {
        return $this->professeur;
    }

    public function addProfesseur(Professeur $professeur): static
    {
        if (!$this->professeur->contains($professeur)) {
            $this->professeur->add($professeur);
            $professeur->setCours($this);
        }

        return $this;
    }

    public function removeProfesseur(Professeur $professeur): static
    {
        if ($this->professeur->removeElement($professeur)) {
            // set the owning side to null (unless already changed)
            if ($professeur->getCours() === $this) {
                $professeur->setCours(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Image>
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(Image $image): static
    {
        if (!$this->images->contains($image)) {
            $this->images->add($image);
            $image->setCoursImage($this);
        }

        return $this;
    }

    public function removeImage(Image $image): static
    {
        if ($this->images->removeElement($image)) {
            // set the owning side to null (unless already changed)
            if ($image->getCoursImage() === $this) {
                $image->setCoursImage(null);
            }
        }

        return $this;
    }

    public function getFile()
    {
        return $this->file;
    }

    public function setFile(UploadedFile $file = null)
    {
        $this->file = $file;

        return $this;
    }

    public function getPath()
    {
        return $this->path;
    }

    public function setPath($path)
    {
        $this->path = $path;

        return $this;
    }

    /**
     * @ORM\PreFlush()
     */
    public function handleFile()
    {
        if ($this->file === null) {
            return;
        }

        // Delete image from the server if update
        if ($this->id && $this->image !== 'default-trick.jpg') {
            unlink($this->path . '/' . $this->image);
        }

        // Image name creation
        $name = $this->createName();
        // Setting name
        $this->setImage($name);
        // Moving image into the image repository
        $this->file->move($this->path, $name);

    }

    private function createName(): string
    {
        return md5(uniqid()) . '.' . $this->file->guessClientExtension();
    }

    #[Assert\Callback(groups: ['envoyerProfesseur'])]
    public function validateContacts(ExecutionContextInterface $context, $payload): void
    {
        if ($this->contacts->isEmpty()) {
            return;
        }

        /* @var Contact $contact */
        foreach ($this->contacts as $contact) {
            if ($contact->getNotifier()) {
                return;
            }
        }

        $context->buildViolation('Veulliez saisir au moins un contact à notifier')
            ->atPath('contacts')
            ->addViolation();
    }


    public function __clone()
    {
        $this->id = null;
        $this->contacts = clone $this->contacts;
        $this->documents = clone $this->documents;
    }

    public function isStatutFinal(): bool
    {
        return in_array($this->statut, [EnumStatut::VALIDE, EnumStatut::VALIDE_T, EnumStatut::REJETE, EnumStatut::AVIS_CONFORME_ANNULE]);
    }

    #[Assert\Callback]
    public function validateDocuments(ExecutionContextInterface $context, $payload): void
    {
        if ($this->getDocumentCours() && null === $this->getDocumentCours()->getFile() && null === $this->getDocumentCours()->getId()) {
            $this->setDocumentCours(null);
        }
    }

    public function isTypeOuverture(): ?bool
    {
        return $this->typeOuverture;
    }

    public function setTypeOuverture(bool $typeOuverture): static
    {
        $this->typeOuverture = $typeOuverture;

        return $this;
    }

    public function isTypeModificatif(): ?bool
    {
        return $this->typeModificatif;
    }

    public function setTypeModificatif(bool $typeModificatif): static
    {
        $this->typeModificatif = $typeModificatif;

        return $this;
    }

    public function isTypeCours(): ?bool
    {
        return $this->typeCours;
    }

    public function setTypeCours(bool $typeCours): static
    {
        $this->typeCours = $typeCours;

        return $this;
    }

    public function getStatut(): ?string
    {
        return $this->statut;
    }

    public function setStatut(string $statut): static
    {
        $this->statut = $statut;

        return $this;
    }

    public function getDateAccuseReception(): ?\DateTimeInterface
    {
        return $this->dateAccuseReception;
    }

    public function setDateAccuseReception(?\DateTimeInterface $dateAccuseReception): static
    {
        $this->dateAccuseReception = $dateAccuseReception;

        return $this;
    }

    public function getDateTransmission(): ?\DateTimeInterface
    {
        return $this->dateTransmission;
    }

    public function setDateTransmission(?\DateTimeInterface $dateTransmission): static
    {
        $this->dateTransmission = $dateTransmission;

        return $this;
    }

    public function getCoursReference(): ?self
    {
        return $this->coursReference;
    }

    public function setCoursReference(?self $coursReference): static
    {
        $this->coursReference = $coursReference;

        return $this;
    }

    /**
     * @return Collection<int, Contact>
     */
    public function getContacts(): Collection
    {
        return $this->contacts;
    }

    public function addContact(Contact $contact): static
    {
        if (!$this->contacts->contains($contact)) {
            $this->contacts->add($contact);
            $contact->setCours($this);
        }

        return $this;
    }

    public function removeContact(Contact $contact): static
    {
        if ($this->contacts->removeElement($contact)) {
            // set the owning side to null (unless already changed)
            if ($contact->getCours() === $this) {
                $contact->setCours(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Document>
     */
    public function getDocuments(): Collection
    {
        return $this->documents;
    }

    public function addDocument(Document $document): static
    {
        if (!$this->documents->contains($document)) {
            $this->documents->add($document);
        }

        return $this;
    }

    public function removeDocument(Document $document): static
    {
        $this->documents->removeElement($document);

        return $this;
    }

    public function getDocumentArrete(): ?Document
    {
        return $this->documentArrete;
    }

    public function setDocumentArrete(?Document $documentArrete): static
    {
        $this->documentArrete = $documentArrete;

        return $this;
    }

    public function getTransmisPar(): ?Utilisateur
    {
        return $this->transmisPar;
    }

    public function setTransmisPar(?Utilisateur $transmisPar): static
    {
        $this->transmisPar = $transmisPar;

        return $this;
    }

    public function getAccusePar(): ?Utilisateur
    {
        return $this->accusePar;
    }

    public function setAccusePar(?Utilisateur $accusePar): static
    {
        $this->accusePar = $accusePar;

        return $this;
    }


}
