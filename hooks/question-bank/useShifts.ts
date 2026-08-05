"use client";

import { useEffect, useState } from "react";
import {
    Shift,
    getShifts,
} from "@/lib/api";

export default function useShifts(
    unitId: number,
    examSessionId: number
) {
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!unitId || !examSessionId) {
            setLoading(false);
            return;
        }

        async function loadShifts() {
            try {
                setLoading(true);

                const data = await getShifts(
                    unitId,
                    examSessionId
                );

                setShifts(data);
            } catch (err: any) {
                setError(
                    err.message ??
                    "Failed to load shifts."
                );
            } finally {
                setLoading(false);
            }
        }

        loadShifts();
    }, [unitId, examSessionId]);

    return {
        shifts,
        loading,
        error,
    };
}