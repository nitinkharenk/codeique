"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const nextLabel = theme === "dark" ? "Light Theme" : "Dark Theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle ${className}`.trim()}
      aria-label={`Switch to ${nextLabel.toLowerCase()}`}
    >
      <span className="theme-toggle__icon" aria-hidden>
        {theme === "dark" ? "◐" : "◑"}
      </span>
      <span>{nextLabel}</span>
    </button>
  );
}
