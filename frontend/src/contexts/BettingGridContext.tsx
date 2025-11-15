"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useBettingGrid } from "@/hooks/useBettingGrid";
import { OutsideBetType } from "@/types/BettingTypes";

type BettingGridContextType = {
  grid: ReturnType<typeof useBettingGrid>["grid"];
  selectOutsideBet: (type: OutsideBetType) => void;
  getRandomOutsideBet: () => OutsideBetType;
  toggleNumber: (betNumber: number) => void;
  selectSingleNumber: (betNumber: number) => void;
  confirmSelection: (clearAfterConfirm?: boolean) => number[];
  getSelectedNumbers: () => number[];
  clearSelection: () => void;
};

const BettingGridContext = createContext<BettingGridContextType | null>(null);

export const BettingGridProvider = ({ children }: { children: ReactNode }) => {
  // useBettingGrid は一度だけ呼ぶ（返り値に selectSingleNumber を含める）
  const { grid, selectOutsideBet, getRandomOutsideBet, toggleNumber, selectSingleNumber, confirmSelection, getSelectedNumbers, clearSelection } = useBettingGrid();

  return (
    <BettingGridContext.Provider value={{ grid, selectOutsideBet, getRandomOutsideBet, toggleNumber, selectSingleNumber, confirmSelection, getSelectedNumbers, clearSelection }}>
      {children}
    </BettingGridContext.Provider>
  );
};

export const useBettingGridContext = () => {
  const context = useContext(BettingGridContext);
  if (!context) {
    throw new Error("useBettingGridContext must be used within BettingGridProvider");
  }
  return context;
};
