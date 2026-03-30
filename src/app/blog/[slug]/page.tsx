import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { blogPosts, getBlogPostBySlug } from "@/lib/data";
import type { BodyBlock } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: "Codeique", url: "https://codeique.studio" }],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Codeique"],
      url: `${siteConfig.url}/blog/${post.slug}`,
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

function BodyRenderer({ blocks }: { blocks: readonly BodyBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={i}
                className="text-base leading-8 text-[var(--color-muted)] md:text-[1.05rem]"
              >
                {block.content}
              </p>
            );
          case "heading":
            return (
              <h2
                key={i}
                className="pt-4 text-2xl font-semibold tracking-[-0.04em] text-white md:text-3xl"
              >
                <ScrambleText>{block.content}</ScrambleText>
              </h2>
            );
          case "subheading":
            return (
              <h3
                key={i}
                className="pt-2 text-xl font-semibold tracking-[-0.03em] text-white md:text-2xl"
              >
                {block.content}
              </h3>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="relative my-8 rounded-[1.25rem] border border-[var(--color-accent)]/20 bg-[rgba(34,15,13,0.5)] px-6 py-5"
              >
                <span
                  aria-hidden
                  className="absolute -top-3 left-5 font-mono text-3xl leading-none text-[var(--color-accent)]/30"
                >
                  "
                </span>
                <p className="text-base leading-8 font-medium text-white/80 italic md:text-lg">
                  {block.content}
                </p>
                {block.attribution && (
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                    — {block.attribution}
                  </p>
                )}
              </blockquote>
            );
          case "list":
            return (
              <ul key={i} className="space-y-3 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    <span className="text-base leading-7 text-[var(--color-muted)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: new Date(post.date).toISOString(),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon`,
      },
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <>
      <Navbar />
      <main id="main-content" className="pb-20 pt-28 md:pt-32">
        {/* ── Article header ── */}
        <header className="container-shell">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.22em]">
              <Link
                href="/blog"
                className="text-white/40 transition-colors hover:text-white"
              >
                Blog
              </Link>
              <span className="text-white/20">→</span>
              <span className="text-[var(--color-accent)]">{post.category}</span>
            </div>

            <h1 className="type-page-title mt-6 text-white md:text-6xl">
              <ScrambleText>{post.title}</ScrambleText>
            </h1>

            <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* ── Hero image ── */}
        <section className="container-shell mt-10">
          <div className="relative aspect-[16/7] overflow-hidden rounded-[2rem] border border-white/8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 90vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </section>

        {/* ── Article body ── */}
        <article className="container-shell mt-12">
          <div className="mx-auto max-w-2xl">
            <BodyRenderer blocks={post.body} />
          </div>
        </article>

        {/* ── CTA / share ── */}
        <section className="container-shell mt-16">
          <div className="rounded-[2rem] border border-white/8 bg-[linear-gradient(135deg,rgba(255,73,37,0.07),rgba(255,255,255,0.02))] p-8 md:p-12">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  Start a project
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white md:text-3xl">
                  <ScrambleText>Interested in working together?</ScrambleText>
                </h2>
                <p className="mt-3 max-w-md text-base leading-7 text-white/60">
                  If this sparked an idea or you want to talk through your own
                  project, we&apos;d love to hear from you.
                </p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/35 bg-[rgba(34,15,13,0.92)] px-6 py-3 text-sm font-semibold uppercase tracking-[-0.02em] text-[var(--color-accent)] shadow-[var(--shadow-accent)] transition-all hover:brightness-110"
              >
                Get in Touch →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Post navigation ── */}
        <nav className="container-shell mt-12 border-t border-white/8 pt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/30">
            More Articles
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group flex items-center gap-4 rounded-[1.2rem] border border-white/8 bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]"
              >
                <span className="text-white/30 transition-colors group-hover:text-[var(--color-accent)]">
                  ←
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                    Previous
                  </p>
                  <p className="mt-1 text-sm font-medium leading-5 text-white/80">
                    {prevPost.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group flex items-center justify-end gap-4 rounded-[1.2rem] border border-white/8 bg-white/[0.02] p-5 text-right transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                    Next
                  </p>
                  <p className="mt-1 text-sm font-medium leading-5 text-white/80">
                    {nextPost.title}
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
        </nav>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
    </>
  );
}
