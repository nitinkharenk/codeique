"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 65%", "end 75%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      testimonials.length - 1,
      Math.floor(latest * testimonials.length),
    );
    setActiveIndex(nextIndex);
  });

  const activeItem = testimonials[activeIndex];

  return (
    <section ref={sectionRef} className="section-divider py-14 md:py-16 xl:min-h-[125vh]">
      <div className="container-shell pt-8 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-4">
            <span className="h-1 w-14 bg-[var(--color-accent)]" />
            <SectionLabel label="Customer Reviews" />
          </div>

          <div className="mt-6 max-w-3xl">
            <h2 className="text-3xl font-semibold leading-[0.96] tracking-[-0.06em] text-[var(--color-foreground)] md:text-5xl lg:text-6xl">
              Reviews that shift as you scroll.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
              Real feedback from the teams we&apos;ve worked with — scroll
              through to see what they had to say about the experience.
            </p>
          </div>

          <div className="mt-12 hidden xl:grid xl:grid-cols-[360px_minmax(0,1fr)] xl:gap-14">
            <div className="sticky top-28 self-start">
              <div className="relative pl-6">
                <div className="absolute left-[3.05rem] top-8 h-[27rem] w-px bg-[linear-gradient(180deg,rgba(255,73,37,0.18),rgba(17,17,17,0.08),rgba(255,73,37,0.18))]" />

                <div className="space-y-14">
                  {testimonials.map((item, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <motion.button
                        key={item.name}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        animate={{
                          opacity: isActive ? 1 : 0.55,
                          x: isActive ? 10 : 0,
                          scale: isActive ? 1 : 0.98,
                        }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="relative flex w-full items-center gap-5 text-left transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-background)]"
                      >
                        <div className="relative flex-shrink-0">
                          <div
                            className={`absolute inset-[-10px] rounded-full bg-[radial-gradient(circle,rgba(255,73,37,0.16),transparent_68%)] transition-opacity duration-300 ${
                              isActive ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            width={80}
                            height={80}
                            className={`relative rounded-full border border-white/10 object-cover shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition-all duration-300 ${
                              isActive ? "size-20" : "size-14"
                            }`}
                          />
                        </div>

                        <div>
                          <p className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[var(--color-foreground)]">
                            {item.name}
                          </p>
                          <p className="mt-1 text-sm text-[var(--color-muted)]">
                            {item.role}
                          </p>
                          <div className="mt-2 flex items-center gap-2 text-xs text-[var(--color-muted)]">
                            <span className="text-[var(--color-accent)]">★</span>
                            <span>{item.rating}</span>
                            <span>{item.date}</span>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="sticky top-28 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,var(--color-card-strong),var(--color-card))] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.name}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                          Featured Testimonial
                        </p>
                        <div className="mt-4 flex items-center gap-4">
                          <Image
                            src={activeItem.avatar}
                            alt={activeItem.name}
                            width={96}
                            height={96}
                            className="size-24 rounded-full border border-white/10 object-cover shadow-[0_14px_36px_rgba(0,0,0,0.2)]"
                          />
                          <div>
                            <p className="text-2xl font-semibold tracking-[-0.04em] text-[var(--color-foreground)]">
                              {activeItem.name}
                            </p>
                            <p className="mt-1 text-base text-[var(--color-muted)]">
                              {activeItem.role}
                            </p>
                            <div className="mt-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
                              <span className="text-[var(--color-accent)]">★</span>
                              <span>{activeItem.rating}</span>
                              <span>{activeItem.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <span
                        aria-hidden
                        className="font-serif text-[5rem] leading-none text-[var(--color-accent)]/35"
                      >
                        "
                      </span>
                    </div>

                    <blockquote className="mt-10 max-w-3xl text-[1.55rem] leading-[1.75] tracking-[-0.03em] text-[var(--color-foreground)] md:text-[1.85rem]">
                      {activeItem.quote}
                    </blockquote>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-0">
                {testimonials.map((item) => (
                  <div key={`${item.name}-trigger`} className="h-[24rem]" aria-hidden />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-5 xl:hidden">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,var(--color-card-strong),var(--color-card))] p-5"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="size-20 rounded-full border border-white/10 object-cover"
                  />
                  <div>
                    <p className="text-xl font-semibold tracking-[-0.03em] text-[var(--color-foreground)]">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">
                      {item.role}
                    </p>
                    <div className="mt-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                      <span className="text-[var(--color-accent)]">★</span>
                      <span>{item.rating}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-lg leading-8 text-[var(--color-foreground)]">
                  {item.quote}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
