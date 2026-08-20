"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import UserDropdown from "@/components/topbar/UserDropdown";

type Props = {
  userRole: string | null;
  onLogout: () => void;
};

export function SiteNavAfterLogin({ userRole, onLogout }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dashboardPath = userRole === "TEACHER" ? "/teacher" : "/student";

  const links = [
    { label: "Home", to: "/" },
    { label: "Batch", to: "/" },
    { label: "Duel", to: "/" },
    { label: "Pricing", to: "/" },
  ] as const;

  return (
    <header className="relative z-50 w-full px-6 pt-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* LEFT LOGO */}
        <Link
          href="/"
          aria-label="Home"
          className="flex h-[52px] w-[52px] shrink-0 items-center justify-center"
        >
          <Image
            src="/icons/Icon.png"
            alt="Pathshala Logo"
            width={42}
            height={42}
            className="object-contain"
            priority
          />
        </Link>

        {/* CENTER NAV */}
        <nav aria-label="Primary" className="hidden md:flex">
          <div
            className="
              flex
              items-center
              gap-1
              rounded-[1rem]
              border
              border-white/[0.06]
              bg-[rgba(21,30,54,0.82)]
              px-2
              py-1.5
              backdrop-blur-md
            "
          >
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.to}
                className="
                  rounded-[0.8rem]
                  px-10
                  py-3
                  text-[1rem]
                  font-[700]
                  leading-none
                  text-white/88
                  transition-all
                  duration-200
                  hover:bg-white/[0.03]
                  hover:text-white
                "
                style={{
                  fontFamily: "var(--font-baloo)",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-3">
          <UserDropdown />

          {/* MOBILE MENU TRIGGER */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="
              flex
              h-[52px]
              w-[52px]
              shrink-0
              items-center
              justify-center
              rounded-[1rem]
              border
              border-white/[0.06]
              bg-[rgba(21,30,54,0.82)]
              text-white
              backdrop-blur-md
              hover:border-cyan-400/20
              md:hidden
              cursor-pointer
            "
          >
            {mobileMenuOpen ? (
              <X className="size-6 text-[#00D4C8]" />
            ) : (
              <Menu className="size-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN NAVIGATION */}
      {mobileMenuOpen && (
        <div
          className="
            absolute
            left-6
            right-6
            mt-3
            origin-top
            rounded-2xl
            border
            border-white/[0.08]
            bg-[#0A1024]
            p-5
            shadow-2xl
            backdrop-blur-xl
            z-40
            md:hidden
            animate-in
            fade-in
            slide-in-from-top-4
            duration-200
          "
        >
          <nav className="flex flex-col gap-2">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.to}
                onClick={() => setMobileMenuOpen(false)}
                className="
                  w-full
                  rounded-xl
                  px-4
                  py-3
                  text-base
                  font-semibold
                  text-white/88
                  hover:bg-white/[0.04]
                  hover:text-white
                  transition-colors
                "
              >
                {l.label}
              </Link>
            ))}

            <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-col gap-2">
              <Link
                href={dashboardPath}
                onClick={() => setMobileMenuOpen(false)}
                className="
                  flex
                  w-full
                  items-center
                  gap-2.5
                  rounded-xl
                  px-4
                  py-3
                  text-base
                  font-semibold
                  text-white/88
                  hover:bg-white/[0.04]
                  hover:text-white
                  transition-colors
                "
              >
                <LayoutDashboard className="size-5 text-cyan-400" />
                Dashboard
              </Link>
              <button
                type="button"
                onClick={onLogout}
                className="
                  flex
                  w-full
                  items-center
                  gap-2.5
                  rounded-xl
                  px-4
                  py-3
                  text-base
                  font-semibold
                  text-red-400
                  hover:bg-red-500/10
                  hover:text-red-300
                  transition-colors
                  text-left
                  cursor-pointer
                "
              >
                <LogOut className="size-5" />
                Log out
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
