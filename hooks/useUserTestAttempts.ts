"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserTestAttempts, type UserAttemptItem } from "@/lib/api";

export function useUserTestAttempts() {
    const { data, isLoading, error, refetch } = useQuery<UserAttemptItem[], Error>({
        queryKey: ["user-test-attempts"],
        queryFn: getUserTestAttempts,
        retry: 1,
    });

    return {
        attempts: data ?? [],
        loading: isLoading,
        error,
        refetch,
    };
}
