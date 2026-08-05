"use client";

import { Unit } from "@/lib/api";
import UnitCard from "./UnitCard";

type Props = {
    units: Unit[];
    instituteId: number;
};

export default function UnitGrid({
    units,
    instituteId,
}: Props) {
    if (!units.length) {
        return (
            <div className="rounded-3xl border bg-card p-20 text-center">
                No Units Found
            </div>
        );
    }

    return (
        <div className="rounded-3xl border bg-card p-8">

            <div className="grid grid-cols-2 gap-8">

                {units.map((unit) => (
                    <UnitCard
                        key={unit.id}
                        unit={unit}
                        instituteId={instituteId}
                    />
                ))}

            </div>

        </div>
    );
}