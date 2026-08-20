"use client";

import { ExamSession } from "@/lib/api";
import ExamSessionCard from "./ExamSessionCard";

type Props = {
    examSessions: ExamSession[];
    instituteId: number;
    unitId?: number;
    logoUrl?: string | null;
};

export default function ExamSessionGrid({
    examSessions,
    instituteId,
    unitId,
    logoUrl,
}: Props) {
    if (!examSessions.length) {
        return (
            <div className="rounded-3xl border border-white/10 bg-[#0C1120] p-20 text-center text-white/50">
                No Exam Sessions Found
            </div>
        );
    }

    return (
        <div className="rounded-3xl border border-white/10 bg-[#0C1120] p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {examSessions.map((session) => (
                    <ExamSessionCard
                        key={session.id}
                        examSession={session}
                        instituteId={instituteId}
                        unitId={unitId}
                        logoUrl={logoUrl}
                    />
                ))}
            </div>
        </div>
    );
}