"use client";

import PerformanceChart from "./PerformanceChart";

type Props = {
    recentTests: {
        attemptId: number;
        score: number;
    }[];
};

export default function PerformanceCard({
    recentTests,
}: Props) {
    return (
        <section className="rounded-3xl border border-white/5 bg-[#0C1120] p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                    Performance
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                    Last {recentTests.length} attempts
                </p>
            </div>

            <PerformanceChart tests={recentTests} />
        </section>
    );
}