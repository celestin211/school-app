<?php

namespace App\Service;

use App\Entity\Trace;
use App\Repository\TraceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\StreamedResponse;

class TraceManager
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function export()
    {
        /* @var TraceRepository $traceRepository */
        $traceRepository = $this->em->getRepository(Trace::class);

        $query = $traceRepository->createQueryBuilder('trace')
            ->getQuery();

        $iterableResult = $query->toIterable();


        $response = new StreamedResponse();
        $response->setCallback(function () use ($iterableResult) {
            $handle = fopen('php://output', 'w+');
            // UTF-8 BOM pour qu'il soit correctement lisible par Excel
            fputs($handle, "\xEF\xBB\xBF");

            // Nom des colonnes du CSV
            fputcsv($handle, [
                'id',
                'Date',
                'Utilisateur',
                'Route',
                'Durée (ms)',
                'Mémoire (octets)',
                'Méthode',
                'Code retour',
                'Url',
            ], ';');

            foreach ($iterableResult as $row) {
                /* @var Trace $trace */
                $trace = $row;

                //Ecriture dans le CSV
                fputcsv($handle, [
                    $trace->getId(),
                    $this->formatDateToString($trace->getDateTrace()),
                    $trace->getEmailUtilisateur(),
                    $trace->getRoute(),
                    $trace->getDuree(),
                    $trace->getMemoire(),
                    $trace->getMethode(),
                    $trace->getCodeHttp(),
                    $trace->getPath(),
                ], ';');
            }

            fclose($handle);
        });

        return $response;
    }

    public function purge() {
        /* @var TraceRepository $traceRepository */
        $traceRepository = $this->em->getRepository(Trace::class);
        $traceRepository->purge();
    }

    private function formatDateToString(?\DateTime $date): string
    {
        if (null === $date) {
            return '';
        }

        return $date->format('d/m/Y H:i:s');
    }
}
