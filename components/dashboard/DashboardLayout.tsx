"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import Sidebar from "./Sidebar";
import Topbar from "@/components/topbar/Topbar";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

/** Derive a human-readable page title from the current pathname */
function getPageTitle(pathname: string): string {
    // Strip leading role prefix (/student or /teacher)
    const withoutRole = pathname.replace(/^\/(student|teacher)/, "") || "/";

    const titleMap: Record<string, string> = {
        "/": "Dashboard",
        "/question-bank": "Question Bank",
        "/tests": "Tests",
        "/batch": "Batch",
        "/leaderboard": "Leaderboard",
        "/ai": "Pathshala AI",
        "/duel": "Duel",
        "/profile": "Profile",
    };

    // Match exact or prefix
    for (const [key, label] of Object.entries(titleMap)) {
        if (key !== "/" && withoutRole.startsWith(key)) return label;
    }
    return titleMap["/"] ?? "Dashboard";
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const title = getPageTitle(pathname);

    return (
        <div className="flex h-screen min-h-0 bg-[#060910] overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <Sidebar
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />
            </div>

            {/* Mobile Sidebar Drawer */}
            {mobileOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                        onClick={() => setMobileOpen(false)}
                    />
                    {/* Drawer */}
                    <div className="fixed inset-y-0 left-0 z-50 md:hidden">
                        <Sidebar
                            collapsed={false}
                            setCollapsed={() => { }}
                            onClose={() => setMobileOpen(false)}
                        />
                    </div>
                </>
            )}

            {/* Main content */}
            <main className="flex flex-1 flex-col overflow-hidden min-w-0 min-h-0">
                <Topbar
                    title={title}
                    mobileMenuButton={
                        <button
                            type="button"
                            onClick={() => setMobileOpen(true)}
                            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition cursor-pointer shrink-0"
                            aria-label="Open navigation"
                        >
                            <Menu size={20} />
                        </button>
                    }
                />

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}