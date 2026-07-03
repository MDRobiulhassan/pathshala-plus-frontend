"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/lib/api";

export default function AuthCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        async function completeLogin() {
            try {
                const user = await getProfile();

                localStorage.setItem("userId", user.id.toString());
                localStorage.setItem("role", user.role);

                if (user.role === "TEACHER") {
                    router.replace("/teacher");
                } else {
                    router.replace("/student");
                }
            } catch (err) {
                console.error(err);
                router.replace("/auth/login");
            }
        }

        completeLogin();
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#060910] text-white">
            Signing you in...
        </div>
    );
}