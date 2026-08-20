"use client";

import { Shift } from "@/lib/api";
import ShiftCard from "./ShiftCard";

type Props = {
    shifts: Shift[];
    instituteId: number;
    unitId: number;
    examSessionId: number;
    logoUrl?: string | null;
};

export default function ShiftGrid({
    shifts,
    instituteId,
    unitId,
    examSessionId,
    logoUrl,
}: Props) {
    if (!shifts.length) {
        return (
            <div className="rounded-3xl border border-white/10 bg-[#0C1120] p-20 text-center text-white/50">
                No Shifts Found
            </div>
        );
    }

    return (
        <div className="rounded-3xl border border-white/10 bg-[#0C1120] p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {shifts.map((shift) => (
                    <ShiftCard
                        key={shift.id}
                        shift={shift}
                        instituteId={instituteId}
                        unitId={unitId}
                        examSessionId={examSessionId}
                        logoUrl={logoUrl}
                    />
                ))}
            </div>
        </div>
    );
}