"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { processSteps } from "@/lib/data";

export function Process() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="section-divider py-12 md:py-16">
      <div className="container-shell pt-6 md:pt-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel label="(PROCESS)" />
            <h2 className="type-display-title mt-4">
              <ScrambleText>How We Work</ScrambleText>
            </h2>
          </div>
          <p className="type-body max-w-md md:text-lg">
            A clear, collaborative process designed to move fast without cutting corners.
          </p>
        </div>

        {/* ── Step cards — open-frame ticker design ── */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 border-t border-white/10">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col justify-between min-h-[18rem] border-b border-r border-white/10 p-6 md:p-8 overflow-hidden cursor-default"
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep((current) => (current === index ? null : current))}
              onFocus={() => setHoveredStep(index)}
              onBlur={() => setHoveredStep((current) => (current === index ? null : current))}
            >
              {/* Accent fill on hover — sweeps from bottom */}
              <div className="absolute inset-x-0 bottom-0 h-0 bg-[var(--color-accent)]/[0.04] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-full" />

              {/* Large step number — decorative background text */}
              <div
                aria-hidden
                className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[7rem] font-bold leading-none text-white opacity-[0.035] select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-[0.07]"
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="relative z-10">
                {/* Step label */}
                <div className="flex items-center gap-2">
                  <span className="h-px w-6 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-10" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
                    Step {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className="type-card-title text-white md:text-2xl">
                  <ScrambleText
                    interactive={false}
                    triggerKey={hoveredStep === index ? `step-${index}` : null}
                  >
                    {step.title}
                  </ScrambleText>
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                  {step.description}
                </p>

                {/* Animated bottom accent line */}
                <div className="mt-6 h-px w-0 bg-[var(--color-accent)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
