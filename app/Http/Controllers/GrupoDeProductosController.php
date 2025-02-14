<?php

namespace App\Http\Controllers;

use App\Http\Resources\GrupoDeProductosResource;
use App\Models\GrupoDeProductos;
use Illuminate\Http\Request;

class GrupoDeProductosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return GrupoDeProductosResource::collection(GrupoDeProductos::with('productos')->get());
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required',
            'image' => 'required',
            'categoria_id' => 'required|exists:categorias,id',
        ]);

        $grupo = GrupoDeProductos::create($data);

        return new GrupoDeProductosResource($grupo);
    }

    /**
     * Display the specified resource.
     */
    public function show(GrupoDeProductos $grupoDeProductos)
    {
        return new GrupoDeProductosResource($grupoDeProductos);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $grupoDeProductos = GrupoDeProductos::findOrFail($id);

        $data = $request->validate([
            'nombre' => 'required',
            'image' => 'required',
            'categoria_id' => 'required|exists:categorias,id',
        ]);

        $grupoDeProductos->update($data);

        return new GrupoDeProductosResource($grupoDeProductos);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $grupoDeProductos = GrupoDeProductos::findOrFail($id);
        $grupoDeProductos->delete();

        return response()->json(null, 204);
    }
}
