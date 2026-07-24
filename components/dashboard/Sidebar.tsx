"use client";

import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import { cn } from "@/lib/utils";

type SidebarProps = {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({
    collapsed,
    setCollapsed,
}: SidebarProps) {
    return (
        <aside
            className={cn(
                "h-screen shrink-0 border-r border-white/5 bg-[#0A0F1E]",
                "transition-all duration-300 ease-in-out",
                collapsed ? "w-[88px]" : "w-[280px]"
            )}
        >
            <div className="flex h-full flex-col px-5 py-6">
                <SidebarHeader
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />

                <SidebarNav collapsed={collapsed} />
            </div>
        </aside>
    );
}