"use client";

import { useParams } from "next/navigation";
import useUnits from "@/hooks/question-bank/useUnits";
import { useInstitutes } from "@/hooks/question-bank/useInstitutes";
import UnitGrid from "./UnitGrid";
import BackButton from "@/components/ui/BackButton";
import Loader from "@/components/ui/Loader";

export default function UnitPage() {
    const params = useParams();

    const instituteId = Number(params.instituteId);

    const {
        units,
        loading,
        error,
    } = useUnits(instituteId);

    const { institutes } = useInstitutes();
    const currentInstitute = institutes.find((i) => i.id === instituteId);

    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Unit Wise Questions
                    </h1>

                    <p className="text-white/60">
                        See previous questions unit wise
                    </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#0C1120] p-24 text-center">
                    <Loader />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-3xl border border-white/10 bg-[#0C1120] p-24 text-center text-red-400">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <BackButton />

            <div>
                <h1 className="text-3xl font-bold text-white">
                    {currentInstitute ? `${currentInstitute.name} Units` : "Unit Wise Questions"}
                </h1>

                <p className="text-white/60">
                    See previous questions unit wise
                </p>
            </div>

            <UnitGrid
                units={units}
                instituteId={instituteId}
                logoUrl={currentInstitute?.logoUrl}
            />
        </div>
    );
}