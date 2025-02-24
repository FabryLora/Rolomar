<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $guarded = [];

    public function grupos()
    {
        return $this->hasMany(GrupoDeProductos::class);
    }

    public function productos()
    {
        return $this->hasMany(Productos::class);
    }
}
