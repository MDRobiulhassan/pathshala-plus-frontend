"use client";

import Image from "next/image";

import Logo from "@/components/common/Logo";
import { cn } from "@/lib/utils";

type SidebarHeaderProps = {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SidebarHeader({
    collapsed,
    setCollapsed,
}: SidebarHeaderProps) {
    return (
        <div
            className={cn(
                "flex items-center",
                collapsed ? "justify-center" : "justify-between"
            )}
        >
            <Logo collapsed={collapsed} />

            {!collapsed && (
                <button
                    onClick={() => setCollapsed((prev) => !prev)}
                    className="rounded-lg p-2 transition hover:bg-white/5"
                >
                    <Image
                        src="/icons/collapse.svg"
                        alt=""
                        width={18}
                        height={18}
                        className="brightness-0 invert"
                    />
                </button>
            )}

            {collapsed && (
                <button
                    onClick={() => setCollapsed(false)}
                    className="absolute top-6 left-[28px] rounded-lg p-2 transition hover:bg-white/5"
                >
                    <Image
                        src="/icons/collapse.svg"
                        alt="Expand sidebar"
                        width={18}
                        height={18}
                        className="rotate-180 transition-transform duration-300"

                    />
                </button>
            )}
        </div>
    );
}