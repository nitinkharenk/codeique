"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { featuredProjects } from "@/lib/data";
import { ease, listItemReveal, stagger, viewportOnce } from "@/lib/animations";

function ProjectRow({
  project,
  index,
}: {
  project: (typeof featuredProjects)[number];
  index: number;
}) {
  const rowRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [48, -48]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [18, -18]);

  return (
    <motion.article
      ref={rowRef}
      variants={listItemReveal(index)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="grid gap-6 border-t border-white/10 py-8 md:gap-8 md:py-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center"
      layout
    >
      <motion.div className="order-2 lg:order-1" style={{ y: contentY }}>
        <div className="inline-flex rounded-full border border-white/10 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-white/60">
          {project.number}
        </div>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
          {project.category}
        </p>
        <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white md:text-4xl lg:text-5xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/72 md:text-lg">
          {project.description}
        </p>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/55 md:text-base">
          {project.insight}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={`/works/${project.slug}`}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-accent)]/35 bg-[rgba(34,15,13,0.92)] px-3.5 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)] transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-[rgba(52,18,14,0.96)] active:scale-[0.98]"
          >
            Details <span aria-hidden>→</span>
          </Link>
          {project.liveUrl ? (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-[10px] uppercase tracking-[0.18em] text-white/70 transition-all duration-200 ease-out hover:scale-[1.02] hover:border-white/20 hover:text-white active:scale-[0.98]"
            >
              Preview <span aria-hidden>↗</span>
            </Link>
          ) : (
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/6 px-3.5 py-2 text-[10px] uppercase tracking-[0.18em] text-white/28">
              Preview Soon
            </span>
          )}
        </div>
      </motion.div>
      <motion.div
        className="interactive-card interactive-media order-1 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black lg:order-2"
        style={{ y: imageY }}
        whileHover={reduceMotion ? undefined : { y: -4 }}
        transition={{ duration: 0.22, ease: ease.out }}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 52vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </motion.div>
    </motion.article>
  );
}

export function Work() {
  return (
    <section id="work" className="section-divider py-14 md:py-16">
      <motion.div
        className="container-shell pt-8 md:pt-10"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div
          variants={listItemReveal(0)}
        >
          <SectionLabel label="(WORK)" />
          <h2 className="display mt-4 text-[3.2rem] text-[var(--color-foreground)] md:text-[6rem] lg:text-[7rem]">
            Latest Work
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed tracking-[-0.04em] text-[var(--color-muted)] md:text-lg">
            A selection of real projects with live previews and short details
            about what each platform or website is built for.
          </p>
        </motion.div>

        <div className="mt-10 space-y-8 md:space-y-10">
          {featuredProjects.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </div>

        <motion.div
          variants={listItemReveal(0)}
          className="mt-8"
        >
          <Link
            href="/works"
            className="interactive-link inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[var(--color-accent)] transition-all duration-200 ease-out hover:gap-3"
          >
            More Projects <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
