"use client";

import { useEffect, useState } from "react";
import {
    SubjectQuestionResponse,
    getSubjectQuestions,
} from "@/lib/api";

export default function useSubjectQuestions(
    subjectId: number
) {
    const [data, setData] =
        useState<SubjectQuestionResponse | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [page, setPage] = useState(0);

    const size = 20;

    useEffect(() => {
        if (!subjectId) return;

        async function loadQuestions() {
            try {
                setLoading(true);

                const response =
                    await getSubjectQuestions(
                        subjectId,
                        page,
                        size
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

        loadQuestions();
    }, [subjectId, page]);

    return {
        data,
        loading,
        error,
        page,
        setPage,
        size,
    };
}