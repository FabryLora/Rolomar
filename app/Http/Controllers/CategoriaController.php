<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoriaResource;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $onlyCategoria = $request->input('input');
        if ($onlyCategoria) {
            return CategoriaResource::collection(Categoria::all());
        }
        return CategoriaResource::collection(Categoria::with(['grupos', 'productos'])->get());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate(rules: [
            'nombre' => 'required',
            'imagen' => 'nullable|file',
            'orden' => 'nullable',

        ]);

        if ($request->hasFile('imagen')) {
            $imagePath = $request->file('imagen')->store('images', 'public');
            $data["imagen"] = $imagePath;
        }

        $categoria = Categoria::create($data);

        return new CategoriaResource($categoria);
    }

    /**
     * Display the specified resource.
     */
    public function show(Categoria $categoria)
    {
        $categoria->load(['grupos', 'productos']);
        return new CategoriaResource($categoria);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $categoria = Categoria::findOrFail($id);

        $data = $request->validate([
            'nombre' => 'required',
            'imagen' => 'nullable|file',
            'orden' => 'nullable',
        ]);

        if ($request->hasFile('imagen')) {
            $imagePath = $request->file('imagen')->store('images', 'public');
            $data["imagen"] = $imagePath;
        }

        $categoria->update($data);

        return new CategoriaResource($categoria);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $categoria = Categoria::findOrFail($id);
        $categoria->delete();

        return response()->json(null, 204);
    }
}
