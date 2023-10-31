<?php

declare(strict_types=1);

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class Password extends Constraint
{
    public $minLengthMessage = 'Le mot de passe doit contenir au moins {{ min }} caractères';

    public $maxLengthMessage = 'Le mot de passe doit contenir moins de {{ max }} caractères';

    public $upperCaseMessage = 'Le mot de passe doit contenir au moins une majuscule';

    public $lowerCaseMessage = 'Le mot de passe doit contenir au moins une minuscule';

    public $numericMessage = 'Le mot de passe doit contenir au moins un chiffre';

    public $specialCharMessage = 'Le mot de passe doit contenir au moins un caractère spécial';
}
