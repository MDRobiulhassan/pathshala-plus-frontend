"use client";

import { useParams } from "next/navigation";
import useExamInfo from "@/hooks/question-bank/useExamInfo";
import ExamInfoSection from "./ExamInfoSection";
import BackButton from "@/components/ui/BackButton";
import Loader from "@/components/ui/Loader";

export default function ExamInfoPage() {
    const params = useParams();

    const examSessionId = Number(params.examSessionId);
    const unitId = params.unitId ? Number(params.unitId) : undefined;
    const shiftId = params.shiftId ? Number(params.shiftId) : undefined;

    const {
        examInfos,
        loading,
        error,
    } = useExamInfo(examSessionId, unitId, shiftId);

    if (loading) {
        return (
            <div className="flex justify-center py-16">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <BackButton />
            <ExamInfoSection
                examInfos={examInfos}
            />
        </div>
    );
}