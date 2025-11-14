"use client";

import CommonButton from "@/components/elements/CommonButton";
import BettingContainer from "@/components/layouts/BettingContainer";
import FloatingContainer from "@/components/layouts/FloatingContainer";
import NoiseLayer from "@/components/layouts/NoiseLayer";
import BottomSheet from "@/components/layouts/BottomSheet";
import Header from "@/components/layouts/Header";

import { useBottomSheetContext } from "@/contexts/BottomSheetContext";
import { useBettingGridContext } from "@/contexts/BettingGridContext";

const BettingPage = () => {
  const bottomSheet = useBottomSheetContext();
  const bettingGrid = useBettingGridContext();

  return (
    <main>
      <Header/>
      <NoiseLayer/>
      <FloatingContainer>
        <CommonButton color="bg-primary shadow-xl floating-glow select-none max-w-120" onClick={bottomSheet.open}><p className="font-bold text-lg">ベットする</p></CommonButton>
      </FloatingContainer>
      <BottomSheet>
        <div className="px-4 w-full flex flex-col items-center gap-5">
          <CommonButton color="bg-red-500 shadow-xl select-none" onClick={() => bettingGrid.selectOutsideBet("red")}><p className="font-bold text-lg">赤のみ</p></CommonButton>
          <CommonButton color="bg-black shadow-xl select-none" onClick={() => bettingGrid.selectOutsideBet("black")}><p className="font-bold text-lg">黒のみ</p></CommonButton>
          <CommonButton color="bg-primary shadow-xl floating-glow select-none" onClick={() => bettingGrid.selectOutsideBet(bettingGrid.getRandomOutsideBet())}><p className="font-bold text-lg">ランダム</p></CommonButton>
          <CommonButton
            color="bg-green-500 shadow-xl select-none"
            onClick={() => {
              const confirmed = bettingGrid.confirmSelection(true); // 確定して選択をクリアする
              console.log("確定された番号:", confirmed);
              // TODO: サーバ送信や次の画面遷移などをここで行う
              bottomSheet.close();
            }}
          >
            <p className="font-bold text-lg">確定</p>
          </CommonButton>
        </div>
        </BottomSheet>
        <section className="fixed w-full h-screen px-4 pt-36 pb-120 select-none flex flex-col items-center no-drag overflow-y-scroll overflow-scroll-smooth">
          <BettingContainer/>
        </section>
    </main>
  );
}

export default BettingPage;