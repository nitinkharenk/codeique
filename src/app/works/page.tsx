"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { featuredProjects } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/animations";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof featuredProjects)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLElement | null>(null);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        delay: index * 0.12,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <Link href={`/works/${project.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.02]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between md:bottom-6 md:left-6 md:right-6">
            <div>
              <span className="inline-block rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm">
                {project.category}
              </span>
            </div>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--color-accent)]/40 group-hover:bg-[rgba(34,15,13,0.92)] group-hover:text-[var(--color-accent)]">
              →
            </span>
          </div>
        </div>
      </Link>

      <div className="mt-5 px-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href={`/works/${project.slug}`}>
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-[var(--color-accent)] md:text-3xl">
                {project.title}
              </h2>
            </Link>
            <p className="mt-2 max-w-md text-sm leading-7 text-[var(--color-muted)]">
              {project.description}
            </p>
          </div>
          <span className="shrink-0 font-mono text-xs tracking-[0.2em] text-white/25">
            {project.number}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.frontend.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/50"
            >
              {tech}
            </span>
          ))}
          {project.highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[var(--color-accent)]/15 bg-[rgba(34,15,13,0.4)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)]/70"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-4 flex gap-3">
          <Link
            href={`/works/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/60 transition-colors duration-300 hover:text-white"
          >
            Read Case Study <span aria-hidden>→</span>
          </Link>
          {project.liveUrl ? (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-accent)]/70 transition-colors duration-300 hover:text-[var(--color-accent)]"
            >
              Live Site <span aria-hidden>↗</span>
            </Link>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export default function WorksPage() {
  return (
    <>
      <Navbar />
      <main className="container-shell pb-16 pt-28 md:pb-24 md:pt-36">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--color-accent)]"
          >
            (WORKS)
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="display mt-6 text-[3rem] text-[var(--color-foreground)] md:text-[5.5rem] lg:text-[7rem]"
          >
            Selected Projects
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)] md:text-lg"
          >
            Real projects with live previews. Each case study covers UI/UX
            decisions, frontend architecture, backend systems, and the thinking
            behind every technical choice.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 flex flex-wrap gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-4 py-2 text-xs text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            {featuredProjects.length} Projects
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-4 py-2 text-xs text-white/40">
            UI/UX Breakdowns
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-4 py-2 text-xs text-white/40">
            Tech Stack Details
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-4 py-2 text-xs text-white/40">
            Live Previews
          </span>
        </motion.div>

        <div className="mt-14 grid gap-10 md:gap-14 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
