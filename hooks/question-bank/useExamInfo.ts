"use client";

import { useEffect, useState } from "react";
import {
    ExamInfo,
    getExamInfoByUnit,
} from "@/lib/api";

export default function useExamInfo(
    unitId: number,
    examSessionId: number
) {
    const [examInfos, setExamInfos] = useState<ExamInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!unitId || !examSessionId) {
            setLoading(false);
            return;
        }

        async function loadExamInfo() {
            try {
                setLoading(true);

                const data = await getExamInfoByUnit(
                    unitId,
                    examSessionId
                );

                setExamInfos(data);
            } catch (err: any) {
                setError(
                    err.message ??
                    "Failed to load exam information."
                );
            } finally {
                setLoading(false);
            }
        }

        loadExamInfo();
    }, [unitId, examSessionId]);

    return {
        examInfos,
        loading,
        error,
    };
}