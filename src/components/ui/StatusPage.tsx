import Link from "next/link";

import { Button } from "@/components/ui/Button";

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
    <section className="bg-black py-24 md:py-32">
      <div className="container-shell">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-accent)]">
              {eyebrow}
            </p>
            <h1 className="display mt-6 text-[3.2rem] text-white sm:text-[4.25rem] md:text-[5.75rem]">
              {title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/64 md:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact" className="w-full sm:w-auto">
                Contact Us
              </Button>
              {showHomeLink ? (
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white/80 transition-colors hover:border-white/24 hover:text-white"
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
