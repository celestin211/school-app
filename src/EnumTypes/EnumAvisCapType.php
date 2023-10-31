<?php

namespace App\EnumTypes;

class EnumAvisCapType extends GeneriqueEnumType
{
    const DEFAVORABLE = 'défavorable';
    const FAVORABLE = 'favorable';
    const NON_CONSULTEE_RENOUVELLEMENT = 'non consultée-renouvellement';
    const REUPTE_DONNE = 'réputé donné';

    protected $name = 'enum_avis_cap';
    protected $values = ['défavorable', 'favorable', 'non consultée-renouvellement', 'réputé donné'];
}
