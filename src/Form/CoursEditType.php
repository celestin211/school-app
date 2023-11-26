<?php

declare(strict_types=1);

namespace App\Form;


use App\Entity\Cours;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;

class CoursEditType extends CoursType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);
        /* @var Cours $arretePrecedent */
        $coursPrecedent = $options['coursPrecedent'];

        if ($coursPrecedent && true == $coursPrecedent->isTypePostes()) {
            $disableTypePostes = true;
        } else {
            $disableTypePostes = false;
        }

        $builder
            //Références
            ->add('typeCoursOuvert', CheckboxType::class, [
                'disabled' => true,
            ])
            ->add('typeModificatif', CheckboxType::class, [
                'error_bubbling' => true,
            ])
            ->add('typeCours', CheckboxType::class, [
                'disabled' => $disableTypePostes,
            ])
            ->add('documents', CollectionType::class, [
                'entry_type' => DocumentToDeleteType::class,
            ])
        ;
    }
}
