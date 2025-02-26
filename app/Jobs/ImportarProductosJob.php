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
            $imagen = $row['C'];
            $categoriaNombre = $row['D'];
            $precioMayorista = $row['E'];
            $precioMinorista = $row['F'];
            $unidadVenta = $row['G'];

            // Si el código es null o está vacío, pasar a la siguiente fila
            if (empty($codigo)) {
                continue;
            }

            // Verificar si el producto ya existe
            $productoExistente = Productos::where('codigo', $codigo)->first();
            if ($productoExistente) {
                continue; // Si existe, no lo volvemos a crear
            }

            // Buscar o crear la categoría
            $categoria = Categoria::firstOrCreate(
                ['nombre' => $categoriaNombre ?: "Categoria"],
                ['imagen' => $imagen, 'orden' => null]
            );

            // Buscar o crear el grupo de productos dentro de la categoría
            $grupoDeProductos = GrupoDeProductos::firstOrCreate(
                ['nombre' => $nombreProducto ?: 'Producto', 'categoria_id' => $categoria->id],
                ['imagen' => $imagen, 'orden' => null, 'destacado' => null]
            );

            // Crear el producto si no existe
            Productos::updateOrCreate([
                'codigo' => $codigo,
                'nombre' => $nombreProducto ?: 'Producto',
                'medida' => 'Unidad',
                'imagen' => $imagen,
                'unidad_venta' =>  $unidadVenta || 1,
                'categoria_id' => $categoria->id,
                'precio_mayorista' => $precioMayorista,
                'precio_minorista' => $precioMinorista,
                'grupo_de_productos_id' => $grupoDeProductos->id
            ]);
        }
    }
}
