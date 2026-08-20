"use client";

import { useParams } from "next/navigation";
import useShifts from "@/hooks/question-bank/useShifts";
import { useInstitutes } from "@/hooks/question-bank/useInstitutes";
import ShiftGrid from "./ShiftGrid";
import BackButton from "@/components/ui/BackButton";
import Loader from "@/components/ui/Loader";

export default function ShiftPage() {
    const params = useParams();

    const instituteId = Number(params.instituteId);
    const unitId = Number(params.unitId);
    const examSessionId = Number(params.examSessionId);

    const {
        shifts,
        loading,
        error,
    } = useShifts(
        unitId,
        examSessionId
    );

    const { institutes } = useInstitutes();
    const currentInstitute = institutes.find((i) => i.id === instituteId);

    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Shift Questions
                    </h1>

                    <p className="text-white/60">
                        See previous questions shift wise
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
                    {currentInstitute ? `${currentInstitute.name} Shifts` : "Shift Questions"}
                </h1>

                <p className="text-white/60">
                    See previous questions shift wise
                </p>
            </div>

            <ShiftGrid
                shifts={shifts}
                instituteId={instituteId}
                unitId={unitId}
                examSessionId={examSessionId}
                logoUrl={currentInstitute?.logoUrl}
            />
        </div>
    );
}