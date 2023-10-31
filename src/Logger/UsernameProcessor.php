<?php

declare(strict_types=1);

namespace App\Logger;

use Monolog\LogRecord;
use Symfony\Bundle\SecurityBundle\Security;

class UsernameProcessor
{
    public function __construct(private Security $security)
    {
    }

    public function __invoke(array|LogRecord $record)
    {
        if ($this->security->getUser()) {
            $record['extra']['username'] = $this->security->getUser()->getEmail();
            $record['extra']['userId'] = $this->security->getUser()->getId();
        }

        return $record;
    }
}
