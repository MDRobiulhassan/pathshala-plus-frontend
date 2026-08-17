"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfile, type UserProfileResponse } from "@/lib/api";

export const AUTH_SESSION_QUERY_KEY = ["auth", "session"] as const;

export function useAuthSession() {
  const query = useQuery<UserProfileResponse, Error>({
    queryKey: AUTH_SESSION_QUERY_KEY,
    queryFn: getProfile,
    retry: false,
    staleTime: 1000 * 60,
  });

  return {
    profile: query.data ?? null,
    isLoading: query.isLoading,
    isAuthenticated: Boolean(query.data),
    userRole: query.data?.roles?.[0] ?? null,
    error: query.error,
    refetch: query.refetch,
  };
}