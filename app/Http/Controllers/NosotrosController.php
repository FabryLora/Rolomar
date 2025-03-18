<?php

namespace App\Http\Controllers;

use App\Http\Resources\NosotrosInicioResource;
use App\Http\Resources\NosotrosResource;
use App\Models\Nosotros;
use App\Models\NosotrosInicio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;


class NosotrosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return NosotrosResource::collection(Nosotros::all());
    }



    /**
     * Display the specified resource.
     */
    public function show(NosotrosInicio $nosotros)
    {
        return new NosotrosResource($nosotros);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $nosotros = Nosotros::find($id);

        $data = $request->validate([

            'text' => 'required | string',
            'title_mision' => 'required | string',
            'title_vision' => 'required | string',
            'title_valores' => 'required | string',
            'title' => 'required | string',
            'image' => 'sometimes | file | mimes:jpg,jpeg,png,gif',
            'mision' => 'required | string',
            'vision' => 'required | string',
            'valores' => 'required | string',
        ]);

        if ($request->hasFile('image')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($nosotros->image) {
                $absolutePath = public_path('storage/' . $nosotros->image);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $imagePath = $request->file('image')->store('images', 'public');
            $data["image"] = $imagePath;
        }
        $nosotros->update($data);
        return new NosotrosResource($nosotros);
    }
}
