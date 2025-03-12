<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductosResource;
use App\Models\Productos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ProductosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ProductosResource::collection(Productos::with(['grupo', 'categoria'])->get());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'codigo' => 'required',
            'nombre' => 'required',
            'medida' => 'sometimes',
            'imagen' => 'sometimes | file',
            'unidad_venta' => 'nullable',
            'precio_minorista' => 'required',
            'precio_mayorista' => 'required',
            'addword' => 'sometimes',
            'grupo_de_productos_id' => 'nullable|exists:grupo_de_productos,id',
            'categoria_id' => 'nullable|exists:categorias,id',
        ]);

        if ($request->hasFile('imagen')) {
            $imagePath = $request->file('imagen')->store('images', 'public');
            $data["imagen"] = $imagePath;
        }

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
            'imagen' => 'sometimes | file',
            'unidad_venta' => 'nullable',
            'addword' => 'sometimes',
            'grupo_de_productos_id' => 'nullable|exists:grupo_de_productos,id',
            'categoria_id' => 'nullable|exists:categorias,id',
            'precio_minorista' => 'required',
            'precio_mayorista' => 'required',
        ]);

        if ($request->hasFile('imagen')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($productos->imagen) {
                $absolutePath = public_path('storage/' . $productos->imagen);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $imagePath = $request->file('imagen')->store('images', 'public');
            $data["imagen"] = $imagePath;
        }


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
