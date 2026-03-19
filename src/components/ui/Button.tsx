"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  loading?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  loading = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-[-0.02em] uppercase transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]";
  const styles =
    variant === "primary"
      ? "border border-[var(--color-accent)]/35 bg-[rgba(34,15,13,0.92)] text-[var(--color-accent)] shadow-[var(--shadow-accent)] hover:brightness-110 hover:shadow-lg"
      : "border border-white/10 bg-transparent text-[var(--color-foreground)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-lg";

  return (
    <div className="inline-flex">
      <Link
        href={href}
        aria-busy={loading}
        className={`${base} ${styles} ${loading ? "min-w-[11rem]" : ""} ${className}`.trim()}
      >
        <span className={`inline-flex items-center gap-2 ${loading ? "opacity-80" : "opacity-100"}`}>
          {loading ? (
            <span className="loading-spinner inline-block size-4 rounded-full border-2 border-current border-r-transparent" />
          ) : null}
          {children}
        </span>
      </Link>
    </div>
  );
}
