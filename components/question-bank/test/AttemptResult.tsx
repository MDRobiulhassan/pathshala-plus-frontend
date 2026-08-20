"use client";

import { TestAttemptResult, TestResultQuestion } from "@/lib/api/question-bank";
import Link from "next/link";
import { CheckCircle2, XCircle, Minus, ArrowLeft, Trophy } from "lucide-react";
import ExplanationBox from "../Shared/ExplanationBox";

type Props = {
    result: TestAttemptResult;
    onRetry?: () => void;
};

function StatCard({ label, value, color }: { label: string; value: number | string; color: string }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#0C1120] p-5 text-center space-y-1">
            <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
        </div>
    );
}

export default function AttemptResult({ result, onRetry }: Props) {
    const { summary, subjects } = result;
    const pct = summary.totalMarks > 0
        ? Math.round((summary.score / summary.totalMarks) * 100)
        : 0;
    const passed = summary.passed;

    const allQuestions: TestResultQuestion[] = subjects.flatMap((s) =>
        s.chapters.flatMap((c) =>
            c.passages.flatMap((p) => p.questions)
        )
    );

    let qNum = 0;

    return (
        <div className="mx-auto max-w-3xl space-y-8 py-6">
            {/* Back button */}
            <Link
                href="/student/question-bank"
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
                <ArrowLeft size={16} />
                Back to Question Bank
            </Link>

            {/* Score hero card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0C1120] p-8 text-center space-y-4 shadow-2xl">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 h-32 w-64 rounded-full bg-[#14B8A6]/10 blur-3xl pointer-events-none" />

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#14B8A6]/10 border border-[#14B8A6]/25 text-[#14B8A6]">
                    <Trophy size={28} />
                </div>

                <div>
                    <h1 className="text-2xl font-extrabold text-white">
                        {summary.testName}
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Test Completed</p>
                </div>

                <div className={`text-6xl font-extrabold ${passed ? "text-emerald-400" : "text-red-400"}`}>
                    {summary.score}/{summary.totalMarks}
                </div>

                <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${
                    passed
                        ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                        : "bg-red-500/15 border border-red-500/30 text-red-400"
                }`}>
                    {passed ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                    {passed ? "Passed" : "Failed"} · {pct}%
                </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatCard label="Correct" value={summary.correctAnswers} color="text-emerald-400" />
                <StatCard label="Wrong" value={summary.incorrectAnswers} color="text-red-400" />
                <StatCard label="Skipped" value={summary.unansweredQuestions} color="text-amber-400" />
                <StatCard label="Total" value={summary.totalQuestions} color="text-slate-300" />
            </div>

            {/* Action buttons */}
            {onRetry && (
                <div className="flex gap-3">
                    <button
                        onClick={onRetry}
                        className="flex-1 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors cursor-pointer"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Question review */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-white">Question Review</h2>

                {subjects.map((subject) => (
                    <div key={subject.subjectId} className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#14B8A6]">
                            {subject.subjectName}
                        </h3>

                        {subject.chapters.flatMap((chapter) =>
                            chapter.passages.flatMap((passage) =>
                                passage.questions.map((question) => {
                                    qNum++;
                                    const isCorrect = question.isCorrect;
                                    const isUnattempted = isCorrect === null;

                                    return (
                                        <div
                                            key={question.questionId}
                                            className="rounded-2xl border border-white/10 bg-[#0C1120] p-6 space-y-4"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <h4 className="text-sm md:text-base font-medium text-white leading-relaxed">
                                                    <span className="text-[#14B8A6] font-bold mr-1.5">{qNum}.</span>
                                                    {question.questionText}
                                                </h4>
                                                <span className={`shrink-0 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                                                    isUnattempted
                                                        ? "bg-slate-500/15 text-slate-400"
                                                        : isCorrect
                                                            ? "bg-emerald-500/15 text-emerald-400"
                                                            : "bg-red-500/15 text-red-400"
                                                }`}>
                                                    {isUnattempted ? <Minus size={11} /> : isCorrect ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
                                                    {isUnattempted ? "Skipped" : isCorrect ? "Correct" : "Wrong"}
                                                </span>
                                            </div>

                                            {/* Options */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {question.options.map((option) => {
                                                    let cls = "border-white/8 bg-white/3 text-slate-400";
                                                    if (option.correctOption) {
                                                        cls = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
                                                    } else if (option.selected && !option.correctOption) {
                                                        cls = "border-red-500/50 bg-red-500/10 text-red-300";
                                                    }
                                                    return (
                                                        <div
                                                            key={option.optionId}
                                                            className={`flex items-start gap-2.5 rounded-xl border px-4 py-2.5 text-sm ${cls}`}
                                                        >
                                                            <span className="font-bold shrink-0">{option.optionLabel}.</span>
                                                            <span>{option.optionText}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Marks */}
                                            {!isUnattempted && (
                                                <p className={`text-xs font-semibold ${isCorrect ? "text-emerald-400" : "text-red-400"}`}>
                                                    Marks: {isCorrect ? "+" : ""}{question.marksAwarded}
                                                </p>
                                            )}

                                            {/* Explanation */}
                                            <ExplanationBox explanation={question.explanation} />
                                        </div>
                                    );
                                })
                            )
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
