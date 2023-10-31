<?php

namespace App\Twig;

use App\EnumTypes\EnumGradeType;
use App\EnumTypes\EnumOrigineEntreeCorpsMisEnExtinctionType;
use App\EnumTypes\EnumOrigineRecrutementType;
use App\EnumTypes\EnumProposeType;
use App\EnumTypes\EnumRetenuType;
use App\Util\Util;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class SignacExtension extends AbstractExtension
{
    public function getFilters(): array
    {
        return [
            new TwigFilter('age', [$this, 'getAge']),
            new TwigFilter('proposeEnumTransform', [$this, 'transformEnumPropose']),
            new TwigFilter('retenuEnumTransform', [$this, 'transformEnumRetenu']),
            new TwigFilter('identite', [$this, 'identite']),
            new TwigFilter('origineRecrutement', [$this, 'origineRecrutement']),
            new TwigFilter('origineEntreeCorpsMisEnExtinction', [$this, 'origineEntreeCorpsMisEnExtinction']),
            new TwigFilter('date', [$this, 'formatDate'], []),
            new TwigFilter('datetime', [$this, 'formatDateTime']),
            new TwigFilter('ouiNon', [$this, 'ouiNon']),
            new TwigFilter('gradeAe', [$this, 'gradeAe']),
        ];
    }

    public function getAge($dateNaissance, $anneeRef = null, $moisRef = null, $jourRef = null)
    {
        return Util::age($dateNaissance, $anneeRef, $moisRef, $jourRef).' ans';
    }

    public function transformEnumPropose($propose)
    {
        switch ($propose) {
            case EnumProposeType::PROPOSE_RANG_NON_UTILE:
                return 'Proposé en liste complémentaire';
            case EnumProposeType::PROPOSE_RANG_UTILE:
                return 'Proposé en liste principale';
            case EnumProposeType::NON_PROPOSE:
                return 'Non proposé';
            default:
                return '';
        }
    }

    public function transformEnumRetenu($propose)
    {
        switch ($propose) {
            case EnumRetenuType::RETENU_RANG_NON_UTILE:
                return 'Retenu en liste complémentaire';
            case EnumRetenuType::RETENU_RANG_UTILE:
                return 'Retenu en liste principale';
            case EnumRetenuType::NON_RETENU:
                return 'Non retenu';
            default:
                return '';
        }
    }

    public function getName()
    {
        return 'signac_extension';
    }

    public function identite($object): string
    {
        return Util::identite($object);
    }

    public function origineRecrutement(?string $origineRecrutement): string
    {
        $origineRecrutement = mb_strtolower($origineRecrutement);
        return EnumOrigineRecrutementType::getLibelle($origineRecrutement);
    }

    public function origineEntreeCorpsMisEnExtinction(?string $origineEntreeCorpsMisEnExtinction): string
    {
        $origineEntreeCorpsMisEnExtinction = mb_strtolower($origineEntreeCorpsMisEnExtinction);
        return EnumOrigineEntreeCorpsMisEnExtinctionType::getLibelle($origineEntreeCorpsMisEnExtinction);
    }

    public function gradeAe(?string $gradeAe): string
    {
        $gradeAe = mb_strtolower($gradeAe);
        return EnumGradeType::getLibelle($gradeAe);
    }

    public function formatDate($dateTime, $format = 'd/m/Y'): string
    {
        if ('now' === $dateTime) {
            $dateTime = new \DateTime();
        }

        return Util::twig_date($dateTime, $format);
    }

    public function formatDateTime($dateTime): string
    {
        $format = 'd/m/Y H:i:s';

        if (null !== $dateTime && '00:00:00' == $dateTime->format('H:i:s')) {
            $format = 'd/m/Y';
        }

        return null === $dateTime ? '' : $dateTime->format($format);
    }

    public function ouiNon($bool): string
    {
        return Util::ouiNon($bool);
    }
}
