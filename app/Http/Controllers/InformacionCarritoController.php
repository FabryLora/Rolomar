<?php

namespace App\Http\Controllers;

use App\Http\Resources\InformacionCarritoResource;
use App\Models\InformacionCarrito;
use Illuminate\Http\Request;

class InformacionCarritoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return InformacionCarritoResource::collection(InformacionCarrito::all());
    }


    /**
     * Display the specified resource.
     */
    public function show(InformacionCarrito $informacionCarrito)
    {
        return new InformacionCarritoResource($informacionCarrito);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $informacionCarrito = InformacionCarrito::find($id);
        $informacionCarrito->update($request->all());
        return new InformacionCarritoResource($informacionCarrito);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        $informacionCarrito = InformacionCarrito::find($id);
        $informacionCarrito->delete();
        return response()->json(null, 204);
    }
}
