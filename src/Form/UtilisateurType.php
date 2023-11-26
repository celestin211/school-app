<?php

declare(strict_types=1);

namespace App\Form;

use App\Entity\Email;
use App\Entity\Utilisateur;
use App\EnumTypes\EnumCiviliteType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Validator\Constraints\NotBlank;

class UtilisateurType extends AbstractType
{

    private Security $security;
    private AuthorizationCheckerInterface $authorizationChecker;

    public function __construct(Security $security, AuthorizationCheckerInterface $authorizationChecker)
    {
        $this->security = $security;
        $this->authorizationChecker = $authorizationChecker;
    }


    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        /* @var Utilisateur $currentUser */
        $currentUser = $this->security->getUser();
        /* @var  Utilisateur $utilisateur */
        $utilisateur = $builder->getData();
        $role = $utilisateur ? $utilisateur->getRoles()[0] : 'ROLE_ADMIN';

        if ($this->authorizationChecker->isGranted('ROLE_ADMIN')) {
            $roles = [ 'ROLE_ADMIN' => 'Administrateur',
                'ROLE_PROFESSEUR' => 'Professuer d\'élèves ',
                'ROLE_ELEVE' => 'Elèves',

            ];
        } elseif ($this->authorizationChecker->isGranted('ROLE_PROFESSEUR')) {
            $roles = ['ROLE_ADMIN' => 'Administrateur gestionnaire', 'ROLE_PROFESSEUR' => 'Administrateur valideur'];
        } else {
            $roles = [];
        }

        /* @var Utilisateur $utilisateur */
        $utilisateur = $builder->getData();
        $role = $utilisateur ? $utilisateur->getRole() : null;

        $builder

            ->add('civilite', ChoiceType::class, [
                'choices' => [
                    'M.' => EnumCiviliteType::MONSIEUR,
                    'Mme' => EnumCiviliteType::MADAME,
                ],
                'expanded' => false,
                'multiple' => false,
                'placeholder' => '',
                'attr' => [
                    'class' => 'utilisateur',
                ],
            ])
            ->add('nom', TextType::class,  array(
                'attr' => [
                    'placeholder' => 'Veuillez entrer votre nom',
                ],))

            ->add('prenom', TextType::class, array(
                'attr' => [
                    'placeholder' => 'Veuillez entrer votre prénom',
                ],))
            ->add('email', EmailType::class, array(
                'attr' => [
                    'placeholder' => 'Veuillez entrer adresse email',
                ],)
            )

            ->add('password', PasswordType::class, array(
                'label' => 'Mot de passe',
                'attr' => [
                    'placeholder' => 'Mot de passe',
                ],
            ))
            ->add('passwordConfirm', PasswordType::class, array(
                'label' => 'Confirmation de mot de passe',
                'attr' => [
                    'placeholder' => 'Veuillez confirmer votre mot de passe',
                ],
            ))
            ->add(
                'role',
                ChoiceType::class,
                [
                    'choices' => array_flip($roles),
                    'expanded' => true,
                    'multiple' => false,
                    'data' => $role, // valeur par defaut 'ROLE_MIN'
                    'label' => 'Rôle',
                    'mapped' => false,
                    'constraints' => new NotBlank(['message' => 'Role obligatoire']),
                ]
            );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Utilisateur::class,
        ]);
    }

    public function getBlockPrefix(): string
    {
        return 'UtilisateurType';
    }
}
