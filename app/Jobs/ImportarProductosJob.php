<?php

namespace App\Jobs;

use App\Models\Producto;
use App\Models\Productos;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;

class ImportarProductosJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $archivoPath;

    /**
     * Create a new job instance.
     */
    public function __construct($archivoPath)
    {
        $this->archivoPath = $archivoPath;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        $filePath = storage_path('app/' . $this->archivoPath);

        // Cargar el archivo Excel
        $spreadsheet = IOFactory::load($filePath);
        $sheet = $spreadsheet->getActiveSheet();
        $rows = $sheet->toArray(null, true, true, true);

        // Iterar sobre las filas (suponiendo que la primera fila es el encabezado)
        foreach ($rows as $index => $row) {
            if ($index === 1) continue; // Saltar la fila de encabezado

            $codigo = $row['A'];
            $nombre = $row['B'];
            $categoria = $row['C'];
            $imagen = $row['D'];

            // Manejo de la imagen si es una URL
            $imagenPath = null;
            if (filter_var($imagen, FILTER_VALIDATE_URL)) {
                $imagenData = Http::get($imagen)->body();
                $nombreImagen = 'imagenes/' . uniqid() . '.jpg';
                Storage::put('public/' . $nombreImagen, $imagenData);
                $imagenPath = $nombreImagen;
            } else {
                $imagenPath = $imagen; // Si es solo el nombre del archivo
            }

            // Guardar en la base de datos
            Productos::create([
                'codigo'    => $codigo,
                'nombre'    => $nombre,
                'categoria' => $categoria,
                'imagen'    => $imagenPath,
            ]);
        }
    }
}
