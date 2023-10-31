<?php

declare(strict_types=1);

namespace App\EventListener;

use Doctrine\DBAL\Event\ConnectionEventArgs;
use Doctrine\DBAL\Event\Listeners\OracleSessionInit as BaseOracleSessionInit;

/**
 * Custom OracleSessionInit.
 */
class OracleSessionInit
{
    public function postConnect(ConnectionEventArgs $args)
    {
        if ('oracle' !== mb_strtolower($args->getConnection()->getDatabasePlatform()->getName())) {
            return;
        }

        $sessionVars = [
            'NLS_LANGUAGE' => 'FRENCH',
            'NLS_TERRITORY' => 'FRANCE',
            'NLS_CURRENCY' => '€',
            'NLS_ISO_CURRENCY' => 'FRANCE',
            'NLS_CALENDAR' => 'GREGORIAN',
            'NLS_DATE_LANGUAGE' => 'FRENCH',
            'NLS_SORT' => 'BINARY_AI',
            'NLS_DUAL_CURRENCY' => '€',
            'NLS_COMP' => 'LINGUISTIC',
            'NLS_LENGTH_SEMANTICS' => 'CHAR',
            'NLS_NCHAR_CONV_EXCP' => 'FALSE',
        ];

        $oracleSessionInit = new BaseOracleSessionInit($sessionVars);
        $oracleSessionInit->postConnect($args);
    }
}
