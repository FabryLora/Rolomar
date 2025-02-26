<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ListaDePreciosResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $path = public_path("storage/" . $this->archivo);

        return [
            "id" => $this->id,
            "archivo_url" => url("storage/" . $this->archivo),
            "nombre" => $this->nombre,
            "peso" => file_exists($path) ? filesize($path) : null, // Tamaño en bytes
            "formato" => file_exists($path) ? mime_content_type($path) : null, // Tipo MIME
        ];
    }
}
