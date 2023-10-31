<?php

namespace App\Service;

use App\Entity\Ligne;
use Doctrine\ORM\EntityManagerInterface;

class ControleDoublon
{
    private $keyComposites;
    private $em;
    private $treshold;

    public function __construct($keyComposites, EntityManagerInterface $em, $treshold)
    {
        $this->keyComposites = $keyComposites;
        $this->em = $em;
        $this->treshold = $treshold;
    }

    /**
     * @param $genericObject
     * @param $treshold : levenshtein threshold
     * @param $repositoryClass : string de la classe du repository
     *
     * @return $objectList or false
     */
    public function objectExistsInRepository($genericObject, $treshold, $repositoryClass)
    {
        $repository = $this->em->getRepository($repositoryClass);

        // TODO :	recupérer les données de la base en forme d'array et appeller la methode
        //			repeatedObjectsInList sur cet array
    }

    public function repeatedObjectsInList_tmp($genericObjectList)
    {
        $repeated = [];
        $indexLeft = 0;
        $levenshtein1stLevel = $this->treshold * 2;

        for ($indexLeft = 0, $size = count($genericObjectList); $indexLeft < $size; ++$indexLeft) {
            $sourceObject = $genericObjectList[$indexLeft];
            $currentObjectKey = $this->getCle($sourceObject);
            for ($i = $indexLeft + 1, $size1 = count($genericObjectList); $i < $size1; ++$i) {
                $targetObject = $genericObjectList[$i];
                $comparedObjectKey = $this->getCle($targetObject);

                // Comme levenshtein a une complexité (O(n*m)) on fait la comparaison en trois étapes

                if (abs(strlen($currentObjectKey) - strlen($comparedObjectKey)) <= $this->treshold) {  // optionnel
                    // Création des préfixes
                    $prefixCurrentObjectKey = substr($currentObjectKey, 0, $levenshtein1stLevel);
                    $prefixComparedObjectKey = substr($comparedObjectKey, 0, $levenshtein1stLevel);

                    // Comparaison des préfixes
                    if (levenshtein($prefixCurrentObjectKey, $prefixComparedObjectKey) <= $this->treshold) {
                        // optimisation de la ligne precedente
                        if (levenshtein($currentObjectKey, $comparedObjectKey) <= $this->treshold) {
                            $repeated[] = [0 => $sourceObject, 1 => $targetObject];
                        }
                    }
                }
            }
        }

        return (0 == count($repeated)) ? false : array_values($repeated);
    }

    public function repeatedObjectsInList($genericObjectList)
    {
        $repeated = [];
        $sliceIndex = 1;
        $levenshtein1stLevel = $this->treshold * 2;

        foreach ($genericObjectList as  $sourceObject) {
            $currentObjectKey = $this->getCle($sourceObject);
            foreach (array_slice($genericObjectList, $sliceIndex) as $targetObject) {
                $comparedObjectKey = $this->getCle($targetObject);

                // Comme levenshtein a une complexité (O(n*m)) on fait la comparaison en trois étapes

                if (abs(strlen($currentObjectKey) - strlen($comparedObjectKey)) <= $this->treshold) {  // optionnel
                    // Création des préfixes
                    $prefixCurrentObjectKey = substr($currentObjectKey, 0, $levenshtein1stLevel);
                    $prefixComparedObjectKey = substr($comparedObjectKey, 0, $levenshtein1stLevel);

                    // Comparaison des préfixes
                    if (levenshtein($prefixCurrentObjectKey, $prefixComparedObjectKey) <= $this->treshold) {
                        // optimisation de la ligne precedente
                        if (levenshtein($currentObjectKey, $comparedObjectKey) <= $this->treshold) {
                            $repeated[] = [0 => $sourceObject, 1 => $targetObject];
                        }
                    }
                }
            }
            ++$sliceIndex;
        }

        return (0 == count($repeated)) ? false : array_values($repeated);
    }

    private function getCle($object)
    {
        $cle = '';
        foreach ($this->keyComposites as $getter) {
            $getter = 'get'.$getter;
            $keyComposite = $object->$getter();
            $cle .= ($keyComposite instanceof \DateTime) ? date_format($keyComposite, 'd-m-Y') : trim($keyComposite, " \t.");
        }

        return $cle;
    }
}
