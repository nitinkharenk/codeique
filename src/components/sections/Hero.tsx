"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { Button } from "@/components/ui/Button";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { useTheme } from "@/components/providers/ThemeProvider";
import { clientLogos } from "@/lib/data";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const { theme } = useTheme();
  const isLight = theme === "light";

  /* ── Scroll-driven brand name shrink ── */
  const titleScale = useTransform(scrollY, [0, 260], [1, 0.18]);
  const titleY = useTransform(scrollY, [0, 260], [88, -12]);
  const titleOpacity = useTransform(scrollY, [0, 150, 210, 260], [1, 1, 0.38, 0]);

  /* ── Mouse-tracking radial glow ── */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={sectionRef}
      className={`relative ${
        isLight
          ? "bg-[linear-gradient(180deg,#f9f4ed_0%,#f4ede3_45%,#efe6da_100%)]"
          : "bg-black"
      }`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`relative overflow-hidden ${
          isLight
            ? "bg-[linear-gradient(180deg,#f9f4ed_0%,#f4ede3_45%,#efe6da_100%)]"
            : "bg-black"
        }`}
      >
        {/* ── Ambient grid ── */}
        <div
          className={`absolute inset-0 ambient-grid ${
            isLight ? "opacity-[0.05]" : "opacity-[0.03]"
          }`}
        />

        {/* ── Mouse-following radial glow ── */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: useTransform(
              [springX, springY],
              ([x, y]) =>
                `radial-gradient(circle 640px at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(255,73,37,0.07), transparent 70%)`
            ),
          }}
        />

        {/* ── Content shell ── */}
        <div className="container-shell relative z-10 flex min-h-[100svh] flex-col py-8 md:py-10">
          {/* Spacer for the fixed brand name */}
          <div aria-hidden className="h-[clamp(3.8rem,13vw,9.5rem)]" />

          {/* ── Fixed brand name — shrinks into navbar on scroll ── */}
          <motion.div
            className="fixed left-1/2 top-3 z-[90] w-[calc(100%-40px)] -translate-x-1/2 origin-top md:top-3.5 md:origin-top-left"
            style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}
          >
            <h1 className="display pointer-events-auto text-center text-[clamp(4.2rem,13.6vw,11.4rem)] leading-[0.85] text-[var(--color-foreground)] md:text-left">
              <ScrambleText>Codeique</ScrambleText>
            </h1>
          </motion.div>

          {/* ── Vertical spacer ── */}
          <div className="flex-1 min-h-[6rem]" />

          {/* ── Bottom content: tagline + CTA ── */}
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            {/* Tagline — word-by-word reveal with stagger */}
            <div className="max-w-[52rem]">
              <AnimatedText
                as="p"
                type="words"
                preset="slide-up"
                delay={2.4 + 0.45}
                stagger={0.09}
                animate
                className={`text-[clamp(2rem,4.8vw,3.85rem)] font-semibold leading-[1.08] tracking-[-0.045em] ${isLight ? "text-black" : "text-white"}`}
              >
                We craft brands, websites & digital experiences with
              </AnimatedText>
              {/* "intention." in accent color — separate so it can be styled */}
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 2.4 + 0.45 + 7 * 0.09,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block text-[clamp(2rem,4.8vw,3.85rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--color-accent)]"
                >
                  intention.
                </motion.span>
              </div>
            </div>

            {/* Sub-text + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4 + 1.1, duration: 0.5 }}
              className="flex flex-col gap-5 sm:flex-row sm:items-center lg:flex-col-reverse lg:items-end lg:gap-6"
            >
              {/* Magnetic button wraps the CTA for pull effect */}
              <MagneticButton strength={0.42}>
                <Button
                  href="/contact"
                  className="w-fit px-7 py-3 text-sm md:px-8 md:py-3.5 md:text-base"
                >
                  Start a Project
                </Button>
              </MagneticButton>

              <p className={`max-w-xs text-[13px] leading-relaxed tracking-wide md:text-sm lg:text-right ${isLight ? "text-black/40" : "text-white/30"}`}>
                Brand strategy, web design & development for ambitious teams.
              </p>
            </motion.div>
          </div>

          {/* ── Bottom bar: logos + scroll hint ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 + 1.4, duration: 0.6 }}
            className={`mt-10 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between ${isLight ? "border-black/8" : "border-white/6"}`}
          >
            {/* Client logos */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:gap-x-7">
              {clientLogos.map((logo, i) => (
                <motion.span
                  key={logo}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.4 + 1.55 + i * 0.06, duration: 0.35 }}
                  className={`text-[11px] font-semibold uppercase tracking-[0.12em] md:text-xs ${isLight ? "text-black/20" : "text-white/14"}`}
                >
                  {logo}
                </motion.span>
              ))}
            </div>

            {/* Animated scroll hint */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className={`hidden items-center gap-2 text-[11px] uppercase tracking-[0.18em] sm:flex ${isLight ? "text-black/28" : "text-white/22"}`}
            >
              <span>Scroll</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className={isLight ? "text-black/28" : "text-white/22"}
              >
                <path
                  d="M6 1v10M6 11l-3-3M6 11l3-3"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
