"use client";

import { useRouter } from "next/navigation";
import { SiteNavBeforeLogin } from "./site-nav-before";
import { SiteNavAfterLogin } from "./site-nav-after";
import { logoutUser } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { AUTH_SESSION_QUERY_KEY, useAuthSession } from "@/hooks/useAuthSession";

export function SiteNav() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated, userRole, isLoading } = useAuthSession();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
    } finally {
      queryClient.removeQueries({ queryKey: AUTH_SESSION_QUERY_KEY });
      router.push("/");
    }
  };

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <SiteNavAfterLogin userRole={userRole} onLogout={handleLogout} />;
  }

  return <SiteNavBeforeLogin />;
}