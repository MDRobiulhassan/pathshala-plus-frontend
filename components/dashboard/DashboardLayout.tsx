"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "@/components/topbar/Topbar";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex h-screen bg-[#060910] overflow-hidden">
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <main className="flex flex-1 flex-col overflow-hidden">
                <Topbar title="Dashboard" />

                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}