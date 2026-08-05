"use client";

import { useParams } from "next/navigation";
import useShifts from "@/hooks/question-bank/useShifts";
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

    if (loading) {
        return (
            <div className="space-y-6">

                <div>
                    <h1 className="text-3xl font-bold">
                        Shift Questions
                    </h1>

                    <p className="text-muted-foreground">
                        See previous questions shift wise
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
                    Shift Questions
                </h1>

                <p className="text-muted-foreground">
                    See previous questions shift wise
                </p>
            </div>

            <ShiftGrid
                shifts={shifts}
                instituteId={instituteId}
                unitId={unitId}
                examSessionId={examSessionId}
            />

        </div>
    );
}