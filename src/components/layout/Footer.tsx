"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useIstClock } from "@/hooks/useIstClock";
import { legalNavigation, siteConfig, socialProfiles } from "@/lib/site";

type PointerState = {
  x: number;
  y: number;
  inside: boolean;
};

const studioLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

function NewsletterForm({ isLight }: { isLight: boolean }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email") as string;
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    // TODO: Connect to newsletter API
    setStatus("success");
    form.reset();
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        name="email"
        required
        placeholder="Enter email address"
        aria-label="Email address"
        className={`w-full border-0 border-b bg-transparent px-0 py-3 text-base tracking-[-0.04em] outline-none focus:border-[var(--color-accent)] md:text-xl ${
          isLight
            ? "border-black/12 text-black placeholder:text-black/34"
            : "border-white/12 text-white placeholder:text-white/34"
        }`}
      />
      <button
        type="submit"
        className={`mt-4 inline-flex w-full items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold uppercase tracking-[-0.03em] transition-all duration-300 hover:border-[var(--color-accent)] hover:bg-[rgba(255,73,37,0.08)] ${
          isLight
            ? "border-black/12 text-black"
            : "border-white/12 text-white"
        }`}
      >
        Subscribe
      </button>
      <div aria-live="polite" className="min-h-6">
        {status === "success" && (
          <p className="mt-2 text-sm text-[#42d567]">
            Thanks for subscribing!
          </p>
        )}
        {status === "error" && (
          <p className="mt-2 text-sm text-[var(--color-accent)]">
            Please enter a valid email.
          </p>
        )}
      </div>
    </form>
  );
}

export function Footer() {
  const time = useIstClock();
  const { theme } = useTheme();
  const isLight = theme === "light";
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
    <footer
      ref={containerRef}
      className={`relative mt-16 overflow-hidden ${
        isLight ? "bg-[#f7f1e8] text-black" : "bg-[#050505] text-white"
      }`}
    >
      {/* Top Part (The Curtain) */}
      <div
        className={`relative z-10 pb-4 ${
          isLight
            ? "border-t border-black/6 bg-[#f7f1e8] shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            : "border-t border-white/6 bg-[#050505] shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
        }`}
      >
        <div className="container-shell">
        <div className="grid gap-8 py-10 md:py-12 lg:grid-cols-2 xl:grid-cols-4">
          {/* Brand + Contact */}
          <div className="space-y-6">
            <Link
              href="/"
              className={`display inline-block text-4xl leading-none md:text-5xl ${
                isLight ? "text-black" : "text-white"
              }`}
            >
              Codeique
            </Link>

            <div className="space-y-4">
              <div>
                <p
                  className={`text-xs uppercase tracking-[0.28em] ${
                    isLight ? "text-black/40" : "text-white/40"
                  }`}
                >
                  (Email)
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-1.5 inline-block text-lg font-semibold tracking-[-0.04em] text-[var(--color-accent)] md:text-2xl"
                >
                  {siteConfig.email}
                </a>
              </div>

              <div>
                <p
                  className={`text-xs uppercase tracking-[0.28em] ${
                    isLight ? "text-black/40" : "text-white/40"
                  }`}
                >
                  (Phone)
                </p>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className={`mt-1.5 inline-block text-base font-semibold tracking-[-0.04em] md:text-xl ${
                    isLight ? "text-black/80" : "text-white/82"
                  }`}
                >
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:contents">
            {/* Studio Links */}
            <div className="min-w-0">
              <p
                className={`text-xs uppercase tracking-[0.28em] ${
                  isLight ? "text-black/40" : "text-white/40"
                }`}
              >
                (Links)
              </p>
              <nav className="mt-4 flex flex-col items-start gap-1.5">
                {studioLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`footer-nav-link group inline-flex w-fit items-center text-lg font-medium tracking-[-0.04em] md:text-xl ${
                      isLight ? "text-black/72" : "text-white/74"
                    }`}
                  >
                    <span className="footer-link-text">{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social Links */}
            <div className="min-w-0">
              <p
                className={`text-xs uppercase tracking-[0.28em] ${
                  isLight ? "text-black/40" : "text-white/40"
                }`}
              >
                (Socials)
              </p>
              <div className="mt-4 flex flex-col items-start gap-1.5">
                {socialProfiles.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`footer-nav-link group inline-flex w-fit items-center gap-2 text-lg font-medium tracking-[-0.04em] md:text-xl ${
                      isLight ? "text-black/72" : "text-white/74"
                    }`}
                  >
                    <span className="footer-link-text">{link.label}</span>
                    <span
                      className={`text-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--color-accent)] ${
                        isLight ? "text-black/32" : "text-white/35"
                      }`}
                    >
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter + Availability */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p
                  className={`flex items-center gap-2 text-sm font-semibold tracking-[-0.03em] md:text-base ${
                    isLight ? "text-black" : "text-white"
                  }`}
                >
                  <span className="inline-block size-2 rounded-full bg-[#42d567] shadow-[0_0_18px_rgba(66,213,103,0.6)]" />
                  Available for project
                </p>
                <p
                  className={`mt-1.5 text-xs uppercase tracking-[0.18em] ${
                    isLight ? "text-black/42" : "text-white/45"
                  }`}
                >
                  Currently available
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`text-xl font-semibold tracking-[-0.06em] md:text-2xl ${
                    isLight ? "text-black" : "text-white"
                  }`}
                >
                  {time || "--:--:--"}
                </p>
                <p
                  className={`text-xs uppercase tracking-[0.16em] ${
                    isLight ? "text-black/42" : "text-white/45"
                  }`}
                >
                  (GMT+5:30)
                </p>
              </div>
            </div>

            <div>
              <p
                className={`max-w-md text-base leading-snug tracking-[-0.04em] md:text-lg ${
                  isLight ? "text-black/38" : "text-white/34"
                }`}
              >
                Sign up for our newsletter to get the latest insights and updates.
              </p>
              <NewsletterForm isLight={isLight} />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`flex flex-col gap-3 border-t py-6 text-sm lg:flex-row lg:items-center lg:justify-between ${
            isLight ? "border-black/6 text-black/44" : "border-white/6 text-white/42"
          }`}
        >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <p>© 2026 Codeique. All rights reserved.</p>
              <div className="flex items-center gap-2">
                {legalNavigation.map((item, index) => (
                  <span key={item.href} className="contents">
                    {index > 0 ? <span>•</span> : null}
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-[var(--color-foreground)]"
                    >
                      {item.label}
                    </Link>
                  </span>
                ))}
              </div>
            </div>

          <div className="flex flex-wrap items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className={`inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-[-0.03em] transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] ${
                isLight ? "border-black/15 text-black" : "border-white/15 text-white"
              }`}
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
