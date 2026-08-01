"use client";

import { useEffect, useState } from "react";
import { getStudentDashboard } from "@/lib/api";

export type DashboardResponse = {
    continueLearning: any;
    learningProgress: {
        totalTestsTaken: number;
        averageScore: number;
        highestScore: number;
        questionsSolved: number;
        accuracyPercentage: number;
        studyStreak: number;
    };
    recentTests: any[];
};

export function useDashboard() {
    const [dashboard, setDashboard] =
        useState<DashboardResponse | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const data =
                    await getStudentDashboard();

                setDashboard(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    return {
        dashboard,
        loading,
    };
}