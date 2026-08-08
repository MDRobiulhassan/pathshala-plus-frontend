"use client";

import { Unit } from "@/lib/api";
import { Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
    unit: Unit;
    instituteId: number;
};

export default function UnitCard({
    unit,
    instituteId,
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
        border-border
        bg-background
        p-5
        text-left
        transition-all
        duration-200
        hover:border-primary
        hover:shadow-lg
        hover:-translate-y-1
      "
        >
            <div
                className="
          h-36
          rounded-2xl
          border
          bg-muted
          flex
          items-center
          justify-center
        "
            >
                <Building2 className="h-14 w-14 text-muted-foreground" />
            </div>

            <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold">
                    {unit.name}
                </h3>
            </div>
        </button>
    );
}