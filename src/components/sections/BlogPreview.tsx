"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { blogPosts } from "@/lib/data";
import { ease, viewportOnce } from "@/lib/animations";

export function BlogPreview() {
  return (
    <section className="section-divider py-14 md:py-16">
      <div className="container-shell pt-8 md:pt-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-5xl">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.3, ease: ease.out }}
              className="display text-[3.5rem] text-[var(--color-foreground)] md:text-[6rem] lg:text-[7rem]"
            >
              <ScrambleText>Latest Insights</ScrambleText>
            </motion.h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex rounded-full border border-white/10 px-8 py-3 text-lg font-semibold text-[var(--color-accent)] transition-all duration-200 ease-out hover:scale-[1.02] hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/5 hover:shadow-lg active:scale-[0.98]"
          >
            See All ↗
          </Link>
        </div>
        <div className="mt-2 flex justify-end">
          <SectionLabel label="(BLOG)" />
        </div>

        {/* ── Blog cards — full-bleed overlay tiles ── */}
        <div className="mt-8 grid gap-px sm:grid-cols-2 lg:grid-cols-3 bg-white/[0.06]">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ delay: index * 0.1, duration: 0.5, ease: ease.out }}
              className="group relative bg-black overflow-hidden"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                {/* Full-bleed image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Gradient overlay — darkens bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Index number — ghosted background element */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-3 top-3 font-mono text-[6rem] font-bold leading-none text-white opacity-[0.04] select-none"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Category badge — top left */}
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="inline-block bg-[var(--color-accent)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                      {post.category}
                    </span>
                  </div>

                  {/* Bottom content — slides up on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">
                      {post.date}
                    </p>

                    {/* Title: visible part + reveal part */}
                    <div className="overflow-hidden">
                      <h3 className="text-xl font-semibold leading-[1.1] tracking-[-0.04em] text-white md:text-2xl translate-y-0 group-hover:translate-y-[-4px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                        {post.title}
                      </h3>
                    </div>

                    {/* Excerpt — hidden by default, reveals on hover */}
                    <div className="overflow-hidden mt-2">
                      <p className="text-sm leading-6 text-white/55 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Read link */}
                    <div className="flex items-center gap-1.5 mt-4 overflow-hidden">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)] translate-x-[-6px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]">
                        Read
                      </span>
                      <span className="text-[var(--color-accent)] translate-x-[-6px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-400 delay-[40ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
