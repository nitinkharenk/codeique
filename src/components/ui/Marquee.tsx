export function Marquee({ items }: { items: readonly string[] }) {
  const repeated = [...items, ...items];

  return (
    <div className="overflow-hidden py-4">
      <div className="marquee-track flex min-w-max items-center gap-14 px-2">
        {repeated.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="text-3xl font-semibold tracking-[-0.06em] text-white/28 md:text-4xl"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
