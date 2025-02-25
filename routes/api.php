<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ContactInfoController;
use App\Http\Controllers\GrupoDeProductosController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\ImportUsuarioController;
use App\Http\Controllers\ListaDePreciosController;
use App\Http\Controllers\LogosController;
use App\Http\Controllers\NosotrosController;
use App\Http\Controllers\NosotrosInicioController;
use App\Http\Controllers\NovedadesController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\PedidoProductoController;
use App\Http\Controllers\ProductosController;
use App\Http\Controllers\SendContactInfoController;
use App\Http\Controllers\SendPedidoController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\SliderImageController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

//Cliente
Route::put('/users/{id}', [AuthController::class, 'update']);
Route::delete('/users/{id}', [AuthController::class, 'destroy']);
Route::get('/allusers', [AuthController::class, 'index']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

//Admin
Route::get('/me-admin', [AdminController::class, 'me']);
Route::post('/login-admin', [AdminController::class, 'login']);
Route::post('/signup-admin', [AdminController::class, 'signup']);
Route::put('/admin/{id}', [AdminController::class, 'update']);
Route::get('/alladmins', [AdminController::class, 'index']);

//DefaultLayout
Route::apiResource('/slider', SliderController::class);
Route::apiResource('/sliderimage', SliderImageController::class);
Route::apiResource("/logos", LogosController::class);
Route::apiResource('/nosotrosinicio', NosotrosInicioController::class);
Route::apiResource('/novedades', NovedadesController::class);
Route::apiResource('/nosotros', NosotrosController::class);
Route::apiResource('/contact-info', ContactInfoController::class);

//Importar excels
Route::post('/importar-excel', [ImportController::class, 'importar']);
Route::post('/importar-usuarios', [ImportUsuarioController::class, 'importar']);

//Productos
Route::apiResource('/productos', ProductosController::class);
Route::apiResource('/categorias', CategoriaController::class);
Route::apiResource('/grupo-de-productos', GrupoDeProductosController::class);

//Emails
Route::post('/sendcontact', [SendContactInfoController::class, 'sendReactEmail']);
Route::post('/sendpedido', [SendPedidoController::class, 'sendReactEmail']);

//Pedidos
Route::apiResource('/pedidos', PedidoController::class);
Route::apiResource('/pedido-productos', PedidoProductoController::class);

//Lista de precios
Route::apiResource("/listadeprecios", ListaDePreciosController::class);
Route::get('/downloadarchivo/{filename}', [ListaDePreciosController::class, 'downloadPDF']);
