<?php

namespace App\Entity;

use App\Repository\ImageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ImageRepository::class)]
class Image
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'images')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Cours $coursImage = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;


    #[Assert\Image(
        maxSize: '1024k',
        maxSizeMessage: 'Votre avatar ne doit pas dépasser 1024k Mo',
    )]
    private $image;

    private $path;
    private $tempFilename;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCoursImage(): ?Cours
    {
        return $this->coursImage;
    }

    public function setCoursImage(?Cours $coursImage): static
    {
        $this->coursImage = $coursImage;

        return $this;
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


    public function getImage()
    {
        return $this->image;
    }

    public function setImage(UploadedFile $image = null)
    {
        $this->image = $image;
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
    public function handleImage()
    {
        if ($this->image === null) {
            return;
        }

        // If update
        if ($this->id) {
            unlink($this->path . '/' . $this->nom);
        }

        // Image name creation
        $nom = $this->createName();
        // Setting name
        $this->setNom($nom);
        // Moving image into the image repository
        $this->image->move($this->path, $nom);

    }

    /**
     * @ORM\PreRemove()
     */
    public function preRemoveUpload()
    {
        // Saving image name (after removing from database, the image name doesn't exist anymore)
        $this->tempFilename = $this->path . '/' . $this->nom;
    }

    /**
     * @ORM\PostRemove()
     */
    public function removeUpload()
    {
        // We doesn't have the id, we use the image name
        if (file_exists($this->tempFilename)) {
            // Deleting the file
            unlink($this->tempFilename);
        }
    }

    private function createName(): string
    {
        return md5(uniqid()) . '.' . $this->image->guessClientExtension();
    }
}
