"use client";

import Image from "next/image";
import { ExamSession } from "@/lib/api";
import { Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
    examSession: ExamSession;
    instituteId: number;
    unitId?: number;
    logoUrl?: string | null;
};

export default function ExamSessionCard({
    examSession,
    instituteId,
    unitId,
    logoUrl,
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
                        alt={examSession.sessionLabel}
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
                    {examSession.sessionLabel}
                </h3>

                {examSession.endYear === null && (
                    <p className="text-sm text-white/50 mt-1">
                        Board Session
                    </p>
                )}
            </div>
        </button>
    );
}