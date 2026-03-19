export function SectionLabel({ label }: { label: string }) {
  return (
    <span className="text-sm uppercase tracking-[-0.04em] text-[var(--color-foreground)]">
      {label}
    </span>
  );
}
