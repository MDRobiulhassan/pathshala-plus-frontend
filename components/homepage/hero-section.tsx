"use client";

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  GraduationCap,
} from "lucide-react";

import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";

type Stat = {
  value: string;
  label: string;
};

type DashboardStat = {
  value: string;
  label: string;
};

type ProgressItem = {
  label: string;
  percent: number;
};

type RecentTest = {
  title: string;
  score: string;
};

const stats: Stat[] = [
  { value: "500+", label: "Charting Questions" },
  { value: "15K+", label: "Happy Students" },
  { value: "90%", label: "Satisfaction Rate" },
];

const dashboardStats: DashboardStat[] = [
  { value: "324", label: "MCQs Done" },
  { value: "12", label: "Tests Taken" },
  { value: "8", label: "Tests Passed" },
];

const progressItems: ProgressItem[] = [
  { label: "Weekly Goal", percent: 68 },
  { label: "Biology Coverage", percent: 45 },
];

const recentTests: RecentTest[] = [
  { title: "MBBS Mock Test", score: "82/100" },
  { title: "BCS Prelim Batch", score: "67/100" },
  { title: "Physics Chapter Quiz", score: "91/100" },
];

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="
  mx-auto
  grid
  min-h-[calc(100svh-88px)]
  w-full
  max-w-7xl
  items-center
  gap-12
  px-6
  pb-10
  pt-10
  lg:grid-cols-[42rem_33.5rem]
"
    >
      <HeroCopy />
      <DashboardCard />
    </section>
  );
}

function HeroCopy() {
  const reduce = useReducedMotion();

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
      delay,
    },
  });

  return (
    <div className="flex flex-col">
      <motion.h1
        id="hero-heading"
        {...fade(0)}
        className="
          max-w-[42.5rem]
          text-[6.25rem]
          font-[800]
          leading-[0.96]
          text-white
        "
        style={{
          fontFamily: "var(--font-baloo)",
        }}
      >
        Master Exams
        <br />
        with{" "}
        <span className="text-[#00D4C8]">
          Smart
        </span>
        <br />
        Practice
      </motion.h1>

      <motion.p
        {...fade(0.1)}
        className="
          mt-7
          max-w-[38rem]
          text-[1.05rem]
          leading-[1.8]
          text-white/68
        "
      >
        Solve MCQs, take timed tests, and get instant AI explanations
        for university, job prep and competitive exams
      </motion.p>

      <motion.div
        {...fade(0.2)}
        className="mt-8 flex flex-wrap items-center gap-4"
      >
        <Button
          size="lg"
          className="
            h-14
            rounded-full
            bg-[#00D4C8]
            px-8
            text-[1rem]
            font-semibold
            text-black
            hover:bg-[#00c4b8]
          "
        >
          Start Practicing
          <ArrowRight className="ml-1 size-5" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="
            h-14
            rounded-full
            border-white/30
            bg-transparent
            px-8
            text-[1rem]
            text-white
            hover:bg-white/5
          "
        >
          Take a Free Test
        </Button>
      </motion.div>

      <motion.dl
        {...fade(0.3)}
        className="
          mt-10
          grid
          grid-cols-3
          gap-6
          border-t
          border-white/[0.08]
          pt-7
        "
      >
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="sr-only">{s.label}</dt>

            <dd
              className="
                text-[2.35rem]
                font-[800]
                leading-none
                text-white
              "
              style={{
                fontFamily: "var(--font-baloo)",
              }}
            >
              {s.value}
            </dd>

            <p className="mt-2 text-sm text-white/55">
              {s.label}
            </p>
          </div>
        ))}
      </motion.dl>
    </div>
  );
}

function DashboardCard() {
  const reduce = useReducedMotion();

  return (
    <motion.aside
      initial={{ opacity: 0, x: reduce ? 0 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: 0.15,
      }}
      aria-label="User dashboard preview"
      className="
        mt-[5.5rem]
        w-full
        rounded-[2rem]
        border
        border-white/[0.05]
        bg-[rgba(8,15,32,0.92)]
        px-6
        py-5
        min-h-[24.5rem]
      "
    >
      <header>
        <h2 className="text-[1.15rem] font-semibold text-white/88">
          Robiul&apos;s Dashboard
        </h2>
      </header>

      <ul className="mt-6 grid grid-cols-3 gap-3">
        {dashboardStats.map((s) => (
          <li
            key={s.label}
            className="
              rounded-[1rem]
              border
              border-white/[0.05]
              bg-[#121B33]
              px-4
              py-4
              text-center
            "
          >
            <p className="text-[2rem] font-semibold text-[#00D4C8]">
              {s.value}
            </p>

            <p className="mt-1 text-[0.82rem] text-white/60">
              {s.label}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-7 space-y-5">
        {progressItems.map((p) => (
          <ProgressBar key={p.label} {...p} />
        ))}
      </div>

      <section
        aria-labelledby="recent-tests"
        className="mt-8"
      >
        <h3
          id="recent-tests"
          className="
            text-[0.82rem]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-[#00D4C8]
          "
        >
          Recent Tests
        </h3>

        <ul className="mt-5 space-y-4">
          {recentTests.map((t, i) => (
            <li
              key={t.title}
              className="
                flex
                items-center
                justify-between
                border-b
                border-white/[0.04]
                pb-3
                text-sm
                last:border-none
              "
            >
              <span className="flex items-center gap-2 text-white/78">
                <TestIcon index={i} />
                {t.title}
              </span>

              <span className="font-medium text-[#00D4C8]">
                {t.score}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </motion.aside>
  );
}

function ProgressBar({ label, percent }: ProgressItem) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/75">
          {label}
        </span>

        <span className="font-medium text-[#00D4C8]">
          {percent}%
        </span>
      </div>

      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="
          mt-2
          h-[0.32rem]
          overflow-hidden
          rounded-full
          bg-white/[0.06]
        "
      >
        <div
          className="h-full rounded-full bg-[#00D4C8]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function TestIcon({ index }: { index: number }) {
  const Icon =
    [GraduationCap, FileText, BookOpen, CheckCircle2][index % 4];

  return (
    <Icon
      aria-hidden="true"
      className="size-4 text-[#00D4C8]"
    />
  );
}