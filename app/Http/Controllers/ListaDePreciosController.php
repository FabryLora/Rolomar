<?php

namespace App\Http\Controllers;

use App\Http\Resources\ListadepreciosResource;
use App\Models\ListaDePrecios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ListaDePreciosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ListaDePreciosResource::collection(ListaDePrecios::all());
    }

    public function show(ListaDePrecios $listaDePrecios)
    {
        return response()->json($listaDePrecios);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "archivo" => "required|file",
            "nombre" => "required|string",
        ]);

        // Guardar la imagen en el sistema de archivos
        $archivoPath = $request->file('archivo')->store('files', 'public');
        $data["archivo"] = $archivoPath;

        $listaDePrecios = ListaDePrecios::create($data);

        return response()->json($listaDePrecios, 201);
    }





    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $listaDePrecios = ListaDePrecios::find($id);

        $data = $request->validate([
            "archivo" => "nullable|file",
            "nombre" => "nullable|string",
        ]);

        if ($request->hasFile('archivo')) {
            // Eliminar la imagen existente del sistema de archivos
            if ($listaDePrecios->archivo) {
                $absolutePath = public_path('storage/' . $listaDePrecios->archivo);
                if (File::exists($absolutePath)) {
                    File::delete($absolutePath);
                }
            }

            // Guardar la nueva imagen
            $archivoPath = $request->file('archivo')->store('files', 'public');
            $data["archivo"] = $archivoPath;
        }

        $listaDePrecios->update($data);
        return response()->json($listaDePrecios);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $listaDePrecios = ListaDePrecios::find($id);

        if (!$listaDePrecios) {
            return response()->json(["error" => "Imagen no encontrada"], 404);
        }

        if ($listaDePrecios->archivo) {
            $absolutePath = public_path('storage/' . $listaDePrecios->archivo);
            if (File::exists($absolutePath)) {
                File::delete($absolutePath);
            }
        }

        $listaDePrecios->delete();

        return response()->json($listaDePrecios);
    }

    public function downloadPDF($filename)
    {
        $path = storage_path("app/public/files/" . $filename); // Ruta correcta

        if (file_exists($path)) {
            return response()->download($path);
        }

        return response()->json(['message' => 'Archivo no encontrado'], 404);
    }
}
