<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PedidoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'tipo_entrega' => $this->tipo_entrega,
            'mensaje' => $this->mensaje,
            'archivo' => $this->archivo,
            'subtotal' => $this->subtotal,
            'iva' => $this->iva,
            'total' => $this->total,
            'productos' => PedidoProductoResource::collection($this->productos),
            'created_at' => $this->created_at,
        ];
    }
}
