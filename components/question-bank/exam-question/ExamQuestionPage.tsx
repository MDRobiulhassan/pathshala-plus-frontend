"use client";

import { useParams } from "next/navigation";
import useExamQuestions from "@/hooks/question-bank/useExamQuestions";
import SubjectQuestionCard from "../subject/SubjectQuestionCard";
import BackButton from "@/components/ui/BackButton";
import Loader from "@/components/ui/Loader";

import { BookOpen } from "lucide-react";

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
            <div className="space-y-6">
                <BackButton fallbackHref="/student/question-bank" />
                <div className="flex justify-center py-16">
                    <Loader />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <BackButton fallbackHref="/student/question-bank" />
                <div className="text-red-500 text-center py-10">
                    {error}
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="space-y-6">
                <BackButton fallbackHref="/student/question-bank" />
                <div className="text-center py-10 text-white/60">
                    No questions found.
                </div>
            </div>
        );
    }

    let globalQuestionNum = 1;

    return (
        <div className="space-y-10">
            <BackButton fallbackHref="/student/question-bank" />

            {data.subjects.map((subject) => {
                const subjectQuestionCount = subject.chapters.reduce(
                    (cAcc, ch) => cAcc + ch.passages.reduce((pAcc, p) => pAcc + p.questions.length, 0),
                    0
                );

                return (
                    <div key={subject.subjectId} className="space-y-8">
                        <div className="text-center border-b border-white/10 pb-4">
                            <h2 className="text-3xl font-bold text-white tracking-tight">
                                {subject.subjectName} ({subjectQuestionCount})
                            </h2>
                        </div>

                        {subject.chapters.map((chapter) => (
                            <div
                                key={chapter.chapterId ?? `chapter-${chapter.chapterName ?? "default"}`}
                                className="space-y-6"
                            >
                                {chapter.chapterName && (
                                    <h3 className="text-xl font-semibold text-white/90">
                                        {chapter.chapterName}
                                    </h3>
                                )}

                                {chapter.passages.map((passage, passageIdx) => {
                                    const pStart = globalQuestionNum;
                                    const pEnd = globalQuestionNum + passage.questions.length - 1;
                                    const rangeLabel = pStart === pEnd ? `question ${pStart}` : `questions ${pStart}–${pEnd}`;

                                    return (
                                        <div
                                            key={passage.passageId ?? `passage-${passageIdx}`}
                                            className="space-y-6"
                                        >
                                            {passage.passageText && (
                                                <div className="rounded-2xl border border-white/10 bg-[#0C1120] p-6 space-y-3">
                                                    <div className="flex items-center gap-2 text-xs font-bold text-[#14B8A6] uppercase tracking-wider">
                                                        <BookOpen size={14} />
                                                        <span>Read the passage and answer {rangeLabel}</span>
                                                    </div>
                                                    <p className="text-sm leading-relaxed text-white/90 font-sans">
                                                        {passage.passageText}
                                                    </p>
                                                    {passage.passageImageUrl && (
                                                        <img
                                                            src={passage.passageImageUrl}
                                                            alt="Passage illustration"
                                                            className="rounded-lg max-h-60 object-contain"
                                                        />
                                                    )}
                                                </div>
                                            )}

                                            {passage.questions.map((question) => (
                                                <SubjectQuestionCard
                                                    key={question.questionId}
                                                    question={question}
                                                    questionNumber={globalQuestionNum++}
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
        </div>
    );
}