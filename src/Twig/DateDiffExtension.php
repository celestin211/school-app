<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class DateDiffExtension extends AbstractExtension
{
    public function getFilters(): array
    {
        return [
            new TwigFilter('date_diff', [$this, 'dateDiffFilter']),
        ];
    }

    public function dateDiffFilter(\DateTime $date)
    {
        $now = new \DateTime();

        /** @var $diff \DateTime */
        $diff = date_diff($now, $date); //div retourne le nombre d'années, mois, jours, heures, minutes de différence entre deux dates

        $nbAnneesdiff = $diff->format('%y');
        $nbMoisdiff = $diff->format('%m');
        $nbJoursdiff = $diff->format('%d');
        $nbHeuresdiff = $diff->format('%h');
        $nbMinutesdiff = $diff->format('%i');

        if (0 != $nbAnneesdiff || 0 != $nbMoisdiff || $nbJoursdiff > 2) {
            return $date->format('d/m/Y');
        } elseif (2 == $nbJoursdiff) {
            return 'avant hier';
        } elseif (1 == $nbJoursdiff) {
            return 'hier';
        } elseif (0 != $nbHeuresdiff) {
            $heure = (1 == $nbHeuresdiff) ? ' heure' : ' heures';

            return $nbHeuresdiff.$heure;
        } else {
            $min = (1 == $nbMinutesdiff) ? ' minute' : ' minutes';

            return $nbMinutesdiff.$min;
        }
    }

    public function getName()
    {
        return 'date_extension';
    }
}
