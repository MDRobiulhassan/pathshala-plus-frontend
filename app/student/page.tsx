"use client";

import DashboardCards from "@/components/dashboard/cards/DashboardCards";
import ContinueLearningCard from "@/components/dashboard/sections/ContinueLearningCard";
import LearningProgressCard from "@/components/dashboard/sections/LearningProgressCard";
import PerformanceCard from "@/components/dashboard/sections/PerformanceCard";
import AccuracyCard from "@/components/dashboard/sections/AccuracyCard";
import RecentTestsCard from "@/components/dashboard/sections/RecentTestsCard";

import { useDashboard } from "@/hooks/useDashboard";
import { useUserTestAttempts } from "@/hooks/useUserTestAttempts";
import Loader from "@/components/ui/Loader";

export default function StudentPage() {
  const { dashboard, loading: dashboardLoading, error: dashboardError } = useDashboard();
  const { attempts: userAttempts, loading: attemptsLoading } = useUserTestAttempts();

  if (dashboardLoading || attemptsLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (dashboardError || !dashboard) {
    return (
      <div className="flex justify-center py-20 text-red-400">
        {dashboardError?.message ?? "Failed to load dashboard."}
      </div>
    );
  }

  // Combine user attempts and recent tests to detect both Timed Test and Practice sessions
  const activeTestsList = [
    ...(userAttempts || []),
    ...(dashboard.recentTests || []),
  ];

  return (
    <div className="space-y-6">
      <DashboardCards dashboard={dashboard} />

      <div className="grid gap-6 xl:grid-cols-2">
        <ContinueLearningCard
          continueLearning={dashboard.continueLearning}
          activeTests={activeTestsList}
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