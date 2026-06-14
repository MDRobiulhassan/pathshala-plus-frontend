"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

type LinkColumn = {
  title: string;
  links: string[];
};

const columns: LinkColumn[] = [
  {
    title: "Explore",
    links: ["Home", "Batch", "Duel 1v1", "Pricing"],
  },
  {
    title: "Features",
    links: [
      "Practice Tests",
      "Mock Exams",
      "AI Explanations",
      "FAQ",
    ],
  },
  {
    title: "Company",
    links: [
      "About us",
      "Contact",
      "Privacy Policy",
      "Terms & Conditions",
    ],
  },
];

const socials = [
  {
    icon: FaFacebookF,
    label: "Facebook",
    color: "text-[#1877f2]",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    color: "text-[#e1306c]",
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    color: "text-[#0a66c2]",
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
          <p>Practice, test & improve</p>
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
          <Phone className="size-4 text-cyan-400" />
          1-088-Odyssey
        </li>

        <li className="flex items-center gap-3">
          <Mail className="size-4 text-cyan-400" />
          odysseyofficial.dev@gmail.com
        </li>

        <li className="flex items-center gap-3">
          <MapPin className="size-4 text-cyan-400" />
          Chattogram, Bangladesh
        </li>
      </ul>
    </div>
  );
}

function LinkGrid() {
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
                <li key={link}>
                  <a
                    href="#"
                    className="transition-colors duration-200 hover:text-cyan-400"
                  >
                    {link}
                  </a>
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
          {socials.map(({ icon: Icon, label, color }) => (
            <li key={label}>
              <a
                href="#"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full bg-white/95 transition-all duration-200 hover:scale-105 hover:bg-white"
              >
                <Icon className={`size-4 ${color}`} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}