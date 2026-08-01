"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type SidebarItemProps = {
    href: string;
    label: string;
    icon: string;
    active: boolean;
    collapsed: boolean;
};

export default function SidebarItem({
    href,
    label,
    icon,
    active,
    collapsed,
}: SidebarItemProps) {
    return (
        <Link
            href={href}
            className={cn(
                "group relative flex h-[52px] items-center rounded-xl transition-all duration-200",
                collapsed ? "justify-center px-0" : "px-4",
                active
                    ? "bg-[#14B8A6]/12 border border-[#14B8A6]/40"
                    : "border border-transparent hover:bg-white/5"
            )}
        >
            <Image
                src={icon}
                alt={label}
                width={22}
                height={22}
                className={cn(
                    "transition-transform duration-200",
                    "group-hover:scale-110 brightness-0 invert"
                )}
            />

            {!collapsed && (
                <span
                    className={cn(
                        "ml-4 text-[15px] font-medium transition-colors",
                        active ? "text-white" : "text-white/75",
                        "group-hover:text-white"
                    )}
                >
                    {label}
                </span>
            )}

            {active && (
                <div className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-[#14B8A6]" />
            )}
        </Link>
    );
}