"use client";

import Link from "next/link";
import { Lightbulb, Lock, ArrowRight } from "lucide-react";

type ExplanationBoxProps = {
    explanation?: string | null;
};

export default function ExplanationBox({ explanation }: ExplanationBoxProps) {
    if (explanation) {
        return (
            <div className="rounded-2xl border border-[#14B8A6]/30 bg-[#0C1120] p-5 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#14B8A6]">
                    <Lightbulb size={16} />
                    <span>Explanation</span>
                </div>
                <p className="text-sm leading-relaxed text-white/80 font-sans">
                    {explanation}
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-[#0C1120] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#14B8A6]">
                    <Lock size={18} />
                </div>

                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">
                            Detailed Explanation
                        </h4>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
                            Pro
                        </span>
                    </div>
                    <p className="text-xs text-white/50">
                        Step-by-step reasoning and solution breakdowns are available for Pro members.
                    </p>
                </div>
            </div>

            <Link
                href="/#pricing"
                className="
                    inline-flex
                    items-center
                    justify-center
                    gap-1.5
                    rounded-xl
                    bg-[#14B8A6]
                    px-4
                    py-2.5
                    text-xs
                    font-bold
                    text-[#060910]
                    hover:bg-[#14B8A6]/90
                    transition-all
                    shrink-0
                    cursor-pointer
                "
            >
                <span>Upgrade to Pro</span>
                <ArrowRight size={13} />
            </Link>
        </div>
    );
}
