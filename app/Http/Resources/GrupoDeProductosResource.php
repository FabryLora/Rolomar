<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GrupoDeProductosResource extends JsonResource
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
            'imagen_url' => $this->imagen ? url('storage/images/' . $this->imagen) : null,
            "nombre" => $this->nombre,
            'destacado' => $this->destacado,
            'orden' => $this->orden,
            "categoria_id" => $this->categoria_id,
            'productos' => ProductosResource::collection($this->productos),
            'images' => ImageGrupoResource::collection($this->images),
        ];
    }
}
