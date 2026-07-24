"use client";

type RecentTest = {
    attemptId: number;
    testId: number;
    testName: string;
    score: number;
    passed: boolean;
    finishedAt: string;
};

type Props = {
    recentTests: RecentTest[];
};

export default function RecentTestsCard({
    recentTests,
}: Props) {
    return (
        <section className="rounded-3xl border border-white/5 bg-[#0C1120] p-6">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-white">
                        Recent Tests
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                        Your latest test attempts
                    </p>
                </div>

                <span className="rounded-full bg-[#14B8A6]/10 px-3 py-1 text-sm font-medium text-[#14B8A6]">
                    {recentTests.length} Tests
                </span>
            </div>

            {recentTests.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 py-12 text-center">
                    <p className="text-lg font-medium text-white">
                        No Recent Tests
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                        Complete a test to see your history here.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {recentTests.map((test) => (
                        <div
                            key={test.attemptId}
                            className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition-colors duration-200 hover:border-[#14B8A6]/30 hover:bg-white/[0.05]"
                        >
                            {/* Left */}
                            <div className="min-w-0">
                                <h3 className="truncate text-base font-semibold text-white">
                                    {test.testName}
                                </h3>

                                <p className="mt-1 text-sm text-slate-400">
                                    {new Date(test.finishedAt).toLocaleDateString(
                                        "en-US",
                                        {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}
                                </p>
                            </div>

                            {/* Right */}
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-xs uppercase tracking-wide text-slate-500">
                                        Score
                                    </p>

                                    <p className="text-lg font-bold text-white">
                                        {test.score}
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${test.passed
                                            ? "bg-emerald-500/10 text-emerald-400"
                                            : "bg-red-500/10 text-red-400"
                                        }`}
                                >
                                    {test.passed ? "Passed" : "Failed"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}