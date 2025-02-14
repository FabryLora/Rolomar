<?php

namespace App\Jobs;

use App\Models\Categoria;
use App\Models\GrupoDeProductos;
use App\Models\Productos;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class ImportarProductosJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $archivoPath;

    public function __construct($archivoPath)
    {
        $this->archivoPath = $archivoPath;
    }

    public function handle()
    {
        $filePath = Storage::path($this->archivoPath);
        $spreadsheet = IOFactory::load($filePath);
        $sheet = $spreadsheet->getActiveSheet();
        $rows = $sheet->toArray(null, true, true, true);

        foreach ($rows as $index => $row) {
            if ($index === 1) continue; // Saltar encabezado

            $codigo = $row['A'];
            $nombreProducto = $row['B'];
            $medida = $row['C'];
            $imagen = $row['D'];
            $categoriaNombre = $row['E'];
            $precioMayorista = $row['F'];
            $precioMinorista = $row['G'];

            // Buscar o crear la categoría
            $categoria = Categoria::firstOrCreate(['nombre' => $categoriaNombre], [
                'imagen' => $imagen
            ]);

            // Buscar o crear el grupo de productos dentro de la categoría
            $grupoDeProductos = GrupoDeProductos::firstOrCreate([
                'nombre' => $nombreProducto,
                'categoria_id' => $categoria->id
            ], [
                'imagen' => $imagen
            ]);

            // Crear el producto asociado al grupo de productos
            Productos::create([
                'codigo' => $codigo,
                'nombre' => $nombreProducto,
                'medida' => $medida,
                'imagen' => $imagen,
                'precio_mayorista' => $precioMayorista,
                'precio_minorista' => $precioMinorista,
                'grupo_id' => $grupoDeProductos->id
            ]);
        }
    }
}
