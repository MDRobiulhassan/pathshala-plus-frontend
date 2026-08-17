"use client";

import { useParams } from "next/navigation";
import useSubjectQuestions from "@/hooks/question-bank/useSubjectQuestions";
import SubjectQuestionSection from "./SubjectQuestionSection";
import BackButton from "@/components/ui/BackButton";
import Loader from "@/components/ui/Loader";

export default function SubjectQuestionPage() {
    const params = useParams();

    const subjectId = Number(params.subjectId);

    const {
        data,
        loading,
        error,
        page,
        setPage,
    } = useSubjectQuestions(subjectId);

    if (loading) {
        return (
            <div className="space-y-6">
                <BackButton fallbackHref="/student/question-bank" />
                <div className="py-20 text-center">
                    <Loader />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <BackButton fallbackHref="/student/question-bank" />
                <div className="py-20 text-center text-red-500">
                    {error}
                </div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="space-y-8">
            <BackButton fallbackHref="/student/question-bank" />

            <div className="text-center">
                <h1 className="text-3xl font-bold">
                    {data.subjectName}
                </h1>

                <p className="text-muted-foreground mt-2">
                    {data.totalElements} Questions
                </p>
            </div>

            <SubjectQuestionSection
                passages={data.passages}
                startQuestionNumber={page * 20 + 1}
            />

            <div className="flex justify-center gap-4">

                <button
                    disabled={page === 0}
                    onClick={() =>
                        setPage((p) => p - 1)
                    }
                    className="rounded-lg border px-5 py-2 disabled:opacity-40"
                >
                    Previous
                </button>

                <span className="flex items-center">
                    Page {page + 1} of {data.totalPages}
                </span>

                <button
                    disabled={
                        page + 1 >= data.totalPages
                    }
                    onClick={() =>
                        setPage((p) => p + 1)
                    }
                    className="rounded-lg border px-5 py-2 disabled:opacity-40"
                >
                    Next
                </button>

            </div>

        </div>
    );
}