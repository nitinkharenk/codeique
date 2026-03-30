import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on design, motion, branding, and what makes digital products feel credible and conversion-ready.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const [featuredPost, ...morePosts] = blogPosts;

  return (
    <>
      <Navbar />
      <main id="main-content" className="pb-16 pt-28 md:pb-20 md:pt-32">
        {/* ── Header ── */}
        <section className="container-shell animate-fade-in-up">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--color-accent)]">
                (BLOG)
              </p>
              <h1 className="type-page-title mt-6 max-w-5xl">
                <ScrambleText>
                  Writing on design systems, motion, conversion, and digital
                  positioning.
                </ScrambleText>
              </h1>
              <p className="type-body-lg mt-6 max-w-3xl md:text-xl">
                Short reads for teams that want their brand and website to feel
                more intentional, more credible, and more effective.
              </p>
            </div>

            {/* ── Editorial focus card — typographic, borderless ── */}
            <div className="border-l-[3px] border-[var(--color-accent)] pl-6 md:pl-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/35">
                Editorial Focus
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {["Strategy", "Brand", "Motion", "Design Systems", "Positioning"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs uppercase tracking-[0.18em] text-white/60 border-b border-white/15 pb-px"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
              <p className="mt-6 text-sm leading-7 text-[var(--color-muted)] md:text-base">
                These notes are written from active studio work: what helps
                brands feel sharper, what helps websites convert better, and
                where craft actually changes perception.
              </p>
            </div>
          </div>
        </section>

        {/* ── Featured post — cinematic full-bleed ── */}
        <section className="container-shell mt-14">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block relative overflow-hidden bg-black"
          >
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              {/* Image — full bleed */}
              <div className="relative min-h-[22rem] lg:min-h-[36rem] overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80 hidden lg:block" />
                {/* Corner marks */}
                <span aria-hidden className="absolute top-4 left-4 w-5 h-5 border-l-2 border-t-2 border-white/30 pointer-events-none z-10" />
                <span aria-hidden className="absolute bottom-4 right-4 w-5 h-5 border-r-2 border-b-2 border-[var(--color-accent)]/40 pointer-events-none z-10" />
              </div>

              {/* Content */}
              <div className="relative flex flex-col justify-between p-6 md:p-8 lg:p-10 bg-[#0c0c0c] lg:bg-transparent">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em]">
                    <span className="text-[var(--color-accent)] font-mono">
                      {featuredPost.category}
                    </span>
                    <span className="text-white/30">{featuredPost.date}</span>
                    <span className="text-white/30">{featuredPost.readTime}</span>
                  </div>

                  <div className="overflow-hidden mt-6">
                    <h2 className="text-3xl font-semibold leading-tight tracking-[-0.05em] text-white md:text-4xl lg:text-5xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                      <ScrambleText>{featuredPost.title}</ScrambleText>
                    </h2>
                  </div>

                  <p className="mt-5 text-base leading-8 text-[var(--color-muted)] md:text-lg">
                    {featuredPost.excerpt}
                  </p>
                </div>

                {/* CTA — text link with animated underline */}
                <div className="mt-8">
                  <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-white/60 transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                    Read Article
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                  <div className="mt-2 h-px w-0 bg-[var(--color-accent)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-32" />
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* ── More posts — horizontal row cards ── */}
        <section className="container-shell mt-16 grid gap-8 lg:grid-cols-[1fr_0.34fr]">
          <div className="border-t border-white/10">
            {morePosts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex gap-5 border-b border-white/10 py-7 md:gap-8 md:py-8"
              >
                {/* Post number */}
                <span
                  aria-hidden
                  className="flex-shrink-0 font-mono text-[10px] tracking-[0.1em] text-white/20 mt-1"
                >
                  {String(i + 2).padStart(2, "0")}
                </span>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                      {post.category}
                    </span>
                    <span className="font-mono text-[10px] text-white/25">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.04em] text-white transition-all duration-300 group-hover:text-[var(--color-accent)] md:text-2xl leading-tight">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)] line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="mt-3 font-mono text-[10px] text-white/30">{post.date}</p>
                </div>

                {/* Thumbnail */}
                <div className="relative flex-shrink-0 w-24 aspect-[4/3] overflow-hidden md:w-36">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* ── Sidebar — open-frame typographic ── */}
          <aside className="border-l border-white/8 pl-6 md:pl-8 self-start sticky top-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
              (WHY READ)
            </p>
            <h3 className="mt-5 text-xl font-semibold tracking-[-0.05em] text-white leading-tight">
              Ideas from active client work, not theory in a vacuum.
            </h3>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--color-muted)]">
              <p>
                We focus on the moments where design choices affect trust,
                clarity, and conversion.
              </p>
              <p>
                Most posts are short, practical, and grounded in patterns we
                see across studio engagements.
              </p>
            </div>
            <div className="mt-8 border-t border-white/8 pt-6">
              <p className="text-sm text-white/40">Have a project in mind?</p>
              <Link
                href="/contact"
                className="group mt-3 inline-flex items-center gap-2 text-sm font-semibold tracking-[-0.02em] text-white transition-colors hover:text-[var(--color-accent)]"
              >
                Discuss with us
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
