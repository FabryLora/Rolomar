<?php

namespace App\Http\Controllers;

use App\Http\Resources\PedidoResource;
use App\Models\Pedido;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    public function index()
    {
        return PedidoResource::collection(Pedido::with('productos')->get());
    }

    public function store(Request $request)
    {
        $pedido = Pedido::create($request->only(['user_id', 'tipo_entrega', 'mensaje', 'archivo', 'subtotal', 'iva', 'total']));
        return new PedidoResource($pedido);
    }

    public function show(Pedido $pedido)
    {
        return new PedidoResource($pedido->load('productos'));
    }

    public function update(Request $request, Pedido $pedido)
    {
        $pedido->update($request->only(['tipo_entrega', 'mensaje', 'archivo', 'subtotal', 'iva', 'total']));
        return new PedidoResource($pedido);
    }

    public function destroy(Pedido $pedido)
    {
        $pedido->delete();
        return response()->json(['message' => 'Pedido eliminado']);
    }
}
