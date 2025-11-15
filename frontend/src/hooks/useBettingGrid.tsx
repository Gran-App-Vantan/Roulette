import { useState } from "react";

import { BettingGridType } from "@/types/BettingTypes";
import { BettingGridItems } from "@/constants/BettingGridItems";
import { OutsideBetType } from "@/types/BettingTypes";

type BettingGridWithState = BettingGridType & {
  selected: boolean;
  dim: boolean;
};

export const useBettingGrid = () => {
  const findBetsByOutsideType = (type: OutsideBetType): number[] => {
    switch (type) {
      case "red":
        return BettingGridItems.filter((item) => item.color === "red").map(
          (i) => i.betNumber
        );

      case "black":
        return BettingGridItems.filter((item) => item.color === "black").map(
          (i) => i.betNumber
        );

      case "even":
        return BettingGridItems.filter((item) => item.betNumber % 2 === 0).map(
          (i) => i.betNumber
        );

      case "odd":
        return BettingGridItems.filter((item) => item.betNumber % 2 !== 0).map(
          (i) => i.betNumber
        );

      case "low": // 1〜18
        return BettingGridItems.filter(
          (item) => item.betNumber >= 1 && item.betNumber <= 18
        ).map((i) => i.betNumber);

      case "high": // 19〜36
        return BettingGridItems.filter(
          (item) => item.betNumber >= 19 && item.betNumber <= 36
        ).map((i) => i.betNumber);

      case "dozen1": // 1〜12
        return BettingGridItems.filter(
          (item) => item.betNumber >= 1 && item.betNumber <= 12
        ).map((i) => i.betNumber);

      case "dozen2": // 13〜24
        return BettingGridItems.filter(
          (item) => item.betNumber >= 13 && item.betNumber <= 24
        ).map((i) => i.betNumber);

      case "dozen3": // 25〜36
        return BettingGridItems.filter(
          (item) => item.betNumber >= 25 && item.betNumber <= 36
        ).map((i) => i.betNumber);

      case "column1": // 1,4,7,...,34
        return BettingGridItems.filter((item) => item.betNumber % 3 === 1).map(
          (i) => i.betNumber
        );

      case "column2": // 2,5,8,...,35
        return BettingGridItems.filter((item) => item.betNumber % 3 === 2).map(
          (i) => i.betNumber
        );

      case "column3": // 3,6,9,...,36
        return BettingGridItems.filter((item) => item.betNumber % 3 === 0).map(
          (i) => i.betNumber
        );

      default:
        return [];
    }
  };

  const getRandomOutsideBet = (): OutsideBetType => {
    const bets: OutsideBetType[] = [
      "red",
      "black",
      "even",
      "odd",
      "low",
      "high",
      "dozen1",
      "dozen2",
      "dozen3",
      "column1",
      "column2",
      "column3",
    ];

    const randomIndex = Math.floor(Math.random() * bets.length);
    return bets[randomIndex];
  };

  const [grid, setGrid] = useState<BettingGridWithState[]>(
    BettingGridItems.map((item) => ({
      ...item,
      selected: false,
      dim: false,
    }))
  );

  const selectOutsideBet = (type: OutsideBetType) => {
    const target = findBetsByOutsideType(type);

    setGrid((prev) =>
      prev.map((item) =>
        target.includes(item.betNumber)
          ? { ...item, selected: true, dim: false }
          : { ...item, selected: false, dim: true }
      )
    );
  };

  // マス番号をクリックでトグル（手動選択）
  const toggleNumber = (betNumber: number) => {
    setGrid((prev) =>
      prev.map((item) =>
        item.betNumber === betNumber
          ? { ...item, selected: !item.selected, dim: false }
          : { ...item, dim: false }
      )
    );
  };

  // クリックされたマスだけを選択（他はクリア）して dim を解除するユーティリティ
  const selectSingleNumber = (betNumber: number) => {
    setGrid((prev) =>
      prev.map((item) =>
        item.betNumber === betNumber
          ? { ...item, selected: true, dim: false }
          : { ...item, selected: false, dim: false }
      )
    );
  };

  // 現在選択されている番号一覧を返す
  const getSelectedNumbers = (): number[] => {
    return grid.filter((i) => i.selected).map((i) => i.betNumber);
  };

  // 選択を確定する。clearAfterConfirm=true なら確定後に選択をクリアする
  const confirmSelection = (clearAfterConfirm = true): number[] => {
    const selected = getSelectedNumbers();
    if (clearAfterConfirm) {
      setGrid((prev) => prev.map((item) => ({ ...item, selected: false, dim: false })));
    }
    return selected;
  };

  // 選択をクリアするユーティリティ
  const clearSelection = () => {
    setGrid((prev) => prev.map((item) => ({ ...item, selected: false, dim: false })));
  };

  return { grid, selectOutsideBet, getRandomOutsideBet, toggleNumber, selectSingleNumber, getSelectedNumbers, confirmSelection, clearSelection };
};