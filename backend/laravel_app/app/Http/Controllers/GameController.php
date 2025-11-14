<?php

namespace App\Http\Controllers;

use App\Models\Bet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use LDAP\Result;

class GameController extends Controller
{
    public function start_time()
    {
        $firstUser = User::orderBy('created_at', 'asc')->first();
        return response()->json([
            'success' => true,
            'start_time' =>  $firstUser ? $firstUser->created_at : null
        ]);
    }

    public function enter(Request $request)
    {
        $request->validate([
            'sns_id' => 'required|string',
            'point' => 'required|integer'
        ]);

        $createdUser = User::create([
            'sns_id' => $request->sns_id,
            'point' => $request->point,
        ]);

        return response()->json([
            'token' => $createdUser->createToken('token')->plainTextToken
        ]);
    }

    public function user_all()
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
        $result = $request->input('rouletteResult'); // ルーレットの結果 (例: 7, 5など)

        // トランザクションで安全に更新
        DB::transaction(function () use ($result) {
            // すべてのユーザーのベットを取得
            $bets = Bet::with('user')->get();

            foreach ($bets as $bet) {
                $user = $bet->user;

                if ($bet->bet_place == $result) {
                    // 勝ち: 掛け金の1.5倍を加算
                    $user->point += $bet->stake * 1.5;
                } else {
                    // 負け: 掛け金を減算
                    $user->point -= $bet->stake;
                }

                $user->save();
            }

            $users = User::all();

            foreach ($users as $user) {
                // 外部APIにポイント更新を送信
                Http::patch(config('services.dealer.api_url') . "/api/account/wallet/update/{$user->sns_id}", [
                    'point' => $user->point,
                ]);
            }

            // 全ユーザーを削除
            User::query()->delete();
        });
        return response()->json(['message' => 'ルーレット結果を反映しました']);
    }

    //! NOTE: 何に使うん？
    function stake(Request $request)
    { //賭け金、どこに賭けたか、user_id
        try {
            $stake = $request->input('stake');
            $bet_place = $request->input('betPlace'); //場所
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

    function changeBet(Request $request)
    { //賭け金、どこに賭けたか、user_id
        try {
            $authUser = request()->user();
            //! NOTE: betsはArray<{ stake: number, betPlace: number }>型
            $bets = collect($request->input('bets'))->map(function ($bet) {
                return [
                    'stake'     => $bet['stake'],
                    'bet_place' => $bet['betPlace'],
                ];
            })->toArray();

            $betQuery = User::find($authUser->id)->bets();
            $betQuery->delete();
            $betQuery->createMany($bets);

            return response()->json([
                'success' => true,
                'message' => '更新しました'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '更新に失敗しました'
            ]);
        }
    }
}
