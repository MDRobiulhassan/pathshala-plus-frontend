"use client";

import { useParams } from "next/navigation";

import useExamQuestions from "@/hooks/question-bank/useExamQuestions";

import TestHeader from "./TestHeader";
import TestFooter from "./TestFooter";
import TestQuestionCard from "./TestQuestionCard";
import TestResult from "./TestResult";

import { useState } from "react";
import BackButton from "@/components/ui/BackButton";
import Loader from "@/components/ui/Loader";

export default function TestPage() {
    const params = useParams();

    const examInfoId = Number(
        params.examInfoId
    );

    const {
        data,
        loading,
        error,
    } = useExamQuestions(examInfoId);

    const [answers, setAnswers] =
        useState<Record<number, number>>({});

    const [submitted, setSubmitted] = useState(false);

    function handleSelect(
        questionId: number,
        optionId: number
    ) {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: optionId,
        }));
    }

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-96 items-center justify-center text-red-500">
                {error}
            </div>
        );
    }

    if (!data) return null;

    const questions =
        data.subjects.flatMap((subject) =>
            subject.chapters.flatMap((chapter) =>
                chapter.passages.flatMap(
                    (passage) =>
                        passage.questions
                )
            )
        );

    if (submitted) {
        return (
            <TestResult
                questions={questions}
                answers={answers}
                duration={data.examInfo.durationInMinutes}
                onRetry={() => {
                    setAnswers({});
                    setSubmitted(false);
                }}
            />
        );
    }

    return (
        <div className="mx-auto max-w-5xl space-y-10">
            <BackButton />
            <TestHeader
                title={data.examInfo.examType}
                duration={
                    data.examInfo
                        .durationInMinutes
                }
                totalMarks={
                    data.examInfo.totalMarks
                }
                negativeMark={25}
            />

            <div className="space-y-8">
                {questions.map(
                    (question, index) => (
                        <TestQuestionCard
                            key={
                                question.questionId
                            }
                            question={question}
                            questionNumber={
                                index + 1
                            }
                            selectedOptionId={
                                answers[
                                question.questionId
                                ]
                            }
                            onSelect={
                                handleSelect
                            }
                        />
                    )
                )}
            </div>

            <TestFooter
                duration={
                    data.examInfo
                        .durationInMinutes
                }
                current={
                    Object.keys(answers)
                        .length
                }
                total={questions.length}
                onSubmit={() => setSubmitted(true)}
            />
        </div>
    );
}