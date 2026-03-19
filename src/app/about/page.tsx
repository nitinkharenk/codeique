import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import {
  aboutPillars,
  aboutTimeline,
  featuredProjects,
  stats,
  studioPrinciples,
} from "@/lib/data";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pb-16 pt-28 md:pb-20 md:pt-32">
        <section className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--color-accent)]">
                (ABOUT)
              </p>
              <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white md:text-7xl">
                We build digital presence that feels precise, considered, and commercially sharp.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)] md:text-xl">
                Codeique is a design and development studio for teams that want more than a
                polished surface. We help founders and growing brands translate ambition into a
                clear story, a stronger identity, and a website that performs with confidence.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.22em] text-white/35">What We Care About</p>
              <div className="mt-6 space-y-4">
                {studioPrinciples.map((principle) => (
                  <div
                    key={principle}
                    className="rounded-[1.25rem] border border-white/8 bg-black/20 px-4 py-4 text-lg tracking-[-0.04em] text-white/82"
                  >
                    {principle}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container-shell mt-14 md:mt-18">
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-6"
              >
                <p className="text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">
                  {item.value}
                  {item.suffix}
                </p>
                <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--color-muted)] md:text-base">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="container-shell mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--color-accent)]">
              (APPROACH)
            </p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.05em] text-white md:text-5xl">
              A studio process built for momentum, not drag.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
              We keep the process collaborative and focused. Strategy, design, and front-end
              implementation stay tightly connected, which means fewer handoff gaps and better
              decisions all the way through launch.
            </p>
          </div>

          <div className="space-y-4">
            {aboutTimeline.map((item, index) => (
              <div
                key={item.phase}
                className="grid gap-4 rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-5 md:grid-cols-[80px_1fr] md:gap-6 md:p-6"
              >
                <p className="text-xl font-semibold tracking-[-0.06em] text-white/35 md:text-2xl">
                  0{index + 1}
                </p>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.04em] text-white md:text-2xl">
                    {item.phase}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-muted)] md:text-base">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container-shell mt-16">
          <div className="grid gap-6 lg:grid-cols-3">
            {aboutPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-6 md:p-7"
              >
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-accent)]">
                  Studio Pillar
                </p>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-white">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] md:text-base">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="container-shell mt-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--color-accent)]">
                (SELECTED WORK)
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
                A few projects that reflect how we think.
              </h2>
            </div>
            <Link
              href="/works"
              className="inline-flex w-fit items-center rounded-full border border-white/12 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              View Works
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featuredProjects.slice(0, 2).map((project) => (
              <article
                key={project.title}
                className="overflow-hidden rounded-[1.8rem] border border-white/8 bg-white/[0.03]"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
                    {project.category}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)] md:text-base">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
