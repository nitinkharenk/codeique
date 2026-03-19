import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { blogPosts } from "@/lib/data";

export default function BlogPage() {
  const [featuredPost, ...morePosts] = blogPosts;

  return (
    <>
      <Navbar />
      <main className="pb-16 pt-28 md:pb-20 md:pt-32">
        <section className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--color-accent)]">
                (BLOG)
              </p>
              <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white md:text-7xl">
                Writing on design systems, motion, conversion, and digital positioning.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-muted)] md:text-xl">
                Short reads for teams that want their brand and website to feel more intentional,
                more credible, and more effective.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.22em] text-white/35">Editorial Focus</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Strategy", "Brand", "Motion", "Design Systems", "Positioning"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--color-muted)] md:text-base">
                These notes are written from active studio work: what helps brands feel sharper,
                what helps websites convert better, and where craft actually changes perception.
              </p>
            </div>
          </div>
        </section>

        <section className="container-shell mt-14">
          <article className="overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.03]">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[20rem]">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col justify-between p-6 md:p-8 lg:p-10">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/45">
                    <span className="text-[var(--color-accent)]">{featuredPost.category}</span>
                    <span>{featuredPost.date}</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.05em] text-white md:text-5xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
                    {featuredPost.excerpt}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex w-fit items-center rounded-full border border-white/12 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  Discuss a Project
                </Link>
              </div>
            </div>
          </article>
        </section>

        <section className="container-shell mt-16 grid gap-6 lg:grid-cols-[1fr_0.34fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {morePosts.map((post) => (
              <article
                key={post.title}
                className="overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/[0.03]"
              >
                <div className="relative aspect-[16/10]">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
                    <span className="text-[var(--color-accent)]">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-white">
                    {post.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] md:text-base">
                    {post.excerpt}
                  </p>
                  <p className="mt-5 text-sm text-white/38">{post.date}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-6 md:p-7">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-accent)]">
              (WHY READ)
            </p>
            <h3 className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-white">
              Ideas from active client work, not theory in a vacuum.
            </h3>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--color-muted)] md:text-base">
              <p>We focus on the moments where design choices affect trust, clarity, and conversion.</p>
              <p>Most posts are short, practical, and grounded in patterns we see across studio engagements.</p>
              <p>Good websites are rarely about more features. They are usually about better decisions.</p>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
