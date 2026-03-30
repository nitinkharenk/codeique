"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { featuredProjects } from "@/lib/data";
import type { Project } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/animations";

function SectionCard({
  label,
  children,
  className = "",
  delay = 0,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-[1.5rem] border border-white/8 bg-white/[0.02] p-6 md:p-8 ${className}`}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
        {label}
      </p>
      {children}
    </motion.section>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
        {label}
      </p>
      <p className="mt-1.5 text-sm text-white/80">{value}</p>
    </div>
  );
}

function TechBadge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "accent";
}) {
  const styles =
    variant === "accent"
      ? "border-[var(--color-accent)]/20 bg-[rgba(34,15,13,0.5)] text-[var(--color-accent)]/80"
      : "border-white/8 bg-white/[0.03] text-white/60";
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] ${styles}`}
    >
      {children}
    </span>
  );
}

function ColorSwatch({
  color,
}: {
  color: { name: string; value: string; usage: string };
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="mt-0.5 h-10 w-10 shrink-0 rounded-lg border border-white/10"
        style={{ backgroundColor: color.value }}
      />
      <div>
        <p className="text-sm font-medium text-white/80">{color.name}</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
          {color.value}
        </p>
        <p className="mt-0.5 text-xs text-white/50">{color.usage}</p>
      </div>
    </div>
  );
}

function ProjectHero({ project }: { project: Project }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-12">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--color-accent)]"
        >
          ({project.category})
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="type-page-title mt-5 text-white"
        >
          <ScrambleText>{project.title}</ScrambleText>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="type-body-lg mt-5 max-w-xl md:text-xl"
        >
          {project.description}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          <MetaItem label="Year" value={project.year} />
          <MetaItem label="Duration" value={project.duration} />
          <MetaItem label="Role" value={project.role} />
          <MetaItem label="Category" value={project.category} />
        </motion.div>

        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
          {project.highlights.map((item) => (
            <TechBadge key={item} variant="accent">
              {item}
            </TechBadge>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/35 bg-[rgba(34,15,13,0.92)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[rgba(52,18,14,0.96)]"
            >
              Live Preview <span aria-hidden>↗</span>
            </Link>
          ) : null}
          <Link
            href="/works"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/80 transition-all duration-300 hover:border-white/20 hover:text-white"
          >
            ← All Projects
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </motion.div>
    </div>
  );
}

function GalleryGrid({ project }: { project: Project }) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {project.gallery.map((image, index) => (
        <motion.div
          key={image}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: index * 0.1,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group relative aspect-[16/10] overflow-hidden rounded-[1.4rem] border border-white/8 bg-white/[0.02]"
        >
          <Image
            src={image}
            alt={`${project.title} screenshot ${index + 1}`}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </motion.div>
      ))}
    </div>
  );
}

function OverviewGrid({ project }: { project: Project }) {
  const cards = [
    { label: "Overview", content: project.overview },
    { label: "Challenge", content: project.challenge },
    { label: "Solution", content: project.solution },
    { label: "Outcome", content: project.outcome },
  ];

  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2">
      {cards.map((card, i) => (
        <SectionCard key={card.label} label={card.label} delay={i * 0.08}>
          <p className="mt-4 text-base leading-8 text-white/80">
            {card.content}
          </p>
        </SectionCard>
      ))}
    </div>
  );
}

function UIUXSection({ project }: { project: Project }) {
  return (
    <div className="mt-8 space-y-5">
      <SectionCard label="UI/UX — Design Philosophy">
        <p className="mt-4 text-base leading-8 text-white/80">
          {project.uiux.designPhilosophy}
        </p>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.18em] text-white/35">
            Color Palette
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {project.uiux.colorPalette.map((color) => (
              <ColorSwatch key={color.value} color={color} />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.18em] text-white/35">
            Typography
          </p>
          <p className="mt-3 text-sm leading-7 text-white/70">
            {project.uiux.typography}
          </p>
        </div>
      </SectionCard>

      <SectionCard label="UI/UX — Key Decisions" delay={0.08}>
        <div className="mt-5 grid gap-3">
          {project.uiux.keyDecisions.map((decision, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.06,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex gap-4 rounded-[1.1rem] border border-white/6 bg-black/20 px-5 py-4"
            >
              <span className="mt-0.5 shrink-0 font-mono text-[10px] text-[var(--color-accent)]/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-7 text-white/75">{decision}</p>
            </motion.div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function FrontendSection({ project }: { project: Project }) {
  return (
    <div className="mt-8 space-y-5">
      <SectionCard label="Frontend — Architecture">
        <p className="mt-4 text-base leading-8 text-white/80">
          {project.frontend.architecture}
        </p>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.18em] text-white/35">
            Implementation Patterns
          </p>
          <div className="mt-4 grid gap-3">
            {project.frontend.patterns.map((pattern, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-[1rem] border border-white/6 bg-black/20 px-5 py-4 text-sm leading-7 text-white/75"
              >
                {pattern}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.18em] text-white/35">
            Performance
          </p>
          <p className="mt-3 text-sm leading-7 text-white/70">
            {project.frontend.performance}
          </p>
        </div>
      </SectionCard>
    </div>
  );
}

function BackendSection({ project }: { project: Project }) {
  return (
    <div className="mt-8 space-y-5">
      <SectionCard label="Backend — Architecture">
        <p className="mt-4 text-base leading-8 text-white/80">
          {project.backend.architecture}
        </p>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.18em] text-white/35">
            Key Features
          </p>
          <div className="mt-4 grid gap-3">
            {project.backend.keyFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-[1rem] border border-white/6 bg-black/20 px-5 py-4 text-sm leading-7 text-white/75"
              >
                {feature}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.18em] text-white/35">
            Database
          </p>
          <p className="mt-3 text-sm leading-7 text-white/70">
            {project.backend.database}
          </p>
        </div>
      </SectionCard>
    </div>
  );
}

function TechStackSection({ project }: { project: Project }) {
  const stacks = [
    { label: "Frontend", items: project.techStack.frontend, variant: "accent" as const },
    { label: "Backend", items: project.techStack.backend, variant: "default" as const },
    { label: "Infrastructure", items: project.techStack.infrastructure, variant: "default" as const },
    { label: "Tools & Services", items: project.techStack.tools, variant: "default" as const },
  ];

  return (
    <SectionCard label="Tech Stack" className="mt-8">
      <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stacks.map((stack) => (
          <div key={stack.label}>
            <p className="text-xs uppercase tracking-[0.18em] text-white/35">
              {stack.label}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {stack.items.map((item) => (
                <TechBadge key={item} variant={stack.variant}>
                  {item}
                </TechBadge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function ContextSection({ project }: { project: Project }) {
  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <SectionCard label="Project Context">
        <div className="mt-5 space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/35">
              Audience
            </p>
            <p className="mt-2 text-sm leading-7 text-white/80 md:text-base">
              {project.audience}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/35">
              Scope
            </p>
            <p className="mt-2 text-sm leading-7 text-white/80 md:text-base">
              {project.scope}
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard label="Deliverables & Impact" delay={0.08}>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/35">
              Deliverables
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.deliverables.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-white/72"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/35">
              Impact
            </p>
            <div className="mt-3 space-y-2">
              {project.results.map((item) => (
                <div
                  key={item}
                  className="rounded-[1rem] border border-white/8 bg-black/20 px-4 py-3 text-sm text-white/80"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function DetailedExplanation({ project }: { project: Project }) {
  return (
    <SectionCard label="Detailed Explanation" className="mt-8">
      <div className="mt-5 grid gap-4">
        {project.details.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.06,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-[1.1rem] border border-white/8 bg-black/20 px-4 py-4 text-sm leading-7 text-white/80 md:text-base"
          >
            {item}
          </motion.div>
        ))}
      </div>
    </SectionCard>
  );
}

function ProjectNavigation({ currentSlug }: { currentSlug: string }) {
  const currentIndex = featuredProjects.findIndex(
    (p) => p.slug === currentSlug
  );
  const prev =
    currentIndex > 0 ? featuredProjects[currentIndex - 1] : null;
  const next =
    currentIndex < featuredProjects.length - 1
      ? featuredProjects[currentIndex + 1]
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16 border-t border-white/8 pt-10"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/30">
        More Projects
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/works/${prev.slug}`}
            className="group flex items-center gap-4 rounded-[1.2rem] border border-white/8 bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]"
          >
            <span className="text-white/30 transition-colors group-hover:text-[var(--color-accent)]">
              ←
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                Previous
              </p>
              <p className="mt-1 text-sm font-medium text-white/80">
                {prev.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/works/${next.slug}`}
            className="group flex items-center justify-end gap-4 rounded-[1.2rem] border border-white/8 bg-white/[0.02] p-5 text-right transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                Next
              </p>
              <p className="mt-1 text-sm font-medium text-white/80">
                {next.title}
              </p>
            </div>
            <span className="text-white/30 transition-colors group-hover:text-[var(--color-accent)]">
              →
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </motion.div>
  );
}

export function ProjectPageClient({
  project,
  currentSlug,
}: {
  project: Project;
  currentSlug: string;
}) {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="container-shell pb-14 pt-28 md:pb-20 md:pt-36"
      >
        <ProjectHero project={project} />
        <GalleryGrid project={project} />
        <OverviewGrid project={project} />
        <TechStackSection project={project} />
        <UIUXSection project={project} />
        <FrontendSection project={project} />
        <BackendSection project={project} />
        <ContextSection project={project} />
        <DetailedExplanation project={project} />
        <ProjectNavigation currentSlug={currentSlug} />
      </main>
      <Footer />
    </>
  );
}
