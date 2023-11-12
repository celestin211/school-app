<?php

declare(strict_types=1);

namespace App\EnumTypes;

class EnumStatut
{
    final public const CREE = 'CREE';
    final public const TRANSMIS_DGAFP = 'TRANSMIS_DGAFP';
    final public const ACCUSE_RECEPTION = 'ACCUSE_RECEPTION';
    final public const VALIDE = 'VALIDE';
    final public const VALIDE_T = 'VALIDE_T';
    final public const REJETE = 'REJETE';
    final public const AVIS_CONFORME_ANNULE = 'AVIS_CONFORME_ANNULE';
}
