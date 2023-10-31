<?php

declare(strict_types=1);

namespace App\Security\RequestMatcher;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestMatcherInterface;

class SsoRequestMatcher implements RequestMatcherInterface
{
    private $isSsoEnabled;

    public function __construct(bool $isSsoEnabled)
    {
        $this->isSsoEnabled = $isSsoEnabled;
    }

    /**
     * Decides whether the rule(s) implemented by the strategy matches the supplied request.
     *
     * @return bool true if the request matches, false otherwise
     */
    public function matches(Request $request): bool
    {
        return $this->isSsoEnabled;
    }
}