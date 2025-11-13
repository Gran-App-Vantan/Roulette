import { useEffect, useState } from "react";

export function useTimedSwitch(duration: number = 180000) {
    const [showA, setShowA] = useState(true);
    const [bActive, setBActive] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
        setShowA(false);
        setBActive(true);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    return { showA, bActive };
}