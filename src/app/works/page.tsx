"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { ProjectShowcaseCard } from "@/components/work/ProjectShowcaseCard";
import { fadeUp, stagger } from "@/lib/animations";
import { featuredProjects } from "@/lib/data";

const archiveNotes = [
  "Brand-led storytelling",
  "Launch-ready websites",
  "Product and marketing craft",
  "Detailed case study breakdowns",
] as const;

export default function WorksPage() {
  const { scrollY } = useScroll();
  const haloLeftY = useTransform(scrollY, [0, 500], [0, 100]);
  const haloRightY = useTransform(scrollY, [0, 500], [0, -80]);
  const titleY = useTransform(scrollY, [0, 320], [0, -24]);
  const labelY = useTransform(scrollY, [0, 320], [0, 32]);

  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-32"
      >
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            style={{ y: haloLeftY }}
            className="absolute left-[-10%] top-28 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(255,73,37,0.22),transparent_62%)] blur-3xl"
          />
          <motion.div
            style={{ y: haloRightY }}
            className="absolute right-[-8%] top-[24rem] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_62%)] blur-3xl"
          />
        </div>

        <div className="container-shell relative">
          <motion.section
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(14,14,14,0.92),rgba(7,7,7,0.98))] px-5 py-8 md:px-8 md:py-10 lg:px-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,73,37,0.14),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_34%,transparent_70%,rgba(255,255,255,0.02))]" />

            <motion.div
              style={{ y: labelY }}
              className="pointer-events-none absolute right-4 top-3 hidden font-mono text-[3rem] uppercase tracking-[0.28em] text-white/[0.03] md:block lg:right-8 lg:text-[5rem]"
            >
              Works
            </motion.div>

            <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.72fr)] xl:items-end">
              <motion.div style={{ y: titleY }}>
                <motion.p
                  variants={fadeUp}
                  className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--color-accent)]"
                >
                  (WORKS)
                </motion.p>
                <motion.h1
                  variants={fadeUp}
                  className="type-display-title mt-5 max-w-[8ch]"
                >
                  <ScrambleText>Selected Projects Archive</ScrambleText>
                </motion.h1>
                <motion.p
                  variants={fadeUp}
                  className="type-body mt-5 max-w-3xl md:text-lg"
                >
                  A curated look at the projects we&apos;ve shaped for founders
                  and growing teams, with the decisions, outcomes, and launch
                  thinking behind each one.
                </motion.p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1"
              >
                <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/34">
                    Archive Summary
                  </p>
                  <p className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-white">
                    {featuredProjects.length}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/58">
                    A focused archive of recent projects, showing the goals,
                    decisions, and outcomes behind each engagement.
                  </p>
                </div>

                <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/34">
                    Page Direction
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {archiveNotes.map((note) => (
                      <span
                        key={note}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/56"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <section className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  Featured List
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/56 md:text-base">
                  Explore the work through outcomes, design decisions, and the
                  practical story behind each project.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/48">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                Scroll the archive
              </div>
            </div>

            <div className="mt-8 space-y-7 md:space-y-9">
              {featuredProjects.map((project, index) => (
                <ProjectShowcaseCard
                  key={project.slug}
                  project={project}
                  index={index}
                  mode="page"
                />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
