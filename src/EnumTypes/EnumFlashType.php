<?php

declare(strict_types=1);

namespace App\EnumTypes;

class EnumFlashType extends EnumType
{
    public const SUCCES = 'succèss';
    public const AVERTISSEMENT = 'warning';
    public const INFORMATION = 'info';
    public const ERREUR = 'erreur';

    public const VALUES = [
        self::ERREUR => 'erreur',
        self::SUCCES => 'succèss',
        self::AVERTISSEMENT => 'warning',
        self::INFORMATION => 'info',
    ];
}
