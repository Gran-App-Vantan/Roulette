<?php

namespace App\Http\Controllers;

use App\Models\Active_player;
use Illuminate\Http\Request;

class RankingListController extends Controller
{
    function index(Request $request){ //$requestにはsns_idが入っている。
        $user_id = $request->input('user_id');
        $user_name = $request->input('user_name');
        $icon = $request->input('icon');
        $stake = $request->input('stake');
        $is_guest = $request->input('is_guest');
        $betting_place = $request->input('betting_place');
        //ここは「実行できたら」を確認しているわけだから大丈夫
        try{
            Active_player::create([
                'user_id' => $user_id,
                'user_name' => $user_name,
                'icon' => $icon,
                'stake' => $stake,
                'is_guest' => $is_guest
            ]);
        
            return response()->json([
            'success' => true,
            'message' => '取得に成功しました'
        ]);
        } catch (\Exception $e){
            report($e);
            session()->flash('flash_message', '更新が失敗しました');//あってもなくてもいい？
            
            return response()->json([
            'success' => false,
            'message' => '取得に失敗しました'
            ]);
        }
    }
}