<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Productos extends Model
{
    protected $guarded = [];

    public function grupo()
    {
        return $this->belongsTo(GrupoDeProductos::class);
    }

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }
}
