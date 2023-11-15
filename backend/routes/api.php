<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CustomerController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/update-profile', [AuthController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);



    Route::middleware('admin')->group(function () {

        Route::prefix('customers')->group(function () {
            Route::get('/', [CustomerController::class, 'index']);
            Route::post('/store', [CustomerController::class, 'store']);
            Route::put('/update/{id}', [CustomerController::class, 'update']);
            Route::delete('/delete/{id}', [CustomerController::class, 'destroy']);
            Route::get('/restore/{id}', [CustomerController::class, 'restore']);
            Route::get('/count', [CustomerController::class, 'count']);
        });
    });
    

});

Route::prefix('auth')->group(function () {
    Route::post('/sign-in', [AuthController::class, 'singin']);
    Route::post('/sign-up', [AuthController::class, 'signup']);
});


