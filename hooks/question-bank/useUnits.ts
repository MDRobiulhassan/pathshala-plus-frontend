"use client";

import { useEffect, useState } from "react";
import { getUnits, Unit } from "@/lib/api";

export default function useUnits(instituteId?: number) {
    const [units, setUnits] = useState<Unit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!instituteId) {
            setLoading(false);
            return;
        }

        async function loadUnits() {
            try {
                setLoading(true);

                const data = await getUnits(instituteId!);

                setUnits(data);
            } catch (err: any) {
                setError(err.message || "Failed to load units");
            } finally {
                setLoading(false);
            }
        }

        loadUnits();
    }, [instituteId]);

    return {
        units,
        loading,
        error,
    };
}