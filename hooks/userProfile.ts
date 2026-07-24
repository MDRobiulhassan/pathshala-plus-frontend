"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/lib/api";

export type UserProfile = {
    id: number;
    name: string;
    email: string;
    avatarUrl: string | null;
    preferredLanguage: string;
    educationLevel: string;
    roles: string[];
};

export function useProfile() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, []);

    return {
        profile,
        loading,
    };
}