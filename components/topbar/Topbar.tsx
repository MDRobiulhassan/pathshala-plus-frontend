"use client";

import StreakCounter from "./StreakCounter";
import UserDropdown from "./UserDropdown";

type TopbarProps = {
    title: string;
};

export default function Topbar({
    title,
}: TopbarProps) {
    return (
        <header
            className="
        h-[78px]
        border-b
        border-white/5
        bg-[#060910]
        px-8
        flex
        items-center
        justify-between
      "
        >
            {/* Left */}

            <h1 className="text-[28px] font-bold text-white">
                {title}
            </h1>

            {/* Right */}

            <div className="flex items-center gap-6">
                <StreakCounter />

                <UserDropdown />
            </div>
        </header>
    );
}