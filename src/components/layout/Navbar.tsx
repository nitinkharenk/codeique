"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

import { navItems } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { useIstClock } from "@/hooks/useIstClock";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTheme } from "@/components/providers/ThemeProvider";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const time = useIstClock("short");
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { scrollY } = useScroll();
  const homeLogoOpacity = useTransform(scrollY, [120, 180, 240], [0, 0.18, 1]);
  const homeLogoY = useTransform(scrollY, [120, 240], [-10, 0]);
  const homeLogoScale = useTransform(scrollY, [120, 240], [0.9, 1]);
  const { theme } = useTheme();
  const isLight = theme === "light";

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md ${
        isLight
          ? "bg-[linear-gradient(180deg,rgba(249,244,237,0.96),rgba(244,237,227,0.9)_66%,rgba(239,230,218,0.76)_100%)]"
          : "bg-[linear-gradient(180deg,rgba(5,5,5,0.96),rgba(5,5,5,0.88)_66%,rgba(5,5,5,0.74)_100%)]"
      }`}
    >
      <div className="container-shell relative flex items-center justify-between py-3 md:py-4">
        {isHomePage ? (
          <>
            <div aria-hidden className="h-10 w-10 shrink-0 md:hidden" />
            <motion.div
              style={{
                opacity: homeLogoOpacity,
                y: homeLogoY,
                scale: homeLogoScale,
              }}
              className="absolute left-1/2 -translate-x-1/2 origin-center md:static md:translate-x-0 md:origin-left"
            >
              <Link
                href="/"
                className={`display interactive-link text-[2rem] leading-none md:text-[2.15rem] ${isLight ? "text-black" : "text-white"}`}
              >
                Codeique
              </Link>
            </motion.div>
          </>
        ) : (
          <>
            <Link
              href="/"
              className={`display interactive-link text-[2rem] leading-none md:text-[2.15rem] ${
                isLight ? "text-black" : "text-white"
              }`}
            >
              Codeique
            </Link>
          </>
        )}

        {/* Right: status + Let's Talk + Hamburger */}
        <div className="flex items-center gap-2 md:gap-3">
          <div
            className={`hidden items-center gap-3.5 rounded-full px-4 py-2 border backdrop-blur-md md:flex transition-colors duration-300 ${
              isLight
                ? "border-black/5 bg-white/40 shadow-sm hover:bg-white/60"
                : "border-white/5 bg-white/[0.02] shadow-sm hover:bg-white/[0.04]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#42d567] opacity-60"></span>
                <span className="relative inline-flex size-2 rounded-full bg-[#42d567] shadow-[0_0_8px_rgba(66,213,103,0.8)]"></span>
              </span>
              <span
                className={`text-[13px] font-medium tracking-wide ${
                  isLight ? "text-black/80" : "text-white/75"
                }`}
              >
                Available
              </span>
            </div>
            <span className={isLight ? "h-3.5 w-px bg-black/10" : "h-3.5 w-px bg-white/10"} />
            <span
              className={`font-mono text-[13px] font-semibold tracking-tight ${
                isLight ? "text-black/90" : "text-white/90"
              }`}
            >
              {time || "--:--"}
              <span className="ml-[3px] text-[10px] font-bold tracking-widest text-[var(--color-accent)]">IST</span>
            </span>
          </div>
          <Link
            href="/contact"
            className={`hidden items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] backdrop-blur-sm transition-all duration-200 ease-out hover:scale-[1.02] hover:border-[var(--color-accent)]/40 hover:shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] sm:inline-flex md:px-5 md:py-2.5 md:text-sm ${
              isLight
                ? "border border-black/12 bg-black/[0.03] text-black/76 hover:text-black"
                : "border border-white/12 bg-white/[0.03] text-white/80 hover:text-white"
            }`}
          >
            Let&apos;s Talk
          </Link>

          <motion.button
            type="button"
            aria-label="Open navigation menu"
            className={`group flex size-10 shrink-0 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-lg active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] ${
              isLight
                ? "border border-black/12 bg-black/[0.03] hover:border-black/20 hover:bg-black/[0.06]"
                : "border border-white/12 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
            }`}
            onClick={() => setIsOpen(true)}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10 flex flex-col items-center gap-[5px]">
              <motion.span
                className={`block h-[1.5px] w-[18px] rounded-full transition-all duration-300 group-hover:w-[14px] ${
                  isLight ? "bg-black" : "bg-white"
                }`}
              />
              <motion.span
                className={`block h-[1.5px] w-[14px] rounded-full transition-all duration-300 group-hover:w-[18px] ${
                  isLight ? "bg-black" : "bg-white"
                }`}
              />
            </span>
          </motion.button>
        </div>
      </div>

      {/* Full-screen navigation drawer */}
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%", opacity: 0.8 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
              }}
              exit={{
                x: "100%",
                opacity: 0.92,
                transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
              }}
              className={`ml-auto flex min-h-full w-full max-w-md flex-col p-6 md:p-8 ${
                isLight
                  ? "border-l border-black/8 bg-[#f7f1e8]"
                  : "border-l border-white/8 bg-[#080808]"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs uppercase tracking-[0.22em] ${
                    isLight ? "text-black/32" : "text-white/30"
                  }`}
                >
                  Navigation
                </span>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  className={`flex size-10 items-center justify-center rounded-full border text-lg transition-all duration-200 ease-out hover:scale-[1.03] active:scale-[0.97] ${
                    isLight
                      ? "border-black/10 text-black/60 hover:border-black/20 hover:text-black"
                      : "border-white/10 text-white/60 hover:border-white/20 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </button>
              </div>

              {/* Nav links */}
              <nav
                className={`mt-10 flex flex-1 flex-col gap-2 border-t pt-8 ${
                  isLight ? "border-black/8" : "border-white/8"
                }`}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.08 + index * 0.06,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`nav-highlight group flex items-center justify-between border-b py-4 transition-colors duration-200 ${
                        isLight ? "border-black/6" : "border-white/6"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span
                        className={`relative z-10 display text-[2.2rem] transition-colors duration-200 group-hover:text-[var(--color-accent)] md:text-4xl ${
                          isLight ? "text-black" : "text-white"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`relative z-10 text-sm transition-all duration-200 group-hover:translate-x-1 group-hover:text-[var(--color-accent)] ${
                          isLight ? "text-black/24" : "text-white/20"
                        }`}
                      >
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="space-y-4 pt-6"
              >
                <ThemeToggle className="w-full justify-center" />
                <Button href="/contact" className="w-full" variant="primary">
                  Start a Project
                </Button>
                <p
                  className={`text-center text-xs ${
                    isLight ? "text-black/30" : "text-white/25"
                  }`}
                >
                  {siteConfig.email}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
