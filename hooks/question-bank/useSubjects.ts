"use client";

import { useCallback, useEffect, useState } from "react";

import {
    getEducationLevels,
    getSubjects,
    Subject,
} from "@/lib/api";
import { useAuthSession } from "@/hooks/useAuthSession";

export function useSubjects() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { profile, isLoading: isProfileLoading, error: profileError } = useAuthSession();

    const fetchSubjects = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            if (!profile) {
                throw new Error("Failed to load session.");
            }
            const educationLevels =
                await getEducationLevels();

            const educationLevel =
                educationLevels.find(
                    (level) =>
                        level.name === profile.educationLevel
                );

            if (!educationLevel) {
                throw new Error(
                    "Education level not found."
                );
            }

            const variant =
                educationLevel.variants.find(
                    (variant) =>
                        variant.department ===
                        profile.department
                );

            if (!variant) {
                throw new Error(
                    "Education level variant not found."
                );
            }

            const data =
                await getSubjects(variant.id);

            setSubjects(data);

        } catch (err: any) {
            setError(
                err.message ??
                "Failed to fetch subjects."
            );
        } finally {
            setLoading(false);
        }
    }, [profile]);

    useEffect(() => {
        if (profile) {
            fetchSubjects();
        }
    }, [fetchSubjects, profile]);

    useEffect(() => {
        if (profileError) {
            setError(profileError.message);
            setLoading(false);
        }
    }, [profileError]);

    return {
        subjects,
        loading: loading || isProfileLoading,
        error,
        refetch: fetchSubjects,
    };
}