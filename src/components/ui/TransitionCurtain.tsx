"use client";

/**
 * TransitionCurtain
 * ─────────────────
 * A full-screen accent-colored "curtain" that plays between page
 * navigations, bridging the visual gap between route transitions.
 *
 * How it works:
 *   1. Watches pathname changes via usePathname()
 *   2. On change: slides an accent panel UP from the bottom
 *   3. Then slides it back DOWN off the screen
 *   4. Entire sequence takes ~650 ms — imperceptible but polished
 *
 * Placement: render directly inside <body> (in layout.tsx),
 * outside the main content container. z-index: 9989 — below
 * the preloader (9997) and cursor (9998/9999) but above content.
 *
 * Note: In Next.js App Router, template.tsx handles per-page enter
 * animations; this component handles the cross-route curtain flash.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function TransitionCurtain() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    /* Flash the curtain */
    setVisible(true);

    /* Total curtain lifetime (in + out) */
    timerRef.current = setTimeout(() => setVisible(false), 660);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={`curtain-${pathname}`}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[9989] origin-bottom"
          style={{ backgroundColor: "var(--color-accent)" }}
          /* Slides in from bottom, then slides out to top */
          initial={{ scaleY: 0, transformOrigin: "bottom" }}
          animate={{
            scaleY: [0, 1, 1, 0],
            transformOrigin: ["bottom", "bottom", "top", "top"],
          }}
          transition={{
            duration: 0.65,
            ease: [0.76, 0, 0.24, 1],
            times: [0, 0.42, 0.58, 1],
          }}
        />
      )}
    </AnimatePresence>
  );
}
