<?php

declare(strict_types=1);

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\Exception\ConstraintDefinitionException;

#[\Attribute]
class Document extends Constraint
{
    public $extMessage = 'Seules les extensions {{ allow }} sont autorisées.';
    public $maxSizeMessage = 'La taille maximale autorisée est de {{ maxSize }}.';
    public $notBlankMessage = 'Champ obligatoire';

    public $allow;
    public $maxSize = 5000000;
    public $notBlank = false;

    /**
     * {@inheritdoc}
     */
    public function __construct($options = null)
    {
        parent::__construct($options);

        if (null !== $this->maxSize) {
            $this->normalizeBinaryFormat($this->maxSize);
        }
    }


    public function __isset($option): bool
    {
        if ('maxSize' === $option) {
            return true;
        }

        return parent::__isset($option);
    }

    private function normalizeBinaryFormat($maxSize)
    {
        $factors = [
            'k' => 1000,
            'ki' => 1 << 10,
            'm' => 1000 * 1000,
            'mi' => 1 << 20,
            'g' => 1000 * 1000 * 1000,
            'gi' => 1 << 30,
        ];
        if (ctype_digit((string) $maxSize)) {
            $this->maxSize = (int) $maxSize;
//            $this->binaryFormat = null === $this->binaryFormat ? false : $this->binaryFormat;
        } elseif (preg_match('/^(\d++)('.implode('|', array_keys($factors)).')$/i', $maxSize, $matches)) {
            $this->maxSize = $matches[1] * $factors[$unit = strtolower($matches[2])];
//            $this->binaryFormat = null === $this->binaryFormat ? 2 === \strlen($unit) : $this->binaryFormat;
        } else {
            throw new ConstraintDefinitionException(sprintf('"%s" n\'est pas une taille maximale valide .', $this->maxSize));
        }


    }
}
