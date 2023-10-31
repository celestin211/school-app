<?php

namespace App\EnumTypes;

class EnumIndicateurType extends EnumType
{
    final public const RECEPTION_ARGENT = 'ACTUALITE';
    final public const DEPENSE_ARGENTS = 'DEPENSES';
    final public const TOTAL_DEPENSES = 'TOTAL';


    final public const VALUES = [
        self::RECEPTION_ARGENT => 'ACTUALITE',
        self::DEPENSE_ARGENTS => 'DEPENSES',
        self::TOTAL_DEPENSES => 'TOTAL',

    ];

    final public const MAPPING = [
        'Réception-argent' => 'ACTUALITE',
        'depense-argent' => 'DEPENSES ',
        'total-entree-depense' => 'TOTAL',

    ];

}
