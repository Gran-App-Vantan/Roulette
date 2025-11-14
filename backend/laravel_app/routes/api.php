<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameController;
// use App\Http\Controllers\RankingListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\RouletteResultController;

// Route::post('/rouletteresult', [RouletteResultController::class, 'index']);
// Route::post('/rankinglist', [RankingListController::class, 'index']);

Route::get('/start_time', [GameController::class, 'start_time']);
Route::post('/enter', [GameController::class, 'enter']);
Route::get('/user_all', [GameController::class, 'user_all']);
Route::post('/roulette_result', [GameController::class, 'roulette_result']);
//Route::post('/stake', [GameController::class, 'state']);

Route::post('/change-bet', [GameController::class, 'changeBet'])
    ->middleware('auth:sanctum');
