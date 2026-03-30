"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Button } from "@/components/ui/Button";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { fadeLeft, fadeRight, stagger, viewportOnce } from "@/lib/animations";
import { services } from "@/lib/data";
import { siteConfig, socialProfiles } from "@/lib/site";

type FormStatus = "idle" | "submitting" | "success" | "error";

type FormData = {
  name: string;
  email: string;
  company: string;
  service: string;
  timeline: string;
  details: string;
  website: string;
};

type FormErrors = Partial<Record<keyof FormData | "form", string>>;

const emptyForm: FormData = {
  name: "",
  email: "",
  company: "",
  service: "",
  timeline: "",
  details: "",
  website: "",
};

const textFieldClassName =
  "w-full border-0 border-b border-white/14 bg-transparent px-0 pb-4 pt-3 text-base text-white outline-none transition placeholder:text-transparent focus:border-[var(--color-accent)]";

const selectFieldClassName =
  "w-full appearance-none border-0 border-b border-white/14 bg-transparent px-0 pb-4 pt-3 text-base text-white outline-none transition focus:border-[var(--color-accent)]";

const infoBlocks = [
  {
    label: "Studio hours",
    value: ["Monday to Saturday", "10:00 IST to 19:00 IST"],
  },
  {
    label: "Location",
    value: ["Remote-first studio", "New Delhi, India", "Working worldwide"],
  },
  {
    label: "Contacts",
    value: [siteConfig.email, siteConfig.phoneDisplay],
  },
];

const helperLinks = [
  socialProfiles[1],
  socialProfiles[2],
  { label: "Works", href: "/works" },
];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(values: FormData): FormErrors {
  const nextErrors: FormErrors = {};

  if (values.name.trim().length < 2) {
    nextErrors.name = "Please enter your name.";
  }

  if (!isValidEmail(values.email.trim())) {
    nextErrors.email = "Please enter a valid email address.";
  }

  if (values.details.trim().length < 20) {
    nextErrors.details = "Add a few more details so we can respond clearly.";
  }

  return nextErrors;
}

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const { theme } = useTheme();
  const isLight = theme === "light";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => {
      if (!prev[e.target.name as keyof FormData]) {
        return prev;
      }

      const nextErrors = { ...prev };
      delete nextErrors[e.target.name as keyof FormData];
      return nextErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validateForm(formData);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        setStatus("error");
        setErrors({
          form:
            payload?.error ??
            `We couldn't send that right now. Please email ${siteConfig.email}.`,
        });
        return;
      }

      setStatus("success");
      setFormData(emptyForm);
    } catch {
      setStatus("error");
      setErrors({
        form: `We couldn't send that right now. Please email ${siteConfig.email}.`,
      });
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setFormData(emptyForm);
    setErrors({});
  };

  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="relative overflow-hidden pb-14 pt-24 md:pb-20 md:pt-28"
      >
        <div
          className={`absolute inset-0 ${
            isLight ? "bg-[#f7f1e8]" : "bg-[#101010]"
          }`}
        />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: isLight
              ? "repeating-linear-gradient(135deg, rgba(17,17,17,0.05) 0 2px, transparent 2px 10px)"
              : "repeating-linear-gradient(135deg, rgba(255,255,255,0.045) 0 2px, transparent 2px 11px)",
          }}
        />
        <div className={`pointer-events-none absolute left-[3%] top-6 hidden h-24 w-40 shadow-[0_24px_60px_rgba(0,0,0,0.08)] md:block ${isLight ? "bg-white/55" : "bg-white/10"}`} />
        <div className="pointer-events-none absolute bottom-10 left-[5%] hidden h-24 w-44 bg-[var(--color-accent)]/90 shadow-[0_30px_80px_rgba(255,73,37,0.24)] md:block" />
        <div className="pointer-events-none absolute right-[6%] top-40 hidden h-24 w-48 bg-[var(--color-accent)]/78 shadow-[0_30px_90px_rgba(255,73,37,0.22)] lg:block" />
        <div className={`pointer-events-none absolute bottom-0 right-[8%] hidden h-32 w-32 shadow-[0_24px_60px_rgba(0,0,0,0.08)] md:block ${isLight ? "bg-white/75" : "bg-white/12"}`} />

        <section className="container-shell relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="relative overflow-hidden border border-white/8 bg-[#0b0b0b] text-white shadow-[0_36px_90px_rgba(0,0,0,0.3)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,73,37,0.09),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%)]" />
            <div className="pointer-events-none absolute inset-y-[16%] left-[28%] right-[6%] rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_58%)] opacity-70" />
            <div
              className="pointer-events-none absolute inset-y-[15%] left-[31%] right-[7%] hidden rounded-[2rem] opacity-20 md:block"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px), radial-gradient(circle at 35% 40%, rgba(255,73,37,0.18), transparent 18%), radial-gradient(circle at 58% 55%, rgba(255,255,255,0.1), transparent 10%), radial-gradient(circle at 70% 36%, rgba(255,73,37,0.14), transparent 12%)",
                backgroundSize: "42px 42px, 42px 42px, auto, auto, auto",
              }}
            />

            <div className="relative z-10 px-6 py-6 md:px-10 md:py-9 lg:px-16 lg:py-10">
              <div className="flex flex-wrap items-center gap-5 border-b border-white/8 pb-6">
                <div className="display text-[1.8rem] leading-none text-white">
                  Codeique<span className="text-[var(--color-accent)]">.</span>
                </div>
                <div className="ml-auto hidden items-center gap-8 text-sm font-medium text-white/64 md:flex">
                  <span>strategy</span>
                  <span>launch systems</span>
                  <span className="text-white underline underline-offset-4">
                    contact us
                  </span>
                </div>
              </div>

              <div className="grid gap-12 pt-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(22rem,0.88fr)] lg:gap-16">
                <motion.div
                  variants={fadeLeft}
                  className="relative flex min-h-[32rem] flex-col justify-between"
                >
                  <div className="space-y-8">
                    <div className="space-y-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--color-accent)]">
                        (Contact)
                      </p>
                      <h1 className="type-page-title max-w-xl text-white">
                        <ScrambleText>Contact Us.</ScrambleText>
                      </h1>
                      <p className="max-w-lg text-base leading-8 text-white/62 md:text-lg">
                        Tell us what you&apos;re building, redesigning, or
                        fixing. We&apos;ll reply with the cleanest path forward,
                        realistic timing, and the right scope for the work.
                      </p>
                    </div>

                    <div className="relative space-y-8 pl-8 md:pl-10">
                      <div className="absolute bottom-0 left-0 top-2 w-[4px] bg-[var(--color-accent)]" />
                      {infoBlocks.map((block) => (
                        <div key={block.label} className="space-y-3">
                          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/34">
                            {block.label}
                          </p>
                          <div className="space-y-1 text-lg font-semibold tracking-[-0.04em] text-white/92">
                            {block.value.map((line) =>
                              block.label === "Contacts" && line.includes("@") ? (
                                <a
                                  key={line}
                                  href={`mailto:${line}`}
                                  className="block transition-colors hover:text-[var(--color-accent)]"
                                >
                                  {line}
                                </a>
                              ) : block.label === "Contacts" ? (
                                <a
                                  key={line}
                                  href={`tel:${line.replace(/\s+/g, "")}`}
                                  className="block transition-colors hover:text-[var(--color-accent)]"
                                >
                                  {line}
                                </a>
                              ) : (
                                <p key={line}>{line}</p>
                              ),
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/8 pt-8 text-sm text-white/44">
                    <div className="flex flex-wrap items-center gap-5">
                      {helperLinks.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="transition-colors hover:text-white"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                    <p>Worldwide projects, built from India.</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeRight}
                  viewport={viewportOnce}
                  className="relative lg:pt-10"
                >
                  <div className="relative mx-auto max-w-xl">
                    <span className="pointer-events-none absolute -left-4 -top-4 h-20 w-20 border-l-[4px] border-t-[4px] border-[var(--color-accent)]" />
                    <span className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 border-r-[4px] border-t-[4px] border-[var(--color-accent)]" />
                    <span className="pointer-events-none absolute -bottom-4 -left-4 h-20 w-20 border-b-[4px] border-l-[4px] border-[var(--color-accent)]" />
                    <span className="pointer-events-none absolute -bottom-4 -right-4 h-20 w-20 border-b-[4px] border-r-[4px] border-[var(--color-accent)]" />

                    <div className="relative border border-white/8 bg-[#242424] px-6 py-8 shadow-[0_28px_90px_rgba(0,0,0,0.34)] md:px-8 md:py-9">
                      <AnimatePresence mode="wait">
                        {status === "success" ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{
                              duration: 0.35,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex min-h-[34rem] flex-col justify-center"
                          >
                            <p className="text-center font-mono text-[11px] uppercase tracking-[0.28em] text-white/42">
                              Inquiry sent
                            </p>
                            <h2 className="mt-4 text-center text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
                              <ScrambleText>Message received.</ScrambleText>
                            </h2>
                            <p className="mx-auto mt-5 max-w-md text-center text-base leading-8 text-white/58">
                              We&apos;ll review the details and come back with
                              fit, availability, and the best next step for
                              your project.
                            </p>

                            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                              <Button href="/" variant="ghost">
                                Back to home
                              </Button>
                              <Button
                                type="button"
                                variant="primary"
                                onClick={handleReset}
                              >
                                Send another
                              </Button>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.form
                            key="form"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                          >
                            <div className="space-y-2">
                              <p className="text-center text-[2rem] font-semibold tracking-[-0.05em] text-white md:text-[2.35rem]">
                                Contact form
                              </p>
                              <p className="text-center text-sm leading-6 text-white/44">
                                Enough detail for us to reply with real
                                direction.
                              </p>
                            </div>

                            <div className="space-y-5">
                              <div>
                                <label
                                  htmlFor="contact-name"
                                  className="block font-mono text-[11px] uppercase tracking-[0.22em] text-white/34"
                                >
                                  Name
                                </label>
                                <input
                                  className={textFieldClassName}
                                  type="text"
                                  placeholder=" "
                                  id="contact-name"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  required
                                />
                                {errors.name ? (
                                  <p className="mt-2 text-sm text-[var(--color-accent)]">
                                    {errors.name}
                                  </p>
                                ) : null}
                              </div>

                              <div>
                                <label
                                  htmlFor="contact-email"
                                  className="block font-mono text-[11px] uppercase tracking-[0.22em] text-white/34"
                                >
                                  Email
                                </label>
                                <input
                                  className={textFieldClassName}
                                  type="email"
                                  placeholder=" "
                                  id="contact-email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  required
                                />
                                {errors.email ? (
                                  <p className="mt-2 text-sm text-[var(--color-accent)]">
                                    {errors.email}
                                  </p>
                                ) : null}
                              </div>

                              <div>
                                <label
                                  htmlFor="contact-company"
                                  className="block font-mono text-[11px] uppercase tracking-[0.22em] text-white/34"
                                >
                                  Company
                                </label>
                                <input
                                  className={textFieldClassName}
                                  type="text"
                                  placeholder=" "
                                  id="contact-company"
                                  name="company"
                                  value={formData.company}
                                  onChange={handleChange}
                                />
                              </div>

                              <div className="hidden" aria-hidden="true">
                                <label htmlFor="contact-website">Website</label>
                                <input
                                  id="contact-website"
                                  name="website"
                                  type="text"
                                  tabIndex={-1}
                                  autoComplete="off"
                                  value={formData.website}
                                  onChange={handleChange}
                                />
                              </div>

                              <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                  <label
                                    htmlFor="contact-service"
                                    className="block font-mono text-[11px] uppercase tracking-[0.22em] text-white/34"
                                  >
                                    Service
                                  </label>
                                  <div className="relative">
                                    <select
                                      className={selectFieldClassName}
                                      id="contact-service"
                                      name="service"
                                      value={formData.service}
                                      onChange={handleChange}
                                    >
                                      <option
                                        value=""
                                        disabled
                                        className="bg-[#242424]"
                                      >
                                        Select a service
                                      </option>
                                      {services.map((service) => (
                                        <option
                                          key={service.title}
                                          value={service.title}
                                          className="bg-[#242424]"
                                        >
                                          {service.title}
                                        </option>
                                      ))}
                                    </select>
                                    <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-white/32">
                                      +
                                    </span>
                                  </div>
                                </div>

                                <div>
                                  <label
                                    htmlFor="contact-timeline"
                                    className="block font-mono text-[11px] uppercase tracking-[0.22em] text-white/34"
                                  >
                                    Timeline
                                  </label>
                                  <input
                                    className={textFieldClassName}
                                    type="text"
                                    placeholder=" "
                                    id="contact-timeline"
                                    name="timeline"
                                    value={formData.timeline}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>

                              <div>
                                <label
                                  htmlFor="contact-details"
                                  className="block font-mono text-[11px] uppercase tracking-[0.22em] text-white/34"
                                >
                                  Message
                                </label>
                                <textarea
                                  className={`${textFieldClassName} min-h-36 resize-none`}
                                  placeholder=" "
                                  id="contact-details"
                                  name="details"
                                  value={formData.details}
                                  onChange={handleChange}
                                />
                                {errors.details ? (
                                  <p className="mt-2 text-sm text-[var(--color-accent)]">
                                    {errors.details}
                                  </p>
                                ) : null}
                              </div>
                            </div>

                            <div className="space-y-4 pt-3">
                              <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="inline-flex w-full items-center justify-center rounded-none bg-[var(--color-accent)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
                              >
                                {status === "submitting"
                                  ? "Sending..."
                                  : "Send message"}
                              </button>
                              <div aria-live="polite" className="min-h-6">
                                {errors.form ? (
                                  <p className="text-center text-sm leading-6 text-[var(--color-accent)]">
                                    {errors.form}
                                  </p>
                                ) : null}
                              </div>
                              <p className="text-center text-sm leading-6 text-white/42">
                                Prefer email? Reach us at{" "}
                                <a
                                  href={`mailto:${siteConfig.email}`}
                                  className="text-white/72 transition-colors hover:text-white"
                                >
                                  {siteConfig.email}
                                </a>
                              </p>
                            </div>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
