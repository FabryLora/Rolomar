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
        $sliderImages = SliderImage::all()->map(function ($image) {
            return [
                "id" => $image->id,
                "image_url" => $image->image ? url("storage/" . $image->image) : null,
                "slider_id" => $image->slider_id,
                "order" => $image->order,
            ];
        });

        return response()->json($sliderImages);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "image" => "required|file|mimes:jpg,jpeg,png,gif",
            "slider_id" => "required|exists:sliders,id",
        ]);

        // Obtener el orden más alto actual y sumarle 1
        $maxOrder = SliderImage::where("slider_id", $data["slider_id"])->max("order") ?? 0;
        $data["order"] = $maxOrder + 1;

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

        return response()->json([
            "id" => $sliderImage->id,
            "image_url" => $sliderImage->image ? url("storage/" . $sliderImage->image) : null,
            "slider_id" => $sliderImage->slider_id,
            "order" => $sliderImage->order,
        ]);
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
            "order" => "integer|nullable",
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

        return response()->json([
            "id" => $sliderImage->id,
            "image_url" => $sliderImage->image ? url("storage/" . $sliderImage->image) : null,
            "slider_id" => $sliderImage->slider_id,
            "order" => $sliderImage->order,
        ]);
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
