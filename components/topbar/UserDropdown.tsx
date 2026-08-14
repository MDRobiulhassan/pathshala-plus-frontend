"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { logoutUser } from "@/lib/api";
import { AUTH_SESSION_QUERY_KEY, useAuthSession } from "@/hooks/useAuthSession";

export default function UserDropdown() {
    const router = useRouter();
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

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    async function logout() {
        try {
            await logoutUser();
        } catch (err) {
            console.error(err);
        } finally {
            queryClient.removeQueries({ queryKey: AUTH_SESSION_QUERY_KEY });
            router.push("/auth/login");
        }
    }

    if (isLoading) {
        return null;
    }

    return (
        <div
            ref={dropdownRef}
            className="relative"
        >
            <button
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
                    className="rounded-full"
                />

                <div className="text-left">
                    <p className="text-sm font-semibold text-white">
                        {profile?.name ?? "Loading..."}
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
            w-64
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
                        <p className="font-semibold text-white">
                            {profile?.name}
                        </p>

                        <p className="mt-1 text-xs text-white/50">
                            {profile?.email}
                        </p>
                    </div>

                <button
    onClick={() => {
        setOpen(false)
        const destination = profile?.roles?.includes("TEACHER") ? "/teacher/profile" : "/student/profile"
        router.push(destination)
    }}
    className="
      flex
      w-full
      items-center
      gap-3
      px-5
      py-3
      text-sm
      text-white
      hover:bg-white/5
      transition
    "
>
    <User size={17} />

    Profile
</button>

                    <button
                        className="
              flex
              w-full
              items-center
              gap-3
              px-5
              py-3
              text-sm
              text-white
              hover:bg-white/5
              transition
            "
                    >
                        <Settings size={17} />

                        Settings
                    </button>

                    <div className="border-t border-white/10" />

                    <button
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
            "
                    >
                        <LogOut size={17} />

                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}