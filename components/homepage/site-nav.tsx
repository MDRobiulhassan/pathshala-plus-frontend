import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "Batch", to: "/" },
  { label: "Duel", to: "/" },
  { label: "Pricing", to: "/" },
] as const;

export function SiteNav() {
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
        <nav
          aria-label="Primary"
          className="hidden md:flex"
        >
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

        {/* RIGHT PROFILE */}
        <button
          type="button"
          aria-label="Account menu"
          className="
            group
            flex
            h-[52px]
            items-center
            gap-2
            rounded-[1rem]
            border
            border-white/[0.06]
            bg-[rgba(21,30,54,0.82)]
            px-3
            backdrop-blur-md
            transition-all
            duration-200
            hover:border-cyan-400/10
          "
        >
          <div
            className="
              relative
              flex
              h-9
              w-9
              items-center
              justify-center
              overflow-hidden
              rounded-full
            "
          >
            <Image
              src="/icons/man.png"
              alt="User"
              width={36}
              height={36}
              className="object-cover"
            />
          </div>

          <ChevronDown
            aria-hidden="true"
            className="
              size-4
              text-cyan-400
              transition-transform
              duration-200
              group-hover:translate-y-[1px]
            "
          />
        </button>
      </div>
    </header>
  );
}