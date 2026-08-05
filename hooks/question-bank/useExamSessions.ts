"use client";

import { useEffect, useState } from "react";
import {
    ExamSession,
    getUnitExamSessions,
} from "@/lib/api";

export default function useExamSessions(
    instituteId: number,
    unitId: number
) {
    const [examSessions, setExamSessions] = useState<ExamSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!instituteId || !unitId) {
            setLoading(false);
            return;
        }

        async function loadExamSessions() {
            try {
                setLoading(true);

                const data = await getUnitExamSessions(
                    instituteId,
                    unitId
                );

                setExamSessions(data);
            } catch (err: any) {
                setError(
                    err.message ??
                    "Failed to load exam sessions."
                );
            } finally {
                setLoading(false);
            }
        }

        loadExamSessions();
    }, [instituteId, unitId]);

    return {
        examSessions,
        loading,
        error,
    };
}