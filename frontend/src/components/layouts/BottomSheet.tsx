"use client";

import clsx from "clsx";
import { useRef } from "react";
import { ReactNode } from "react";

import { useBottomSheetContext } from "@/contexts/BottomSheetContext";

interface BottomSheetProps{
  children: ReactNode;
}

const BottomSheet = ({ children }:BottomSheetProps) => {
  const bottomSheet = useBottomSheetContext();

  const startY = useRef<number|null>(null);

  const handleStart = (clientY: number) => {
      startY.current = clientY;
      window.addEventListener("mousemove", handleMoveMouse);
      window.addEventListener("mouseup", handleEndMouse);
      window.addEventListener("touchmove", handleMoveTouch);
      window.addEventListener("touchend", handleEndTouch);
  };

  const handleMove = (clientY: number) => {
      if (startY.current === null) return;
      const deltaY = clientY - startY.current;

      if (deltaY < -50){
          bottomSheet.open();
      } else if (deltaY > 50){
          bottomSheet.close();
      }
  };

  const cleanup = () => {
      startY.current = null;
      window.removeEventListener("mousemove", handleMoveMouse);
      window.removeEventListener("mouseup", handleEndMouse);
      window.removeEventListener("touchmove", handleMoveTouch);
      window.removeEventListener("touchend", handleEndTouch);
  };

  // for mouse
  const handleStartMouse = (e: React.MouseEvent) => handleStart(e.clientY);
  const handleMoveMouse = (e: MouseEvent) => handleMove(e.clientY);
  const handleEndMouse = () => cleanup();

  // for touch screen
  const handleStartTouch = (e: React.TouchEvent) => handleStart(e.touches[0].clientY);
  const handleMoveTouch = (e: TouchEvent) => handleMove(e.touches[0].clientY);
  const handleEndTouch = () => cleanup();

  return (
    <section className="fixed w-full h-screen pointer-events-none z-100">
      <div className={clsx(
        "pointer-events-auto absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-auto pb-5 max-h-[80vh] overflow-y-auto bg-bg-modal rounded-t-[44px] transition-all duration-300 max-w-140",
        bottomSheet.state.isOpen
          ? "translate-y-0"
          : "translate-y-full"
      )}>
        <div 
          onMouseDown={(e) => handleStartMouse(e)}
          onTouchStart={(e) => handleStartTouch(e)}
          className="w-full h-12 bottomsheet-grabber"
        ></div>
        {children}
      </div>
    </section>
  );
}

export default BottomSheet;