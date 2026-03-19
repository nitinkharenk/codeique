"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type AccordionItem = {
  question: string;
  answer: string;
};

export function Accordion({ items }: { items: readonly AccordionItem[] }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = open === index;

        return (
          <motion.div
            key={item.question}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
            className={`rounded-[1.25rem] border bg-transparent px-5 py-4 transition-all duration-300 md:px-6 md:py-5 ${
              isOpen ? "border-white/20 bg-white/[0.02]" : "border-white/10 hover:border-white/15"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 text-left"
              onClick={() => setOpen(isOpen ? -1 : index)}
            >
              <span className="text-lg font-medium text-[var(--color-foreground)] md:text-xl">
                {item.question}
              </span>
              <motion.span
                className="flex size-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 text-xl leading-none text-[var(--color-accent)]"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pt-4 text-sm leading-7 text-[var(--color-muted)] md:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
