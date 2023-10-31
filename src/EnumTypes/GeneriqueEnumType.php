<?php
/**
 * Afin de creer un nouveau type enum il faut heriter de cette classe,
 * ensuit ajouter le parametrage dans le fichier config.yml.
 */

namespace App\EnumTypes;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\Type;

abstract class GeneriqueEnumType extends Type
{
    protected $name;
    protected $values = [];

    public function getSQLDeclaration(array $fieldDeclaration, AbstractPlatform $platform): string
    {
        $values = array_map(function ($val) {
            return "'".$val."'";
        }, $this->values);

        return 'ENUM('.implode(', ', $values).") COMMENT '(DC2Type:".$this->name.")'";
    }

    public function convertToPHPValue($value, AbstractPlatform $platform): mixed
    {
        return $value;
    }

    public function convertToDatabaseValue($value, AbstractPlatform $platform): mixed
    {
        if (!in_array($value, $this->values) && null !== $value) {
            throw new \InvalidArgumentException("Invalid '".$this->name."' value.");
        }

        return $value;
    }

    public function getName(): string
    {
        return $this->name;
    }
}
