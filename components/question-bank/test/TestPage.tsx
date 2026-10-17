"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import useTestAttempt from "@/hooks/question-bank/useTestAttempt";
import TestHeader from "./TestHeader";
import TestFooter from "./TestFooter";
import TestQuestionCard from "./TestQuestionCard";
import TestResult from "./TestResult";
import BackButton from "@/components/ui/BackButton";
import Loader from "@/components/ui/Loader";

export default function TestPage() {
    const searchParams = useSearchParams();
    const testId = Number(searchParams.get("testId") ?? 0);
    const attemptId = Number(searchParams.get("attemptId") ?? 0);
    const [reviewMode, setReviewMode] = useState(false);
    const [showCorrectAnswersOnly, setShowCorrectAnswersOnly] = useState(false);
    const handleViewCorrectAnswers = () => {
        setShowCorrectAnswersOnly(true);
        setReviewMode(true);
    };
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
    } = useTestAttempt(testId, attemptId || undefined);

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader />
            </div>
        );
    }
    if (result && !reviewMode) {
        return (
            <TestResult
                result={result}
                onViewAnswers={() => {
                    setShowCorrectAnswersOnly(false);
                    setReviewMode(true);
                }}
                onViewCorrectAnswers={handleViewCorrectAnswers}
                onRetake={retake}
                retaking={retaking}
            />
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
                onViewCorrectAnswers={handleViewCorrectAnswers}

                onRetake={retake}
                retaking={retaking}
            />
        );
    }

    if (!attemptDetails) return null;

    const { testInfo, subjects } = attemptDetails;

    const duration = testInfo?.durationInMinutes || 60;
    const totalMarks = testInfo?.totalMarks || 100;
    const negativeMark = testInfo?.negativeMarksPerQuestion || 25;

    const displaySubjects: any[] = reviewMode && result
        ? (result.subjects as any[])
            .map((subject: any) => ({
                ...subject,
                chapters: subject.chapters
                    ?.map((chapter: any) => ({
                        ...chapter,
                        passages: chapter.passages
                            ?.map((passage: any) => ({
                                ...passage,
                                questions: passage.questions?.filter(
                                    (question: any) => {
                                        if (!showCorrectAnswersOnly) return true;

                                        // Include the question if the student
                                        // selected any answer, right or wrong.
                                        return question.options?.some(
                                            (option: any) => option.selected
                                        );
                                    }
                                ),
                            }))
                            // Remove passages without submitted questions
                            .filter(
                                (passage: any) =>
                                    passage.questions?.length > 0
                            ),
                    }))
                    .filter(
                        (chapter: any) =>
                            chapter.passages?.length > 0
                    ),
            }))
            .filter(
                (subject: any) =>
                    subject.chapters?.length > 0
            )
        : subjects;
    let globalQuestionNum = 0;
    const answeredCount = Object.keys(answers).length;
    const totalQuestions = testInfo?.totalQuestions ?? 0;

    return (
        <div className="mx-auto max-w-5xl space-y-6">
            {reviewMode ? (
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => {
                            setShowCorrectAnswersOnly(false);

                            setReviewMode(false)
                        }}

                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        ← Back to Test Result
                    </button>
                    <span className="text-xl font-bold">
                        {showCorrectAnswersOnly ? "Submitted Answers Only" : "Answer Review"}
                    </span>                </div>
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
                                    const pStart = globalQuestionNum + 1;
                                    const pEnd = globalQuestionNum + (passage.questions?.length || 1);
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

                                            {passage.questions?.map((question: any) => {
                                                globalQuestionNum++;
                                                return (
                                                    <TestQuestionCard
                                                        key={question.questionId}
                                                        question={question}
                                                        questionNumber={globalQuestionNum}
                                                        selectedOptionId={
                                                            reviewMode
                                                                ? question.options?.find((o: any) => o.selected)?.optionId
                                                                : answers[question.questionId]
                                                        }
                                                        isReview={reviewMode}
                                                        onSelect={selectOption}
                                                    />
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                );
            })}

            {!reviewMode && (
                <TestFooter
                    duration={duration}
                    startedAt={testInfo?.startedAt}
                    current={answeredCount}
                    total={totalQuestions}
                    submitting={submitting}
                    onSubmit={submit}
                />
            )}
        </div>
    );
}