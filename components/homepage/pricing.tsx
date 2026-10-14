"use client";

import {
  Check,
  Flame,
} from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthSession } from "@/hooks/useAuthSession";

import {
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/homepage/reveal";

type Plan = {
  name: string;
  tagline: string;
  price: string;
  features: string[];
  cta: string;
  featured?: boolean;
  href: string;
  authHref: string;
};

const plans: Plan[] = [
  {
    name: "Free",
    tagline: "Get started with the basics",
    price: "0",
    features: [
      "Access to question bank",
      "Up to 5 tests per month",
      "Basic analytics",
      "Join up to 3 batches",
      "Duel mode (2 per day)",
    ],
    cta: "Get Started",
    href: "/auth/signup",
    authHref: "/student",
  },
  {
    name: "Pro",
    tagline: "For serious learners",
    price: "299",
    features: [
      "Unlimited question bank access",
      "Unlimited tests",
      "Advanced analytics & insights",
      "Unlimited batches",
      "Unlimited duels",
      "Priority support",
      "Custom test creation",
    ],
    cta: "Upgrade to Pro",
    href: "/auth/signup",
    authHref: "/student",
    featured: true,
  },
  {
    name: "Teacher",
    tagline: "For educators & institutions",
    price: "499",
    features: [
      "Everything in Pro",
      "Unlimited batches & students",
      "Test assignment & deadlines",
      "Student performance reports",
      "Question management tools",
      "Batch analytics dashboard",
      "Dedicated support channel",
    ],
    cta: "Start Teaching",
    href: "/auth/signup",
    authHref: "/teacher",
  },
];

export function Pricing() {
  const { isAuthenticated, userRole } = useAuthSession();
  const defaultAuthHref = userRole === "TEACHER" ? "/teacher" : "/student";

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="bg-[#060910] scroll-mt-6"
    >
      <div className="mx-auto w-full max-w-[82rem] px-6 py-24">
        
        {/* HEADER */}
        <Reveal className="text-center">
          <p
            className="
              text-[0.8rem]
              font-semibold
              uppercase
              tracking-[0.24em]
              text-[#00D4C8]
            "
          >
            PRICING
          </p>

          <h2
            id="pricing-heading"
            className="
              mt-4
              text-5xl
              sm:text-7xl
              lg:text-[5.2rem]
              font-[800]
              leading-[0.95]
              text-white
            "
            style={{
              fontFamily: "var(--font-baloo)",
            }}
          >
            Simple, transparent pricing
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[36rem]
              text-[1rem]
              leading-[1.9]
              text-white/55
            "
          >
            Start free. Upgrade whenever you need more.
          </p>
        </Reveal>

        {/* CARDS */}
        <Stagger
          as="ul"
          stagger={0.1}
          className="
            mt-16
            grid
            gap-6
            lg:grid-cols-3
          "
        >
          {plans.map((p) => (
            <StaggerItem
              as="li"
              key={p.name}
              className={`
                relative
                flex
                min-h-[42rem]
                flex-col
                rounded-[2rem]
                border
                px-7
                py-8
                transition-all
                duration-300
                hover:-translate-y-1
                ${
                  p.featured
                    ? `
                      border-[#00D4C8]/25
                      bg-[#00D4C8]/[0.04]
                    `
                    : `
                      border-white/[0.05]
                      bg-[#0B1120]
                    `
                }
              `}
            >
              <PlanBody
                {...p}
                resolvedAuthHref={isAuthenticated ? (p.authHref ?? defaultAuthHref) : p.href}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function PlanBody({
  name,
  tagline,
  price,
  features,
  cta,
  featured,
  resolvedAuthHref,
}: Plan & { resolvedAuthHref: string }) {
  return (
    <>
      {/* POPULAR TAG */}
      {featured && (
        <span
          className="
            absolute
            -top-3
            left-1/2
            inline-flex
            -translate-x-1/2
            items-center
            gap-1.5
            rounded-full
            bg-[#00D4C8]
            px-4
            py-1.5
            text-[0.72rem]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-black
          "
        >
          <Flame
            aria-hidden="true"
            className="size-3.5"
          />

          Most Popular
        </span>
      )}

      {/* HEADER */}
      <header>
        <h3
          className="
            text-[2.8rem]
            font-[800]
            leading-none
            text-white
          "
          style={{
            fontFamily: "var(--font-baloo)",
          }}
        >
          {name}
        </h3>

        <p
          className="
            mt-3
            text-[0.95rem]
            leading-[1.8]
            text-white/50
          "
        >
          {tagline}
        </p>
      </header>

      {/* PRICE */}
      <div className="mt-8 flex items-end gap-2">
        <span
          className="
            text-[5rem]
            font-[800]
            leading-none
            text-white
          "
          style={{
            fontFamily: "var(--font-baloo)",
          }}
        >
          {price}
        </span>

        <span
          className="
            mb-3
            text-sm
            text-white/45
          "
        >
          BDT/month
        </span>
      </div>

      {/* FEATURES */}
      <ul className="mt-8 flex-1 space-y-4">
        {features.map((f) => (
          <li
            key={f}
            className="
              flex
              items-start
              gap-3
            "
          >
            <span
              className="
                mt-[2px]
                flex
                h-5
                w-5
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#00D4C8]/10
              "
            >
              <Check
                aria-hidden="true"
                className="
                  size-3.5
                  text-[#00D4C8]
                "
              />
            </span>

            <span
              className="
                text-[0.92rem]
                leading-[1.7]
                text-white/78
              "
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* BUTTON */}
      <Button
        size="lg"
        variant={featured ? "default" : "outline"}
        asChild
        className={`
          mt-10
          h-14
          w-full
          rounded-full
          text-[1rem]
          font-semibold
          ${
            featured
              ? `
                bg-[#00D4C8]
                text-black
                hover:bg-[#00c4b8]
              `
              : `
                border-white/15
                bg-transparent
                text-white
                hover:bg-white/[0.04]
              `
          }
        `}
      >
        <Link href={resolvedAuthHref}>
          {cta}
        </Link>
      </Button>
    </>
  );
}