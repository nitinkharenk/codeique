"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
};

export function AnimatedCounter({
  value,
  label,
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate(latest) {
        setCount(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="border-l border-white/10 px-8 py-10 first:border-l-0"
    >
      <p className="text-6xl font-semibold text-[var(--color-foreground)] md:text-7xl">
        {prefix}
        {count}
        <span className="text-[var(--color-accent)]">{suffix}</span>
      </p>
      <p className="mt-6 max-w-[14ch] text-base leading-8 text-[var(--color-muted)]">
        {label}
      </p>
    </motion.div>
  );
}
