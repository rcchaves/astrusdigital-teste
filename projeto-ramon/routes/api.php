<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ProdutoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('/pedidos', PedidoController::class );
    
});


Route::apiResource('/categorias', CategoriaController::class);
Route::apiResource('/produtos', ProdutoController::class);


// Autenticação
Route::post('/cadastro', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);