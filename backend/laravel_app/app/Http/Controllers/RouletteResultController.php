<?php

namespace App\Http\Controllers;

use App\Models\Roulette_result;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;

class RouletteResultController extends Controller
{
    function index(Request $request){
        //これはIFでおけ、try/catchは「実行できなかったら」をチェックするものだから
        $result = $request->input('roulette_result');
        // $resultがある場合、Roulette_resultテーブルの、resultカラムに保存。
        if($result){
            Roulette_result::create([
                'result' => $result,
            ]);
            return response()->json([
            'success' => true,
            'message' => '取得に成功しました',
            'data' => [
                'roulette' => $result
            ]
        ]);
        }
        return response()->json([
            'message' => 'バリデーションエラーが発生しました。',
            'errors' => [
                'field_name' => ['このフィールドは必須です。'],
            ]
        ], 422);
    }
}