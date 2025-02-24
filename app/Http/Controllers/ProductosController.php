<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductosResource;
use App\Models\Productos;
use Illuminate\Http\Request;

class ProductosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ProductosResource::collection(Productos::all());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'codigo' => 'required',
            'nombre' => 'required',
            'medida' => 'required',
            'imagen' => 'required',
            'precio_minorista' => 'required',
            'precio_mayorista' => 'required',
            'grupo_de_productos_id' => 'nullable|exists:grupo_de_productos,id',
            'categoria_id' => 'nullable|exists:categorias,id',
        ]);

        $producto = Productos::create($data);

        return new ProductosResource($producto);
    }

    /**
     * Display the specified resource.
     */
    public function show(Productos $productos)
    {
        return new ProductosResource($productos);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $productos = Productos::findOrFail($id);

        $data = $request->validate([
            'codigo' => 'required',
            'nombre' => 'required',
            'medida' => 'required',
            'imagen' => 'required',
            'grupo_de_productos_id' => 'nullable|exists:grupo_de_productos,id',
            'categoria_id' => 'nullable|exists:categorias,id',
            'precio_minorista' => 'required',
            'precio_mayorista' => 'required',
        ]);

        $productos->update($data);

        return new ProductosResource($productos);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $productos = Productos::findOrFail($id);
        $productos->delete();

        return response()->json(null, 204);
    }
}
