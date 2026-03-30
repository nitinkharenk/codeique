import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { ScrambleText } from "@/components/ui/ScrambleText";

type StatusPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  showHomeLink?: boolean;
};

export function StatusPage({
  eyebrow,
  title,
  description,
  showHomeLink = true,
}: StatusPageProps) {
  return (
    <section className="bg-[var(--color-background)] py-24 md:py-32">
      <div className="container-shell">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-accent)]">
              {eyebrow}
            </p>
            <h1 className="type-display-title mt-6 text-[var(--color-foreground)]">
              <ScrambleText>{title}</ScrambleText>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--color-muted)] md:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact" className="w-full sm:w-auto">
                Contact Us
              </Button>
              {showHomeLink ? (
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground)] transition-colors hover:border-[var(--color-accent)]"
                >
                  Back Home
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
