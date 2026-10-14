"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "Batch", to: "/#features" },
  { label: "Duel", to: "/#features" },
  { label: "Pricing", to: "/#pricing" },
] as const;

export function SiteNavBeforeLogin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();


  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    to: string,
    onClose?: () => void,
  ) {
    onClose?.();
    if (!to.startsWith("/#")) return; 
    const hash = to.slice(1); 
    if (pathname === "/") {
      e.preventDefault();
      const target = document.querySelector(hash);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
     
      e.preventDefault();
      router.push(to);
    }
  }

  return (
    <header className="relative z-50 w-full px-6 pt-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        
        {/* LEFT LOGO */}
        <div className="flex items-center justify-start">
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
        </div>

        {/* CENTER NAV */}
        <nav aria-label="Primary" className="hidden md:flex items-center justify-center">
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
                onClick={(e) => handleNavClick(e, l.to)}
                className="
                  rounded-[0.8rem]
                  px-5
                  lg:px-8
                  xl:px-10
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
        <div className="flex items-center justify-end gap-3">
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="
                rounded-full
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white/80
                hover:text-white
                transition-colors
              "
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="
                rounded-full
                bg-[#00D4C8]
                px-5
                py-2.5
                text-sm
                font-semibold
                text-black
                hover:bg-[#00c4b8]
                transition-colors
              "
            >
              Sign up
            </Link>
          </div>

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

      {/* MOBILE DROPDOWN */}
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
                onClick={(e) => handleNavClick(e, l.to, () => setMobileMenuOpen(false))}
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
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/[0.08]
                  py-3
                  text-base
                  font-semibold
                  text-white
                  hover:bg-white/[0.04]
                  transition-colors
                "
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#00D4C8]
                  py-3
                  text-base
                  font-semibold
                  text-black
                  hover:bg-[#00c4b8]
                  transition-colors
                "
              >
                Sign up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
