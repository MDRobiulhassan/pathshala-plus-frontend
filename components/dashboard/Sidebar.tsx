"use client";

import { ChevronRight } from "lucide-react";

import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import { cn } from "@/lib/utils";

type SidebarProps = {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    onClose?: () => void;
};

export default function Sidebar({ collapsed, setCollapsed, onClose }: SidebarProps) {
    return (
        <aside
            className={cn(
                "relative h-screen shrink-0 border-r border-white/5 bg-[#0A0F1E]",
                "transition-all duration-300 ease-in-out",
                collapsed ? "w-[72px]" : "w-[280px]"
            )}
        >
            <div className={cn("flex h-full flex-col py-6", collapsed ? "px-[17px]" : "px-5")}>
                <SidebarHeader
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    onClose={onClose}
                />

                <SidebarNav collapsed={collapsed} />
            </div>

            {/* Edge expand button — logo-aligned, only when collapsed on desktop */}
            {collapsed && !onClose && (
                <button
                    type="button"
                    onClick={() => setCollapsed(false)}
                    title="Expand sidebar"
                    className="
                        absolute top-[26px] -right-[13px]
                        flex items-center justify-center
                        w-6 h-6 rounded-full
                        bg-[#0A0F1E] border border-white/10
                        text-white/60 hover:text-white hover:border-[#14B8A6]/50
                        transition-all duration-200 cursor-pointer
                        shadow-lg z-20
                    "
                >
                    <ChevronRight size={13} />
                </button>
            )}
        </aside>
    );
}