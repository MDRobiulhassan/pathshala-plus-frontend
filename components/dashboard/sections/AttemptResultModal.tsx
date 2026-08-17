"use client";

import { useEffect, useState } from "react";
import { getTestAttemptResult, TestAttemptResult, TestResultQuestion } from "@/lib/api";
import ExplanationBox from "@/components/question-bank/Shared/ExplanationBox";
import Loader from "@/components/ui/Loader";
import { X, CheckCircle2, XCircle, Minus, Trophy } from "lucide-react";

type Props = {
    attemptId: number | null;
    onClose: () => void;
};

export default function AttemptResultModal({ attemptId, onClose }: Props) {
    const [result, setResult] = useState<TestAttemptResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!attemptId) {
            setResult(null);
            return;
        }

        async function loadResult() {
            try {
                setLoading(true);
                setError("");
                const res = await getTestAttemptResult(attemptId!);
                setResult(res);
            } catch (err: any) {
                setError(err?.message || "Failed to load attempt result.");
            } finally {
                setLoading(false);
            }
        }

        loadResult();
    }, [attemptId]);

    if (!attemptId) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-6 overflow-y-auto backdrop-blur-sm">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0C1120] p-6 sm:p-8 space-y-6 shadow-2xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-5 top-5 rounded-full bg-white/5 p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                    <X size={20} />
                </button>

                {loading ? (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <Loader />
                    </div>
                ) : error ? (
                    <div className="py-12 text-center text-red-400 space-y-4">
                        <p>{error}</p>
                        <button
                            onClick={onClose}
                            className="rounded-xl border border-white/10 px-6 py-2 text-sm text-white hover:bg-white/5"
                        >
                            Close
                        </button>
                    </div>
                ) : result ? (
                    <div className="space-y-8">
                        {/* Score Hero Card */}
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-center space-y-4">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14B8A6]/10 border border-[#14B8A6]/25 text-[#14B8A6]">
                                <Trophy size={24} />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    {result.summary.testName}
                                </h2>
                                <p className="text-xs text-slate-400 mt-1">
                                    Attempt Details & Solution Review
                                </p>
                            </div>

                            <div className="py-2">
                                <span className="text-4xl font-extrabold text-white">
                                    {result.summary.score}
                                </span>
                                <span className="text-xl text-white/50 font-semibold"> / {result.summary.totalMarks}</span>
                            </div>

                            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                {result.summary.passed ? "Passed" : "Failed"} ({result.summary.totalMarks > 0 ? Math.round((result.summary.score / result.summary.totalMarks) * 100) : 0}%)
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-center">
                                <p className="text-lg font-extrabold text-emerald-400">{result.summary.correctAnswers}</p>
                                <p className="text-[10px] text-emerald-300 uppercase font-semibold">Correct</p>
                            </div>
                            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center">
                                <p className="text-lg font-extrabold text-red-400">{result.summary.incorrectAnswers}</p>
                                <p className="text-[10px] text-red-300 uppercase font-semibold">Wrong</p>
                            </div>
                            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                                <p className="text-lg font-extrabold text-amber-400">{result.summary.unansweredQuestions}</p>
                                <p className="text-[10px] text-slate-400 uppercase font-semibold">Skipped</p>
                            </div>
                            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                                <p className="text-lg font-extrabold text-white">{result.summary.totalQuestions}</p>
                                <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Qs</p>
                            </div>
                        </div>

                        {/* Question-by-Question Review */}
                        <div className="space-y-6">
                            <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">
                                Question & Answer Review
                            </h3>

                            {result.subjects?.map((subject) => {
                                let qNum = 0;
                                return (
                                    <div key={subject.subjectId} className="space-y-4">
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-[#14B8A6]">
                                            {subject.subjectName}
                                        </h4>

                                        {subject.chapters?.flatMap((chapter) =>
                                            chapter.passages?.flatMap((passage) =>
                                                passage.questions?.map((question) => {
                                                    qNum++;
                                                    const isCorrect = question.isCorrect;
                                                    const isUnattempted = isCorrect === null;

                                                    return (
                                                        <div
                                                            key={question.questionId}
                                                            className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4"
                                                        >
                                                            <div className="flex items-start justify-between gap-4">
                                                                <h5 className="text-sm font-medium text-white leading-relaxed">
                                                                    <span className="text-[#14B8A6] font-bold mr-1.5">{qNum}.</span>
                                                                    {question.questionText}
                                                                </h5>
                                                                <span className={`shrink-0 flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
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
                                                                {question.options?.map((option) => {
                                                                    let cls = "border-white/10 bg-white/5 text-slate-400";
                                                                    if (option.correctOption) {
                                                                        cls = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 font-bold";
                                                                    } else if (option.selected && !option.correctOption) {
                                                                        cls = "border-red-500/50 bg-red-500/10 text-red-300 font-bold";
                                                                    }
                                                                    return (
                                                                        <div
                                                                            key={option.optionId}
                                                                            className={`flex items-start gap-2 rounded-xl border px-3.5 py-2 text-xs ${cls}`}
                                                                        >
                                                                            <span className="font-bold shrink-0">{option.optionLabel}.</span>
                                                                            <span>{option.optionText}</span>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>

                                                            {/* Explanation Box */}
                                                            <ExplanationBox explanation={question.explanation} />
                                                        </div>
                                                    );
                                                })
                                            )
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
