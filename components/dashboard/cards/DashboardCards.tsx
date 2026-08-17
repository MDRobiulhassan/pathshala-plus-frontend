"use client";

import DashboardCard from "./DashboardCard";
import type { DashboardResponse } from "@/lib/api";

type Props = {
    dashboard: DashboardResponse;
};

export default function DashboardCards({
    dashboard,
}: Props) {
    const stats =
        dashboard.learningProgress;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            <DashboardCard
                title="Tests Taken"
                value={stats.totalTestsTaken}
            />

            <DashboardCard
                title="Average Score"
                value={`${stats.averageScore}%`}
            />

            <DashboardCard
                title="Accuracy"
                value={`${stats.accuracyPercentage}%`}
            />

            <DashboardCard
                title="Study Streak"
                value={stats.studyStreak}
            />
        </div>
    );
}