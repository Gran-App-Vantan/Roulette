import { useState, useEffect } from "react";

export type Phase = "standby" | "spinning" | "result";

export function usePhaseLoop(spinDuration: number = 5000, resultDuration: number = 10000) {
    const [phase, setPhase] = useState<Phase>("standby");

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (phase === "spinning") {
            timer = setTimeout(() => setPhase("result"), spinDuration);
        } else if (phase === "result") {
            timer = setTimeout(() => setPhase("standby"), resultDuration);
        }

        return () => clearTimeout(timer);
    }, [phase, spinDuration, resultDuration]);

    return { phase, setPhase };
}
