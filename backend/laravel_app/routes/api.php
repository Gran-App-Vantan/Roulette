<?php

use App\Http\Controllers\RankingListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RouletteResultController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/rouletteresult', [RouletteResultController::class, 'index']);

Route::post('/rankinglist', [RankingListController::class, 'index']);