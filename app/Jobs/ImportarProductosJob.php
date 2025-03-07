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

            $codigo = isset($row['A']) ? mb_convert_encoding(trim($row['A']), 'UTF-8', 'auto') : null;
            $nombreProductoCompleto = isset($row['B']) ? mb_convert_encoding(trim($row['B']), 'UTF-8', 'auto') : null;
            $imagenBase = isset($row['C']) ? str_pad(trim($row['C']), 3, '0', STR_PAD_LEFT) : null;
            $categoriaNombre = isset($row['D']) ? mb_convert_encoding(trim($row['D']), 'UTF-8', 'auto') : null;
            $precioMayorista = isset($row['E']) ? mb_convert_encoding(trim($row['E']), 'UTF-8', 'auto') : null;
            $precioMinorista = isset($row['F']) ? mb_convert_encoding(trim($row['F']), 'UTF-8', 'auto') : null;
            $unidadVenta = isset($row['G']) ? mb_convert_encoding(trim($row['G']), 'UTF-8', 'auto') : null;


            if (empty($codigo) || empty($nombreProductoCompleto)) {
                continue;
            }

            // Buscar la imagen con la extensión correcta
            $extensiones = ['jpg', 'jpeg', 'png', 'JPG', 'jfif'];
            $imagen = null;

            foreach ($extensiones as $ext) {


                if (Storage::disk('public')->exists("images/{$imagenBase}.{$ext}")) {
                    $imagen = "{$imagenBase}.{$ext}";
                }
            }

            // Si no se encuentra la imagen, dejarla como null o asignar una por defecto

            // Separar el nombre base y la variante al encontrar el primer número
            preg_match('/^(.*?)(\d.*)$/', $nombreProductoCompleto, $matches);
            $nombreBase = trim($matches[1] ?? $nombreProductoCompleto);
            $variante = trim($matches[2] ?? '');

            // Buscar o crear la categoría
            $categoria = Categoria::updateOrCreate(
                ['nombre' => $categoriaNombre ?: "Categoria"],
                ['imagen' => $imagen, 'orden' => null]
            );

            // Buscar o crear el grupo de productos con el nombre base
            $grupoDeProductos = GrupoDeProductos::updateOrCreate(
                ['nombre' => $nombreBase, 'categoria_id' => $categoria->id],
                ['imagen' => $imagen, 'orden' => null, 'destacado' => null]
            );

            // Crear o actualizar el producto dentro del grupo
            Productos::updateOrCreate(
                ['codigo' => $codigo],
                [
                    'nombre' => $nombreProductoCompleto,
                    'medida' => 'Unidad',
                    'imagen' => $imagen,
                    'unidad_venta' => $unidadVenta ?: 1,
                    'categoria_id' => $categoria->id,
                    'precio_mayorista' => $precioMayorista,
                    'precio_minorista' => $precioMinorista,
                    'grupo_de_productos_id' => $grupoDeProductos->id
                ]
            );
        }
    }
}
