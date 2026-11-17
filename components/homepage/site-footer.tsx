"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { useAuthSession } from "@/hooks/useAuthSession";

type FooterLink = {
  label: string;
  publicHref: string;
  studentHref?: string;
  teacherHref?: string;
};

type LinkColumn = {
  title: string;
  links: FooterLink[];
};

const columns: LinkColumn[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", publicHref: "/", studentHref: "/student", teacherHref: "/teacher" },
      { label: "Batch", publicHref: "/#features", studentHref: "/student/batch", teacherHref: "/teacher/batch" },
      { label: "Duel 1v1", publicHref: "/#features", studentHref: "/student/duel" },
      { label: "Pricing", publicHref: "/#pricing" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Practice Tests", publicHref: "/#features", studentHref: "/student/question-bank" },
      { label: "Mock Exams", publicHref: "/#features", studentHref: "/student/tests" },
      { label: "AI Explanations", publicHref: "/#features", studentHref: "/student/ai" },
      { label: "FAQ", publicHref: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", publicHref: "/#about" },
      { label: "Contact", publicHref: "/#contact" },
      { label: "Privacy Policy", publicHref: "/privacy-policy" },
      { label: "Terms & Conditions", publicHref: "/terms" },
    ],
  },
];

const socials = [
  {
    iconPath: "/icons/facebook.png",
    label: "Facebook",
    href: "https://facebook.com",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    color: "text-[#e1306c]",
    href: "https://instagram.com",
  },
  {
    iconPath: "/icons/linkedin.png",
    label: "LinkedIn",
    href: "https://linkedin.com",
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#060910] px-4 pb-6 pt-16 sm:px-6 lg:px-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/[0.06] bg-[#08101F]">
        <div className="grid lg:grid-cols-[420px_1fr]">
          <BrandColumn />
          <LinkGrid />
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] px-8 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© Odyssey. All rights Reserved</p>
          <p>Practice, test &amp; improve</p>
        </div>
      </div>
    </footer>
  );
}

function BrandColumn() {
  return (
    <div className="bg-[#0C1020] px-8 py-10 lg:px-10">
      <p className="text-4xl font-semibold tracking-tight text-white">
        Pathshala
      </p>

      <p className="mt-6 text-2xl font-medium leading-tight text-white">
        Practice Smarter.
        <br />
        Score <span className="text-cyan-400">Higher.</span>
      </p>

      <ul className="mt-8 space-y-4 text-sm text-white/65">
        <li className="flex items-center gap-3">
          <div className="flex h-5 w-5 items-center justify-center shrink-0">
            <Image
              src="/icons/phone.png"
              alt="Phone"
              width={16}
              height={16}
              className="object-contain"
            />
          </div>
          +880-1568-341706
        </li>

        <li className="flex items-center gap-3">
          <div className="flex h-5 w-5 items-center justify-center shrink-0">
            <Image
              src="/icons/mail.png"
              alt="Email"
              width={16}
              height={16}
              className="object-contain"
            />
          </div>
          odysseyofficial.dev@gmail.com
        </li>

        <li className="flex items-center gap-3">
          <MapPin className="size-4 text-cyan-400 shrink-0" />
          Chattogram, Bangladesh
        </li>
      </ul>
    </div>
  );
}

function LinkGrid() {
  const { isAuthenticated, userRole } = useAuthSession();
  const pathname = usePathname();
  const router = useRouter();

  function resolveHref(link: FooterLink): string {
    if (!isAuthenticated) return link.publicHref;
    if (userRole === "TEACHER" && link.teacherHref) return link.teacherHref;
    if (link.studentHref) return link.studentHref;
    return link.publicHref;
  }

  function handleClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    if (!href.startsWith("/#")) return;
    const hash = href.slice(1);
    if (pathname === "/") {
      e.preventDefault();
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      e.preventDefault();
      router.push(href);
    }
  }

  return (
    <div className="bg-[#08101F] px-8 py-10 lg:px-10">
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3 className="text-sm font-semibold text-white">
              {column.title}
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-white/60">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={resolveHref(link)}
                    onClick={(e) => handleClick(e, resolveHref(link))}
                    className="transition-colors duration-200 hover:text-cyan-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-6">
        <p className="text-sm font-medium text-white">
          Follow us on:
        </p>

        <ul className="flex items-center gap-3">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex size-9 items-center justify-center rounded-full bg-white/95 transition-all duration-200 hover:scale-105 hover:bg-white overflow-hidden"
              >
                {social.iconPath ? (
                  <Image
                    src={social.iconPath}
                    alt={social.label}
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                ) : social.icon ? (
                  <social.icon className={`size-4 ${social.color}`} />
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
