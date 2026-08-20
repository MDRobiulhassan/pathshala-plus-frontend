"use client";

import { Unit } from "@/lib/api";
import UnitCard from "./UnitCard";

type Props = {
    units: Unit[];
    instituteId: number;
    logoUrl?: string | null;
};

export default function UnitGrid({
    units,
    instituteId,
    logoUrl,
}: Props) {
    if (!units.length) {
        return (
            <div className="rounded-3xl border border-white/10 bg-[#0C1120] p-20 text-center text-white/50">
                No Units Found
            </div>
        );
    }

    return (
        <div className="rounded-3xl border border-white/10 bg-[#0C1120] p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {units.map((unit) => (
                    <UnitCard
                        key={unit.id}
                        unit={unit}
                        instituteId={instituteId}
                        logoUrl={logoUrl}
                    />
                ))}
            </div>
        </div>
    );
}