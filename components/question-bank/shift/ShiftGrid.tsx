"use client";

import { Shift } from "@/lib/api";
import ShiftCard from "./ShiftCard";

type Props = {
    shifts: Shift[];
    instituteId: number;
    unitId: number;
    examSessionId: number;
};

export default function ShiftGrid({
    shifts,
    instituteId,
    unitId,
    examSessionId,
}: Props) {
    if (!shifts.length) {
        return (
            <div className="rounded-3xl border bg-card p-20 text-center">
                No Shifts Found
            </div>
        );
    }

    return (
        <div className="rounded-3xl border bg-card p-8">

            <div className="grid grid-cols-2 gap-8">

                {shifts.map((shift) => (
                    <ShiftCard
                        key={shift.id}
                        shift={shift}
                        instituteId={instituteId}
                        unitId={unitId}
                        examSessionId={examSessionId}
                    />
                ))}

            </div>

        </div>
    );
}