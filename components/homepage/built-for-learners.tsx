import {
  ArrowRight,
  GraduationCap,
  Users,
  FlaskConical,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/homepage/reveal";

type Audience = {
  icon: typeof GraduationCap;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
};

const audiences: Audience[] = [
  {
    icon: Users,
    title: "Admission Students",
    description:
      "MBBS, BBA, engineering, or any competitive university admission test.",
    iconBg: "bg-[rgba(168,85,247,0.15)]",
    iconColor: "text-[#a855f7]",
  },
  {
    icon: GraduationCap,
    title: "Teachers & Educators",
    description:
      "Create assignments, track performance, and guide learners effectively.",
    iconBg: "bg-[rgba(20,184,166,0.15)]",
    iconColor: "text-[#00D4C8]",
  },
  {
    icon: FlaskConical,
    title: "CS / Science Students",
    description:
      "Subject-specific MCQs for university exams, job interviews.",
    iconBg: "bg-[rgba(59,130,246,0.15)]",
    iconColor: "text-[#3b82f6]",
  },
];

export function BuiltForLearners() {
  return (
    <section
      aria-labelledby="built-for-heading"
      className="bg-[#0C1020]"
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
            WHO IT&apos;S FOR
          </p>

          <h2
            id="built-for-heading"
            className="
              mt-4
              max-w-[54rem]
              text-[5.4rem]
              font-[800]
              leading-[0.95]
              text-white
            "
            style={{
              fontFamily: "var(--font-baloo)",
            }}
          >
            Built for Every{" "}
            <span className="text-[#00D4C8]">
              Learner
            </span>
          </h2>
        </Reveal>

        {/* CONTENT */}
        <div
          className="
            mt-12
            grid
            items-start
            gap-7
            lg:grid-cols-[1fr_0.95fr]
          "
        >
          
          {/* LEFT */}
          <Stagger
            as="ul"
            className="space-y-5"
          >
            {audiences.map((a) => (
              <StaggerItem
                as="li"
                key={a.title}
                className="
                  flex
                  min-h-[7rem]
                  items-start
                  gap-5
                  rounded-[1.75rem]
                  border
                  border-white/[0.05]
                  bg-[#0B1120]
                  px-5
                  py-5
                  transition-all
                  duration-300
                  hover:border-[#00D4C8]/10
                "
              >
                <AudienceBody {...a} />
              </StaggerItem>
            ))}
          </Stagger>

          {/* RIGHT */}
          <Reveal delay={0.08}>
            <CtaCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AudienceBody({
  icon: Icon,
  title,
  description,
  iconBg,
  iconColor,
}: Audience) {
  return (
    <>
      <span
        aria-hidden="true"
        className={`
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-[1rem]
          ${iconBg}
        `}
      >
        <Icon className={`size-5 ${iconColor}`} />
      </span>

      <div className="flex-1">
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

        <p
          className="
            mt-3
            max-w-[32rem]
            text-[0.9rem]
            leading-[1.8]
            text-white/48
          "
        >
          {description}
        </p>
      </div>
    </>
  );
}

function CtaCard() {
  return (
    <aside
      aria-label="Call to action"
      className="
        relative
        overflow-hidden
        rounded-[2rem]
        border
        border-white/[0.05]
        bg-[#0B1120]
        px-7
        py-8
      "
    >
      {/* GLOW */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-[18rem]
          w-[18rem]
          rounded-full
          bg-[#00D4C8]/10
          blur-3xl
        "
      />

      <div className="relative z-10">
        
        {/* TAG */}
        <span
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-[#00D4C8]/20
            bg-[#00D4C8]/5
            px-4
            py-1.5
            text-[0.72rem]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#00D4C8]
          "
        >
          READY TO START?
        </span>

        {/* TITLE */}
        <h3
          className="
            mt-6
            text-[3.5rem]
            font-[800]
            leading-[0.95]
            text-white
          "
          style={{
            fontFamily: "var(--font-baloo)",
          }}
        >
          Be Ready for
          <br />
          Your Next Exam
        </h3>

        {/* DESCRIPTION */}
        <p
          className="
            mt-5
            max-w-[30rem]
            text-[0.96rem]
            leading-[1.9]
            text-white/58
          "
        >
          Join thousands of learners who practice, test,
          and improve every day with Pathshala.
          No credit card needed — ever.
        </p>

        {/* BUTTON */}
        <Button
          size="lg"
          className="
            mt-8
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
          Start Practicing Now

          <ArrowRight
            aria-hidden="true"
            className="ml-1 size-5"
          />
        </Button>
      </div>
    </aside>
  );
}