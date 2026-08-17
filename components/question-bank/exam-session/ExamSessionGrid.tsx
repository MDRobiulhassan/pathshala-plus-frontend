"use client";

import { ExamSession } from "@/lib/api";
import ExamSessionCard from "./ExamSessionCard";

type Props = {
    examSessions: ExamSession[];
    instituteId: number;
    unitId?: number;
};

export default function ExamSessionGrid({
    examSessions,
    instituteId,
    unitId,
}: Props) {
    if (!examSessions.length) {
        return (
            <div className="rounded-3xl border bg-card p-20 text-center">
                No Exam Sessions Found
            </div>
        );
    }

    return (
        <div className="rounded-3xl border bg-card p-8">
            <div className="grid grid-cols-2 gap-8">
                {examSessions.map((session) => (
                    <ExamSessionCard
                        key={session.id}
                        examSession={session}
                        instituteId={instituteId}
                        unitId={unitId}
                    />
                ))}
            </div>
        </div>
    );
}