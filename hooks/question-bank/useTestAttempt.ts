"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
    TestAttemptDetails,
    TestAttemptResult,
    createOrResumeTestAttempt,
    getTestAttemptWithQuestions,
    getExamQuestions,
    saveTestProgress,
    submitTestAttempt,
    getTestAttemptResult,
    SaveAnswerItem,
} from "@/lib/api/question-bank";

export default function useTestAttempt(testId: number, attemptIdFromQuery?: number) {
    const [attemptDetails, setAttemptDetails] = useState<TestAttemptDetails | null>(null);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [result, setResult] = useState<TestAttemptResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [retaking, setRetaking] = useState(false);
    const [error, setError] = useState("");

    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isCompletedRef = useRef(false);

    const initTest = useCallback(async (isRetake = false) => {
        if (!testId && !attemptIdFromQuery) {
            setLoading(false);
            return;
        }

        try {
            if (isRetake) {
                setRetaking(true);
            } else {
                setLoading(true);
            }
            setError("");

            let targetAttemptId: number;

            if (attemptIdFromQuery && !isRetake) {
                targetAttemptId = attemptIdFromQuery;
                const details = await getTestAttemptWithQuestions(targetAttemptId);
                setAttemptDetails(details);

                try {
                    const res = await getTestAttemptResult(targetAttemptId);
                    isCompletedRef.current = true;
                    setResult(res);
                } catch (e) {
                    isCompletedRef.current = false;
                    setResult(null);
                }
            } else {
                const init = await createOrResumeTestAttempt(testId);
                targetAttemptId = init.attemptId;
                const details = await getTestAttemptWithQuestions(targetAttemptId);

                if (details.testInfo && !details.testInfo.startedAt && init.startedAt) {
                    details.testInfo.startedAt = init.startedAt;
                }
                setAttemptDetails(details);

                if (init.completed && !isRetake) {
                    isCompletedRef.current = true;
                    try {
                        const res = await getTestAttemptResult(targetAttemptId);
                        setResult(res);
                    } catch (e) {
                    }
                } else {
                    isCompletedRef.current = false;
                    setResult(null);
                }
            }

            if (attemptDetails?.testInfo?.examInfoId || (attemptIdFromQuery && attemptDetails?.testInfo?.examInfoId)) {
                const examInfoId = attemptDetails?.testInfo?.examInfoId;
                if (examInfoId) {
                    try {
                        const examQData = await getExamQuestions(examInfoId);
                        if (examQData?.subjects) {
                            const qMetaMap = new Map<
                                number,
                                { explanation: string | null; correctOptionIds: Set<number> }
                            >();

                            examQData.subjects.forEach((s) => {
                                s.chapters?.forEach((c) => {
                                    c.passages?.forEach((p) => {
                                        p.questions?.forEach((q) => {
                                            const correctSet = new Set<number>();
                                            q.options?.forEach((o) => {
                                                if (o.isCorrect) {
                                                    correctSet.add(o.optionId);
                                                }
                                            });
                                            qMetaMap.set(q.questionId, {
                                                explanation: q.explanation ?? null,
                                                correctOptionIds: correctSet,
                                            });
                                        });
                                    });
                                });
                            });

                            attemptDetails.subjects?.forEach((s) => {
                                s.chapters?.forEach((c) => {
                                    c.passages?.forEach((p) => {
                                        p.questions?.forEach((q) => {
                                            const meta = qMetaMap.get(q.questionId);
                                            if (meta) {
                                                q.explanation = meta.explanation;
                                                q.options?.forEach((o) => {
                                                    o.isCorrect = meta.correctOptionIds.has(o.optionId);
                                                });
                                            }
                                        });
                                    });
                                });
                            });
                        }
                    } catch (e) {
                    }
                }
            }
            if (attemptDetails?.subjects) {
                const preSelected: Record<number, number> = {};
                attemptDetails.subjects.forEach((subject) => {
                    subject.chapters?.forEach((chapter) => {
                        chapter.passages?.forEach((passage) => {
                            passage.questions?.forEach((q) => {
                                const selectedOption = q.options?.find((o) => o.selected);
                                if (selectedOption) {
                                    preSelected[q.questionId] = selectedOption.optionId;
                                }
                            });
                        });
                    });
                });
                setAnswers(preSelected);
            }
        } catch (err: any) {
            setError(err?.message || "Failed to initialize test attempt.");
        } finally {
            setLoading(false);
            setRetaking(false);
        }
    }, [testId, attemptIdFromQuery]);

    useEffect(() => {
        initTest();
    }, [testId, attemptIdFromQuery, initTest]);
    const selectOption = useCallback((questionId: number, optionId: number) => {
        if (isCompletedRef.current) return;
        setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    }, []);

    useEffect(() => {
        if (!attemptDetails || loading || submitting || result || isCompletedRef.current) return;

        const attemptId = attemptDetails.testInfo?.attemptId;
        if (!attemptId) return;

        const answerPayload: SaveAnswerItem[] = Object.entries(answers).map(
            ([qId, oId]) => ({
                questionId: Number(qId),
                selectedOptionId: Number(oId),
            })
        );

        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        saveTimeoutRef.current = setTimeout(async () => {
            if (isCompletedRef.current) return;
            if (answerPayload.length > 0) {
                try {
                    await saveTestProgress(attemptId, answerPayload);
                } catch (e: any) {
                }
            }
        }, 1200);

        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, [answers, attemptDetails, loading, submitting, result]);

    const submit = useCallback(async () => {
        if (!attemptDetails || submitting) return;

        const attemptId = attemptDetails.testInfo?.attemptId;
        if (!attemptId) return;

        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
            saveTimeoutRef.current = null;
        }

        try {
            setSubmitting(true);
            setError("");

            const answerPayload: SaveAnswerItem[] = Object.entries(answers).map(
                ([qId, oId]) => ({
                    questionId: Number(qId),
                    selectedOptionId: Number(oId),
                })
            );

            if (answerPayload.length > 0 && !isCompletedRef.current) {
                try {
                    await saveTestProgress(attemptId, answerPayload);
                } catch (e) {
                }
            }

            if (!isCompletedRef.current) {
                try {
                    await submitTestAttempt(attemptId);
                } catch (e) {
                }
            }

            isCompletedRef.current = true;

            const res = await getTestAttemptResult(attemptId);
            setResult(res);
        } catch (err: any) {
            setError(err?.message || "Failed to submit test attempt.");
        } finally {
            setSubmitting(false);
        }
    }, [attemptDetails, answers, submitting]);

    const retake = useCallback(() => {
        setAnswers({});
        setResult(null);
        isCompletedRef.current = false;
        initTest(true);
    }, [initTest]);

    return {
        attemptDetails,
        answers,
        result,
        loading,
        submitting,
        retaking,
        error,
        selectOption,
        submit,
        retake,
    };
}
