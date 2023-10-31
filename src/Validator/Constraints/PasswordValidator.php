<?php

declare(strict_types=1);

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class PasswordValidator extends ConstraintValidator
{
    const MIN_LENGTH = 12;
    const MAX_LENGTH = 72;

    /**
     * Checks if the passed value is valid.
     *
     * @param mixed      $value      The value that should be validated
     * @param Constraint $constraint The constraint for the validation
     */
    public function validate($value, Constraint $constraint): void
    {
        if (!$constraint instanceof Password) {
            throw new UnexpectedTypeException($constraint, Password::class);
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

        if (mb_strlen($value) < self::MIN_LENGTH) {
            $this->context->buildViolation($constraint->minLengthMessage)
                ->setParameter('{{ min }}', (string) self::MIN_LENGTH)
                ->addViolation()
            ;
        }

        if (mb_strlen($value) >= self::MAX_LENGTH) {
            $this->context->buildViolation($constraint->maxLengthMessage)
                ->setParameter('{{ max }}', (string) self::MAX_LENGTH)
                ->addViolation()
            ;
        }

        if (!preg_match('/[A-Z]/', $value, $matches)) {
            $this->context->buildViolation($constraint->upperCaseMessage)
                ->addViolation()
            ;
        }

        if (!preg_match('/[a-z]/', $value, $matches)) {
            $this->context->buildViolation($constraint->lowerCaseMessage)
                ->addViolation()
            ;
        }

        if (!preg_match('/[0-9]/', $value, $matches)) {
            $this->context->buildViolation($constraint->numericMessage)
                ->addViolation()
            ;
        }

        if (!preg_match('/[^0-9a-zA-Z]/', $value, $matches)) {
            $this->context->buildViolation($constraint->specialCharMessage)
                ->addViolation()
            ;
        }
    }
}
