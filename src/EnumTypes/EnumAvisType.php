<?php

namespace App\EnumTypes;

class EnumAvisType extends GeneriqueEnumType
{
    const VALIDE = 'validé';
    const REJETE = 'rejeté';

    protected $name = 'enum_avis';
    protected $values = [
            'validé',
            'rejeté',
    ];
}
