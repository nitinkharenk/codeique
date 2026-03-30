"use client";

/**
 * RevealOnScroll
 * ──────────────
 * A lightweight scroll-reveal wrapper. Children animate in when
 * they enter the viewport. Supports several presets and full
 * custom overrides.
 *
 * Presets:
 *   "fade-up"     (default) opacity + translateY
 *   "fade-in"     opacity only
 *   "slide-left"  opacity + translateX from left
 *   "slide-right" opacity + translateX from right
 *   "scale"       opacity + subtle scale
 *   "blur"        opacity + blur
 *   "clip-up"     clip-path reveal bottom-to-top (premium feel)
 *
 * Props:
 *   preset       animation preset key
 *   delay        seconds before animation starts
 *   duration     animation duration
 *   amount       fraction of element that must be visible (0-1)
 *   once         animate only once when scrolled in (default true)
 *   className    applied to the motion wrapper
 *   as           HTML tag for the wrapper (default "div")
 *
 * Example:
 *   <RevealOnScroll preset="clip-up" delay={0.1}>
 *     <p>This text wipes up as it enters the viewport</p>
 *   </RevealOnScroll>
 */

import { motion, useReducedMotion, type Variants, type TargetAndTransition } from "framer-motion";
import type { ElementType, ReactNode } from "react";

/* ── Presets ── */

type RevealPreset =
  | "fade-up"
  | "fade-in"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "blur"
  | "clip-up";

const PRESETS: Record<RevealPreset, { hidden: TargetAndTransition; visible: TargetAndTransition }> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  "clip-up": {
    hidden: { clipPath: "inset(100% 0 0 0)", opacity: 1 },
    visible: { clipPath: "inset(0% 0 0 0)", opacity: 1 },
  },
};

/* ── Props ── */

interface RevealOnScrollProps {
  children: ReactNode;
  preset?: RevealPreset;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  className?: string;
  as?: ElementType;
}

export function RevealOnScroll({
  children,
  preset = "fade-up",
  delay = 0,
  duration = 0.65,
  amount = 0.12,
  once = true,
  className = "",
  as: Tag = "div",
}: RevealOnScrollProps) {
  const reduceMotion = useReducedMotion();

  const { hidden, visible } = PRESETS[preset];

  const variants: Variants = {
    hidden,
    visible: {
      ...visible,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  /* Accessibility: skip animation for users who prefer reduced motion */
  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion(Tag as ElementType);

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/* ── StaggerReveal — reveals children with a staggered delay ── */

interface StaggerRevealProps {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
  childClassName?: string;
}

/**
 * StaggerReveal
 * Wraps children in a stagger container. Each direct child
 * receives a fade-up animation with a staggered delay.
 *
 * Example:
 *   <StaggerReveal stagger={0.1}>
 *     <Card />
 *     <Card />
 *     <Card />
 *   </StaggerReveal>
 */
export function StaggerReveal({
  children,
  stagger = 0.1,
  delay = 0,
  className = "",
}: StaggerRevealProps) {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
