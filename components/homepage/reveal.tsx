"use client";

import { motion, type Variants, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article" | "span";
};

export function Reveal({ children, className, delay = 0, y = 16, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol" | "section";
};

export function Stagger({ children, className, stagger = 0.08, as = "div" }: StaggerProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "article" | "section";
};

export function StaggerItem({ children, className, y = 16, as = "div" }: StaggerItemProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </MotionTag>
  );
}
