<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImageGrupo extends Model
{
    protected $guarded = [];

    public function grupo()
    {
        return $this->belongsTo(GrupoDeProductos::class);
    }
}
