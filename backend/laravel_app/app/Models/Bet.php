<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bet extends Model
{
    protected $table = 'bets'; // テーブル名を明示
    protected $fillable = ['stake', 'bet_place', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
