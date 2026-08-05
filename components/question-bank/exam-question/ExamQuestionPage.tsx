"use client";

import { useParams } from "next/navigation";
import useExamQuestions from "@/hooks/question-bank/useExamQuestions";
import SubjectQuestionCard from "../subject/SubjectQuestionCard";
import BackButton from "@/components/ui/BackButton";
import Loader from "@/components/ui/Loader";

export default function ExamQuestionPage() {
    const params = useParams();

    const examInfoId = Number(params.examInfoId);

    const {
        data,
        loading,
        error,
    } = useExamQuestions(examInfoId);

    if (loading) {
        return (
            <div className="flex justify-center py-10">
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
        return (
            <div>
                No questions found.
            </div>
        );
    }

    console.log("Exam Question Response:", data);

    let questionNumber = 1;

    return (
        <div className="space-y-8">
            <BackButton />
            {data.subjects.map((subject) => (
                <div
                    key={subject.subjectId}
                    className="space-y-6"
                >
                    <h2 className="text-3xl font-bold">
                        {subject.subjectName}
                    </h2>

                    {subject.chapters.map((chapter) => (
                        <div
                            key={chapter.chapterId ?? "default"}
                            className="space-y-6"
                        >
                            {chapter.chapterName && (
                                <h3 className="text-xl font-semibold">
                                    {chapter.chapterName}
                                </h3>
                            )}

                            {chapter.passages.map((passage) => (
                                <div
                                    key={passage.passageId ?? Math.random()}
                                    className="space-y-6"
                                >
                                    {passage.passageText && (
                                        <div className="rounded-xl border bg-card p-5">
                                            {passage.passageText}
                                        </div>
                                    )}

                                    {passage.questions.map((question) => (
                                        <SubjectQuestionCard
                                            key={question.questionId}
                                            question={question}
                                            questionNumber={questionNumber++}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}