<?php

namespace App\Http\Controllers;

use App\Http\Resources\NovedadesResource;
use App\Models\Novedades;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;


class NovedadesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return NovedadesResource::collection(Novedades::all());
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required | string',
            'title' => 'required | string',
            'text' => 'required | string',
            'image' => 'required | file',
            'featured' => 'required',
        ]);

        $imagePath = $request->file('image')->store('images', 'public');
        $data["image"] = $imagePath;

        $novedades = Novedades::create($data);
        return response()->json($novedades, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Novedades $novedades)
    {
        return new NovedadesResource($novedades);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $novedades = Novedades::find($id);

        if (!$novedades) {
            return response()->json(["error" => "Novedad no encontrada"], 404);
        }

        $data = $request->validate([
            'type' => 'sometimes | string',
            'title' => 'sometimes | string',
            'text' => 'sometimes | string',
            'image' => 'sometimes | file',
            'featured' => 'sometimes',
        ]);

        if ($request->hasFile('image')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($novedades->image) {
                $absolutePath = public_path('storage/' . $novedades->image);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $imagePath = $request->file('image')->store('images', 'public');
            $data["image"] = $imagePath;
        }

        $novedades->update($data);
        return response()->json($novedades);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $novedades = Novedades::find($id);

        if (!$novedades) {
            return response()->json(["error" => "Imagen no encontrada"], 404);
        }

        if ($novedades->image) {
            $absolutePath = public_path('storage/' . $novedades->image);
            if (File::exists($absolutePath)) {
                File::delete($absolutePath);
            }
        }

        // Eliminar el registro de la imagen
        $novedades->delete();

        return response()->json(["message" => "Imagen eliminada"], 200);
    }
}
