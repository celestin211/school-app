<?php

declare(strict_types=1);

namespace App\EnumTypes;

class EnumStatutCarte
{
    const VISA = 'Visa';
    const MASTER_CARD = 'Master card';
    const ELECTRON = 'ACCUSE_RECEPTION';
    const EXPRESS = 'American express';
    const BALCK_CARD = 'VALIDE_T';
    const PLATINUM = 'Platinum';

    const VALUES = [
        self::VISA => 'Visa',
        self::MASTER_CARD => 'Master card',
        self::BALCK_CARD=>'Black card',
        self::EXPRESS=>'American express',
        self::PLATINUM=>'Platinum',
        self::ELECTRON=>'Electron',
    ];
}

