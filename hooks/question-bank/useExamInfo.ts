"use client";

import { useEffect, useState } from "react";
import {
    ExamInfo,
    getExamInfoByExamSession,
    getExamInfoByShift,
    getExamInfoByUnit,
} from "@/lib/api";

export default function useExamInfo(
    examSessionId: number,
    unitId?: number,
    shiftId?: number
) {
    const [examInfos, setExamInfos] = useState<ExamInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!examSessionId) {
            setLoading(false);
            return;
        }

        async function loadExamInfo() {
            try {
                setLoading(true);

                let data: ExamInfo[];
                if (shiftId && !isNaN(shiftId)) {
                    data = await getExamInfoByShift(examSessionId, shiftId);
                } else if (unitId && !isNaN(unitId)) {
                    data = await getExamInfoByUnit(unitId, examSessionId);
                } else {
                    data = await getExamInfoByExamSession(examSessionId);
                }

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
    }, [examSessionId, unitId, shiftId]);

    return {
        examInfos,
        loading,
        error,
    };
}