"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthSession } from "@/hooks/useAuthSession";
import { toast } from "sonner";

function AuthCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { profile, isLoading, error } = useAuthSession();

    useEffect(() => {
        const oauthError = searchParams.get("error");
        if (oauthError === "oauth_failed") {
            toast.error("Google login failed. Please try logging in with email and password.");
            router.replace("/auth/login");
            return;
        }

        if (isLoading) {
            return;
        }

        if (profile?.roles?.includes("TEACHER")) {
            router.replace("/teacher");
            return;
        }

        if (profile) {
            router.replace("/student");
            return;
        }

        if (error) {
            console.error(error);
        }

        router.replace("/auth/login");
    }, [error, isLoading, profile, router, searchParams]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#060910] text-white">
            Signing you in...
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-[#060910] text-white">
                Signing you in...
            </div>
        }>
            <AuthCallbackContent />
        </Suspense>
    );
}