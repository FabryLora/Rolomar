<?php

namespace App\Jobs;

use App\Models\User;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

class ImportarUsuariosJob implements ShouldQueue
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

            $nomcuit = $row['B'] ?? null;
            $direccion = $row['C'] ?? null;
            $localidad = $row['E'] ?? null;
            $provincia = $row['F'] ?? null;
            $cuit = $row['G'] ?? null;
            $email = !empty($row['H']) ? $row['H'] : null;
            $lista = $row['I'] ?? null;

            if (!$cuit || !$lista || !$nomcuit) continue;

            // Buscar usuario por CUIT
            $usuario = User::where('cuit', $cuit)->first();

            if ($usuario) {
                // Si el usuario existe, actualizar sus datos
                $usuario->update([
                    'nomcuit' => $nomcuit,
                    'direccion' => $direccion,
                    'localidad' => $localidad,
                    'provincia' => $provincia,
                    'email' => $email,
                    'lista' => $lista,
                    'autorizado' => true,
                ]);
            } else {
                // Si no existe, crear un nuevo usuario
                User::create([
                    'nomcuit' => $nomcuit,
                    'direccion' => $direccion,
                    'localidad' => $localidad,
                    'provincia' => $provincia,
                    'cuit' => $cuit,
                    'email' => $email,
                    'lista' => $lista,
                    'password' => Hash::make($cuit),
                    'autorizado' => true,
                    'descuento' => 0,
                ]);
            }
        }
    }
}
