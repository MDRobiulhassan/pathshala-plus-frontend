"use client";

import DashboardCards from "@/components/dashboard/cards/DashboardCards";
import ContinueLearningCard from "@/components/dashboard/sections/ContinueLearningCard";
import LearningProgressCard from "@/components/dashboard/sections/LearningProgressCard";
import PerformanceCard from "@/components/dashboard/sections/PerformanceCard";
import AccuracyCard from "@/components/dashboard/sections/AccuracyCard";
import RecentTestsCard from "@/components/dashboard/sections/RecentTestsCard";

import { useDashboard } from "@/hooks/useDashboard";
import Loader from "@/components/ui/Loader";

export default function StudentPage() {
  const { dashboard, loading } = useDashboard();

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex justify-center py-20 text-red-400">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardCards dashboard={dashboard} />

      <div className="grid gap-6 xl:grid-cols-2">
        <ContinueLearningCard
          continueLearning={dashboard.continueLearning}
        />

        <LearningProgressCard
          learningProgress={dashboard.learningProgress}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PerformanceCard
          recentTests={dashboard.recentTests}
        />

        <AccuracyCard
          accuracy={dashboard.learningProgress.accuracyPercentage}
          questionsSolved={dashboard.learningProgress.questionsSolved}
        />
      </div>

      <RecentTestsCard
        recentTests={dashboard.recentTests}
      />
    </div>
  );
}