"use client";

/**
 * template.tsx — Page-enter animation
 * ─────────────────────────────────────
 * Next.js creates a fresh instance of this template on every route
 * change, making it the right place for entrance animations.
 *
 * Together with TransitionCurtain (an accent overlay flash), this
 * creates a two-layer transition:
 *   Layer 1 — TransitionCurtain: accent panel slides across the screen
 *   Layer 2 — This template: page content fades in with blur + rise
 *
 * The blur-to-focus feel is a hallmark of high-end product websites.
 * The 50ms delay gives the curtain a moment to start its exit before
 * the new content begins appearing.
 */

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.05,
      }}
    >
      {children}
    </motion.div>
  );
}
