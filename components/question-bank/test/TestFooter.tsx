"use client";

import Timer from "./Timer";
import { Loader2 } from "lucide-react";

type Props = {
    current: number;
    total: number;
    duration: number;
    startedAt?: string | null;
    submitting?: boolean;
    onSubmit: () => void;
};

export default function TestFooter({
    current,
    total,
    duration,
    startedAt,
    submitting = false,
    onSubmit,
}: Props) {
    return (
        <div className="sticky bottom-3 z-30 mx-auto max-w-5xl rounded-2xl border border-white/10 bg-[#0C1120] p-3 sm:p-4 shadow-2xl">
            {/* Desktop View  */}
            <div className="hidden sm:grid sm:grid-cols-3 sm:items-center">
                {/* Timer */}
                <div className="flex justify-start">
                    <Timer duration={duration} startedAt={startedAt} onExpire={onSubmit} />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        onClick={onSubmit}
                        disabled={submitting}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md whitespace-nowrap"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Submitting…</span>
                            </>
                        ) : (
                            <span>Submit Test</span>
                        )}
                    </button>
                </div>

                {/* Question Count */}
                <div className="flex justify-end text-sm font-medium text-white/80">
                    <span>{current} / {total} Questions</span>
                </div>
            </div>

            {/* Mobile View */}
            <div className="flex flex-col gap-2 sm:hidden">
                <div className="flex items-center justify-between text-xs font-medium text-white/80 px-1">
                    <Timer duration={duration} startedAt={startedAt} onExpire={onSubmit} />
                    <span>{current} / {total} Questions</span>
                </div>

                <button
                    onClick={onSubmit}
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md"
                >
                    {submitting ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Submitting…</span>
                        </>
                    ) : (
                        <span>Submit Test</span>
                    )}
                </button>
            </div>
        </div>
    );
}