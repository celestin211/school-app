<?php

declare(strict_types=1);

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class Civilite extends Constraint
{
    public $message = "Civilité non valide. Valeurs acceptées : {{ choices }}";
}
