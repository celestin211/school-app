<?php

namespace App\Form;

use App\Entity\Categorie;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Constraints\NotBlank;
use FOS\CKEditorBundle\Form\Type\CKEditorType;

class CategorieType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add(
                'nom',
                TextType::class,
                ["attr"=>['placeholder' => 'Le nom de la catégorie '

                ],
                    'required' => true,
                    'mapped' => false,
                    'constraints' => [
                        new NotBlank(),
                        new Callback([
                            'callback' => [$this, 'emailValidate'],
                        ]),
                    ],
                ]
            )

       ->add("text", CKEditorType::class, [
           "attr" => [
               "multisteps-form__input form-control" => "bold italic underline | bullist numlist",
               "local-upload"=>"upload file ",
               'placeholder' => 'Votre description de la catégorie '
           ],
       ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Categorie::class,
        ]);
    }

    /**
     * @return string
     */
    public function getBlockPrefix(): string
    {
        return 'Categorie';
    }
}
