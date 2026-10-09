"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, LayoutDashboard, LogOut, User, Wallet } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { logoutUser } from "@/lib/api";
import { AUTH_SESSION_QUERY_KEY, useAuthSession } from "@/hooks/useAuthSession";

export default function UserDropdown() {
    const router = useRouter();
    const pathname = usePathname();
    const queryClient = useQueryClient();
    const { profile, isLoading } = useAuthSession();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    async function logout() {
        try {
            await logoutUser();
        } catch (error) {
        } finally {
            queryClient.removeQueries({ queryKey: AUTH_SESSION_QUERY_KEY });
            // router.replace("/auth/login");
        }
    }

    if (isLoading) {
        return null;
    }

    const isTeacher = profile?.roles?.includes("TEACHER");
    const dashboardPath = isTeacher ? "/teacher" : "/student";
    const profilePath = isTeacher ? "/teacher/profile" : "/student/profile";

    const isDashboardPage = pathname === "/student" || pathname === "/teacher" || pathname === "/dashboard";
    const isProfilePage = pathname.includes("/profile");

    return (
        <div ref={dropdownRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/5
                    bg-[#0C1120]
                    px-3
                    py-2
                    hover:border-[#14B8A6]/40
                    transition-all
                    cursor-pointer
                "
            >
                <Image
                    src={profile?.avatarUrl || "/icons/man.png"}
                    alt="avatar"
                    width={38}
                    height={38}
                    className="rounded-full object-cover"
                />

                <div className="text-left">
                    <p className="text-sm font-semibold text-white">
                        {profile?.name ?? "User"}
                    </p>
                    <p className="text-xs text-white/50">
                        {profile?.roles?.[0] ?? ""}
                    </p>
                </div>

                <ChevronDown
                    size={18}
                    className={`text-white/50 transition-transform duration-200 ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {open && (
                <div
                    className="
                        absolute
                        right-0
                        mt-3
                        w-60
                        rounded-2xl
                        border
                        border-white/10
                        bg-[#0C1120]
                        shadow-2xl
                        overflow-hidden
                        z-50
                    "
                >
                    <div className="border-b border-white/10 px-5 py-4">
                        <p className="font-semibold text-white truncate">
                            {profile?.name}
                        </p>
                        <p className="mt-0.5 text-xs text-white/50 truncate">
                            {profile?.email}
                        </p>
                    </div>

                    <div className="py-1">
                        {!isDashboardPage && (
                            <button
                                type="button"
                                onClick={() => {
                                    setOpen(false);
                                    router.push(dashboardPath);
                                }}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    px-5
                                    py-2.5
                                    text-sm
                                    text-white
                                    hover:bg-white/5
                                    transition
                                    cursor-pointer
                                "
                            >
                                <LayoutDashboard size={17} className="text-[#14B8A6]" />
                                <span>Dashboard</span>
                            </button>
                        )}

                        {!isProfilePage && (
                            <button
                                type="button"
                                onClick={() => {
                                    setOpen(false);
                                    router.push(profilePath);
                                }}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    px-5
                                    py-2.5
                                    text-sm
                                    text-white
                                    hover:bg-white/5
                                    transition
                                    cursor-pointer
                                "
                            >
                                <User size={17} className="text-[#14B8A6]" />
                                <span>Profile</span>
                            </button>
                        )}

                        <div
                            className="
                                flex
                                w-full
                                items-center
                                justify-between
                                px-5
                                py-2.5
                                text-sm
                                text-white/40
                                cursor-not-allowed
                                opacity-60
                            "
                        >
                            <div className="flex items-center gap-3">
                                <Wallet size={17} />
                                <span>Wallet</span>
                            </div>
                            <span className="text-[9px] font-[700] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
                                Upcoming
                            </span>
                        </div>
                    </div>

                    <div className="border-t border-white/10" />

                    <button
                        type="button"
                        onClick={logout}
                        className="
                            flex
                            w-full
                            items-center
                            gap-3
                            px-5
                            py-3
                            text-sm
                            text-red-400
                            hover:bg-red-500/10
                            transition
                            cursor-pointer
                        "
                    >
                        <LogOut size={17} />
                        <span>Log Out</span>
                    </button>
                </div>
            )}
        </div>
    );
}