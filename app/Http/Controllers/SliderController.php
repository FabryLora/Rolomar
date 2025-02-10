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
        return SliderResource::collection(Slider::with('images')->get());
    }



    /**
     * Display the specified resource.
     */
    public function show(Slider $slider, Request $request)
    {
        $slider->load('images');
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
            "link" => " required",
        ]);


        $slider->update($data);
        return new SliderResource($slider);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Slider $slider)
    {
        $slider->images->each(function ($image) {
            $image->delete();
        });
        $slider->delete();


        return response("", 204);
    }
}
