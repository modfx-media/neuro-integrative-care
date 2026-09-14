interface Stat {
  value: string;
  label: string;
}

interface StatBarProps {
  stats: readonly Stat[];
  /** Text tone for the surface the bar sits on. */
  tone?: "onDark" | "onLight";
  className?: string;
  /** Grid column count below the sm breakpoint; defaults to wrapping at 2. */
  mobileColsClassName?: string;
}

export default function StatBar({
  stats,
  tone = "onDark",
  className = "",
  mobileColsClassName = "grid-cols-2",
}: StatBarProps) {
  const valueColor = tone === "onDark" ? "text-paper" : "text-ink";
  const labelColor = tone === "onDark" ? "text-paper/65" : "text-muted";
  const dividerColor = tone === "onDark" ? "border-paper/15" : "border-rule";
  // Match the column count to the stat count so a shorter list (e.g. 3 on a
  // landing page) doesn't leave a trailing empty column.
  const colsClass = stats.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-4";

  return (
    <dl
      className={`grid ${mobileColsClassName} gap-x-6 gap-y-8 ${colsClass} sm:gap-x-10 ${className}`}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={i > 0 ? `sm:border-l sm:pl-8 ${dividerColor}` : ""}
        >
          <dt
            className={`font-serif text-[2rem] leading-none tracking-tight lg:text-[2.4rem] ${valueColor}`}
          >
            {stat.value}
          </dt>
          <dd
            className={`mt-3 font-mono font-medium text-[11px] uppercase leading-snug tracking-[0.14em] ${labelColor}`}
          >
            {stat.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
