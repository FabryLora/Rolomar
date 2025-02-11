<?php

namespace App\Http\Controllers;

use App\Http\Resources\NosotrosInicioResource;
use App\Models\NosotrosInicio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;


class NosotrosInicioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return NosotrosInicioResource::collection(NosotrosInicio::all());
    }



    /**
     * Display the specified resource.
     */
    public function show(NosotrosInicio $nosotrosInicio)
    {
        return new NosotrosInicioResource($nosotrosInicio);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $nosotrosInicio = NosotrosInicio::find($id);

        $data = $request->validate([

            'text' => 'required | string',
            'image' => 'sometimes | file | mimes:jpg,jpeg,png,gif',
        ]);

        if ($request->hasFile('image')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($nosotrosInicio->image) {
                $absolutePath = public_path('storage/' . $nosotrosInicio->image);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $imagePath = $request->file('image')->store('images', 'public');
            $data["image"] = $imagePath;
        }
        $nosotrosInicio->update($data);
        return new NosotrosInicioResource($nosotrosInicio);
    }
}
