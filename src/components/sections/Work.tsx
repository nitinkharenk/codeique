"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { ProjectShowcaseCard } from "@/components/work/ProjectShowcaseCard";
import { listItemReveal, stagger, viewportOnce } from "@/lib/animations";
import { featuredProjects } from "@/lib/data";

const workSignals = [
  "Strategy-led launches",
  "High-impact brand experiences",
  "Detailed project outcomes",
] as const;

export function Work() {
  return (
    <section id="work" className="section-divider py-14 md:py-20">
      <motion.div
        className="container-shell pt-8 md:pt-10"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] xl:items-end">
          <motion.div variants={listItemReveal(0)}>
            <SectionLabel label="(WORK)" />
            <h2 className="type-display-title mt-4 max-w-[9ch]">
              <ScrambleText>Featured Case Studies</ScrambleText>
            </h2>
            <p className="type-body mt-5 max-w-2xl md:text-lg">
              Selected projects that showcase our approach to brand, web, and
              digital product work, from strategy and positioning through to a
              polished public launch.
            </p>
          </motion.div>

          <motion.div
            variants={listItemReveal(1)}
            className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm md:p-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,73,37,0.18),transparent_34%)]" />
            <div className="relative">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                Curated Selection
              </p>
              <p className="mt-3 text-sm leading-7 text-white/70 md:text-base">
                A quick overview of the kinds of brand, website, and product
                work we build for teams that want stronger digital presence.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/58">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  {featuredProjects.length} Projects
                </span>
                {workSignals.map((signal) => (
                  <span
                    key={signal}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/46"
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 space-y-6 md:space-y-8">
          {featuredProjects.map((project, index) => (
            <ProjectShowcaseCard
              key={project.slug}
              project={project}
              index={index}
              mode="home"
            />
          ))}
        </div>

        <motion.div
          variants={listItemReveal(2)}
          className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[1.6rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-4 md:px-6"
        >
          <p className="max-w-xl text-sm leading-7 text-white/60 md:text-base">
            See every project with fuller case studies, visual context, and the
            story behind how the work was shaped.
          </p>
          <Link
            href="/works"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[rgba(34,15,13,0.8)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)] transition-all duration-300 hover:-translate-y-0.5 hover:gap-3"
          >
            Explore All Projects <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
