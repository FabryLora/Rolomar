<?php

namespace App\Http\Controllers;

use App\Http\Resources\ImageGrupoResource;
use App\Models\ImageGrupo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ImageGrupoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ImageGrupoResource::collection(ImageGrupo::all());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $data = $request->validate([
            'image' => 'required|file',
            'grupo_de_productos_id' => 'required|exists:grupo_de_productos,id',
            'orden' => 'sometimes|string',
        ]);

        $imagePath = $request->file('image')->store('images', 'public');
        $data["image"] = $imagePath;

        $imageGrupo = ImageGrupo::create($data);

        return response()->json($imageGrupo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ImageGrupo $imageGrupo)
    {
        return new ImageGrupoResource($imageGrupo);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $data = $request->validate([
            'image' => 'sometimes|file',
            'grupo_de_productos_id' => 'sometimes|exists:grupo_de_productos,id',
            'orden' => 'sometimes|string',
        ]);

        $imageGrupo = ImageGrupo::find($id);

        if ($request->hasFile('image')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($imageGrupo->image) {
                $absolutePath = public_path('storage/' . $imageGrupo->image);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $imagePath = $request->file('image')->store('images', 'public');
            $data["image"] = $imagePath;
        }

        $imageGrupo->update($data);

        return response()->json($imageGrupo);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $imageGrupo = ImageGrupo::find($id);

        if (!$imageGrupo) {
            return response()->json(["error" => "Imagen no encontrada"], 404);
        }

        if ($imageGrupo->image) {
            $absolutePath = public_path('storage/' . $imageGrupo->image);
            if (File::exists($absolutePath)) {
                File::delete($absolutePath);
            }
        }

        $imageGrupo->delete();

        return response()->json(["message" => "Imagen eliminada"]);
    }
}
