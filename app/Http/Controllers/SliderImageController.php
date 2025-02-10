<?php

namespace App\Http\Controllers;

use App\Models\SliderImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class SliderImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(SliderImage::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "image" => "required|file|mimes:jpg,jpeg,png,gif",
            "slider_id" => "required|exists:sliders,id"
        ]);

        // Guardar la imagen en el sistema de archivos
        $imagePath = $request->file('image')->store('images', 'public');
        $data["image"] = $imagePath;

        // Crear el registro de la imagen
        $sliderImage = SliderImage::create($data);

        return response()->json($sliderImage, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $sliderImage = SliderImage::find($id);

        if (!$sliderImage) {
            return response()->json(["error" => "Imagen no encontrada"], 404);
        }

        return response()->json($sliderImage);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $sliderImage = SliderImage::find($id);

        if (!$sliderImage) {
            return response()->json(["error" => "Imagen no encontrada"], 404);
        }

        $data = $request->validate([
            "image" => "file|mimes:jpg,jpeg,png,gif|nullable",
        ]);

        if ($request->hasFile('image')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($sliderImage->image) {
                $absolutePath = public_path('storage/' . $sliderImage->image);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $imagePath = $request->file('image')->store('images', 'public');
            $data["image"] = $imagePath;
        }

        // Actualizar el registro de la imagen
        $sliderImage->update($data);

        return response()->json($sliderImage);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $sliderImage = SliderImage::find($id);

        if (!$sliderImage) {
            return response()->json(["error" => "Imagen no encontrada"], 404);
        }

        if ($sliderImage->image) {
            $absolutePath = public_path('storage/' . $sliderImage->image);
            if (File::exists($absolutePath)) {
                File::delete($absolutePath);
            }
        }

        // Eliminar el registro de la imagen
        $sliderImage->delete();

        return response()->json(["message" => "Imagen eliminada"], 200);
    }
}
