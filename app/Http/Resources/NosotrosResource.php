<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NosotrosResource extends JsonResource
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
            'text' => $this->text,
            'title_mision' => $this->title_mision,
            'title_vision' => $this->title_vision,
            'title_valores' => $this->title_valores,
            'title' => $this->title,
            'mision' => $this->mision,
            'vision' => $this->vision,
            'valores' => $this->valores,

        ];
    }
}
