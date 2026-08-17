"use client";

import { useEffect, useState } from "react";

type Props = {
    duration: number;
    startedAt?: string | null;
    onExpire?: () => void;
};

function getRemainingSeconds(durationMinutes: number, startedAt?: string | null): number {
    const totalSeconds = durationMinutes * 60;
    if (!startedAt) return totalSeconds;

    const startTime = new Date(startedAt).getTime();
    if (isNaN(startTime)) return totalSeconds;

    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    return Math.max(0, totalSeconds - elapsedSeconds);
}

export default function Timer({
    duration,
    startedAt,
    onExpire,
}: Props) {
    const [seconds, setSeconds] = useState(() =>
        getRemainingSeconds(duration, startedAt)
    );

    useEffect(() => {
        if (seconds <= 0) {
            onExpire?.();
            return;
        }

        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onExpire?.();
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;

    return (
        <div className="font-semibold">
            Time Remaining{" "}
            {minutes.toString().padStart(2, "0")}:
            {remaining.toString().padStart(2, "0")}
        </div>
    );
}