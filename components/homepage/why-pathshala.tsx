import Image from "next/image";

import {
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/homepage/reveal";

type Feature = {
  iconPath: string;
  title: string;
  description: string;
  upcoming?: boolean;
};

const features: Feature[] = [
  {
    iconPath: "/icons/university.png",
    title: "Question Bank",
    description:
      "Thousands of verified MCQs across all subjects, updated and verified regularly.",
  },
  {
    iconPath: "/icons/exam-time.png",
    title: "Mock Tests",
    description:
      "Full-length tests that replicate real exam experience under time pressure.",
  },
  {
    iconPath: "/icons/analysis.png",
    title: "Analysis",
    description:
      "Deep analytics revealing your weak spots and growth trajectory over time.",
    upcoming: true,
  },
  {
    iconPath: "/icons/ai.png",
    title: "AI Explanations",
    description:
      "Instant AI-powered explanations for every question — right or wrong.",
    upcoming: true,
  },
  {
    iconPath: "/icons/classroom.png",
    title: "Batch System",
    description:
      "Structured batches led by top educators for guided, focused exam prep.",
    upcoming: true,
  },
];

export function WhyPathshala() {
  return (
    <section
      aria-labelledby="why-pathshala-heading"
      className="bg-[#0A1024]"
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
            Why Pathshala?
          </p>
 
          <h2
            id="why-pathshala-heading"
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
            Built to Make You{" "}
            <span className="text-[#00D4C8]">
              Unstoppable
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
            lg:grid-cols-5
          "
        >
          {features.map((f) => (
            <StaggerItem
              as="li"
              key={f.title}
              className="
                relative
                flex
                flex-col
                rounded-[1.6rem]
                border
                border-white/[0.05]
                bg-[#0C1120]
                px-5
                py-5
                transition-transform
                duration-300
                ease-out
                hover:-translate-y-1
                lg:h-[14.5rem]
              "
            >
              <FeatureBody {...f} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FeatureBody({
  iconPath,
  title,
  description,
  upcoming,
}: Feature) {
  return (
    <>
      {upcoming && (
        <span
          className="
            absolute
            right-4
            top-4
            rounded-full
            border
            border-amber-500/20
            bg-amber-500/10
            px-2.5
            py-1
            text-[0.62rem]
            font-semibold
            uppercase
            tracking-[0.14em]
            text-amber-300
          "
        >
          Upcoming
        </span>
      )}

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
          mt-5
          text-[1.08rem]
          font-semibold
          leading-tight
          text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-3
          text-[0.88rem]
          leading-[1.75]
          text-white/55
        "
      >
        {description}
      </p>
    </>
  );
}