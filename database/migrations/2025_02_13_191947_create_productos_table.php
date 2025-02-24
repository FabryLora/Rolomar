<?php

use App\Models\Categoria;
use App\Models\GrupoDeProductos;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('codigo');
            $table->string('nombre');
            $table->string('medida');
            $table->string('imagen')->nullable();
            $table->decimal('precio_mayorista', 10, 2);
            $table->decimal('precio_minorista', 10, 2);
            $table->foreignIdFor(GrupoDeProductos::class, 'grupo_de_productos_id')->constrained();
            $table->foreignIdFor(Categoria::class, 'categoria_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
