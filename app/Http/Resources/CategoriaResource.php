<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoriaResource extends JsonResource
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
            'nombre' => $this->nombre,
            'imagen_url' => $this->imagen ? url('storage/' . $this->imagen) : null,
            'orden' => $this->orden,
            'grupos' => GrupoDeProductosResource::collection($this->whenLoaded('grupos')),
            'productos' => ProductosResource::collection($this->whenLoaded('productos')),
        ];
    }
}
