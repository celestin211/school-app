<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Corps;
use App\Entity\Grade;
use App\Repository\CorpsRepository;
use Doctrine\ORM\EntityManagerInterface;
use http\Env\Request;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpClient\CurlHttpClient;
use App\Repository\GradeRepository;

class ApiIngres
{
    const FORMAT_DATE = 'Y-m-d\TH:i:s\Z';

    private $urlBase;
    private $em;
    private $logger;

    private $tableauCorps = [];
    private $client;
    private $accessToken;
    private $clientSecret;
    private $clientId;
    private $urlToGetAccessToken;

    public function __construct($urlBase, EntityManagerInterface $em, $proxyIngresHost, $proxyIngresPort, LoggerInterface $logger, $urlToGetAccessToken, $clientSecret, $clientId)
    {
        $this->urlBase = $urlBase;
        $this->em = $em;
        $this->logger = $logger;
        $this->urlToGetAccessToken = $urlToGetAccessToken;
        $this->clientSecret = $clientSecret;
        $this->clientId = $clientId;

        $defaultOptions = ['verify_peer' => false];
        if (self::notEmpty($proxyIngresHost) && self::notEmpty($proxyIngresPort)) {
            $defaultOptions['proxy'] = $proxyIngresHost.':'.$proxyIngresPort;
        }

        $this->client = new CurlHttpClient($defaultOptions);
    }

    public function rafraichirReferentiels()
    {
        try {
            // Parametrage de la pagination pour l'API Ingres des Corps
            $linesLimitCorps = 200;
            $offsetCorps = 0;
            while ($offsetCorps % $linesLimitCorps === 0) {
                // Ré-initialisation de la variable corps pour éviter les dépassements de mémoire
                unset($corps);
                $corps = null;

                // Récuperation des données depuis l'API
                $corps = $this->getCorpsIngres($offsetCorps, $linesLimitCorps);

                // Si aucune donnée n'est récupérée, on sort du traitement
                if (count($corps) === 0) {
                    break;
                }

                // Insértion en base de donnée
                $this->em->beginTransaction();
                $this->em->getRepository(Corps::class)->desactiverReferentiel();

                $this->persistCorps($corps);

                $this->em->flush();
                $this->em->commit();

                // Incrémentation du nombre de corps insérés
                $offsetCorps += count($corps);
            }

            // Parametrage de la pagination pour l'API Ingres des Grades
            $linesLimitGrade = 500;
            $offsetGrade = 0;
            while ($offsetGrade % $linesLimitGrade === 0) {
                // Ré-initialisation de la variable grade pour éviter les dépassements de mémoire
                unset($grade);
                $grade = null;

                // Récuperation des données depuis l'API
                $grade = $this->getGradesIngres($offsetGrade, $linesLimitGrade);

                // Si aucune donnée n'est récupérée, on sort du traitement
                if (count($grade) === 0) {
                    break;
                }

                // Insértion en base de donnée
                $this->em->beginTransaction();
                $this->em->getRepository(Grade::class)->desactiverReferentiel();

                $this->persistGrades($grade);

                $this->em->flush();
                $this->em->commit();

                // Incrémentation du nombre de grades insérés
                $offsetGrade += count($grade);
            }

            // Libération du EntityManager
            $this->em->clear();

        } catch (\Exception $e) {
            $this->em->rollback();
            $this->logger->critical($e->getMessage());
            throw $e;
        }
    }

    private function persistCorps($listeCorps)
    {
        foreach ($listeCorps as $corps) {
            $codeCategorie = $corps['corpsOuPseudoCorps']['caracteristiques']['categorie']['codeCategorie'];

            if (in_array($codeCategorie, ['1', '7', '8', '4'])) {
                $corpsIngres = $this->em->getRepository(Corps::class)->findOneBy(['identifiant' => $corps['identifiant']]);
                if (!$corpsIngres) {
                    $corpsIngres = new Corps();
                }

                $corpsIngres->setIdentifiant($corps['identifiant'])
                    ->setLibelleCourt($corps['corpsOuPseudoCorps']['libelles']['libelleCourt'])
                    ->setLibelleLong($corps['corpsOuPseudoCorps']['libelles']['libelleLong'])
                    ->setDebutValidite($this->getDateOrNull($corps['corpsOuPseudoCorps']['validite']['debutValidite']))
                    ->setFinValidite($this->getDateOrNull($corps['corpsOuPseudoCorps']['validite']['finValidite']))
                    ->setStatut($corps['corpsOuPseudoCorps']['validite']['status'])
                    ->setActif(true)
                    ->setCategorie($this->getCategorieFromCode($codeCategorie));
                $this->em->persist($corpsIngres);
                $this->tableauCorps[$corps['identifiant']] = $corpsIngres;
            }
        }
    }

    private function getDateOrNull(?string $stringDate): ?\DateTime
    {
        if (!empty($stringDate)) {
            return \DateTime::createFromFormat(self::FORMAT_DATE, $stringDate);
        }

        return null;
    }

    private function getCategorieFromCode(string $codeCategorie): ?string
    {
        if (in_array($codeCategorie, ['1', '7', '8'])) {
            return 'A';
        }

        if (in_array($codeCategorie, ['4'])) {
            return 'H';
        }

        return null;
    }

    private function persistGrades($grades)
    {
        foreach ($grades as $grade) {
            $identifiantCorps = $grade['definitions']['corps'][0]['corps'];

            if (isset($this->tableauCorps[$identifiantCorps])) {
                $gradeIngres = $this->em->getRepository(Grade::class)->findOneBy(['identifiant' => $grade['identifiant']]);
                if (!$gradeIngres) {
                    $gradeIngres = new Grade();
                }

                $gradeIngres->setIdentifiant($grade['identifiant'])
                    ->setLibelleCourt($grade['definitions']['libelles']['libelleCourt'])
                    ->setLibelleLong($grade['definitions']['libelles']['libelleLongMasculin'])
                    ->setDebutValidite($this->getDateOrNull($grade['definitions']['validite']['debutValidite']))
                    ->setFinValidite($this->getDateOrNull($grade['definitions']['validite']['finValidite']))
                    ->setStatut($grade['definitions']['validite']['status'])
                    ->setCorps($this->tableauCorps[$identifiantCorps])
                    ->setActif(true);
                $this->em->persist($gradeIngres);
            }
        }
    }

    private function getCorpsIngres(?int $offset, ?int $linesLimit)
    {
        try {
            $url = $this->urlBase.'/CORPS';
            if (!is_null($offset) && !is_null($linesLimit)) {
                $url .= "?offset=$offset&linesLimit=$linesLimit";
            }

            $response = $this->requestIngres($url);
            return $response['items'];
        } catch (\Exception $e) {
            $this->logger->critical($e->getMessage());
            return [];
        }
    }

    private function getGradesIngres(?int $offset, ?int $linesLimit)
    {
        try {
            $url = $this->urlBase.'/GRADE';
            if (!is_null($offset) && !is_null($linesLimit)) {
                $url .= "?offset=$offset&linesLimit=$linesLimit";
            }

            $response = $this->requestIngres($url);
            return $response['items'];
        } catch (\Exception $e) {
            $this->logger->critical($e->getMessage());
            return [];
        }
    }

    private function requestIngres($url)
    {
        if (null === $this->accessToken) {
            $this->getAccessToken();
        }

        $response = $this->client->request('GET', $url,
            [
            'headers' => [
                'Authorization' => 'Bearer '.$this->accessToken,
                ], ]
        );

        $statusCode = $response->getStatusCode();

        if (200 !== $statusCode) {
            $message = "Erreur API INGRES, code retour : $statusCode, url : $url";

            if ($statusCode >= 300) {
                $this->logger->critical($message);
            }

            throw new \Exception($message);
        }

        return $response->toArray();
    }

    private static function notEmpty($val)
    {
        return null !== $val && !empty($val) && 'null' !== $val && 'NULL' !== $val && '~' !== $val && 'false' !== $val && 'FALSE' !== $val;
    }

    private function getAccessToken()
    {
        $options['body'] = [
            'grant_type' => 'client_credentials',
            'client_secret' => $this->clientSecret,
            'client_id' => $this->clientId,
        ];

        $response = $this->client->request('POST', $this->urlToGetAccessToken, $options);

        if (200 == $response->getStatusCode() && isset(($response->toArray())['access_token'])) {
            $this->accessToken = ($response->toArray())['access_token'];
        } else {
            $message = "Erreur de récupération de l'access token";
            $this->logger->critical($message);
            throw new \Exception($message);
        }
    }


}
