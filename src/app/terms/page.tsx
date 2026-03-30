import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrambleText } from "@/components/ui/ScrambleText";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions governing project engagements with Codeique.",
  alternates: {
    canonical: "/terms",
  },
};

const lastUpdated = "March 1, 2026";

const sections = [
  {
    id: "scope",
    title: "Scope of Services",
    content: [
      "Codeique provides design and development services including web design, web development, branding and identity design, UI/UX design, and motion and interaction design. The specific scope, deliverables, and timeline for each engagement are defined in a separate project agreement or proposal document provided before work commences.",
      "These Terms of Service govern all engagements with Codeique unless a separate signed contract supersedes them. By commissioning work or using our services, you agree to these terms.",
    ],
  },
  {
    id: "project-process",
    title: "Project Process",
    content: [
      "All projects begin with a discovery or briefing phase. Work will not commence until the scope has been agreed upon in writing and an initial payment has been received as described in the payment section below.",
      "We will provide work-in-progress deliverables at agreed milestones for review and feedback. Feedback must be provided within the timeframe specified in the project agreement. Delays in providing feedback may affect the delivery timeline, which will be adjusted accordingly.",
      "The number of revision rounds included is specified per engagement. Additional revisions beyond the agreed scope may be quoted and billed separately.",
    ],
  },
  {
    id: "payment",
    title: "Payment Terms",
    content: [
      "For project-based work, we typically require 50% of the total project fee upfront before work commences, with the remaining 50% due upon project completion or as otherwise specified in the project agreement.",
      "For monthly retainer plans, payment is due at the beginning of each billing cycle. Failure to pay by the due date may result in work being paused until payment is received.",
      "All invoices are payable within 7 days of issue unless otherwise agreed. Late payments may be subject to a late fee of 1.5% per month on the outstanding balance.",
      "All prices are exclusive of applicable taxes. Clients in India are subject to GST at the prevailing rate. International clients are responsible for any applicable taxes in their jurisdiction.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: [
      "Upon receipt of full payment, Codeique assigns to the client full ownership rights to the final agreed deliverables, including custom design assets, source files, and production code created specifically for the project.",
      "Codeique retains the right to display the completed work in our portfolio, case studies, and marketing materials unless the client requests confidentiality in writing before the project begins.",
      "Third-party assets such as stock photography, icon libraries, font licenses, or software plugins used in projects remain subject to their original licensing terms. It is the client's responsibility to ensure they hold appropriate licenses for any assets they supply to us.",
      "Until full payment has been received, all work-in-progress files and deliverables remain the property of Codeique.",
    ],
  },
  {
    id: "client-responsibilities",
    title: "Client Responsibilities",
    content: [
      "You agree to provide accurate, complete, and timely information necessary for the project, including content, branding materials, access credentials, and feedback.",
      "You confirm that any materials, content, or assets you supply to us do not infringe any third-party intellectual property rights, and you accept full responsibility for the legality of the content you provide.",
      "You agree to appoint a single primary point of contact for communication and decision-making to ensure the project proceeds efficiently.",
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    content: [
      "Both parties agree to keep confidential any proprietary information, business data, or trade secrets shared during the engagement. This obligation continues for two years after the project concludes.",
      "Codeique will not share your project briefs, business information, or unreleased work with any third party without your prior written consent.",
    ],
  },
  {
    id: "cancellation",
    title: "Cancellation and Termination",
    content: [
      "Either party may terminate the engagement with 14 days written notice. In the event of cancellation, you are responsible for payment of all work completed up to the date of termination, calculated at our standard day rate for any partially completed milestone.",
      "Upfront payments are non-refundable unless Codeique has failed to commence work within an agreed timeframe.",
      "If you require a project to be paused for more than 30 days, we reserve the right to reschedule and cannot guarantee the same team availability upon resumption.",
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    content: [
      "Codeique's total liability to you for any claim arising under these terms is limited to the total fees paid by you for the specific project giving rise to the claim.",
      "We are not liable for any indirect, incidental, or consequential damages, including but not limited to loss of revenue, loss of data, or business interruption, even if we have been advised of the possibility of such damages.",
      "We provide designs and code in good faith based on the information provided. We are not responsible for outcomes resulting from inaccurate information, third-party platform changes, or factors outside our control.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: [
      "These terms are governed by the laws of India. Any disputes arising from engagements with Codeique will be subject to the exclusive jurisdiction of courts in India.",
      "We will always attempt to resolve disputes directly and amicably before pursuing formal proceedings.",
    ],
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    content: [
      "We may update these Terms of Service from time to time. Significant changes will be communicated to active clients. The current version is always available on this page.",
      "This document was last updated on " + lastUpdated + ".",
    ],
  },
];

export default function TermsPage() {
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
              <ScrambleText>Terms of Service</ScrambleText>
            </h1>
            <p className="type-body mt-6 md:text-lg">
              These terms govern project engagements with Codeique. Please read
              them carefully. If you have any questions before commissioning
              work, reach out and we&apos;ll clarify.
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
              <ScrambleText>
                Need to discuss terms before starting?
              </ScrambleText>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-7 text-white/60">
              We&apos;re happy to walk through these terms, adjust the agreement
              for your specific engagement, or answer any questions before work
              begins.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-accent)]/35 bg-[rgba(34,15,13,0.92)] px-6 py-3 text-sm font-semibold uppercase tracking-[-0.02em] text-[var(--color-accent)] shadow-[var(--shadow-accent)] transition-all hover:brightness-110"
              >
                Contact Us
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
