<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\ImportarProductosJob;
use App\Jobs\ImportarUsuariosJob;
use Illuminate\Support\Facades\Storage;

class ImportUsuarioController extends Controller
{
    public function importar(Request $request)
    {
        $request->validate([
            'archivo' => 'required|mimes:xlsx,xls'
        ]);
        // Guardar archivo en almacenamiento temporal
        $archivoPath = $request->file('archivo')->store('importaciones');

        // Encolar el Job
        ImportarUsuariosJob::dispatch($archivoPath);

        return response()->json(['message' => 'El archivo se está procesando en segundo plano.'], 200);
    }
}
