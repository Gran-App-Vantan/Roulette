<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('active_players', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('user_name', 50);
            $table->text('icon')->nullable();//textにしてもう少し文字列が入るように。（iconには画像のURLを採用するので）
            $table->integer('stake')->default(0);
            $table->boolean('is_guest')->default(false);
            $table->integer('betting_place');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('active_players');
    }
};
