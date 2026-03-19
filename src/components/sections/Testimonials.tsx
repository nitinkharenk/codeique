"use client";

import { motion } from "framer-motion";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="section-divider py-14 md:py-16">
      <div className="container-shell pt-8 md:pt-10">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 text-[var(--color-foreground)]">
              <motion.span
                className="text-5xl text-[var(--color-accent)]"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                ★
              </motion.span>
              <div>
                <p className="text-5xl font-semibold tracking-[-0.05em]">
                  4.9<span className="text-3xl text-[var(--color-muted)]">/5</span>
                </p>
                <p className="mt-2 text-base text-[var(--color-muted)]">300+ Reviews on Clutch</p>
              </div>
            </div>
            <div className="mt-8">
              <SectionLabel label="(TESTIMONIALS)" />
            </div>
          </motion.div>

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-5xl text-3xl font-semibold leading-[0.96] tracking-[-0.06em] text-[var(--color-foreground)] md:text-5xl lg:text-6xl"
            >
              We deliver data-driven and result-focused work. Hear what they say about us.
            </motion.h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {testimonials.map((item, index) => (
                <motion.article
                  key={item.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="flex flex-col justify-between min-h-[16rem] rounded-[1.25rem] border border-white/10 bg-[#141414] p-6 md:p-8 transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-xl bg-[radial-gradient(circle,rgba(255,90,47,0.4),rgba(255,255,255,0.16))]" />
                    <div>
                      <p className="text-lg font-semibold tracking-[-0.04em]">{item.name}</p>
                      <p className="text-sm text-[var(--color-muted)]">{item.role}</p>
                    </div>
                  </div>
                  <p className="mt-8 text-xl font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--color-foreground)] md:text-2xl">
                    <span className="mr-2 text-[var(--color-accent)]">&quot;</span>
                    {item.quote}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
