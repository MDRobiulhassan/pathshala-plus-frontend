import {
  ArrowRight,
  Brain,
  Sparkles,
} from "lucide-react";

import {
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/homepage/reveal";

type Step = {
  num: number;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    num: 1,
    title: "Select an Institute by Year",
    description:
      "Choose your university, exam type, and year. Pathshala curates the right question set instantly.",
  },
  {
    num: 2,
    title: "Solve MCQs or Take Tests",
    description:
      "Practice questions at your pace or take a full timed mock exam. Each session sharpens speed and accuracy.",
  },
  {
    num: 3,
    title: "Review & Learn",
    description:
      "Study AI explanations after every session. Turn mistakes into long-term understanding.",
  },
];

type Option = {
  letter: "A" | "B" | "C" | "D";
  text: string;
  state: "wrong" | "correct" | "idle";
};

const options: Option[] = [
  {
    letter: "A",
    text: "Mitochondria",
    state: "wrong",
  },
  {
    letter: "B",
    text: "Ribosome ✓",
    state: "correct",
  },
  {
    letter: "C",
    text: "Golgi Apparatus",
    state: "idle",
  },
  {
    letter: "D",
    text: "Lysosome",
    state: "idle",
  },
];

export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="bg-[#060910]"
    >
      <div className="mx-auto w-full max-w-[82rem] px-6 py-24">
        
        {/* HEADER */}
        <Reveal>
          <p
            className="
              text-[0.8rem]
              font-semibold
              uppercase
              tracking-[0.24em]
              text-[#00D4C8]
            "
          >
            HOW IT WORKS
          </p>

          <h2
            id="how-it-works-heading"
            className="
              mt-4
              max-w-[52rem]
              text-5xl
              sm:text-7xl
              lg:text-[5.4rem]
              font-[800]
              leading-[0.95]
              text-white
            "
            style={{
              fontFamily: "var(--font-baloo)",
            }}
          >
            Three Steps to{" "}
            <span className="text-[#00D4C8]">
              Mastery
            </span>
          </h2>
        </Reveal>

        {/* CONTENT */}
        <div
          className="
            mt-10
            grid
            lg:items-stretch
            items-start
            gap-7
            lg:grid-cols-[1.15fr_0.85fr]
          "
        >
          
          {/* LEFT SIDE */}
          <Stagger
            as="ol"
            className="flex flex-col gap-5 lg:h-full lg:justify-between lg:gap-0"
          >
            {steps.map((s) => (
              <StaggerItem
                as="li"
                key={s.num}
                className="
                  group
                  flex
                  min-h-[6.2rem]
                  items-start
                  gap-5
                  rounded-[1.75rem]
                  border
                  border-white/[0.05]
                  bg-[#0B1120]
                  px-5
                  py-4
                  transition-all
                  duration-300
                  hover:border-[#00D4C8]/10
                "
              >
                <StepBody {...s} />
              </StaggerItem>
            ))}
          </Stagger>

          {/* RIGHT SIDE */}
          <Reveal delay={0.08}>
            <SampleQuestion />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StepBody({
  num,
  title,
  description,
}: Step) {
  return (
    <>
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#00D4C8]/10
          text-sm
          font-bold
          text-[#00D4C8]
          ring-1
          ring-[#00D4C8]/20
        "
      >
        {num}
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <h3
            className="
              text-[1.05rem]
              font-semibold
              leading-none
              text-white
            "
          >
            {title}
          </h3>

          <ArrowRight
            aria-hidden="true"
            className="
              mt-[1px]
              size-5
              shrink-0
              text-[#00D4C8]
              transition-transform
              duration-200
              group-hover:translate-x-1
            "
          />
        </div>

        <p
          className="
            mt-3
            max-w-[34rem]
            text-[0.88rem]
            leading-[1.75]
            text-white/48
          "
        >
          {description}
        </p>
      </div>
    </>
  );
}

function SampleQuestion() {
  return (
    <article
      className="
        h-fit
        rounded-[1.8rem]
        border
        border-white/[0.05]
        bg-[#0B1120]
        px-5
        py-5
      "
    >
      {/* TOP */}
      <header
        className="
          flex
          items-center
          justify-between
          border-b
          border-white/[0.05]
          pb-4
        "
      >
        <p
          className="
            text-[0.72rem]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-[#00D4C8]
          "
        >
          SAMPLE QUESTION · BIOLOGY
        </p>

        <span
          className="
            rounded-full
            bg-[#00D4C8]/10
            px-2
            py-1
            text-[0.65rem]
            font-medium
            text-[#00D4C8]
          "
        >
          02:03
        </span>
      </header>

      {/* QUESTION */}
      <p
        className="
          mt-6
          text-[0.94rem]
          leading-[1.9]
          text-white/82
        "
      >
        Which organelle is responsible for synthesizing proteins
        in a eukaryotic cell and is often found attached to the
        rough endoplasmic reticulum?
      </p>

      {/* OPTIONS */}
      <ul className="mt-5 space-y-3">
        {options.map((o) => (
          <OptionRow key={o.letter} {...o} />
        ))}
      </ul>

      {/* AI */}
      <aside
        className="
          mt-5
          rounded-[1.25rem]
          border
          border-[#00D4C8]/25
          bg-[#00D4C8]/[0.05]
          px-4
          py-4
        "
      >
        <p
          className="
            flex
            items-center
            gap-2
            text-[0.7rem]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#00D4C8]
          "
        >
          <Brain className="size-3.5" />
          AI EXPLANATION
        </p>

        <p
          className="
            mt-2
            text-[0.82rem]
            leading-[1.7]
            text-white/58
          "
        >
          Ribosomes are the sites of protein synthesis in all
          cells. In eukaryotes, ribosomes attach to the rough ER,
          which processes and transports synthesized proteins
          throughout the cell.
        </p>
      </aside>
    </article>
  );
}

function OptionRow({
  letter,
  text,
  state,
}: Option) {
  const stateClass =
    state === "wrong"
      ? "border-rose-400/20 bg-rose-400/[0.05]"
      : state === "correct"
      ? "border-[#00D4C8]/30 bg-[#00D4C8]/[0.06]"
      : "border-white/[0.05] bg-white/[0.02]";

  const badgeClass =
    state === "wrong"
      ? "bg-rose-400/15 text-rose-300"
      : state === "correct"
      ? "bg-[#00D4C8] text-black"
      : "bg-white/[0.06] text-white/55";

  return (
    <li
      className={`
        flex
        items-center
        gap-3
        rounded-[1rem]
        border
        px-4
        py-3
        transition-colors
        ${stateClass}
      `}
    >
      <span
        className={`
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          text-xs
          font-bold
          ${badgeClass}
        `}
      >
        {letter}
      </span>

      <span className="text-[0.88rem] text-white/80">
        {text}
      </span>
    </li>
  );
}