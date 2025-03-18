<?php

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
        Schema::create('nosotros', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string("image");
            $table->longText('text');
            $table->string('title_mision');
            $table->longText('mision');
            $table->string('title_vision');
            $table->longText('vision');
            $table->string('title_valores');
            $table->longText('valores');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nosotros');
    }
};
