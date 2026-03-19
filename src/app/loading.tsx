"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-[var(--color-background)]">
      {/* Rising orange fill */}
      <motion.div
        animate={{ y: ["100%", "0%"] }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-[linear-gradient(180deg,#ff744f_0%,#ff5f3d_30%,#ff4925_68%,#db3515_100%)]"
      >
        {/* Wave shape at top edge */}
        <svg
          className="absolute top-0 left-0 w-full -translate-y-[99%] h-[120px] md:h-[180px]"
          viewBox="0 0 1440 280"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="M0,180 C320,280 400,0 720,140 C1040,280 1120,0 1440,100 L1440,280 L0,280 Z"
            fill="#ff744f"
            animate={{
              d: [
                "M0,180 C320,280 400,0 720,140 C1040,280 1120,0 1440,100 L1440,280 L0,280 Z",
                "M0,100 C320,0 400,280 720,140 C1040,0 1120,280 1440,180 L1440,280 L0,280 Z",
                "M0,180 C320,280 400,0 720,140 C1040,280 1120,0 1440,100 L1440,280 L0,280 Z",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>

      {/* Content layer */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        {/* Brand name — starts white, transitions to black as fill arrives */}
        <motion.div
          animate={{ opacity: [0, 1], y: [24, 0], scale: [0.95, 1] }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="display text-5xl leading-none md:text-7xl"
        >
          <motion.span
            animate={{ color: ["rgba(255,255,255,0.9)", "rgba(5,5,5,1)"] }}
            transition={{ duration: 0.6, delay: 1, ease: "easeInOut" }}
          >
            Codeique
          </motion.span>
        </motion.div>

        {/* Bouncing dots */}
        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex items-center gap-2"
        >
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="block size-1.5 rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                y: [0, -8, 0],
                backgroundColor: [
                  "rgba(255,255,255,0.8)",
                  "rgba(5,5,5,0.8)",
                  "rgba(5,5,5,0.8)",
                ],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: dot * 0.15,
                times: [0, 0.5, 1],
              }}
            />
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-[10px] uppercase tracking-[0.32em] md:text-xs"
        >
          <motion.span
            animate={{ color: ["rgba(255,255,255,0.4)", "rgba(5,5,5,0.55)"] }}
            transition={{ duration: 0.6, delay: 1, ease: "easeInOut" }}
          >
            Loading Experience
          </motion.span>
        </motion.p>
      </div>
    </div>
  );
}
