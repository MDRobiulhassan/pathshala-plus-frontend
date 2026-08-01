"use client";

import Image from "next/image";

export default function StreakCounter() {
    return (
        <div className="flex items-center gap-3">
            <Image
                src="/icons/fire.png"
                alt="Streak"
                width={22}
                height={22}
            />

            <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">
                    Streak
                </span>

                <span className="text-xs text-white/50">
                    0 Days
                </span>
            </div>
        </div>
    );
}