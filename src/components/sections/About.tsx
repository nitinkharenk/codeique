"use client";

import { motion } from "framer-motion";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp, stagger } from "@/lib/animations";
import { stats } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="section-divider py-14 md:py-16">
      <div className="container-shell pt-8 md:pt-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 lg:grid-cols-[1fr_0.9fr]"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel label="(ABOUT)" />
            <h2 className="type-section-title mt-5 max-w-4xl">
              We combine years of web design and development expertise to craft
              meaningful, story-driven digital experiences.
            </h2>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="rounded-[var(--radius-xl)] border border-white/10 bg-white/[0.02] p-5 md:p-6"
          >
            <p className="type-body-lg text-lg md:text-2xl md:leading-[1.35]">
              Codeique sits at the intersection of brand thinking, interface
              clarity, and front-end craft. We work with ambitious teams who
              care about how they are perceived, how they perform, and how they
              grow after launch.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {stats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  className="rounded-[1rem] border border-white/10 bg-black/20 p-3.5 transition-colors duration-300 hover:border-white/20"
                >
                  <p className="text-3xl font-semibold tracking-[-0.05em] text-[var(--color-foreground)]">
                    {item.value}
                    {item.suffix}
                  </p>
                  <p className="mt-1.5 text-xs leading-5 text-[var(--color-muted)]">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
