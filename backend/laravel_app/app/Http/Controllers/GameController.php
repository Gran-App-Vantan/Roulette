<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class GameController extends Controller
{
    function start_time()
    {
        $firstUser = User::orderBy('created_at', 'asc')->first();
        return response()->json([
            'success' => true,
            'message' => '取得に成功しました',
            'data' => [
                'start_time' => $firstUser
            ]
        ]);
    }


    // function index(){
    //     $active_player = Active_player::where('is_guest', false)->get();
    //     $roulette_result = Roulette_result::all(); //場所

    //     foreach ($active_player as $index){
    //         $user = $index['user_id'];
    //         $stake = $index['stake']; //賭けたお金
    //         $betting_place = $index['betting_place']; //賭けた場所

            
    //     }
    // }

    //     function index(Request $request){ //$requestにはsns_idが入っている。
    //     $user_id = $request->input('user_id');
    //     $user_name = $request->input('user_name');
    //     $icon = $request->input('icon');
    //     $stake = $request->input('stake');
    //     $is_guest = $request->input('is_guest');
    //     $betting_place = $request->input('betting_place');
    //     //ここは「実行できたら」を確認しているわけだから大丈夫
    //     try{
    //         Active_player::create([
    //             'user_id' => $user_id,
    //             'user_name' => $user_name,
    //             'icon' => $icon,
    //             'stake' => $stake,
    //             'is_guest' => $is_guest
    //         ]);
        
    //         return response()->json([
    //         'success' => true,
    //         'message' => '取得に成功しました'
    //     ]);
    //     } catch (\Exception $e){
    //         report($e);
    //         session()->flash('flash_message', '更新が失敗しました');//あってもなくてもいい？
            
    //         return response()->json([
    //         'success' => false,
    //         'message' => '取得に失敗しました'
    //         ]);
    //     }
    // }

    //     function index(Request $request){
    //     //これはIFでおけ、try/catchは「実行できなかったら」をチェックするものだから
    //     $result = $request->input('roulette_result'); //場所だけが入る。
    //     // $resultがある場合、Roulette_resultテーブルの、resultカラムに保存。
    //     if($result){
    //         Roulette_result::create([
    //             'result' => $result,
    //         ]);
    //         return response()->json([
    //         'success' => true,
    //         'message' => '取得に成功しました',
    //         'data' => [
    //             'roulette' => $result
    //         ]
    //     ]);
    //     }
    //     return response()->json([
    //         'message' => 'バリデーションエラーが発生しました。',
    //         'errors' => [
    //             'field_name' => ['このフィールドは必須です。'],
    //         ]
    //     ], 422);
    // }
}
