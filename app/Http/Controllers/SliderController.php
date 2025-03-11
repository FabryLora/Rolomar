<?php

namespace App\Http\Controllers;

use App\Http\Resources\SliderResource;
use App\Models\Slider;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SliderResource::collection(Slider::all());
    }



    /**
     * Display the specified resource.
     */
    public function show(Slider $slider, Request $request)
    {

        return new SliderResource($slider);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Slider $slider)
    {
        $data = $request->validate([
            "title" => "required",
            "subtitle" => " required",
            "video" => "sometimes|file",
        ]);
        if ($request->has("video")) {
            $imagePath = $request->file('video')->store('images', 'public');
            $data["video"] = $imagePath;
        }

        $slider->update($data);
        return new SliderResource($slider);
    }
}
