<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NovedadesResource extends JsonResource
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
            'image_url' => url("storage/" . $this->image),
            'type' => $this->type,
            'title' => $this->title,
            'text' => $this->text,
            'featured' => $this->featured,
        ];
    }
}
