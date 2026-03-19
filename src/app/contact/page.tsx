"use client";

import { motion } from "framer-motion";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { fadeLeft, fadeRight, stagger, viewportOnce } from "@/lib/animations";
import { services } from "@/lib/data";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="container-shell pb-12 pt-28 md:pb-16 md:pt-32">
        <motion.div
          className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeLeft} className="space-y-8">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--color-accent)]">
              (CONTACT)
            </p>
            <h1 className="font-serif text-5xl leading-tight md:text-7xl">
              Tell us what you&apos;re building.
            </h1>
            <p className="max-w-xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
              Share your goals, timeline, and where you feel stuck. We&apos;ll
              come back with a direction that feels focused and realistic.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="interactive-card rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  Response Time
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-white">
                  Within 24 hours
                </p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  We usually reply faster on working days with next steps,
                  timeline fit, and a simple recommendation.
                </p>
              </div>
              <div className="interactive-card rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  Best For
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-white">
                  Websites, UI/UX, branding
                </p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Ideal if you need a clean launch, redesign, product screens,
                  or better presentation for your business online.
                </p>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,73,37,0.08),rgba(255,255,255,0.02))] p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                What To Include
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Project type",
                  "Budget range",
                  "Timeline",
                  "Current website",
                  "Main goal",
                  "Reference links",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/68"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
                Even a short message is enough. If you already have references,
                rough pricing, or launch goals, include them and we&apos;ll make
                the next conversation much easier.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="mailto:hello@codeique.studio"
                className="interactive-card rounded-[1.4rem] border border-white/10 bg-black/20 p-5"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/42">
                  Email
                </p>
                <p className="mt-3 text-xl font-semibold tracking-[-0.04em] text-white">
                  hello@codeique.studio
                </p>
              </a>
              <a
                href="tel:+919876543210"
                className="interactive-card rounded-[1.4rem] border border-white/10 bg-black/20 p-5"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/42">
                  Call
                </p>
                <p className="mt-3 text-xl font-semibold tracking-[-0.04em] text-white">
                  +91 98765 43210
                </p>
              </a>
            </div>
          </motion.div>

          <motion.form
            variants={fadeRight}
            viewport={viewportOnce}
            className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.28)] md:p-8"
          >
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/8 pb-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  Start Inquiry
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white md:text-4xl">
                  Let&apos;s shape the right scope
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-white/52">
                Fill this out and we&apos;ll reply with availability, rough fit,
                and the best next step.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="input-shell">
                <input
                  className="w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 pb-3 pt-6 text-white outline-none"
                  type="text"
                  placeholder=" "
                  id="contact-name"
                />
                <label htmlFor="contact-name">Name</label>
              </div>
              <div className="input-shell">
                <input
                  className="w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 pb-3 pt-6 text-white outline-none"
                  type="email"
                  placeholder=" "
                  id="contact-email"
                />
                <label htmlFor="contact-email">Email</label>
              </div>
            </div>

            <div className="input-shell mt-5">
              <input
                className="w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 pb-3 pt-6 text-white outline-none"
                type="text"
                placeholder=" "
                id="contact-company"
              />
              <label htmlFor="contact-company">Company</label>
            </div>

            <div className="grid gap-5 mt-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-service"
                  className="mb-2 block text-sm font-medium text-white/72"
                >
                  Service Needed
                </label>
                <select
                  className="w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 py-4 text-white outline-none transition focus:border-[var(--color-accent)] focus:shadow-[0_0_0_4px_rgba(255,73,37,0.1)]"
                  id="contact-service"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-[#111] text-white/50">
                    Select a service
                  </option>
                  {services.map((service) => (
                    <option key={service.title} value={service.title} className="bg-[#111]">
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-shell">
                <input
                  className="w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 pb-3 pt-6 text-white outline-none"
                  type="text"
                  placeholder=" "
                  id="contact-timeline"
                />
                <label htmlFor="contact-timeline">Timeline</label>
              </div>
            </div>

            <div className="input-shell mt-5">
              <textarea
                className="min-h-40 w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 pb-3 pt-6 text-white outline-none"
                placeholder=" "
                id="contact-details"
              />
              <label htmlFor="contact-details">Project Details</label>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="mailto:hello@codeique.studio" className="min-w-[13rem]">
                Send Inquiry
              </Button>
              <p className="text-sm leading-6 text-white/48">
                Prefer direct mail? Reach out at <span className="text-white/76">hello@codeique.studio</span>
              </p>
            </div>
          </motion.form>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
