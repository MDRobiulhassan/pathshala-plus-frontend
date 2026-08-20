"use client";

import Image from "next/image";
import { Unit } from "@/lib/api";
import { Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
    unit: Unit;
    instituteId: number;
    logoUrl?: string | null;
};

export default function UnitCard({
    unit,
    instituteId,
    logoUrl,
}: Props) {
    const router = useRouter();

    return (
        <button
            onClick={() =>
                router.push(
                    `/student/question-bank/institute/${instituteId}/unit/${unit.id}/exam-session`
                )
            }
            className="
        w-full
        rounded-3xl
        border
        border-white/10
        bg-[#0C1120]
        p-5
        text-left
        transition-all
        duration-200
        hover:border-[#14B8A6]
        hover:shadow-lg
        hover:-translate-y-1
        cursor-pointer
      "
        >
            <div
                className="
          h-32
          rounded-2xl
          border
          border-white/10
          bg-[#1B2435]
          flex
          items-center
          justify-center
          overflow-hidden
          p-4
        "
            >
                {logoUrl ? (
                    <Image
                        src={logoUrl}
                        alt={unit.name}
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
                    {unit.name}
                </h3>
            </div>
        </button>
    );
}