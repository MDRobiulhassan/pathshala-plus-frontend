"use client";

import { ReactNode } from "react";

import StreakCounter from "./StreakCounter";
import UserDropdown from "./UserDropdown";

type TopbarProps = {
    title: string;
    mobileMenuButton?: ReactNode;
};

export default function Topbar({ title, mobileMenuButton }: TopbarProps) {
    return (
        <header className="h-[72px] border-b border-white/5 bg-[#060910] px-4 md:px-8 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 min-w-0">
                {mobileMenuButton}
                <h1 className="text-[18px] md:text-[24px] font-bold text-white truncate">
                    {title}
                </h1>
            </div>

            <div className="flex items-center gap-2 md:gap-5 shrink-0 ml-2">
                <StreakCounter />
                <UserDropdown />
            </div>
        </header>
    );
}