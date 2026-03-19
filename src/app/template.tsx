"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        layout="position"
        initial={{ opacity: 0, y: 14 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        }}
        exit={{
          opacity: 0,
          y: -10,
          transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
