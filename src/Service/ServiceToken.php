<?php

declare(strict_types=1);

namespace App\Service;

use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VideoGrant;
class ServiceToken
{
    /** @var AccessToken */
    private $accessToken;

    /** @var VideoGrant */
    private $videoGrant;

    private  $accountSid;

    private $apiKeySid;
    private $apiKeySecret;

    public function __construct(
        VideoGrant  $videoGrant,
        AccessToken $accessToken,
    ) {
        $this->accessToken = $accessToken;
        $this->videoGrant = $videoGrant;
    }

    public function token():void
    {
        $this->accountSid = 'TWILIO_ACCOUNT_SID';
        $this->apiKeySid = 'TWILIO_API_KEY_SID';
        $this->apiKeySecret = 'TWILIO_API_KEY_SECRET';

        $identity = uniqid();

        // Create an Access Token
        $token = new AccessToken(
            $this->accountSid,
            $this->apiKeySid,
            $this->apiKeySecret,
            3600,
            $identity
        );

        // Grant access to Video
        $this->grant = new VideoGrant();
        $token->addGrant($this->grant);
    }
}
