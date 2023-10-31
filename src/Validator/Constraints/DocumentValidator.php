<?php

declare(strict_types=1);

namespace App\Validator\Constraints;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class DocumentValidator extends ConstraintValidator
{
    /**
     * Checks if the passed value is valid.
     *
     * @param mixed      $value      The value that should be validated
     * @param Constraint $constraint The constraint for the validation
     */
    public function validate($value, Constraint $constraint): void
    {
        if (!$constraint instanceof Document) {
            throw new UnexpectedTypeException($constraint, Document::class);
        }

        // custom constraints should ignore null and empty values to allow
        // other constraints (NotBlank, NotNull, etc.) take care of that
        if (null === $value || '' === $value) {
            return;
        }

        if (!$value instanceof \App\Entity\Document) {
            // throw this exception if your validator cannot handle the passed type so that it can be marked as invalid
            throw new UnexpectedValueException($value, \App\Entity\Document::class);
            // separate multiple types using pipes
            // throw new UnexpectedValueException($value, 'string|int');
        }

        /** @var UploadedFile $file */
        $file = $value->getFile();

        if (null === $file) {

            if ($constraint->notBlank) {
                $this->context->buildViolation($constraint->notBlankMessage)
                    ->addViolation();
            }

            return;
        }

        $fileName = $file->getClientOriginalName();

        $fileNameTab = explode('.', $fileName);

        $extension = end($fileNameTab);

        if (!in_array($extension, $constraint->allow)) {
            $this->context->buildViolation($constraint->extMessage)
                ->setParameter('{{ allow }}', $this->formatValues($constraint->allow))
                ->addViolation();
        }

        if ($file->getSize() > $constraint->maxSize) {
            if ($constraint->maxSize > 1000000) {
                $maxSizeString = ($constraint->maxSize / 1000000).' Mo';
            } elseif ($constraint->maxSize > 1000) {
                $maxSizeString = ($constraint->maxSize / 1000).' Ko';
            } else {
                $maxSizeString = ($constraint->maxSize).' octets';
            }

            $this->context->buildViolation($constraint->maxSizeMessage)
                ->setParameter('{{ maxSize }}', $maxSizeString)
                ->addViolation();
        }
    }
}
