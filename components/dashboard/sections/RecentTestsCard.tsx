"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AllAttemptsModal from "./AllAttemptsModal";
import { ArrowRight, Eye, Play } from "lucide-react";

type RecentTest = {
    attemptId: number;
    testId: number;
    testName: string;
    score: number;
    passed: boolean;
    finishedAt: string | null;
};

type Props = {
    recentTests: RecentTest[];
};

export default function RecentTestsCard({
    recentTests,
}: Props) {
    const router = useRouter();
    const [showAllAttemptsModal, setShowAllAttemptsModal] = useState(false);

    const displayedTests = recentTests.slice(0, 5);

    const handleNavigate = (testId: number, attemptId: number) => {
        router.push(`/student/question-bank/exam-info/${testId}/test?testId=${testId}&attemptId=${attemptId}`);
    };

    return (
        <section className="rounded-3xl border border-white/5 bg-[#0C1120] p-6">
            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-white">
                        Recent Tests
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                        Your latest test attempts (Showing 5 most recent)
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowAllAttemptsModal(true)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <span>See All Attempts</span>
                        <ArrowRight size={13} />
                    </button>

                    <span className="rounded-full bg-[#14B8A6]/10 px-3 py-1 text-xs font-medium text-[#14B8A6]">
                        {recentTests.length} Total
                    </span>
                </div>
            </div>

            {displayedTests.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 py-12 text-center">
                    <p className="text-lg font-medium text-white">
                        No Recent Tests
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                        Complete a test to see your history here.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {displayedTests.map((test) => {
                        const isInProgress = !test.finishedAt;

                        return (
                            <div
                                key={test.attemptId}
                                onClick={() => handleNavigate(test.testId, test.attemptId)}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-colors duration-200 hover:border-[#14B8A6]/30 hover:bg-white/[0.05] cursor-pointer"
                            >
                                {/* Left */}
                                <div className="min-w-0">
                                    <h3 className="truncate text-base font-semibold text-white">
                                        {test.testName}
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-400">
                                        {isInProgress ? (
                                            <span className="text-amber-400 font-medium">Test currently in progress</span>
                                        ) : (
                                            new Date(test.finishedAt!).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                        )}
                                    </p>
                                </div>

                                {/* Right */}
                                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                                    {!isInProgress && (
                                        <div className="text-right">
                                            <p className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">
                                                Score
                                            </p>
                                            <p className="text-sm font-bold text-white">
                                                {test.score}
                                            </p>
                                        </div>
                                    )}

                                    <span
                                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                            isInProgress
                                                ? "bg-amber-500/15 text-amber-400 border border-amber-500/30 animate-pulse"
                                                : test.passed
                                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                                        }`}
                                    >
                                        {isInProgress ? "In Progress" : test.passed ? "Passed" : "Failed"}
                                    </span>

                                    {isInProgress ? (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleNavigate(test.testId, test.attemptId);
                                            }}
                                            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 text-slate-950 px-3.5 py-1.5 text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer shadow-sm"
                                        >
                                            <Play size={12} fill="currentColor" />
                                            <span>Resume Test</span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleNavigate(test.testId, test.attemptId);
                                            }}
                                            className="inline-flex items-center gap-1.5 rounded-xl bg-[#14B8A6]/10 border border-[#14B8A6]/30 px-3.5 py-1.5 text-xs font-semibold text-[#14B8A6] hover:bg-[#14B8A6]/20 transition-colors cursor-pointer"
                                        >
                                            <Eye size={13} />
                                            <span>View Result</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* All Attempts History Modal */}
            <AllAttemptsModal
                isOpen={showAllAttemptsModal}
                onClose={() => setShowAllAttemptsModal(false)}
                onSelectAttempt={(testId, attemptId) => {
                    setShowAllAttemptsModal(false);
                    handleNavigate(testId, attemptId);
                }}
            />
        </section>
    );
}