<?php

declare(strict_types=1);

namespace App\Validator;

use App\EnumTypes\EnumCiviliteType;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class CiviliteValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint): void
    {
        if (!$constraint instanceof Civilite) {
            throw new UnexpectedTypeException($constraint, Civilite::class);
        }

        // custom constraints should ignore null and empty values to allow
        // other constraints (NotBlank, NotNull, etc.) take care of that
        if (null === $value || '' === $value) {
            return;
        }

        if (!is_string($value)) {
            // throw this exception if your validator cannot handle the passed type so that it can be marked as invalid
            throw new UnexpectedValueException($value, 'string');
            // separate multiple types using pipes
            // throw new UnexpectedValueException($value, 'string|int');
        }

        $lowercase = array_map('mb_strtolower', array_keys(EnumCiviliteType::VALUES));

        if (!in_array(mb_strtolower($value), $lowercase)) {
            $choices = '';

            foreach (EnumCiviliteType::VALUES as $value) {
                $choices .= "'$value', ";
            }

            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ choices }}', $choices)
                ->addViolation()
            ;
        }
    }
}
