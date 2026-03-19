"use client";

import { motion } from "framer-motion";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { whyUsStats } from "@/lib/data";

export function Stats() {
  return (
    <section className="section-divider py-14 md:py-16">
      <div className="container-shell pt-8 md:pt-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel label="(WHY US)" />
            <h2 className="display mt-4 text-[3.5rem] text-[var(--color-foreground)] md:text-[6rem] lg:text-[7rem]">
              Numbers Don&apos;t Lie
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-end"
          >
            <p className="max-w-lg text-xl leading-[1.1] tracking-[-0.05em] text-[var(--color-muted)] md:text-3xl lg:text-4xl">
              With years of experience, we craft bold brands and high-impact
              digital experiences that get results.
            </p>
          </motion.div>
        </div>

        <div className="mt-8 grid border-t border-white/10 pt-4 sm:grid-cols-2 xl:grid-cols-4">
          {whyUsStats.map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
