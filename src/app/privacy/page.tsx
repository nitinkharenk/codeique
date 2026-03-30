import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrambleText } from "@/components/ui/ScrambleText";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Codeique collects, uses, and protects your personal information.",
  alternates: {
    canonical: "/privacy",
  },
};

const lastUpdated = "March 1, 2026";

const sections = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: [
      "We collect information you provide directly to us, such as when you fill out our contact form, send us an email, or engage us for project work. This includes your name, email address, phone number, company name, and any project details you share.",
      "We may also collect basic technical data when you visit our website — including your IP address, browser type, device information, and pages visited — through standard server logs and analytics tools. This data is used solely to understand how our site is used and to improve its performance.",
      "We do not purchase data from third parties, and we do not operate advertising networks or retargeting systems.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    content: [
      "We use the information you provide to respond to your inquiry, scope and deliver project work, send project-related communications, and issue invoices. We may also use your contact details to follow up on previous conversations or to send occasional updates about our work if you have indicated interest.",
      "Technical analytics data is used in aggregate form to understand site traffic patterns and improve content. We do not use it to identify or profile individual visitors.",
      "We will never sell your personal information to third parties. We will never use your information for purposes beyond what you would reasonably expect based on your interaction with us.",
    ],
  },
  {
    id: "information-sharing",
    title: "Information Sharing",
    content: [
      "We share your information only when necessary to provide our services. This includes project collaborators working under our direction (who are bound by confidentiality agreements), payment processors for invoice handling, and email service providers for communication delivery.",
      "We may disclose information if required by law, court order, or government authority. In such cases we will notify you unless legally prohibited from doing so.",
      "We do not share client project details, briefs, or materials with any third party without your explicit written consent.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: [
      "We retain client communication and project data for as long as necessary to provide services and meet reasonable legal and business requirements — typically for the duration of the project engagement plus three years.",
      "Contact form submissions from inquiries that did not proceed to a project are deleted within 12 months unless you have asked us to retain your details for future consideration.",
      "You may request deletion of your data at any time by contacting us at hello@codeique.studio. We will confirm deletion within 30 days.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Tracking",
    content: [
      "Our website uses minimal cookies. We use cookies for basic functionality (such as remembering preferences) and for anonymized analytics to understand how visitors use our site. We do not use advertising or cross-site tracking cookies.",
      "You can control cookie settings through your browser at any time. Disabling cookies may affect some site features but will not prevent you from accessing or reading content.",
    ],
  },
  {
    id: "security",
    title: "Security",
    content: [
      "We take reasonable technical and organizational measures to protect your personal information. Our website uses HTTPS encryption. Project files and communications are handled through secured platforms.",
      "No internet transmission or digital storage is perfectly secure. While we take this seriously, we cannot guarantee absolute security and encourage you not to share sensitive financial or personal data over general contact forms.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: [
      "You have the right to access the personal information we hold about you, request corrections to inaccurate data, request deletion of your data, and opt out of non-essential communications at any time.",
      "To exercise any of these rights, contact us at hello@codeique.studio with the subject line 'Privacy Request'. We will respond within 30 days.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    content: [
      "If you have questions about this Privacy Policy or how we handle your information, you can reach us at hello@codeique.studio or by writing to us at our registered business address in India.",
      "This policy was last updated on " + lastUpdated + ". We may update it periodically and will post changes on this page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pb-20 pt-28 md:pt-32">
        {/* ── Hero ── */}
        <section className="container-shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--color-accent)]">
              (LEGAL)
            </p>
            <h1 className="type-page-title mt-6">
              <ScrambleText>Privacy Policy</ScrambleText>
            </h1>
            <p className="type-body mt-6 md:text-lg">
              Codeique is committed to handling your information with care and
              transparency. This policy explains what we collect, why we collect
              it, and how it is used.
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-white/30">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* ── Table of contents ── */}
        <section className="container-shell mt-12">
          <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.02] p-6 md:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
              Contents
            </p>
            <ol className="mt-5 grid gap-2 sm:grid-cols-2">
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="interactive-link flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    <span className="font-mono text-[10px] text-white/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Sections ── */}
        <section className="container-shell mt-10">
          <div className="mx-auto max-w-3xl space-y-10">
            {sections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-24 rounded-[1.75rem] border border-white/8 bg-white/[0.02] p-6 md:p-8"
              >
                <h2 className="type-card-title text-white md:text-3xl">
                  <ScrambleText>{section.title}</ScrambleText>
                </h2>
                <div className="mt-5 space-y-4">
                  {section.content.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-base leading-8 text-[var(--color-muted)]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Footer CTA ── */}
        <section className="container-shell mt-14">
          <div className="rounded-[2rem] border border-white/8 bg-white/[0.02] p-8 text-center md:p-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
              Questions?
            </p>
            <h2 className="type-card-title mt-4 text-white">
              <ScrambleText>We&apos;re happy to clarify anything.</ScrambleText>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-7 text-white/60">
              If you have any concerns about your data or how this policy
              applies to you, reach out directly.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:hello@codeique.studio"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-accent)]/35 bg-[rgba(34,15,13,0.92)] px-6 py-3 text-sm font-semibold uppercase tracking-[-0.02em] text-[var(--color-accent)] shadow-[var(--shadow-accent)] transition-all hover:brightness-110"
              >
                Email Us
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-white/12 px-6 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-white/80 transition-colors hover:border-white/24 hover:text-white"
              >
                Back Home
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
