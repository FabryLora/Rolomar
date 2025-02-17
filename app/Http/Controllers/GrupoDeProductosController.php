<?php

namespace App\Http\Controllers;

use App\Http\Resources\GrupoDeProductosResource;
use App\Models\GrupoDeProductos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

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
            'imagen' => 'nullable|file',
            'destacado' => 'nullable',
            'orden' => 'nullable',
            'categoria_id' => 'required|exists:categorias,id',
        ]);

        if ($request->hasFile('imagen')) {
            $imagePath = $request->file('imagen')->store('images', 'public');
            $data["imagen"] = $imagePath;
        }


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
            'imagen' => 'nullable|file',
            'destacado' => 'nullable',
            'orden' => 'nullable',
            'categoria_id' => 'required|exists:categorias,id',
        ]);

        if ($request->hasFile('imagen')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($grupoDeProductos->imagen) {
                $absolutePath = public_path('storage/' . $grupoDeProductos->imagen);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $imagePath = $request->file('imagen')->store('images', 'public');
            $data["imagen"] = $imagePath;
        }

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
