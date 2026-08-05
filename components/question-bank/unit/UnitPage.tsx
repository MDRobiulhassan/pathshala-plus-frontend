"use client";

import { useParams } from "next/navigation";
import useUnits from "@/hooks/question-bank/useUnits";
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

    if (loading) {
        return (
            <div className="space-y-6">

                <div>
                    <h1 className="text-3xl font-bold">
                        Unit Wise Questions
                    </h1>

                    <p className="text-muted-foreground">
                        See previous questions unit wise
                    </p>
                </div>

                <div className="rounded-3xl border bg-card p-24 text-center">
                    <Loader />
                </div>

            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-3xl border bg-card p-24 text-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <BackButton />

            <div>
                <h1 className="text-3xl font-bold">
                    Unit Wise Questions
                </h1>

                <p className="text-muted-foreground">
                    See previous questions unit wise
                </p>
            </div>

            <UnitGrid
                units={units}
                instituteId={instituteId}
            />

        </div>
    );
}