"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ease } from "@/lib/animations";
import type { Project } from "@/lib/data";

const showcaseThemes = [
  {
    glow: "from-sky-500/22 via-transparent to-transparent",
    halo: "from-sky-400/24 via-cyan-400/14 to-transparent",
    accent: "text-sky-300",
    accentBorder: "border-sky-400/30",
    accentBg: "bg-sky-400/10",
    chip: "bg-sky-300",
  },
  {
    glow: "from-fuchsia-500/20 via-transparent to-transparent",
    halo: "from-fuchsia-400/20 via-violet-400/12 to-transparent",
    accent: "text-fuchsia-300",
    accentBorder: "border-fuchsia-400/30",
    accentBg: "bg-fuchsia-400/10",
    chip: "bg-fuchsia-300",
  },
  {
    glow: "from-rose-500/24 via-transparent to-transparent",
    halo: "from-rose-400/24 via-orange-400/12 to-transparent",
    accent: "text-rose-300",
    accentBorder: "border-rose-400/30",
    accentBg: "bg-rose-400/10",
    chip: "bg-rose-300",
  },
] as const;

type ProjectShowcaseCardProps = {
  project: Project;
  index: number;
  mode?: "home" | "page";
};

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] border border-white/10 bg-black/20 px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/34">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium leading-6 text-white/78">{value}</p>
    </div>
  );
}

export function ProjectShowcaseCard({
  project,
  index,
  mode = "home",
}: ProjectShowcaseCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const theme = showcaseThemes[index % showcaseThemes.length];
  const reverse = index % 2 === 1;
  const isPage = mode === "page";
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [28, -24]);
  const mediaY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [52, -52]);
  const floatY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [16, -18]);
  const haloY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 64]);

  const summaryTags = project.techStack.frontend.slice(0, isPage ? 4 : 3);
  const detailCopy = isPage ? project.scope : project.insight;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ delay: index * 0.06, duration: 0.7, ease: ease.out }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(12,12,12,0.88)] p-5 md:p-7 lg:p-8"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.glow} opacity-80`} />
      <motion.div
        aria-hidden
        style={{ y: haloY }}
        className={`pointer-events-none absolute -right-16 top-10 h-52 w-52 rounded-full bg-gradient-to-br ${theme.halo} blur-3xl`}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_34%,transparent_65%,rgba(255,255,255,0.02))]" />

      <div className="relative grid gap-7 lg:grid-cols-2 lg:gap-9">
        <motion.div
          style={{ y: contentY }}
          className={`flex flex-col justify-between ${reverse ? "lg:order-2" : "lg:order-1"}`}
        >
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/56">
                {project.number}
              </span>
              <span
                className={`inline-flex rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] ${theme.accentBorder} ${theme.accentBg} ${theme.accent}`}
              >
                {project.category}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">
                {project.year}
              </span>
            </div>

            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.06em] text-white md:text-4xl lg:text-[3.4rem] lg:leading-[0.94]">
              {project.title}
            </h3>

            <p className="mt-4 max-w-2xl text-base leading-7 text-white/72 md:text-lg">
              {project.description}
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-muted)] md:text-base">
              {detailCopy}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <MetaChip label="Role" value={project.role} />
              <MetaChip label="Duration" value={project.duration} />
              <MetaChip label="Preview" value={project.liveUrl ? "Live now" : "Coming soon"} />
            </div>
          </div>

          <div className="mt-7">
            <div className="flex flex-wrap gap-2">
              {project.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/60"
                >
                  {item}
                </span>
              ))}
              {summaryTags.map((tech) => (
                <span
                  key={tech}
                  className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] ${theme.accentBorder} text-white/72`}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/works/${project.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/[0.06]"
              >
                Open Case Study <span aria-hidden>→</span>
              </Link>
              {project.liveUrl ? (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5 ${theme.accentBorder} ${theme.accent} bg-black/20`}
                >
                  Live Preview <span aria-hidden>↗</span>
                </Link>
              ) : null}
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ y: mediaY }}
          className={`relative ${reverse ? "lg:order-1" : "lg:order-2"}`}
        >
          <div className="relative">
            <div
              className={`absolute inset-x-8 top-10 h-28 rounded-full bg-gradient-to-r ${theme.halo} opacity-80 blur-3xl`}
            />
            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/35 shadow-[0_30px_80px_rgba(0,0,0,0.32)]">
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/10 bg-black/30 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
                  <span className={`h-2.5 w-2.5 rounded-full ${theme.chip}`} />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                  /{project.slug}
                </span>
              </div>

              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  sizes={isPage ? "(max-width: 1024px) 100vw, 46vw" : "(max-width: 1024px) 100vw, 42vw"}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.05)_0%,rgba(8,8,8,0.18)_65%,rgba(8,8,8,0.5)_100%)]" />
              </div>
            </div>

            <motion.div
              style={{ y: floatY }}
              className="absolute -bottom-4 left-4 hidden max-w-[18rem] rounded-[1.1rem] border border-white/12 bg-[rgba(8,8,8,0.82)] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.32)] backdrop-blur-md sm:block"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                Key Outcome
              </p>
              <p className="mt-2 text-sm leading-6 text-white/74">
                {project.results[0]}
              </p>
            </motion.div>

            <motion.div
              style={{ y: floatY }}
              className="absolute right-4 top-6 hidden rounded-[1rem] border border-white/12 bg-[rgba(8,8,8,0.76)] px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.32)] backdrop-blur-md md:block"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                Deliverables
              </p>
              <p className="mt-2 max-w-[13rem] text-sm leading-6 text-white/72">
                {project.deliverables.slice(0, 2).join(" / ")}
              </p>
            </motion.div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {project.gallery.slice(1, 3).map((image, galleryIndex) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: 0.12 + galleryIndex * 0.06,
                  duration: 0.5,
                  ease: ease.out,
                }}
                className="relative overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/[0.03]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={image}
                    alt={`${project.title} gallery ${galleryIndex + 2}`}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    sizes="(max-width: 1024px) 50vw, 22vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
