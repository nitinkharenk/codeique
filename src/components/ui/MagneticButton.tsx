"use client";

/**
 * MagneticButton
 * ──────────────
 * Wraps ANY element and applies a magnetic hover pull: the element
 * slightly follows the cursor when hovered and snaps back when the
 * mouse leaves.
 *
 * Implemented with Framer Motion springs for smooth, physics-based
 * motion. No GSAP needed for this effect.
 *
 * Usage:
 *   <MagneticButton>
 *     <Button href="/contact">Start a Project</Button>
 *   </MagneticButton>
 *
 * Props:
 *   strength   0-1 — how strongly it follows the cursor (default 0.38)
 *   dampStrength  multiplier on the snapping spring (default 1)
 *   className  wrapper class
 */

import {
  useRef,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticButton({
  children,
  strength = 0.38,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  /* Raw target offset */
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  /* Smooth spring that follows the raw target */
  const x = useSpring(offsetX, { stiffness: 180, damping: 18, mass: 0.6 });
  const y = useSpring(offsetY, { stiffness: 180, damping: 18, mass: 0.6 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    offsetX.set((e.clientX - cx) * strength);
    offsetY.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-flex" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}
