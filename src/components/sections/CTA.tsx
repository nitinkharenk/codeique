"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section id="contact" className="section-divider py-0">
      <div className="pt-8 md:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[32rem] overflow-hidden px-4 py-16 md:min-h-[40rem] md:px-6 md:py-20 lg:min-h-[46rem] lg:px-8"
        >
          <div className="absolute inset-0">
            <Image
              src="/let's tak.avif"
              alt="Creative collaboration background"
              fill
              className="object-cover brightness-[1.12] contrast-[1.05] saturate-[1.08]"
              sizes="100vw"
              priority={false}
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,4,4,0.16),rgba(4,4,4,0.42)),radial-gradient(circle_at_center,rgba(255,255,255,0.28),transparent_20%),radial-gradient(circle_at_center,rgba(255,90,47,0.14),transparent_30%)]" />
          <motion.div
            className="absolute inset-0 opacity-0"
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            style={{
              background:
                "radial-gradient(circle at 60% 45%, rgba(255,255,255,0.16), transparent 24%), radial-gradient(circle at 70% 30%, rgba(255,73,37,0.08), transparent 50%)",
            }}
          />
          <div className="container-shell relative flex min-h-[calc(32rem-8rem)] items-center md:min-h-[calc(40rem-10rem)] lg:min-h-[calc(46rem-10rem)]">
            <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.75fr)] lg:items-center">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="display max-w-[3.2ch] text-[3.4rem] text-[var(--color-foreground)] sm:text-[4.25rem] md:text-[6rem] lg:text-[7.2rem]"
            >
              Let&apos;s Work Together
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex max-w-md flex-col lg:ml-auto lg:mr-0 lg:items-start lg:justify-self-end"
            >
              <p className="max-w-md text-lg leading-7 tracking-[-0.04em] text-white/92 md:text-2xl md:leading-9 lg:text-left">
                Have a project in mind? We&apos;d love to hear about it. Let&apos;s
                create something great together.
              </p>
              <div className="mt-8 w-full max-w-[19rem]">
                <Button href="/contact" className="w-full py-4 text-xl">
                  Get in Touch
                </Button>
              </div>
            </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
