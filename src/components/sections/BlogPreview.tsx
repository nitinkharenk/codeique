"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { blogPosts } from "@/lib/data";
import { ease, stagger, viewportOnce } from "@/lib/animations";

export function BlogPreview() {
  return (
    <section className="section-divider py-14 md:py-16">
      <motion.div
        className="container-shell pt-8 md:pt-10"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-5xl">
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: ease.out } },
              }}
              className="display text-[3.5rem] text-[var(--color-foreground)] md:text-[6rem] lg:text-[7rem]"
            >
              Latest Insights
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

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: index * 0.1, duration: 0.32, ease: ease.out }}
              whileHover={{ y: -4, transition: { duration: 0.22, ease: ease.out } }}
              className="interactive-card group overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#111] hover:border-white/20"
            >
              <div className="interactive-media relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <div className="inline-flex rounded-full border border-white/10 px-3 py-1.5 text-sm text-[var(--color-foreground)]">
                  {post.category}
                </div>
                <p className="mt-4 text-sm text-[var(--color-muted)]">{post.date}</p>
                <h3 className="mt-2 text-2xl font-semibold leading-[0.98] tracking-[-0.05em] text-[var(--color-foreground)] md:text-3xl">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{post.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
