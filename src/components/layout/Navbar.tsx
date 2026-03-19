"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { navItems } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

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
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container-shell flex items-center justify-between py-3 md:py-4">
        {isHomePage ? (
          <>
            <Link
              href="/"
              className="display text-[2rem] leading-none text-white md:hidden"
            >
              Codeique
            </Link>
            <div className="pointer-events-none hidden h-[1.2rem] w-24 md:block md:h-[1.5rem] md:w-32" />
          </>
        ) : (
          <Link
            href="/"
            className="display interactive-link text-[2rem] leading-none text-white md:text-[2.15rem]"
          >
            Codeique
          </Link>
        )}

        {/* Right: status + Let's Talk + Hamburger */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden items-center gap-4 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 md:flex">
            <div className="flex items-center gap-2.5">
              <span className="inline-block size-2 rounded-full bg-[#42d567] shadow-[0_0_12px_rgba(66,213,103,0.6)]" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70">
                Available
              </span>
            </div>
            <span className="h-4 w-px bg-white/12" />
            <span className="font-mono text-sm tracking-[-0.01em] text-white/65">
              {time || "--:--"} IST
            </span>
          </div>
          <Link
            href="/contact"
            className="hidden items-center rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white/80 backdrop-blur-sm transition-all duration-200 ease-out hover:scale-[1.02] hover:border-[var(--color-accent)]/40 hover:text-white hover:shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] sm:inline-flex md:px-5 md:py-2.5 md:text-sm"
          >
            Let&apos;s Talk
          </Link>

          <motion.button
            type="button"
            aria-label="Open navigation menu"
            className="group flex size-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] backdrop-blur-sm transition-all duration-200 ease-out hover:scale-[1.03] hover:border-white/25 hover:bg-white/[0.06] hover:shadow-lg active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
            onClick={() => setIsOpen(true)}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10 flex flex-col items-center gap-[5px]">
              <motion.span
                className="block h-[1.5px] w-[18px] rounded-full bg-white transition-all duration-300 group-hover:w-[14px]"
              />
              <motion.span
                className="block h-[1.5px] w-[14px] rounded-full bg-white transition-all duration-300 group-hover:w-[18px]"
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
              className="ml-auto flex min-h-full w-full max-w-md flex-col border-l border-white/8 bg-[#080808] p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.22em] text-white/30">
                  Navigation
                </span>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 text-lg text-white/60 transition-all duration-200 ease-out hover:scale-[1.03] hover:border-white/20 hover:text-white active:scale-[0.97]"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </button>
              </div>

              {/* Nav links */}
              <nav className="mt-10 flex flex-1 flex-col gap-2 border-t border-white/8 pt-8">
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
                      className="nav-highlight group flex items-center justify-between border-b border-white/6 py-4 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="relative z-10 display text-[2.2rem] transition-colors duration-200 group-hover:text-[var(--color-accent)] md:text-4xl">
                        {item.label}
                      </span>
                      <span className="relative z-10 text-sm text-white/20 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[var(--color-accent)]">
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
                <Button href="/contact" className="w-full" variant="primary">
                  Start a Project
                </Button>
                <p className="text-center text-xs text-white/25">
                  hello@codeique.com
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
