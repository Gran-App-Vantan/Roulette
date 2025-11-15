"use client";

import React from "react";

interface SmartphoneResultProps {
  resultValue: number | null;
  amount: number;
  selectedNumbers: number[];
}

export function SmartphoneResult({
  resultValue,
  amount,
  selectedNumbers,
}: SmartphoneResultProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full h-screen p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-2 text-black">結果発表</h2>

        {resultValue !== null ? (
          <>
            <p className="text-xl font-semibold mb-2">抽選番号: {resultValue}</p>
            
            <div className="flex justify-center flex-wrap gap-2 mb-2">
              <span className="px-3 py-1 bg-green-100 rounded-full text-sm font-medium">
                掛金: {amount.toLocaleString()} P
              </span>
              <span className="px-3 py-1 bg-blue-100 rounded-full text-sm font-medium">
                選択: {selectedNumbers.join(", ")}
              </span>
            </div>

            {/* 当たり判定（シンプル版） */}
            {selectedNumbers.includes(resultValue) ? (
              <p className="text-lg text-green-600 font-bold mt-2">🎉 当たり！おめでとう！</p>
            ) : (
              <p className="text-lg text-red-600 font-bold mt-2">💔 残念…外れでした</p>
            )}
          </>
        ) : (
          <p className="text-gray-500">結果を待っています…</p>
        )}
      </div>

      {/* 再プレイ / トップに戻るボタン */}
      <div className="flex gap-4 w-full max-w-sm mt-4">
        <button
          onClick={() => location.reload()} // 同じ画面で再プレイ
          className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition"
        >
          もう一度賭ける
        </button>
      </div>
    </div>
  );
}
