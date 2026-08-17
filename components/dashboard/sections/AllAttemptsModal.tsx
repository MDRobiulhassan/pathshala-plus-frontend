"use client";

import { useState } from "react";
import { useUserTestAttempts } from "@/hooks/useUserTestAttempts";
import Loader from "@/components/ui/Loader";
import { X, Clock, ArrowRight, Play } from "lucide-react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSelectAttempt: (testId: number, attemptId: number) => void;
};

function formatSeconds(seconds?: number): string {
    if (!seconds) return "N/A";
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins < 60) return `${mins}m ${secs > 0 ? `${secs}s` : ""}`;
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hours}h ${remMins}m`;
}

export default function AllAttemptsModal({ isOpen, onClose, onSelectAttempt }: Props) {
    const { attempts, loading, error } = useUserTestAttempts();
    const [searchTerm, setSearchTerm] = useState("");

    if (!isOpen) return null;

    const filteredAttempts = attempts.filter((attempt) =>
        attempt.testName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4 sm:p-6 overflow-y-auto backdrop-blur-sm">
            <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0C1120] p-6 sm:p-8 space-y-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            All Test Attempts History
                        </h2>
                        <p className="text-xs text-slate-400 mt-1">
                            Complete history of your test attempts ({attempts.length} Total)
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full bg-white/5 p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Filter Input */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search attempt history by test name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#14B8A6]/50"
                    />
                </div>

                {loading ? (
                    <div className="py-16 flex justify-center">
                        <Loader />
                    </div>
                ) : error ? (
                    <div className="py-12 text-center text-red-400">
                        {error.message || "Failed to load attempts history."}
                    </div>
                ) : filteredAttempts.length === 0 ? (
                    <div className="py-12 text-center text-slate-400">
                        No attempt records found.
                    </div>
                ) : (
                    <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                        {filteredAttempts.map((attempt) => {
                            const isInProgress = !attempt.finishedAt;

                            return (
                                <div
                                    key={attempt.attemptId}
                                    onClick={() => onSelectAttempt(attempt.testId, attempt.attemptId)}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-colors hover:border-[#14B8A6]/30 hover:bg-white/[0.05] cursor-pointer"
                                >
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-semibold text-white">
                                            {attempt.testName}
                                        </h3>
                                        <div className="flex items-center gap-4 text-xs text-slate-400">
                                            {isInProgress ? (
                                                <span className="text-amber-400 font-medium">Test currently in progress</span>
                                            ) : (
                                                <span>
                                                    {new Date(attempt.finishedAt!).toLocaleDateString("en-US", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </span>
                                            )}

                                            {!isInProgress && attempt.timeTakenInSeconds !== undefined && (
                                                <span className="inline-flex items-center gap-1">
                                                    <Clock size={12} />
                                                    {formatSeconds(attempt.timeTakenInSeconds)}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                                        {!isInProgress && (
                                            <div className="text-right">
                                                <p className="text-[10px] uppercase text-slate-500 font-semibold">Score</p>
                                                <p className="text-sm font-bold text-white">{attempt.score}</p>
                                            </div>
                                        )}

                                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                            isInProgress
                                                ? "bg-amber-500/15 text-amber-400 border border-amber-500/30 animate-pulse"
                                                : attempt.passed
                                                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                                    : "bg-red-500/15 text-red-400 border border-red-500/30"
                                        }`}>
                                            {isInProgress ? "In Progress" : attempt.passed ? "Passed" : "Failed"}
                                        </span>

                                        {isInProgress ? (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onSelectAttempt(attempt.testId, attempt.attemptId);
                                                }}
                                                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 text-slate-950 px-3 py-1.5 text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer shadow-sm"
                                            >
                                                <Play size={12} fill="currentColor" />
                                                <span>Resume</span>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onSelectAttempt(attempt.testId, attempt.attemptId);
                                                }}
                                                className="inline-flex items-center gap-1 rounded-xl bg-[#14B8A6]/10 border border-[#14B8A6]/30 px-3 py-1.5 text-xs font-semibold text-[#14B8A6] hover:bg-[#14B8A6]/20 transition-colors cursor-pointer"
                                            >
                                                <span>View Result</span>
                                                <ArrowRight size={12} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
