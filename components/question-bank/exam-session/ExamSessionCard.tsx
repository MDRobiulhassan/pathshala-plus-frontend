"use client";

import { ExamSession } from "@/lib/api";
import { Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
    examSession: ExamSession;
    instituteId: number;
    unitId?: number;
};

export default function ExamSessionCard({
    examSession,
    instituteId,
    unitId,
}: Props) {
    const router = useRouter();

    const handleClick = () => {
        const basePath = unitId
            ? `/student/question-bank/institute/${instituteId}/unit/${unitId}/exam-session/${examSession.id}`
            : `/student/question-bank/institute/${instituteId}/exam-session/${examSession.id}`;

        if (examSession.hasShift) {
            router.push(`${basePath}/shift`);
        } else {
            router.push(basePath);
        }
    };

    return (
        <button
            onClick={handleClick}
            className="
      w-full
      rounded-3xl
      border
      bg-background
      p-5
      transition-all
      duration-200
      hover:border-primary
      hover:shadow-lg
      hover:-translate-y-1
      "
        >
            <div
                className="
        h-32
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

            <div className="mt-5 text-center">
                <h3 className="text-lg font-semibold">
                    {examSession.sessionLabel}
                </h3>

                {examSession.endYear === null && (
                    <p className="text-sm text-muted-foreground mt-1">
                        Board Session
                    </p>
                )}
            </div>
        </button>
    );
}