"use client";

import { useParams } from "next/navigation";

import useExamQuestions from "@/hooks/question-bank/useExamQuestions";

import PracticeQuestionCard from "./PracticeQuestionCard";
import BackButton from "@/components/ui/BackButton";
import Loader from "@/components/ui/Loader";

export default function PracticePage() {
    const params = useParams();

    const examInfoId = Number(params.examInfoId);

    const {
        data,
        loading,
        error,
    } = useExamQuestions(examInfoId);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500">
                {error}
            </div>
        );
    }

    if (!data) {
        return null;
    }

    let questionNumber = 1;

    return (
        <div className="mx-auto max-w-5xl space-y-8">

            <BackButton />

            <div className="flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Practice Mode
                </h1>

                <div className="text-muted-foreground">
                    {data.subjects.reduce(
                        (count, subject) =>
                            count +
                            subject.chapters.reduce(
                                (chapterCount, chapter) =>
                                    chapterCount +
                                    chapter.passages.reduce(
                                        (passageCount, passage) =>
                                            passageCount +
                                            passage.questions.length,
                                        0
                                    ),
                                0
                            ),
                        0
                    )}{" "}
                    Questions
                </div>

            </div>

            {data.subjects.map((subject) => (
                <div
                    key={subject.subjectId}
                    className="space-y-6"
                >

                    <h2 className="text-2xl font-semibold">
                        {subject.subjectName}
                    </h2>

                    {subject.chapters.map((chapter) =>
                        chapter.passages.map((passage) =>
                            passage.questions.map((question) => (
                                <PracticeQuestionCard
                                    key={question.questionId}
                                    question={question}
                                    questionNumber={questionNumber++}
                                />
                            ))
                        )
                    )}

                </div>
            ))}

        </div>
    );
}