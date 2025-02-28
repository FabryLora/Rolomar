<?php

namespace App\Http\Controllers;

use App\Http\Resources\BrandImagesResource;
use App\Models\BrandImages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class BrandImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return BrandImagesResource::collection(BrandImages::all());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'image' => 'required | file',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $data["image"] = $imagePath;
        }

        $brandImage = BrandImages::create($data);

        return new BrandImagesResource($brandImage);
    }

    /**
     * Display the specified resource.
     */
    public function show(BrandImages $brandImages)
    {
        return new BrandImagesResource($brandImages);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $brandImages = BrandImages::findOrFail($id);

        $data = $request->validate([
            'image' => 'sometimes | file',
        ]);

        if ($request->hasFile('image')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($brandImages->image) {
                $absolutePath = public_path('storage/' . $brandImages->image);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $imagePath = $request->file('image')->store('images', 'public');
            $data["image"] = $imagePath;
        }

        $brandImages->update($data);

        return new BrandImagesResource($brandImages);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $brandImages = BrandImages::findOrFail($id);
        $brandImages->delete();

        return response()->json(null, 204);
    }
}
