"use client";

import { useRouter } from "next/navigation";
import { Play } from "lucide-react";

type ActiveTestItem = {
    attemptId: number;
    testId: number;
    testName: string;
    score?: number;
    passed?: boolean;
    finishedAt: string | null;
    isPractice?: boolean;
};

type Props = {
    continueLearning?: {
        subject?: string | null;
        chapter?: string | null;
        progress?: number | null;
    } | null;
    activeTests?: ActiveTestItem[];
};

export default function ContinueLearningCard({
    continueLearning,
    activeTests = [],
}: Props) {
    const router = useRouter();

    const runningTests = activeTests.filter((t) => !t.finishedAt);

    const timedTest = runningTests.find((t) => !t.isPractice) || activeTests.find((t) => !t.isPractice);

    const practiceTest = runningTests.find((t) => t.isPractice) || activeTests.find((t) => t.isPractice);

    const targetTestId = timedTest?.testId || practiceTest?.testId || 1;

    const handleTimedClick = () => {
        const id = timedTest?.testId || targetTestId;
        router.push(`/student/question-bank/exam-info/${id}/test?testId=${id}`);
    };

    const handlePracticeClick = () => {
        const id = practiceTest?.testId || targetTestId;
        router.push(`/student/question-bank/exam-info/${id}/practice?testId=${id}`);
    };

    return (
        <div className="rounded-3xl border border-white/5 bg-[#0C1120] p-6 space-y-4 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                    <h2 className="text-xl font-bold text-white">
                        Continue Learning
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Your active test & practice sessions
                    </p>
                </div>

                <span className="rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/30 px-3 py-1 text-xs font-semibold text-[#14B8A6]">
                    {runningTests.length > 0 ? `${runningTests.length} In Progress` : "Active Sessions"}
                </span>
            </div>

            {/* 2-Row Display */}
            <div className="space-y-3 pt-1">
                {/* ROW 1: TIMED TEST */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]">
                    <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                            {timedTest && !timedTest.finishedAt && (
                                <span className="text-[10px] font-bold text-amber-400 animate-pulse">
                                    • In Progress
                                </span>
                            )}
                        </div>
                        <h3 className="text-sm font-semibold text-white truncate">
                            {timedTest ? timedTest.testName : "CU A Unit Timed Exam 2025-26"}
                        </h3>
                    </div>

                    <button
                        onClick={handleTimedClick}
                        className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold hover:bg-amber-400 transition-colors shadow-sm cursor-pointer"
                    >
                        <Play size={13} fill="currentColor" />
                        <span>Resume Test</span>
                    </button>
                </div>

                {/* ROW 2: PRACTICE TEST */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]">
                    <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                            {practiceTest && !practiceTest.finishedAt && (
                                <span className="text-[10px] font-bold text-[#14B8A6] animate-pulse">
                                    • In Progress
                                </span>
                            )}
                        </div>
                        <h3 className="text-sm font-semibold text-white truncate">
                            {practiceTest ? practiceTest.testName : "CU A Unit Practice Session"}
                        </h3>
                    </div>

                    <button
                        onClick={handlePracticeClick}
                        className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#14B8A6] text-slate-950 px-4 py-2 text-xs font-bold hover:bg-[#14B8A6]/90 transition-colors shadow-sm cursor-pointer"
                    >
                        <Play size={13} fill="currentColor" />
                        <span>Continue Practice</span>
                    </button>
                </div>
            </div>
        </div>
    );
}