import Image from "next/image";
import { ArrowRight } from "lucide-react";

import {
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/homepage/reveal";

type QuickAction = {
  iconPath: string;
  title: string;
  description: string;
  cta: string;
};

const actions: QuickAction[] = [
  {
    iconPath: "/icons/university.png",
    title: "Practice by Institute",
    description:
      "Filter questions by your university and practice MCQs.",
    cta: "Explore",
  },
  {
    iconPath: "/icons/exam-time.png",
    title: "Full Mock Test",
    description:
      "Simulate real exam conditions with full-length timed tests.",
    cta: "Start Test",
  },
  {
    iconPath: "/icons/data-analytics.png",
    title: "View Progress",
    description:
      "Track your accuracy, time per question, and improvement.",
    cta: "View Stats",
  },
  {
    iconPath: "/icons/competition.png",
    title: "Duels 1v1",
    description:
      "Challenge a friend to a live head-to-head quiz battle.",
    cta: "Find Match",
  },
];

export function QuickActions() {
  return (
    <section
      aria-labelledby="quick-actions-heading"
      className="bg-[#060910]"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-24">
        <Reveal>
          <p
            className="
              text-[0.82rem]
              font-semibold
              uppercase
              tracking-[0.24em]
              text-[#00D4C8]
            "
          >
            Quick Actions
          </p>

          <h2
            id="quick-actions-heading"
            className="
              mt-5
              max-w-[58rem]
              text-5xl
              sm:text-7xl
              lg:text-[5.5rem]
              font-[800]
              leading-[0.96]
              text-white
            "
            style={{
              fontFamily: "var(--font-baloo)",
            }}
          >
            Jump right into{" "}
            <span className="text-[#00D4C8]">
              action
            </span>
          </h2>
        </Reveal>

        <Stagger
          as="ul"
          className="
            mt-14
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {actions.map((a) => (
            <StaggerItem
              as="li"
              key={a.title}
              className="
                flex
                flex-col
                rounded-[1.75rem]
                border
                border-white/[0.05]
                bg-[#0C1120]
                px-6
                py-6
                transition-transform
                duration-300
                ease-out
                hover:-translate-y-1
                lg:min-h-[16rem]
              "
            >
              <ActionBody {...a} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function ActionBody({
  iconPath,
  title,
  description,
  cta,
}: QuickAction) {
  return (
    <>
      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-white/[0.03]
          "
        >
          <Image
            src={iconPath}
            alt={title}
            width={28}
            height={28}
            className="object-contain"
          />
        </div>

        <h3
          className="
            text-[1.05rem]
            font-semibold
            leading-tight
            text-white
          "
        >
          {title}
        </h3>
      </div>

      <p
        className="
          mt-5
          flex-1
          text-[0.92rem]
          leading-[1.8]
          text-white/55
        "
      >
        {description}
      </p>

      <button
        type="button"
        className="
          group
          mt-7
          inline-flex
          w-fit
          items-center
          gap-2
          rounded-full
          bg-[#00D4C8]
          px-5
          py-2.5
          text-sm
          font-semibold
          text-black
          transition-all
          duration-200
          hover:bg-[#00c4b8]
        "
      >
        {cta}

        <ArrowRight
          aria-hidden="true"
          className="
            size-4
            transition-transform
            duration-200
            group-hover:translate-x-0.5
          "
        />
      </button>
    </>
  );
}