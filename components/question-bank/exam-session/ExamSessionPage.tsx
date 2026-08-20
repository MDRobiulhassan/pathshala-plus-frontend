"use client";

import { useParams } from "next/navigation";
import useExamSessions from "@/hooks/question-bank/useExamSessions";
import { useInstitutes } from "@/hooks/question-bank/useInstitutes";
import ExamSessionGrid from "./ExamSessionGrid";
import BackButton from "@/components/ui/BackButton";
import Loader from "@/components/ui/Loader";

export default function ExamSessionPage() {
    const params = useParams();

    const instituteId = Number(params.instituteId);
    const unitId = params.unitId ? Number(params.unitId) : undefined;

    const {
        examSessions,
        loading,
        error,
    } = useExamSessions(instituteId, unitId);

    const { institutes } = useInstitutes();
    const currentInstitute = institutes.find((i) => i.id === instituteId);

    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Year Wise Questions
                    </h1>

                    <p className="text-white/60 mt-1">
                        See previous questions year wise
                    </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#0C1120] p-20 text-center">
                    <Loader />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-3xl border border-white/10 bg-[#0C1120] p-20 text-center text-red-400">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <BackButton />
            <div>
                <h1 className="text-3xl font-bold text-white">
                    {currentInstitute ? `${currentInstitute.name} Sessions` : "Year Wise Questions"}
                </h1>

                <p className="text-white/60 mt-1">
                    See previous questions year wise
                </p>
            </div>

            <ExamSessionGrid
                examSessions={examSessions}
                instituteId={instituteId}
                unitId={unitId}
                logoUrl={currentInstitute?.logoUrl}
            />
        </div>
    );
}