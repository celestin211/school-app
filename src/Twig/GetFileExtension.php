<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class GetFileExtension extends AbstractExtension
{
    public function getFilters(): array
    {
        return [
            new TwigFilter('file_extension', [$this, 'getFileExtension']),
        ];
    }

    public function getFileExtension($path)
    {
        $extension = pathinfo($path, PATHINFO_EXTENSION);

        return $extension;
    }

    public function getName()
    {
        return 'file_extension';
    }
}
