"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type SidebarHeaderProps = {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    onClose?: () => void;
};

export default function SidebarHeader({ collapsed, setCollapsed, onClose }: SidebarHeaderProps) {
    return (
        <div
            className={cn(
                "flex items-center",
                collapsed ? "justify-center" : "justify-between"
            )}
        >
            {/* Logo — always visible; clicking goes to homepage */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0" title="Go to homepage">
                <Image
                    src="/icons/Icon.png"
                    alt="Pathshala"
                    width={34}
                    height={34}
                    priority
                />
                {!collapsed && (
                    <span className="text-[20px] font-[800] tracking-[-0.5px] text-white font-sans">
                        Pathshala
                    </span>
                )}
            </Link>

            {/* Expanded: show collapse button OR mobile X close button */}
            {!collapsed && (
                <div className="flex items-center gap-1">
                    {/* Mobile close (X) — only in drawer mode */}
                    {onClose ? (
                        <button
                            type="button"
                            onClick={onClose}
                            title="Close sidebar"
                            className="flex items-center justify-center w-9 h-9 rounded-lg transition hover:bg-white/5 cursor-pointer"
                        >
                            <X size={18} className="text-white/70" />
                        </button>
                    ) : (
                        /* Desktop collapse button */
                        <button
                            type="button"
                            onClick={() => setCollapsed(true)}
                            title="Collapse sidebar"
                            className="flex items-center justify-center w-9 h-9 rounded-lg transition hover:bg-white/5 cursor-pointer"
                        >
                            <Image
                                src="/icons/collapse.svg"
                                alt="Collapse sidebar"
                                width={18}
                                height={18}
                                className="brightness-0 invert"
                            />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}