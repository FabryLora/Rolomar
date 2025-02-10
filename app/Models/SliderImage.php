<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SliderImage extends Model
{
    protected $guarded = [];

    public function slider()
    {
        return $this->belongsTo(Slider::class);
    }
}
