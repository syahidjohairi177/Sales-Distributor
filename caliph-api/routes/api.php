<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Hr\SalesController;

Route::middleware(['auth:sanctum', 'hr'])->prefix('hr')->group(function () {
    Route::get('/sales', [SalesController::class, 'index']);
    Route::post('/sales/bulk', [SalesController::class, 'bulkStore']);
});

Route::get('/ping', fn () => response()->json(['ok' => true]));

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});