"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type PointerState = {
  x: number;
  y: number;
  inside: boolean;
};

function useIstClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Kolkata",
    });

    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

const studioLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

const socialLinks = [
  { href: "https://x.com", label: "X / Twitter" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://behance.net", label: "Behance" },
];

export function Footer() {
  const time = useIstClock();
  const brandPanelRef = useRef<HTMLDivElement | null>(null);
  const [pointer, setPointer] = useState<PointerState>({
    x: 50,
    y: 50,
    inside: false,
  });
  const [scrollOffset, setScrollOffset] = useState(0);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["-120%", "0%"]);

  useEffect(() => {
    let frame = 0;

    const updateParallax = () => {
      frame = 0;

      if (!brandPanelRef.current) {
        return;
      }

      const rect = brandPanelRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const visibleProgress = 1 - rect.top / viewportHeight;
      const nextOffset = Math.max(-18, Math.min(18, visibleProgress * 20 - 10));
      setScrollOffset(nextOffset);
    };

    const requestTick = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateParallax);
    };

    requestTick();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
    };
  }, []);

  return (
    <footer ref={containerRef} className="mt-16 bg-[#050505] text-white relative overflow-hidden">
      {/* Top Part (The Curtain) */}
      <div className="relative z-10 bg-[#050505] border-t border-white/6 pb-4 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
        <div className="container-shell">
        <div className="grid gap-8 py-10 md:py-12 lg:grid-cols-2 xl:grid-cols-4">
          {/* Brand + Contact */}
          <div className="space-y-6">
            <Link href="/" className="display inline-block text-4xl leading-none md:text-5xl">
              Codeique
            </Link>

            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/28">(Email)</p>
                <a
                  href="mailto:hello@codeique.com"
                  className="mt-1.5 inline-block text-lg font-semibold tracking-[-0.04em] text-[var(--color-accent)] md:text-2xl"
                >
                  hello@codeique.com
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/28">(Phone)</p>
                <a
                  href="tel:+919876543210"
                  className="mt-1.5 inline-block text-base font-semibold tracking-[-0.04em] text-white/82 md:text-xl"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:contents">
            {/* Studio Links */}
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.28em] text-white/28">(Links)</p>
              <nav className="mt-4 flex flex-col items-start gap-1.5">
                {studioLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="footer-nav-link group inline-flex w-fit items-center text-lg font-medium tracking-[-0.04em] text-white/74 md:text-xl"
                  >
                    <span className="footer-link-text">{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social Links */}
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.28em] text-white/28">(Socials)</p>
              <div className="mt-4 flex flex-col items-start gap-1.5">
                {socialLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-nav-link group inline-flex w-fit items-center gap-2 text-lg font-medium tracking-[-0.04em] text-white/74 md:text-xl"
                  >
                    <span className="footer-link-text">{link.label}</span>
                    <span className="text-sm text-white/35 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--color-accent)]">
                      ↗
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter + Availability */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold tracking-[-0.03em] text-white md:text-base">
                  <span className="inline-block size-2 rounded-full bg-[#42d567] shadow-[0_0_18px_rgba(66,213,103,0.6)]" />
                  Available for project
                </p>
                <p className="mt-1.5 text-xs uppercase tracking-[0.18em] text-white/45">
                  Early Mar 2026
                </p>
              </div>

              <div className="text-right">
                <p className="text-xl font-semibold tracking-[-0.06em] text-white md:text-2xl">
                  {time || "--:--:--"}
                </p>
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">(GMT+5:30)</p>
              </div>
            </div>

            <div>
              <p className="max-w-md text-base leading-snug tracking-[-0.04em] text-white/34 md:text-lg">
                Sign up for our newsletter to get the latest insights and updates.
              </p>
              <form className="mt-5">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Enter email address"
                  aria-label="Email address"
                  className="w-full border-0 border-b border-white/12 bg-transparent px-0 py-3 text-base tracking-[-0.04em] text-white outline-none placeholder:text-white/34 focus:border-[var(--color-accent)] md:text-xl"
                />
                <button
                  type="submit"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-white/12 px-6 py-3 text-sm font-semibold uppercase tracking-[-0.03em] text-white transition-all duration-300 hover:border-[var(--color-accent)] hover:bg-[rgba(255,73,37,0.08)]"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-white/6 py-6 text-sm text-white/42 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p>© 2026 Codeique. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Link href="/privacy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="transition-colors hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold uppercase tracking-[-0.03em] text-white transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Let&apos;s Talk
            </Link>
            <p className="text-xs md:text-sm">Built for brands that want sharper digital presence.</p>
          </div>
        </div>
      </div>
      </div>

      {/* Brand panel */}
      <div className="relative z-0">
        <motion.div style={{ y: textY }}>
          <div
            ref={brandPanelRef}
            className="footer-brand-panel"
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const x = ((event.clientX - rect.left) / rect.width) * 100;
              const y = ((event.clientY - rect.top) / rect.height) * 100;
              setPointer({ x, y, inside: true });
            }}
            onMouseEnter={() => setPointer((current) => ({ ...current, inside: true }))}
            onMouseLeave={() => setPointer({ x: 50, y: 50, inside: false })}
            style={
              {
                "--footer-pointer-x": `${pointer.x}%`,
                "--footer-pointer-y": `${pointer.y}%`,
                "--footer-pointer-opacity": pointer.inside ? 1 : 0,
                "--footer-scroll-shift": `${scrollOffset}px`,
              } as CSSProperties
            }
          >
            <div className="container-shell">
              <div className="footer-brand-inner">
                <div className="footer-brand-word display">Codeique</div>
                <div className="max-w-[18rem] text-left md:text-right">
                  <p className="text-4xl font-semibold leading-[0.88] tracking-[-0.08em] text-black md:text-6xl">
                    Beyond
                    <br />
                    Code.
                    <br />
                    Built with
                    <br />
                    Craft.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
