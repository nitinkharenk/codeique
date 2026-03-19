"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { Button } from "@/components/ui/Button";
import { clientLogos } from "@/lib/data";

/* ── Tagline lines — each animated separately ── */
const tagLines = [
  { text: "We craft brands,", accent: false },
  { text: "websites & digital", accent: false },
  { text: "experiences with", accent: false },
  { text: "intention.", accent: true },
];

export function Hero() {
  const { scrollY } = useScroll();
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Scroll-driven title transforms ── */
  const titleScale = useTransform(scrollY, [0, 260], [1, 0.22]);
  const titleY = useTransform(scrollY, [0, 260], [72, 0]);

  /* ── Parallax eye on scroll ── */
  const eyeY = useTransform(scrollY, [0, 600], [0, 60]);
  const eyeScale = useTransform(scrollY, [0, 600], [1, 1.08]);

  /* ── Mouse-follow for the glow ── */
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
      className="relative bg-black"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden bg-black"
      >
        {/* ── Ambient layers ── */}
        <div className="absolute inset-0 ambient-grid opacity-[0.03]" />

        {/* ── Mouse-following radial glow ── */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: useTransform(
              [springX, springY],
              ([x, y]) =>
                `radial-gradient(circle 600px at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(255,73,37,0.07), transparent 70%)`
            ),
          }}
        />

        {/* ── Eye illustration — parallax ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
          style={{ y: eyeY, scale: eyeScale }}
        >
          <div className="relative aspect-square w-[52%] md:w-[40%] lg:w-[36%]">
            <Image
              src="/images/hero-vision.svg"
              alt="Abstract cinematic eye illustration"
              fill
              className="object-contain opacity-[0.7]"
              priority
              sizes="52vw"
            />
            {/* glow ring behind the eye */}
            <div className="absolute inset-[-20%] rounded-full bg-[radial-gradient(circle,rgba(255,73,37,0.06)_0%,transparent_60%)]" />
          </div>
        </motion.div>

        {/* ── Content shell ── */}
        <div className="container-shell relative z-10 flex min-h-[100svh] flex-col py-8 md:py-10">
          {/* ── Fixed shrinking Codeique brand ── */}
          <div aria-hidden="true" className="h-[clamp(3.8rem,13vw,9.5rem)]" />
          <motion.div
            className="pointer-events-none fixed left-1/2 top-3.5 z-[90] w-[calc(100%-40px)] -translate-x-1/2 origin-top-left md:top-4"
            style={{ scale: titleScale, y: titleY }}
          >
            <h1 className="display text-[clamp(4.2rem,13.6vw,11.4rem)] leading-[0.85] text-white">
              Codeique
              <sup className="relative top-[-0.6em] text-[0.18em] font-semibold tracking-normal">
                ®
              </sup>
            </h1>
          </motion.div>

          {/* ── Spacer ── */}
          <div className="flex-1 min-h-[6rem]" />

          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            {/* ── Tagline block ── */}
            <div className="max-w-[52rem]">
              {tagLines.map((line, i) => (
                <div key={line.text} className="overflow-hidden">
                  <motion.p
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.45 + i * 0.1,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`text-[clamp(2rem,5.6vw,4.4rem)] font-semibold leading-[1.08] tracking-[-0.045em] ${
                      line.accent
                        ? "text-[var(--color-accent)]"
                        : "text-white"
                    }`}
                  >
                    {line.text}
                  </motion.p>
                </div>
              ))}
            </div>

            {/* ── Sub-text + CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex flex-col gap-5 sm:flex-row sm:items-center lg:flex-col-reverse lg:items-end lg:gap-6"
            >
              <Button href="/contact" className="w-fit px-7 py-3 text-sm md:px-8 md:py-3.5 md:text-base">
                Start a Project
              </Button>
              <p className="max-w-xs text-[13px] leading-relaxed tracking-wide text-white/30 md:text-sm lg:text-right">
                Brand strategy, web design & development for ambitious teams.
              </p>
            </motion.div>
          </div>

          {/* ── Bottom bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-10 flex flex-col gap-4 border-t border-white/6 pt-5 sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Client logos */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:gap-x-7">
              {clientLogos.map((logo, i) => (
                <motion.span
                  key={logo}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 + i * 0.07, duration: 0.35 }}
                  className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/14 md:text-xs"
                >
                  {logo}
                </motion.span>
              ))}
            </div>

            {/* Scroll hint */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/22 sm:flex"
            >
              <span>Scroll</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="text-white/22"
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
