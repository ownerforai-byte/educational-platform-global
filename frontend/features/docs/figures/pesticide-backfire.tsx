/** Pesticide ecological backfire — resurgence, resistance, secondary pests. Theme-aware. */
export function PesticideBackfire({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Ecological backfire of pesticides pest resurgence resistance pesticide treadmill and secondary pests">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">When spraying backfires — three traps</text>

      {[
        { x: 110, t: "RESURGENCE", s: "spraying kills natural", s2: "enemies; pest populations", s3: "rebound harder than before", c: "rgb(244 63 94 / 0.9)" },
        { x: 330, t: "RESISTANCE", s: "repeated spraying selects", s2: "tolerant pests — the pesticide", s3: "treadmill: more chemical,", s4: "less effect", c: "rgb(245 158 11 / 0.9)" },
        { x: 550, t: "SECONDARY PESTS", s: "new pests emerge when", s2: "their competitors or", s3: "natural enemies are killed", c: "rgb(124 58 237 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 88} y="56" width="176" height="124" rx="12" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="80" fontSize="8.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="102" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="120" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
          <text x={n.x} y="138" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s3}</text>
          {n.s4 && <text x={n.x} y="156" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s4}</text>}
        </g>
      ))}

      <rect x="40" y="196" width="580" height="32" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="56" y="217" fontSize="8.8" className="fill-current text-foreground" fontWeight="700">Collateral damage: pollinators (bees), natural enemies and aquatic life — broad-spectrum sprays cannot read species labels.</text>
    </svg>
  );
}
