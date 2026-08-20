"use client";

import Image from "next/image";
import { Shift } from "@/lib/api";
import { Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
    shift: Shift;
    instituteId: number;
    unitId: number;
    examSessionId: number;
    logoUrl?: string | null;
};

export default function ShiftCard({
    shift,
    instituteId,
    unitId,
    examSessionId,
    logoUrl,
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
        border-white/10
        bg-[#0C1120]
        p-5
        transition-all
        duration-200
        hover:border-[#14B8A6]
        hover:shadow-lg
        hover:-translate-y-1
        cursor-pointer
      "
        >
            <div className="h-32 rounded-2xl border border-white/10 bg-[#1B2435] flex items-center justify-center overflow-hidden p-4">
                {logoUrl ? (
                    <Image
                        src={logoUrl}
                        alt={`Shift ${shift.shiftNumber}`}
                        width={60}
                        height={60}
                        className="object-contain"
                    />
                ) : (
                    <Building2 className="h-12 w-12 text-white/40" />
                )}
            </div>

            <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-white">
                    Shift {shift.shiftNumber}
                </h3>
            </div>
        </button>
    );
}