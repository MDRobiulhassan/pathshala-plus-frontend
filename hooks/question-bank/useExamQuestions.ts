"use client";

import { useEffect, useState } from "react";
import {
    ExamQuestionResponse,
    getExamQuestions,
} from "@/lib/api";

export default function useExamQuestions(
    examInfoId: number
) {
    const [data, setData] =
        useState<ExamQuestionResponse | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        if (!examInfoId) return;

        async function load() {
            try {
                setLoading(true);

                const response =
                    await getExamQuestions(
                        examInfoId
                    );

                setData(response);
            } catch (err: any) {
                setError(
                    err.message ??
                    "Failed to load questions."
                );
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [examInfoId]);

    return {
        data,
        loading,
        error,
    };
}