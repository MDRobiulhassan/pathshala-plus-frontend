"use client";

type Props = {
    accuracy: number;
    questionsSolved: number;
};

export default function AccuracyCard({
    accuracy,
    questionsSolved,
}: Props) {
    const percentage = Math.max(0, Math.min(100, accuracy));

    const getStatus = () => {
        if (percentage >= 80) return "Excellent";
        if (percentage >= 60) return "Good";
        if (percentage >= 40) return "Improving";
        return "Needs Practice";
    };

    return (
        <section className="rounded-3xl border border-white/5 bg-[#0C1120] p-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-semibold text-white">
                    Accuracy
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                    Overall question accuracy
                </p>
            </div>

            {/* Percentage */}
            <div className="mt-12 text-center">
                <h1 className="text-6xl font-bold text-white">
                    {percentage.toFixed(1)}%
                </h1>

                <p className="mt-3 text-lg font-medium text-[#14B8A6]">
                    {getStatus()}
                </p>
            </div>

            {/* Scale */}
            <div className="mt-14">
                <div className="relative">
                    <div className="h-2 rounded-full bg-slate-700" />

                    <div
                        className="absolute -top-2 -translate-x-1/2 transition-all duration-500"
                        style={{
                            left: `${percentage}%`,
                        }}
                    >
                        <div className="text-xl text-[#14B8A6]">
                            ▲
                        </div>
                    </div>
                </div>

                <div className="mt-3 flex justify-between text-sm text-slate-400">
                    <span>0%</span>
                    <span>100%</span>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-10 flex items-center justify-between rounded-2xl bg-white/5 px-5 py-4">
                <div>
                    <p className="text-sm text-slate-400">
                        Questions Solved
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-white">
                        {questionsSolved}
                    </p>
                </div>

                <div className="rounded-full bg-[#14B8A6]/10 px-4 py-2 text-sm font-medium text-[#14B8A6]">
                    {getStatus()}
                </div>
            </div>
        </section>
    );
}