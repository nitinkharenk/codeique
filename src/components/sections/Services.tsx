"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { services } from "@/lib/data";

export function Services() {
  const [active, setActive] = useState(0);
  const collapseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCollapseTimeout = () => {
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }
  };

  const scheduleCollapse = () => {
    clearCollapseTimeout();
    collapseTimeoutRef.current = setTimeout(() => {
      setActive(-1);
    }, 180);
  };

  useEffect(() => clearCollapseTimeout, []);

  return (
    <section id="services" className="section-divider py-12 md:py-16">
      <div className="container-shell pt-6 md:pt-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
          <h2 className="type-display-title max-w-4xl">
            <ScrambleText>How We Can Help</ScrambleText>
          </h2>
          <SectionLabel label="(SERVICES)" />
        </div>

        <div
          className="mt-8 border-t border-white/10"
          onMouseEnter={clearCollapseTimeout}
          onMouseLeave={scheduleCollapse}
        >
          {services.map((service, index) => {
            const isOpen = active === index;

            return (
              <motion.button
                key={service.title}
                type="button"
                aria-expanded={isOpen}
                className={`w-full border-b border-white/10 px-0 py-5 text-left transition-colors duration-300 md:py-6 ${
                  isOpen ? "bg-white/[0.02]" : "bg-transparent hover:bg-white/[0.01]"
                }`}
                onMouseEnter={() => {
                  clearCollapseTimeout();
                  setActive(index);
                }}
                onFocus={() => {
                  clearCollapseTimeout();
                  setActive(index);
                }}
                onClick={() => {
                  clearCollapseTimeout();
                  setActive(isOpen ? -1 : index);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    clearCollapseTimeout();
                    setActive(isOpen ? -1 : index);
                  }
                }}
                onBlur={scheduleCollapse}
                layout
                transition={{ layout: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
              >
                <div className="grid gap-4 lg:grid-cols-[80px_1fr] lg:items-start lg:gap-6">
                  <motion.div
                    className="text-3xl font-semibold tracking-[-0.06em] text-white/28 transition-colors duration-300 md:text-4xl"
                    animate={{ color: isOpen ? "rgba(255, 73, 37, 0.5)" : "rgba(255,255,255,0.28)" }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.number}
                    <span className="text-[var(--color-accent)]">.</span>
                  </motion.div>
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-start lg:gap-6">
                    <AnimatePresence initial={false} mode="wait">
                      {isOpen ? (
                        <motion.div
                          key={`image-${service.title}`}
                          initial={{ opacity: 0, height: 0, scale: 0.95 }}
                          animate={{ opacity: 1, height: "auto", scale: 1 }}
                          exit={{ opacity: 0, height: 0, scale: 0.95 }}
                          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden rounded-[1rem] border border-white/8">
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              className="object-cover transition-transform duration-700"
                              sizes="(max-width: 1024px) 100vw, 34vw"
                            />
                          </div>
                        </motion.div>
                      ) : (
                        <div className="hidden lg:block" />
                      )}
                    </AnimatePresence>
                    <div>
                      <motion.h3
                        className="type-card-title text-[var(--color-foreground)]"
                        animate={{
                          x: isOpen ? 8 : 0,
                          color: isOpen ? "rgba(255,255,255,1)" : "rgba(202,202,202,1)",
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ScrambleText
                          interactive={false}
                          triggerKey={isOpen ? `service-${index}` : null}
                        >
                          {service.title}
                        </ScrambleText>
                      </motion.h3>
                      <motion.p
                        className="type-body mt-2 max-w-2xl text-sm sm:text-base"
                        animate={{ opacity: isOpen ? 1 : 0.82 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {service.description}
                      </motion.p>
                      <AnimatePresence initial={false} mode="wait">
                        {isOpen ? (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: 10 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -5 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 flex flex-wrap gap-2">
                              {service.items.map((item, i) => (
                                <motion.span
                                  key={item}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/72 transition-colors duration-200 hover:border-[var(--color-accent)]/30 hover:text-white/90 sm:text-sm"
                                >
                                  {item}
                                </motion.span>
                              ))}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
