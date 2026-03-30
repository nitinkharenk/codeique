"use client";

/**
 * ParallaxImage
 * ─────────────
 * A Next.js <Image> wrapper that creates a depth-based parallax
 * effect as the user scrolls past it.
 *
 * The inner image is oversized (+20% vertically) so it always
 * covers the container even when offset by the parallax transform.
 * The scrollYProgress [0 → 1] maps to a y translate range that
 * makes the image appear to move at a different speed than the page.
 *
 * Props:
 *   src / alt / priority / sizes — passed to Next.js Image
 *   speed     0 = no parallax, 0.15 = subtle (default), 0.5 = strong
 *   className  applied to the image itself
 *   containerClassName  applied to the clipping container
 *
 * GSAP alternative:
 * If you need this inside a section that uses GSAP ScrollTrigger,
 * replace useScroll/useTransform with a gsap.fromTo inside a
 * useEffect — but Framer Motion is simpler and works great here.
 */

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useWillChange,
} from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  sizes?: string;
  /** Optional static fill dimensions if not using fill mode */
  width?: number;
  height?: number;
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.15,
  className = "",
  containerClassName = "",
  priority = false,
  sizes = "100vw",
  width,
  height,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const willChange = useWillChange();

  /* Track scroll progress relative to this element's viewport entry/exit */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Map [0 → 1] scroll progress to [-speed*100% → +speed*100%] y offset */
  const pct = speed * 100;
  const yTransform = useTransform(scrollYProgress, [0, 1], [`-${pct}%`, `${pct}%`]);

  const isFill = !width || !height;

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${isFill ? "relative" : ""} ${containerClassName}`}
    >
      {/* Inner wrapper is slightly taller than 100% to allow movement room */}
      <motion.div
        className={`w-full ${isFill ? "absolute" : ""}`}
        style={{
          y: yTransform,
          willChange,
          // Overshoot height so image covers the container at any scroll offset
          height: isFill ? `${100 + pct * 2}%` : undefined,
          top: isFill ? `-${pct}%` : undefined,
        }}
      >
        {isFill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover ${className}`}
            priority={priority}
            sizes={sizes}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`w-full object-cover ${className}`}
            priority={priority}
            sizes={sizes}
          />
        )}
      </motion.div>
    </div>
  );
}
