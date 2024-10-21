<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('companies', CompanyController::class);
Route::apiResource('employees', EmployeeController::class);

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
Route::post('companies/{company}/employees', [EmployeeController::class, 'store']);

Route::get('companies/{company}/employees', [EmployeeController::class, 'index']); 
Route::get('employees/{id}', [EmployeeController::class, 'show']); 
Route::put('employees/{id}', [EmployeeController::class, 'update']); 
Route::delete('employees/{id}', [EmployeeController::class, 'destroy']); 

