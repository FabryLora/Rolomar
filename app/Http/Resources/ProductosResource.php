<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductosResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'codigo' => $this->codigo,
            'nombre' => $this->nombre,
            'medida' => $this->medida,
            'imagen' => $this->imagen,
            'precio_mayorista' => $this->grupo->nombre,
            'precio_minorista' => $this->grupo->categoria->nombre,
        ];
    }
}
