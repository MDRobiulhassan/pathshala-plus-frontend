"use client";

import { useCallback, useEffect, useState } from "react";

import {
    getEducationLevels,
    getProfile,
    getSubjects,
    Subject,
} from "@/lib/api";

export function useSubjects() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSubjects = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Step 1
            const profile = await getProfile();

            // Step 2
            const educationLevels =
                await getEducationLevels();

            // Step 3
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

            // Step 4
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

            // Step 5
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
    }, []);

    useEffect(() => {
        fetchSubjects();
    }, [fetchSubjects]);

    return {
        subjects,
        loading,
        error,
        refetch: fetchSubjects,
    };
}