"use client";

import { ExamInfo } from "@/lib/api";
import ExamInfoCard from "./ExamInfoCard";

type Props = {
    examInfos: ExamInfo[];
};

export default function ExamInfoSection({
    examInfos,
}: Props) {
    if (examInfos.length === 0) {
        return (
            <div className="rounded-3xl border p-10 text-center">
                No exam information found.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {examInfos.map((examInfo) => (
                <ExamInfoCard
                    key={examInfo.id}
                    examInfo={examInfo}
                />
            ))}
        </div>
    );
}