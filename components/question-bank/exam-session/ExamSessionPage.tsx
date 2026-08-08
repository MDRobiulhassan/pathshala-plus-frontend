"use client";

import { useParams } from "next/navigation";
import useExamSessions from "@/hooks/question-bank/useExamSessions";
import ExamSessionGrid from "./ExamSessionGrid";
import BackButton from "@/components/ui/BackButton";
import Loader from "@/components/ui/Loader";

export default function ExamSessionPage() {
    const params = useParams();

    const instituteId = Number(params.instituteId);
    const unitId = Number(params.unitId)

    const {
        examSessions,
        loading,
        error,
    } = useExamSessions(instituteId, unitId);

    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">
                        Year Wise Questions
                    </h1>

                    <p className="text-muted-foreground mt-1">
                        See previous questions year wise
                    </p>
                </div>

                <div className="rounded-3xl border bg-card p-20 text-center">
                    <Loader />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-3xl border bg-card p-20 text-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <BackButton />
            <div>
                <h1 className="text-3xl font-bold">
                    Year Wise Questions
                </h1>

                <p className="text-muted-foreground mt-1">
                    See previous questions year wise
                </p>
            </div>

            <ExamSessionGrid
                examSessions={examSessions}
                instituteId={instituteId}
                unitId={unitId}
            />
        </div>
    );
}