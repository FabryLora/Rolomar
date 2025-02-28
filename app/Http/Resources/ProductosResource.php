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
            'imagen_url' => $this->imagen ? url('storage/images/' . $this->imagen) : null,
            'unidad_venta' => $this->unidad_venta,
            'precio_mayorista' => $this->precio_mayorista,
            'precio_minorista' => $this->precio_minorista,
            "categoria" => new CategoriaResource($this->categoria),
            "grupo" => $this->grupo_de_productos_id
        ];
    }
}
