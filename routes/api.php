<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LogosController;
use App\Http\Controllers\NosotrosInicioController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\SliderImageController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::put('/users/{id}', [AuthController::class, 'update']);
Route::delete('/users/{id}', [AuthController::class, 'destroy']);
Route::get('/allusers', [AuthController::class, 'index']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/me-admin', [AdminController::class, 'me']);
Route::post('/login-admin', [AdminController::class, 'login']);
Route::post('/signup-admin', [AdminController::class, 'signup']);
Route::put('/admin/{id}', [AdminController::class, 'update']);
Route::get('/alladmins', [AdminController::class, 'index']);
Route::apiResource('/slider', SliderController::class);
Route::apiResource('/sliderimage', SliderImageController::class);
Route::apiResource("/logos", LogosController::class);
Route::apiResource('/nosotrosinicio', NosotrosInicioController::class);
