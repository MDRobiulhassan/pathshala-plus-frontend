"use client";

import Image from "next/image";
import Link from "next/link";
import { Megaphone, Sparkles, ArrowLeft } from "lucide-react";

type ComingSoonProps = {
    title: string;
    description?: string;
    iconSrc?: string;
};

export default function ComingSoon({
    title,
    description = "We are working hard to build this feature. Check back soon for exciting updates!",
    iconSrc,
}: ComingSoonProps) {
    return (
        <div className="flex min-h-[65vh] items-center justify-center text-center px-4 py-8">
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0C1120] p-8 md:p-12 shadow-2xl space-y-6">
                {/* Top ambient glow */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 h-32 w-64 rounded-full bg-[#14B8A6]/15 blur-3xl pointer-events-none" />

                {/* Icon avatar using sidebar SVG icons */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#14B8A6]/10 border border-[#14B8A6]/25 text-[#14B8A6] shadow-inner">
                    {iconSrc ? (
                        <Image
                            src={iconSrc}
                            alt={title}
                            width={30}
                            height={30}
                            className="brightness-0 invert object-contain"
                        />
                    ) : (
                        <Sparkles size={28} />
                    )}
                </div>

                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 border border-amber-500/30 px-3.5 py-1 text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                        <Megaphone size={12} />
                        <span>Coming Soon</span>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight pt-1">
                        {title}
                    </h1>

                    <p className="text-sm text-slate-400 leading-relaxed font-sans max-w-sm mx-auto">
                        {description}
                    </p>
                </div>

                <div className="pt-2">
                    <Link
                        href="/student"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-[#14B8A6]
                            px-5
                            py-2.5
                            text-sm
                            font-bold
                            text-[#060910]
                            hover:bg-[#14B8A6]/90
                            transition-all
                            cursor-pointer
                        "
                    >
                        <ArrowLeft size={16} />
                        <span>Back to Dashboard</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
