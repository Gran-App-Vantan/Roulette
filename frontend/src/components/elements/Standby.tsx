"use client";

import { useEffect, useState } from "react";

interface StandbyProps {
    duration: number;
}

export function Standby({ duration }: StandbyProps) {
    const [secondsLeft, setSecondsLeft] = useState(duration);

    useEffect(() => {
    const interval = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return (
            <div className="absolute  flex flex-col justify-start items-center w-[570px] h-79 bg-black/70 border-5 border-gray-600 rounded-3xl gap-6 pt-15 left-1/2 --translate-x-1/2 z-10">
                <p className="text-5xl font-bold">開始まで残り</p>
                <p className="text-8xl font-bold">{minutes}:{seconds.toString().padStart(2, "0")}</p>
            </div>
    );
}