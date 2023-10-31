<?php

declare(strict_types=1);

namespace App\Service;

//use App\Entity\CarteBancaire;
use App\Entity\Utilisateur;
//use App\Repository\CarteBancaireRepository;
use Doctrine\ORM\EntityManagerInterface;

class CarteBancaireManager
{
    protected $em;

    /*  $repository CarteBancaireRepository */
    protected $repository;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
       // $this->repository = $this->em->getRepository(CarteBancaire::class);
    }

    /**
     * Permet de créer une direction.
     */
    public function save()
    {
        //$this->em->persist($direction);
        $this->em->flush();
    }


    public function getAllCarteBancaires()
    {
        return $this->repository->findBy([], ['numeroCompte' => 'ASC'], ['pictogramme'=>'ASC']);

    }

    public function delete()
    {
        //$this->em->remove($direction);
        $this->em->flush();
    }


    //Retourne l'ensemble des messages reçus et non lus par $user
    public function getAllCarteBancairesByUser(Utilisateur $user)
    {

        //return $this->em->getRepository(CarteBancaire::class)->findAllNumeroCartesByUser($user);
    }

    //Cette fonction vérifie si $utilisateur peut supprimer $message
    public function peutSupprimer(Utilisateur $utilisateur, $message)
    {
        //Si l'utilisateur n'est pas le destinataire du message à supprimer, on lève une exception denied access
        if (null === $message || $message->getDestinataire()->getId() != $utilisateur->getId()) {
            return false;
        }

        return true;
    }

    //Cette fonction vérifie si $utilisateur peut consulter $message
    public function peutConsulter(Utilisateur $utilisateur, $message)
    {
        return $this->peutSupprimer($utilisateur, $message);
    }

    //Cette fonction vérifie si $utilisateur peut restaurer $message
    public function peutRestaurer(Utilisateur $utilisateur, $message)
    {
        return $this->peutSupprimer($utilisateur, $message);
    }
}
