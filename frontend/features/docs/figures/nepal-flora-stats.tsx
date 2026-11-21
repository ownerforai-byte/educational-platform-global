/** Nepal flora statistics — species counts by group with world share. Theme-aware. */
export function NepalFloraStats({ className }: { className?: string }) {
  const bars = [
    { t: "Flowering plants", v: "~7,000", w: 420, c: "rgb(22 163 74 / 0.9)" },
    { t: "Bryophytes", v: "~1,150", w: 180, c: "rgb(16 185 129 / 0.9)" },
    { t: "Pteridophytes", v: "~550", w: 120, c: "rgb(14 165 233 / 0.9)" },
    { t: "Gymnosperms", v: "~30", w: 40, c: "rgb(124 58 237 / 0.9)" },
    { t: "Algae", v: "~2,000+", w: 240, c: "rgb(20 184 166 / 0.9)" },
    { t: "Fungi", v: "~4,000+", w: 320, c: "rgb(245 158 11 / 0.9)" },
    { t: "Lichen", v: "~1,000+", w: 160, c: "rgb(244 63 94 / 0.9)" },
  ];
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Nepal flora species counts by plant group as horizontal bars flowering plants bryophytes pteridophytes gymnosperms algae fungi and lichen">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Nepal's flora in numbers (approximate)</text>
      {bars.map((b, i) => {
        const y = 50 + i * 30;
        return (
          <g key={b.t}>
            <text x="16" y={y + 14} fontSize="9" className="fill-current text-foreground" fontWeight="600">{b.t}</text>
            <rect x="130" y={y} width={b.w} height="18" rx="5" style={{ color: b.c }} className="fill-current opacity-70" />
            <text x={140 + b.w} y={y + 14} fontSize="8.5" className="fill-current text-foreground" fontWeight="700">{b.v}</text>
          </g>
        );
      })}
      <text x="16" y="266" fontSize="10" className="fill-current text-muted-foreground">Small country, outsized flora: Nepal holds roughly 2% of the world's flowering plants in 0.1% of its land — a Himalayan gradient from 60 m to 8,848 m.</text>
    </svg>
  );
}
