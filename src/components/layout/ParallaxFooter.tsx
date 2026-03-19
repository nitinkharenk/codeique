"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxFooter({ children }: { children: React.ReactNode }) {
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setFooterHeight(entry.contentRect.height);
      }
    });
    resizeObserver.observe(footerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <div ref={containerRef} style={{ height: footerHeight }} className="relative">
      <motion.div
        ref={footerRef}
        style={{ y }}
        className="fixed bottom-0 left-0 right-0 w-full z-0"
      >
        {children}
      </motion.div>
    </div>
  );
}