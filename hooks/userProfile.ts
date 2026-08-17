"use client";

import { useAuthSession } from "@/hooks/useAuthSession";

export type UserProfile = {
    id: number
    name: string
    email: string
    phone: string | null
    avatarUrl: string | null

    preferredLanguage: string

    educationLevel: string
    department: string | null

    isActive: boolean
    lastLoginAt: string | null

    providers: string[]

    roles: string[]
}

export function useProfile() {
    const { profile, isLoading } = useAuthSession();

    return {
        profile,
        loading: isLoading,
    };
}