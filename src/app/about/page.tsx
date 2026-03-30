"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrambleText } from "@/components/ui/ScrambleText";
import {
  aboutPillars,
  aboutTimeline,
  featuredProjects,
  stats,
  studioPrinciples,
} from "@/lib/data";
import { fadeUp, fadeLeft, fadeRight, stagger, viewportOnce } from "@/lib/animations";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pb-16 pt-28 md:pb-20 md:pt-32">
        {/* ── Hero ── */}
        <section className="container-shell">
          <motion.div
            className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeLeft}>
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--color-accent)]">
                (ABOUT)
              </p>
              <h1 className="type-page-title mt-6 max-w-5xl">
                <ScrambleText>
                  We build digital presence that feels precise, considered, and
                  commercially sharp.
                </ScrambleText>
              </h1>
              <p className="type-body-lg mt-6 max-w-3xl md:text-xl">
                Codeique is a design and development studio for teams that want
                more than a polished surface. We help founders and growing
                brands translate ambition into a clear story, a stronger
                identity, and a website that performs with confidence.
              </p>
            </motion.div>

            {/* Studio principles — borderless, left-line design */}
            <motion.div variants={fadeRight} className="border-l-[3px] border-[var(--color-accent)] pl-6 md:pl-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
                What We Care About
              </p>
              <div className="mt-6 space-y-0 border-t border-white/10">
                {studioPrinciples.map((principle, i) => (
                  <motion.div
                    key={principle}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.3 + i * 0.08,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group flex items-center gap-4 border-b border-white/10 py-4 cursor-default"
                  >
                    <span className="font-mono text-[10px] text-[var(--color-accent)] flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base tracking-[-0.03em] text-white/75 transition-colors duration-300 group-hover:text-white">
                      {principle}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Stats — counter strip, no boxes ── */}
        <section className="container-shell mt-16 md:mt-20">
          <div className="border-t border-white/10 grid md:grid-cols-3">
            {stats.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group border-b border-r border-white/10 px-6 py-8 md:px-8 overflow-hidden relative"
              >
                {/* Hover fill */}
                <div className="absolute inset-0 bg-[var(--color-accent)]/[0.025] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10">
                  <p className="display text-[4rem] leading-none tracking-[-0.04em] text-white md:text-[5.5rem]">
                    {item.value}
                    <span className="text-[var(--color-accent)]">{item.suffix}</span>
                  </p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                    {item.label}
                  </p>
                  {/* Animated bottom rule */}
                  <div className="mt-4 h-[2px] w-0 bg-[var(--color-accent)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-12" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Approach / Timeline — vertical rail ── */}
        <section className="container-shell mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--color-accent)]">
              (APPROACH)
            </p>
            <h2 className="type-section-title mt-5 text-white">
              <ScrambleText>
                A studio process built for momentum, not drag.
              </ScrambleText>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
              We keep the process collaborative and focused. Strategy, design,
              and front-end implementation stay tightly connected, which means
              fewer handoff gaps and better decisions all the way through launch.
            </p>
          </motion.div>

          {/* Timeline — connected rail design */}
          <div className="relative">
            {/* Vertical rail line */}
            <div className="absolute left-[18px] top-0 bottom-0 w-px bg-white/10 hidden md:block" />

            <div className="space-y-0">
              {aboutTimeline.map((item, index) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative flex gap-6 md:gap-8 py-5 border-b border-white/8"
                >
                  {/* Rail dot */}
                  <div className="relative flex-shrink-0 w-9 h-9 hidden md:flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white/20 transition-all duration-300 group-hover:bg-[var(--color-accent)] group-hover:scale-150" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
                        Phase {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold tracking-[-0.04em] text-white md:text-2xl">
                      {item.phase}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-muted)] md:text-base">
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pillars — open-frame, top-rule cards ── */}
        <section className="container-shell mt-16">
          <div className="border-t border-white/10 grid gap-0 lg:grid-cols-3">
            {aboutPillars.map((pillar, i) => (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  delay: i * 0.12,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative border-b border-r border-white/10 px-6 py-8 md:px-8 overflow-hidden"
              >
                {/* Hover background */}
                <div className="absolute inset-x-0 top-0 h-0 bg-white/[0.015] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-full" />

                {/* Large index — decorative */}
                <span
                  aria-hidden
                  className="absolute right-4 bottom-4 font-mono text-[5rem] font-bold leading-none text-white opacity-[0.03] select-none pointer-events-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
                    Studio Pillar
                  </p>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] md:text-base">
                    {pillar.description}
                  </p>
                  {/* Bottom accent rule */}
                  <div className="mt-6 h-px w-0 bg-[var(--color-accent)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-8" />
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── Selected work ── */}
        <section className="container-shell mt-16">
          <motion.div
            className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--color-accent)]">
                (SELECTED WORK)
              </p>
              <h2 className="type-section-title mt-5 text-white">
                <ScrambleText>
                  A few projects that reflect how we think.
                </ScrambleText>
              </h2>
            </div>
            <Link
              href="/works"
              className="inline-flex w-fit items-center rounded-full border border-white/12 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              View Works
            </Link>
          </motion.div>

          {/* Project cards — full-bleed with overlay content ── */}
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {featuredProjects.slice(0, 2).map((project, i) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  delay: i * 0.12,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative overflow-hidden bg-black"
              >
                <Link href={`/works/${project.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Corner marks */}
                    <span aria-hidden className="absolute top-3 left-3 w-4 h-4 border-l border-t border-white/25 pointer-events-none z-10" />
                    <span aria-hidden className="absolute top-3 right-3 w-4 h-4 border-r border-t border-white/25 pointer-events-none z-10" />

                    {/* Bottom overlay content */}
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)] mb-2">
                        {project.category}
                      </p>
                      <h3 className="text-2xl font-semibold tracking-[-0.05em] text-white transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 md:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-white/55 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Reveal row on hover */}
                      <div className="flex items-center gap-2 mt-3 overflow-hidden h-0 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-5 group-hover:opacity-100">
                        <span className="h-px w-5 bg-[var(--color-accent)]" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
                          Case Study
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
