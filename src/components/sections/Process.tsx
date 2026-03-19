"use client";

import { motion } from "framer-motion";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { processSteps } from "@/lib/data";

export function Process() {
  return (
    <section className="section-divider py-12 md:py-16">
      <div className="container-shell pt-6 md:pt-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel label="(PROCESS)" />
            <h2 className="display mt-4 text-[2.8rem] text-[var(--color-foreground)] sm:text-[3.5rem] md:text-[5rem] lg:text-[6rem]">
              How We Work
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
            A clear, collaborative process designed to move fast without cutting corners.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="group flex min-h-[12rem] flex-col justify-between rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-6 md:p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] md:min-h-[14rem]"
            >
              <div className="text-xl font-semibold tracking-[-0.05em] text-white/30 transition-colors duration-300 group-hover:text-[var(--color-accent)]/60 md:text-2xl">
                STEP {index + 1}
                <span className="text-[var(--color-accent)]">.</span>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold leading-tight tracking-[-0.05em] text-[var(--color-foreground)] md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
