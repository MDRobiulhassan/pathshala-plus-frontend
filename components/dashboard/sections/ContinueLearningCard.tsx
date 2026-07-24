"use client";

import Image from "next/image";

type ContinueLearning = {
    subject?: string;
    chapter?: string;
    progress?: number;
} | null;

type Props = {
    continueLearning: ContinueLearning;
};

export default function ContinueLearningCard({
    continueLearning,
}: Props) {
    // Empty state
    if (!continueLearning) {
        return (
            <div className="rounded-2xl border border-white/5 bg-[#0C1120] h-[260px] flex flex-col p-6">
                {/* Header */}
                <h2 className="text-xl font-bold text-white">
                    Continue Learning
                </h2>

                {/* Body */}
                <div className="flex flex-1 flex-col items-center justify-center">
                    {/* <div className="rounded-full bg-[#14B8A6]/10 p-5">
                        <Image
                            src="/icons/student_laptop.png"
                            alt="Continue Learning"
                            width={60}
                            height={60}
                        />
                    </div> */}

                    <h3 className="mt-5 text-2xl font-semibold text-white">
                        No active learning
                    </h3>

                    <p className="mt-2 max-w-[280px] text-center text-sm text-white/50">
                        Start a practice test and your progress will appear here.
                    </p>
                </div>

                {/* Footer */}
                {/* <button
                    className="
      h-12
      rounded-xl
      bg-[#14B8A6]
      font-semibold
      text-[#060910]
      transition
      hover:opacity-90
    "
                >
                    Start Test
                </button> */}
            </div>
        );
    }

    // Future state
    return (
        <div className="rounded-2xl border border-white/5 bg-[#0C1120] p-6 h-[260px]">
            <h2 className="text-xl font-bold text-white">
                Continue Learning
            </h2>

            <div className="mt-8">
                <p className="text-white text-lg font-semibold">
                    {continueLearning.subject}
                </p>

                <p className="text-white/60 mt-1">
                    {continueLearning.chapter}
                </p>

                <div className="mt-6">
                    <div className="h-3 overflow-hidden rounded-full bg-white/10">
                        <div
                            className="h-full rounded-full bg-[#14B8A6]"
                            style={{
                                width: `${continueLearning.progress}%`,
                            }}
                        />
                    </div>

                    <p className="mt-2 text-sm text-white/60">
                        {continueLearning.progress}% completed
                    </p>
                </div>
            </div>
        </div>
    );
}