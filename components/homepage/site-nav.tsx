"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteNavBeforeLogin } from "./site-nav-before";
import { SiteNavAfterLogin } from "./site-nav-after";

export function SiteNav() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Check login state on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole(null);
    router.push("/");
  };

  if (isLoggedIn) {
    return <SiteNavAfterLogin userRole={userRole} onLogout={handleLogout} />;
  }

  return <SiteNavBeforeLogin />;
}