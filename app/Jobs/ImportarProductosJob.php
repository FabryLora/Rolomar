<?php

namespace App\Jobs;

use App\Models\Categoria;
use App\Models\GrupoDeProductos;
use App\Models\ImageGrupo;
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
            $precioMayorista = isset($row['F']) ? mb_convert_encoding(trim($row['F']), 'UTF-8', 'auto') : null;
            $precioMinorista = isset($row['E']) ? mb_convert_encoding(trim($row['E']), 'UTF-8', 'auto') : null;
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
            // Buscar o crear la categoría sin modificar 'orden' ni 'imagen' si ya existe
            $categoria = Categoria::firstOrNew(['nombre' => $categoriaNombre ?: "Categoria"]);
            if (!$categoria->exists) {
                $categoria->imagen = $imagen;
                $categoria->orden = null;
                $categoria->save();
            }

            // Buscar o crear el grupo de productos sin modificar 'orden' ni 'imagen' si ya existe
            $grupoDeProductos = GrupoDeProductos::firstOrNew([
                'nombre' => $nombreBase,
                'categoria_id' => $categoria->id
            ]);

            if (!$grupoDeProductos->exists) {
                $grupoDeProductos->imagen = $imagen;
                $grupoDeProductos->orden = null;
                $grupoDeProductos->destacado = null;
                $grupoDeProductos->save();
            }

            // Crear la imagen del grupo solo si la imagen no es null y aún no existe
            if ($imagen !== null) {
                ImageGrupo::firstOrCreate(
                    ['grupo_de_productos_id' => $grupoDeProductos->id, 'image' => $imagen]
                );
            }

            // Buscar o crear el producto sin modificar la imagen ni el orden si ya existe
            $producto = Productos::firstOrNew(['codigo' => $codigo]);

            if (!$producto->exists) {
                $producto->imagen = $imagen;
            }

            $producto->nombre = $nombreProductoCompleto;
            $producto->medida = 'Unidad';
            $producto->unidad_venta = $unidadVenta ?: 1;
            $producto->categoria_id = $categoria->id;
            $producto->precio_mayorista = $precioMayorista;
            $producto->precio_minorista = $precioMinorista;
            $producto->grupo_de_productos_id = $grupoDeProductos->id;
            $producto->addword = $nombreProductoCompleto;
            $producto->save();
        }
    }
}
