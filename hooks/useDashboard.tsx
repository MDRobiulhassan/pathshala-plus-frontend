"use client";

import { useQuery } from "@tanstack/react-query";
import { getStudentDashboard, type DashboardResponse } from "@/lib/api";

export function useDashboard() {
    const { data, isLoading, error } = useQuery<DashboardResponse, Error>({
        queryKey: ["student-dashboard"],
        queryFn: getStudentDashboard,
        retry: 1,
    });

    return {
        dashboard: data ?? null,
        loading: isLoading,
        error,
    };
}