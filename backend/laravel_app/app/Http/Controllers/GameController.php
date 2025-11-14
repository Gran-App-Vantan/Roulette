<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use LDAP\Result;

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

    public function enter(Request $request)
    {
        $request->validate([
            'sns_id' => 'required|string',
        ]);

        DB::table('sns_id')->insert([
            'sns_id' => $request->sns_id,
        ]);

        return response()->json(['message' => 'saved']);
    }

    function user_all()
    {
        return User::select('id', 'sns_id')->get()->map(function ($user) {

            // SNS ID がある場合は API を叩く
            try {
                $response = Http::get(config('services.dealer.api_url') . "/api/account/show/{$user->sns_id}");

                if ($response->successful()) {
                    $snsUser = $response->json('data.user', []);

                    return [
                        'id' => $user->id,
                        'name' => $snsUser['name'] ?? "ゲスト{$user->id}",
                        'user_icon' => $snsUser['user_icon'] ?? null,
                    ];
                }
            } catch (\Exception $e) {
                Log::error('SNS API エラー', ['user_id' => $user->id]);
            }

            // SNS なし or API エラー
            return [
                'id' => $user->id,
                'name' => "ゲスト{$user->id}",
                'user_icon' => null,
            ];
        });
    }

    function roulette_result(Request $request) //ルーレットの結果が入ってくる。
    {
        try {
            $result = $request->input('roulette_result'); //ルーレットの結果(例: 7,5など)

            $user_all = User::all();
            $p = $user_all->map(function ($user, $result) {
                $stake = $user->stake;
                $bet_place = $user->bet_place;
                foreach ($bet_place as $index) {
                    if ($index == $result) {
                        $filele_stake = $stake * 5;
                    }
                }
            });
        } catch (\Exception $e) {
            Log::error('SNS API エラー', ['user_id' => $user_all->id]);
        }
    }

    function stake(Request $request)
    { //賭け金、どこに賭けたか、user_id
        try {
            $stake = $request->input('stake');
            $bet_place = $request->input('bet_place'); //場所
            $user_id = $request->input('id');

            $user = User::find($user_id);
            $user->update([
                'stake' => $stake,
                'bet_place' => $bet_place
            ]);

            return response()->json([
                'success' => true,
                'message' => '取得に成功しました'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '取得に失敗しました'
            ]);
        }
    }
}
