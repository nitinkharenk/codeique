"use client";

/**
 * AnimatedText
 * ────────────
 * Reveals text with word-by-word or character-by-character stagger,
 * the signature animation of Awwwards-level sites.
 *
 * Each word / char is wrapped in overflow:hidden so it clips during
 * the slide-up, giving a clean "line wipe" reveal effect.
 *
 * Props:
 *   type       "words" (default) | "chars"
 *   preset     "slide-up" (default) | "fade-blur" | "scramble-fade"
 *   delay      initial delay before stagger begins
 *   stagger    gap between each word/char (seconds)
 *   once       only animate once when it enters viewport (default: true)
 *   animate    if true, animate on mount (for hero); if false, use whileInView
 *
 * Example:
 *   <AnimatedText type="chars" preset="slide-up" className="display text-7xl">
 *     Codeique
 *   </AnimatedText>
 */

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { ElementType } from "react";

/* ── Preset definitions ── */

type Preset = "slide-up" | "fade-blur" | "fade";

const PRESETS: Record<Preset, { hidden: object; visible: object }> = {
  "slide-up": {
    hidden: { y: "115%", opacity: 0, rotateZ: 1.5 },
    visible: {
      y: 0,
      opacity: 1,
      rotateZ: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
  "fade-blur": {
    hidden: { opacity: 0, filter: "blur(10px)", y: 12 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  },
};

/* ── Props ── */

type AnimatedTextProps = {
  children: string;
  /** HTML tag to render — defaults to "p" */
  as?: ElementType;
  type?: "words" | "chars";
  preset?: Preset;
  delay?: number;
  stagger?: number;
  className?: string;
  /** true = animate on mount (hero); false = whileInView (scroll) */
  animate?: boolean;
  once?: boolean;
};

export function AnimatedText({
  children,
  as: Tag = "p",
  type = "words",
  preset = "slide-up",
  delay = 0,
  stagger,
  className = "",
  animate = false,
  once = true,
}: AnimatedTextProps) {
  const reduceMotion = useReducedMotion();

  /* Respect prefers-reduced-motion: render plain text */
  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const defaultStagger = type === "chars" ? 0.025 : 0.08;
  const staggerGap = stagger ?? defaultStagger;

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerGap,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = PRESETS[preset] as Variants;

  /* ── Shared motion container attrs ── */
  const motionAttrs = animate
    ? { initial: "hidden", animate: "visible" }
    : {
        initial: "hidden",
        whileInView: "visible" as const,
        viewport: { once, amount: 0.2 },
      };

  /* ── Word-by-word ── */
  if (type === "words") {
    const words = children.split(" ");

    return (
      <Tag className={className}>
        <motion.span
          className="inline-flex flex-wrap gap-x-[0.3em] leading-[inherit]"
          variants={container}
          {...motionAttrs}
        >
          {words.map((word, i) => (
            <span key={`w-${i}-${word}`} className="overflow-hidden leading-[inherit]">
              <motion.span
                className="inline-block leading-[inherit]"
                variants={itemVariants}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </Tag>
    );
  }

  /* ── Character-by-character ── */
  const chars = children.split("");

  return (
    <Tag className={className}>
      <motion.span
        className="inline-flex flex-wrap"
        variants={container}
        {...motionAttrs}
      >
        {chars.map((char, i) =>
          char === " " ? (
            <span key={`space-${i}`} className="inline-block w-[0.3em]" />
          ) : (
            <span key={`c-${i}-${char}`} className="overflow-hidden leading-[inherit]">
              <motion.span
                className="inline-block leading-[inherit]"
                variants={itemVariants}
              >
                {char}
              </motion.span>
            </span>
          )
        )}
      </motion.span>
    </Tag>
  );
}
