"use client";

import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import useTestAttempt from "@/hooks/question-bank/useTestAttempt";
import PracticeQuestionCard from "./PracticeQuestionCard";
import TestResult from "../test/TestResult";
import TestHeader from "../test/TestHeader";
import BackButton from "@/components/ui/BackButton";
import Loader from "@/components/ui/Loader";

export default function PracticePage() {
    const searchParams = useSearchParams();
    const testId = Number(searchParams.get("testId") ?? 0);
    const [reviewMode, setReviewMode] = useState(false);

    const {
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
    } = useTestAttempt(testId);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto max-w-md space-y-6 py-16 text-center">
                <BackButton />
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 space-y-4">
                    <p className="text-red-400 font-medium">{error}</p>
                    <button
                        onClick={() => retake()}
                        className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (result && !reviewMode) {
        return (
            <TestResult
                result={result}
                onViewAnswers={() => setReviewMode(true)}

                onRetake={retake}
                retaking={retaking}
            />
        );
    }

    if (!attemptDetails) {
        return null;
    }

    let questionNumber = 1;
    const testInfo = attemptDetails.testInfo;
    const totalQuestions = testInfo?.totalQuestions ?? 0;

    const duration = testInfo?.durationInMinutes || 60;
    const totalMarks = testInfo?.totalMarks || 100;
    const negativeMark = testInfo?.negativeMarksPerQuestion || 25;

    const displaySubjects = reviewMode && result
        ? result.subjects as any[]
        : attemptDetails.subjects;

    return (
        <div className="mx-auto max-w-5xl space-y-6">
            {reviewMode ? (
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setReviewMode(false)}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        ← Back to Test Result
                    </button>
                    <span className="text-xl font-bold">Answer Review</span>
                </div>
            ) : (
                <TestHeader
                    title={testInfo?.testName || testInfo?.examType}
                    testInfo={testInfo}
                    subjects={displaySubjects}
                    duration={duration}
                    totalMarks={totalMarks}
                    negativeMark={negativeMark}
                />
            )}

            {displaySubjects?.map((subject: any) => {
                const subjectQuestionCount = subject.chapters?.reduce(
                    (cAcc: number, ch: any) =>
                        cAcc + ch.passages?.reduce((pAcc: number, p: any) => pAcc + (p.questions?.length || 0), 0),
                    0
                ) || 0;

                return (
                    <div key={subject.subjectId} className="space-y-8 pt-2">
                        <div className="text-center border-b border-white/10 pb-4">
                            <h2 className="text-3xl font-bold text-white tracking-tight">
                                {subject.subjectName} ({subjectQuestionCount})
                            </h2>
                        </div>

                        {subject.chapters?.map((chapter: any) => (
                            <div
                                key={chapter.chapterId ?? `chapter-${chapter.chapterName ?? "default"}`}
                                className="space-y-6"
                            >
                                {chapter.chapterName && (
                                    <h3 className="text-xl font-semibold text-white/90">
                                        {chapter.chapterName}
                                    </h3>
                                )}

                                {chapter.passages?.map((passage: any, passageIdx: number) => {
                                    const pStart = questionNumber;
                                    const pEnd = questionNumber + (passage.questions?.length || 1) - 1;
                                    const rangeLabel =
                                        pStart === pEnd
                                            ? `question ${pStart}`
                                            : `questions ${pStart}–${pEnd}`;

                                    return (
                                        <div
                                            key={passage.passageId ?? `passage-${passageIdx}`}
                                            className="space-y-6"
                                        >
                                            {passage.passageText && (
                                                <div className="rounded-2xl border border-white/10 bg-[#0C1120] p-6 space-y-3">
                                                    <div className="text-xs font-bold text-[#14B8A6] uppercase tracking-wider">
                                                        Read the passage and answer {rangeLabel}
                                                    </div>
                                                    <p className="text-xl leading-relaxed text-white/90 font-sans">
                                                        {passage.passageText}
                                                    </p>
                                                    {passage.passageImageUrl && (
                                                        <div className="relative max-h-60 overflow-hidden rounded-lg">
                                                            <Image
                                                                src={passage.passageImageUrl}
                                                                alt="Passage illustration"
                                                                width={800}
                                                                height={480}
                                                                className="rounded-lg max-h-60 w-auto object-contain"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {passage.questions?.map((question: any) => (
                                                <PracticeQuestionCard
                                                    key={question.questionId}
                                                    question={question}
                                                    questionNumber={questionNumber++}
                                                    onSelect={reviewMode ? undefined : selectOption}
                                                />
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                );
            })}

            {/* Sticky footer */}
            {!reviewMode && (
                <div className="sticky bottom-3 z-30 mx-auto max-w-5xl rounded-2xl border border-white/10 bg-[#0C1120] p-3 sm:p-4 shadow-2xl">
                    {/* Desktop View */}
                    <div className="hidden sm:grid sm:grid-cols-3 sm:items-center">
                        <div className="flex justify-start text-sm font-semibold text-white/90">
                            Practice Mode
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={submit}
                                disabled={submitting}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md whitespace-nowrap"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Submitting…</span>
                                    </>
                                ) : (
                                    <span>Finish & See Results</span>
                                )}
                            </button>
                        </div>

                        <div className="flex justify-end text-sm font-medium text-white/80">
                            <span>{Object.keys(answers ?? {}).length} / {totalQuestions} Questions</span>
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="flex flex-col gap-2 sm:hidden">
                        <div className="flex items-center justify-between text-xs font-medium text-white/80 px-1">
                            <span className="font-semibold text-white">Practice Mode</span>
                            <span>{Object.keys(answers ?? {}).length} / {totalQuestions} Questions</span>
                        </div>

                        <button
                            onClick={submit}
                            disabled={submitting}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Submitting…</span>
                                </>
                            ) : (
                                <span>Finish & See Results</span>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}