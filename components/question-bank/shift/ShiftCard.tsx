"use client";

import { Shift } from "@/lib/api";
import { Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
    shift: Shift;
    instituteId: number;
    unitId: number;
    examSessionId: number;
};

export default function ShiftCard({
    shift,
    instituteId,
    unitId,
    examSessionId,
}: Props) {
    const router = useRouter();

    return (
        <button
            onClick={() =>
                router.push(
                    `/student/question-bank/institute/${instituteId}/unit/${unitId}/exam-session/${examSessionId}/shift/${shift.id}`
                )
            }
            className="
        w-full
        rounded-3xl
        border
        bg-background
        p-5
        transition-all
        hover:border-primary
        hover:shadow-lg
      "
        >
            <div className="h-32 rounded-2xl border bg-muted flex items-center justify-center">
                <Building2 className="h-14 w-14 text-muted-foreground" />
            </div>

            <div className="mt-5 text-center">
                <h3 className="text-lg font-semibold">
                    Shift {shift.shiftNumber}
                </h3>
            </div>
        </button>
    );
}