<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GrupoDeProductos extends Model
{
    protected $guarded = [];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function productos()
    {
        return $this->hasMany(Productos::class);
    }
}
