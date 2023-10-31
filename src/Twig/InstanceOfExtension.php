<?php

namespace App\Twig;

use App\Entity\CampagneAvancement;
use App\Entity\CampagneMesureIndividuelle;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Core\Exception\LockedException;
use Twig\Extension\AbstractExtension;
use Twig\TwigTest;

class InstanceOfExtension extends AbstractExtension
{
    public function getTests(): array
    {
        return [
            new TwigTest('instanceOfLockedException', [$this, 'instanceOfLockedException']),
            new TwigTest('instanceOfBadCredentialsException', [$this, 'instanceOfBadCredentialsException']),
            new TwigTest('instanceOfDateTime', [$this, 'instanceOfDateTime']),
            new TwigTest('instanceOfCampagneAvancement', [$this, 'instanceOfCampagneAvancement']),
            new TwigTest('instanceOfCampagneMesureIndividuelle', [$this, 'instanceOfCampagneMesureIndividuelle']),
            new TwigTest('instanceOf', [$this, 'instanceOf']),
        ];
    }

    public function instanceOfLockedException($variable)
    {
        return $variable instanceof LockedException;
    }

    public function instanceOfDateTime($variable)
    {
        return $variable instanceof \DateTime;
    }

    public function instanceOfBadCredentialsException($variable)
    {
        return $variable instanceof BadCredentialsException;
    }

    public function instanceOfCampagneAvancement($variable)
    {
        return $variable instanceof CampagneAvancement;
    }

    public function instanceOfCampagneMesureIndividuelle($variable)
    {
        return $variable instanceof CampagneMesureIndividuelle;
    }

    public function instanceOf($object, $class)
    {
        $reflectionClass = new \ReflectionClass($class);

        return $reflectionClass->isInstance($object);
    }

    public function getName()
    {
        return 'instanceOf';
    }
}
