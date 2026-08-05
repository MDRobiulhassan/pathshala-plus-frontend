"use client";

import { useCallback, useEffect, useState } from "react";

import {
    getEducationLevels,
    getInstitutes,
    getProfile,
    Institute,
} from "@/lib/api";

export function useInstitutes() {
    const [institutes, setInstitutes] = useState<Institute[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInstitutes = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const profile = await getProfile();

            const educationLevels = await getEducationLevels();

            const educationLevel = educationLevels.find(
                (level) => level.name === profile.educationLevel
            );

            if (!educationLevel) {
                throw new Error("Education level not found.");
            }

            const variant = educationLevel.variants.find(
                (variant) =>
                    variant.department === profile.department
            );

            if (!variant) {
                throw new Error("Education level variant not found.");
            }

            const data = await getInstitutes(variant.id);

            setInstitutes(data);
        } catch (err: any) {
            setError(
                err.message ?? "Failed to fetch institutes."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInstitutes();
    }, [fetchInstitutes]);

    return {
        institutes,
        loading,
        error,
        refetch: fetchInstitutes,
    };
}