"use client";

import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "@/components/topbar/Topbar";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    return (
        <div className="flex h-screen min-h-0 bg-[#060910] overflow-hidden">
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <Topbar title="Dashboard" />

                <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {children}
                </div>
            </main>
        </div>
    );
}