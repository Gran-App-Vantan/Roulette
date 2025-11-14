"use client"

import Image from "next/image"; 
import { useState, useEffect, useRef } from "react";
import { Standby } from "@/components/elements/Standby";
import { Result } from "@/components/layouts/Result";
import { LeftMenu } from "@/components/elements/LeftMenu";

export default function TimedSwitch() {
  const [phase, setPhase] = useState<"standby" | "spinning" | "result">("standby");
  const [result, setResult] = useState<number | null>(null);

  // refs
  const wheelRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const angleRef = useRef<number>(0);
  const speedRef = useRef<number>(0);
  const deceleratingRef = useRef<boolean>(false);

  const STANDBY_DURATION = 180000;
  const RESULT_DURATION = 8000;

  // ホイールアニメーション
  const animateWheel = () => {
    requestRef.current = requestAnimationFrame(() => {
      if (wheelRef.current) {
        angleRef.current += speedRef.current * 16;
        wheelRef.current.style.transform = `rotate(${angleRef.current}deg)`;

        if (deceleratingRef.current) {
          speedRef.current *= 0.97;
          if (speedRef.current < 0.01) {
            speedRef.current = 0;
            cancelAnimationFrame(requestRef.current);
            // 減速後 Result に
            setTimeout(() => setPhase("result"), 0);
            return;
          }
        }
      }
      animateWheel();
    });
  };

  // スピン開始
  const startSpin = () => {
    setPhase("spinning");
    speedRef.current = 0.5;
    deceleratingRef.current = false;
    animateWheel();
    setTimeout(() => {
      deceleratingRef.current = true;
    }, 2000);
  };

  // Standby フェーズに入ったら即 startSpin をセット
  useEffect(() => {
    if (phase === "standby") {
      const timer = setTimeout(() => {
        startSpin();
      }, STANDBY_DURATION);

      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Result フェーズ
  useEffect(() => {
    if (phase === "result") {
      // 結果生成
      if (result === null) {
        setResult(Math.floor(Math.random() * 36) + 1);
      }

      // RESULT_DURATION 後に Standby に戻す
      const timer = setTimeout(() => {
        setPhase("standby");
        setResult(null);
        angleRef.current = 0;
      }, RESULT_DURATION);

      return () => clearTimeout(timer);
    }
  }, [phase, result]);

  return (
    <div className="relative flex justify-center items-center gap-44 w-full h-screen">
      {phase === "standby" && <Standby duration={STANDBY_DURATION / 1000} />}
      <LeftMenu isActive={phase !== "standby"} />

      <div 
        ref={wheelRef}
        className="flex justify-center items-center w-[1050px] h-[1050px] bg-[url('/wheel/wheel-back.svg')] bg-no-repeat bg-center"
      >
        <Image
          src="/wheel/wheel-main.svg"
          width={629}
          height={629}
          alt="wheel-main"
        />
      </div>

      {phase === "result" && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full h-screen">
          <Result resultValue={result} />
        </div>
      )}
    </div>
  );
}


