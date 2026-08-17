"use client";

import { TestAttemptResult } from "@/lib/api/question-bank";
import BackButton from "@/components/ui/BackButton";
import { Loader2 } from "lucide-react";

type Props = {
    result?: TestAttemptResult | null;
    onViewAnswers?: () => void;
    onRetake?: () => void;
    retaking?: boolean;
};

function getTimeTaken(startedAt?: string | null, finishedAt?: string | null): string {
    if (!startedAt || !finishedAt) return "N/A";
    const start = new Date(startedAt).getTime();
    const finish = new Date(finishedAt).getTime();
    if (isNaN(start) || isNaN(finish)) return "N/A";
    const diffMinutes = Math.round((finish - start) / (1000 * 60));
    return `${Math.max(1, diffMinutes)} min`;
}

export default function TestResult({
    result,
    onViewAnswers,
    onRetake,
    retaking = false,
}: Props) {
    if (!result) return null;

    const { summary } = result;
    const answeredCount = summary.correctAnswers + summary.incorrectAnswers;
    const timeTaken = getTimeTaken(summary.startedAt, summary.finishedAt);
    const passed = summary.passed;
    const percentage = summary.totalMarks > 0
        ? Math.round((summary.score / summary.totalMarks) * 100)
        : 0;

    return (
        <div className="mx-auto max-w-2xl space-y-8 py-6">
            <BackButton />

            {/* Main Result Card */}
            <div className="rounded-3xl border border-white/10 bg-[#0C1120] p-8 space-y-8 shadow-2xl">
                {/* Header & Score Summary */}
                <div className="text-center space-y-3">
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        {summary.testName || "Test Summary"}
                    </h1>
                    <p className="text-xs uppercase tracking-wider font-medium text-white/50">
                        Test Result & Performance
                    </p>

                    <div className="py-4">
                        <div className="text-5xl font-extrabold text-white tracking-tight">
                            {summary.score} <span className="text-2xl text-white/40 font-semibold">/ {summary.totalMarks}</span>
                        </div>
                        <div className="mt-3 flex items-center justify-center gap-2">
                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                                passed
                                    ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                                    : "bg-red-500/15 border border-red-500/30 text-red-400"
                            }`}>
                                {passed ? "Passed" : "Failed"} ({percentage}%)
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center space-y-1">
                        <span className="text-xs font-medium text-white/60">Answered</span>
                        <p className="text-xl font-bold text-white">{answeredCount}</p>
                    </div>

                    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center space-y-1">
                        <span className="text-xs font-medium text-emerald-400">Correct</span>
                        <p className="text-xl font-bold text-emerald-400">{summary.correctAnswers}</p>
                    </div>

                    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center space-y-1">
                        <span className="text-xs font-medium text-red-400">Incorrect</span>
                        <p className="text-xl font-bold text-red-400">{summary.incorrectAnswers}</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center space-y-1">
                        <span className="text-xs font-medium text-white/60">Unanswered</span>
                        <p className="text-xl font-bold text-white/80">{summary.unansweredQuestions}</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center space-y-1">
                        <span className="text-xs font-medium text-white/60">Time Taken</span>
                        <p className="text-xl font-bold text-white">{timeTaken}</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center space-y-1">
                        <span className="text-xs font-medium text-white/60">Status</span>
                        <p className={`text-xl font-bold ${passed ? "text-emerald-400" : "text-red-400"}`}>
                            {passed ? "Pass" : "Fail"}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    {onViewAnswers && (
                        <button
                            onClick={onViewAnswers}
                            className="w-full sm:w-auto min-w-[160px] rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            See Answer
                        </button>
                    )}

                    {onRetake && (
                        <button
                            onClick={onRetake}
                            disabled={retaking}
                            className="w-full sm:w-auto min-w-[160px] inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {retaking ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Starting…</span>
                                </>
                            ) : (
                                <span>Try Again</span>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
