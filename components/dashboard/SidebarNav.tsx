"use client";

import { usePathname } from "next/navigation";

import SidebarItem from "./SidebarItem";

type SidebarNavProps = {
    collapsed: boolean;
};

const navItems = [
    {
        label: "Dashboard",
        href: "/student",
        icon: "/icons/dashboard.svg",
    },
    {
        label: "Question Bank",
        href: "/student/question-bank",
        icon: "/icons/question-bank.svg",
    },
    {
        label: "Tests",
        href: "/student/tests",
        icon: "/icons/test.svg",
    },
    {
        label: "Batch",
        href: "/student/batch",
        icon: "/icons/batch.svg",
    },
    {
        label: "Leaderboard",
        href: "/student/leaderboard",
        icon: "/icons/leaderboard.svg",
    },
    {
        label: "Pathshala AI",
        href: "/student/ai",
        icon: "/icons/ai.svg",
    },
    {
        label: "Duel",
        href: "/student/duel",
        icon: "/icons/duel.svg",
    },
];

export default function SidebarNav({
    collapsed,
}: SidebarNavProps) {
    const pathname = usePathname();

    return (
        <nav className="mt-10 flex flex-col gap-2">
            {navItems.map((item) => (
                <SidebarItem
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    collapsed={collapsed}
                    active={pathname === item.href}
                />
            ))}
        </nav>
    );
}