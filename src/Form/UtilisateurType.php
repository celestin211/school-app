<?php

declare(strict_types=1);

namespace App\Form;

use App\Entity\Email;
use App\Entity\Utilisateur;
use App\EnumTypes\EnumCiviliteType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
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
    private $security;


    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $roles = [];

        /* @var $utilisateur Utilisateur */
        $utilisateur = $this->security->getUser();

        if ($utilisateur->hasRole('ROLE_ADMIN')) {
            $roles['Professeur'] = 'ROLE_PROFESSEUR';
            $roles['Eleve'] = 'ROLE_ELEVE';
        }

        if ($utilisateur->hasRole('ROLE_ADMIN')) {
            $roles['Professeur ROLE_PROFESSEUR'] = 'ROLE_ELEVE';

        }

        $roles['Correspondant  consultant application'] = 'ROLE_CONSULT_MIN';

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
            ->add('role', ChoiceType::class, [
                'data' => $roles, // valeur par defaut 'ROLE_MIN'
                'constraints' => new NotBlank(['message' => 'Role obligatoire']),
                'choices' => [
                    'Utilisateur' => 'ROLE_USER',
                    'Administrateur' => 'ROLE_ADMIN',
                ],
                'attr' => [
                    'class' => 'utilisateur',
                ],
            ])

            ->add(
                'file',
                FileType::class,
                [
                    'label' => false,
                ]
            )
            ->add('toDelete', CheckboxType::class)
        ;;
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
