/** Migration survival value — genetic programming, homing, distances. Theme-aware. */
export function MigrationSurvivalValue({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Migration survival value genetically programmed seasonal behavioural adaptation salmon returning to natal stream and birds flying over ten thousand km per year">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why migration works — three design facts</text>

      {[
        { x: 110, t: "GENETICALLY PROGRAMMED", s: "an inborn behavioural", s2: "adaptation — the route", s3: "is inherited, not taught", c: "rgb(14 165 233 / 0.9)" },
        { x: 330, t: "SEASONAL CLOCK", s: "regular and periodic —", s2: "triggered by the seasons,", s3: "year after year", c: "rgb(22 163 74 / 0.9)" },
        { x: 550, t: "EXTREME PRECISION", s: "Atlantic salmon return to", s2: "the stream where they were", s3: "born; birds fly >10,000 km/yr", c: "rgb(245 158 11 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 88} y="56" width="176" height="120" rx="12" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="80" fontSize="8.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="102" fontSize="7.3" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="120" fontSize="7.3" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
          <text x={n.x} y="138" fontSize="7.3" textAnchor="middle" className="fill-current text-muted-foreground">{n.s3}</text>
        </g>
      ))}

      <rect x="40" y="192" width="580" height="34" rx="10" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="56" y="214" fontSize="9" className="fill-current text-foreground" fontWeight="700">The cost is enormous — but the payoff (food, safe breeding, mild climate) has kept migration in the gene pool for millions of years.</text>
    </svg>
  );
}
