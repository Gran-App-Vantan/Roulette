"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Payment() {
  const [raw, setRaw] = useState<string>("");
  const amount = Number(raw || 0);
  const min = 1;
  const max = 100000;
  const searchParams = useSearchParams();
  const router = useRouter();

  // クエリから選択番号を取得
  const selectedNumbers = useMemo(() => {
    const p = searchParams?.get("numbers") || "";
    if (!p) return [] as number[];
    return p.split(",").map((s) => Number(s)).filter((n) => !Number.isNaN(n));
  }, [searchParams]);

  const setFromInput = (v: string) => {
    const digits = v.replace(/[^\d]/g, "");
    setRaw(digits);
  };

  const applyPreset = (v: number) => setRaw(String(v));

  const valid = amount >= min && amount <= max && selectedNumbers.length > 0;

  const handleConfirm = () => {
    if (!valid) return;

    // ★ ここで次のページに送るだけ（掛金と選択番号だけ渡す）
    router.push(`/next?amount=${amount}&numbers=${selectedNumbers.join(",")}`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-8 gap-8">
      <h1 className="text-3xl font-bold">掛金設定</h1>

      {/* かける場所の表示 */}
      <div className="w-full max-w-md flex flex-col gap-2">
        <label className="text-sm font-medium">賭ける場所</label>
        {selectedNumbers.length > 0 ? (
          <div className="py-2 px-3 rounded-md bg-gray-100 text-gray-700">
            {selectedNumbers.join(", ")}
          </div>
        ) : (
          <div className="py-2 px-3 rounded-md bg-yellow-50 text-sm text-gray-600">
            賭ける場所が選択されていません。ベッティング画面から選択してください。
          </div>
        )}
      </div>

      {/* 入力 UI */}
      <div className="w-full max-w-md flex flex-col gap-4">
        <label className="text-sm font-medium">掛金（P）</label>
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          value={raw}
          onChange={(e) => setFromInput(e.target.value)}
          placeholder="掛金額を入力してください"
          className="w-full h-12 px-3 border-2 border-gray-300 rounded-md text-lg"
        />

        <div className="flex gap-2">
          {[100, 500, 1000, 5000].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => applyPreset(p)}
              className="flex-1 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 active:brightness-95"
            >
              {p.toLocaleString()} P
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            入力値: <span className="font-medium">{amount.toLocaleString()} P</span>
          </div>
          <div className={`${valid ? "text-green-600" : "text-red-600"}`}>
            {valid ? "有効" : `無効（${min}〜${max} P、かつ賭ける場所が必要）`}
          </div>
        </div>

        <button
          onClick={handleConfirm}
          disabled={!valid}
          className={`w-full p-5 rounded-2xl text-white font-bold transition-all duration-150 ${
            valid ? "bg-green-600 hover:bg-green-700" : "bg-green-600 opacity-50 cursor-not-allowed"
          }`}
        >
          確定する
        </button>
      </div>
    </main>
  );
}
