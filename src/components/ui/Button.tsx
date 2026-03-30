"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  loading?: boolean;
  disabled?: boolean;
};

type LinkButtonProps = BaseProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ActionButtonProps = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
};

export type ButtonProps = LinkButtonProps | ActionButtonProps;

export function Button({
  children,
  variant = "primary",
  className = "",
  loading = false,
  disabled = false,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-[-0.02em] uppercase transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]";
  const styles =
    variant === "primary"
      ? "border border-[var(--color-accent)]/35 bg-[rgba(34,15,13,0.92)] text-[var(--color-accent)] shadow-[var(--shadow-accent)] hover:brightness-110 hover:shadow-lg"
      : "border border-white/10 bg-transparent text-[var(--color-foreground)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-lg";
  const disabledStyles =
    disabled || loading ? "opacity-60 cursor-not-allowed pointer-events-none" : "";

  const inner = (
    <span
      className={`inline-flex items-center gap-2 ${loading ? "opacity-80" : "opacity-100"}`}
    >
      {loading ? (
        <span className="loading-spinner inline-block size-4 rounded-full border-2 border-current border-r-transparent" />
      ) : null}
      {children}
    </span>
  );

  const fullClass =
    `${base} ${styles} ${loading ? "min-w-[11rem]" : ""} ${disabledStyles} ${className}`.trim();

  if ("href" in rest && rest.href) {
    return (
      <div className="inline-flex">
        <Link href={rest.href} aria-busy={loading} className={fullClass}>
          {inner}
        </Link>
      </div>
    );
  }

  const { onClick, type } = rest as ActionButtonProps;
  return (
    <div className="inline-flex">
      <button
        type={type ?? "button"}
        onClick={onClick}
        aria-busy={loading}
        disabled={disabled || loading}
        className={fullClass}
      >
        {inner}
      </button>
    </div>
  );
}
