<?php

namespace App\Http\Controllers;

use App\Models\Active_player;
use App\Models\Roulette_result;
use Illuminate\Http\Request;

class ParticipantResultController extends Controller
{
    function index(){
        $active_player = Active_player::where('is_guest', false)->get();
        $roulette_result = Roulette_result::all();

        foreach ($active_player as $index){
            $user = $index['user_id'];
            $stake = $index['stake'];


        }
    }
}
