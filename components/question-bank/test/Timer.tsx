"use client";

import { useEffect, useState } from "react";

type Props = {
    duration: number;
};

export default function Timer({
    duration,
}: Props) {
    const [seconds, setSeconds] = useState(
        duration * 60
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
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