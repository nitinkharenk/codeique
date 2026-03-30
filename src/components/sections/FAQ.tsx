"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Accordion } from "@/components/ui/Accordion";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { faqItems } from "@/lib/data";

export function FAQ() {
  return (
    <section className="section-divider py-14 md:py-16">
      <div className="container-shell pt-8 md:pt-10">
        <div className="grid gap-8 lg:grid-cols-[0.48fr_1.52fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="type-display-title">
              <ScrambleText>FAQ</ScrambleText>
            </h2>
            <div className="type-body-lg mt-6 text-xl leading-[1.3]">
              Got specific questions?
            </div>
            <Link
              href="/contact"
              className="mt-2 inline-block text-xl text-[var(--color-accent)] transition-all duration-300 hover:underline"
            >
              Contact Us
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Accordion items={faqItems} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
