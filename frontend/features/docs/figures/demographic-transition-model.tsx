/** Demographic transition model — four stages of every nation. Well-detailed. Theme-aware. */
export function DemographicTransitionModel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Demographic transition model four stages birth rate death rate high high low low industrialising population growth lag Nepal stage three development sanitation women education chart axes">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The demographic transition — why populations boom then stabilise</text>
      {/* chart */}
      <rect x="30" y="44" width="660" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {/* axes */}
      <line x1="80" y1="80" x2="80" y2="200" className="stroke-current" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <line x1="80" y1="200" x2="640" y2="200" className="stroke-current" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="58" y="140" fontSize="6" className="fill-current text-muted-foreground" transform="rotate(-90 58 140)">rate</text>
      {/* birth line (stays high then falls) */}
      <path d="M80 90 L260 90 L380 150 L640 160" className="fill-none stroke-current" strokeWidth="3" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      {/* death line (falls earlier) */}
      <path d="M80 90 L220 100 L340 165 L640 168" className="fill-none stroke-current" strokeWidth="3" style={{ color: "rgb(220 38 38 / 0.9)" }} />
      {[
        ["1 pre", "high B, high D", 140],
        ["2 boom", "death falls first", 300],
        ["3 slow", "births follow down", 460],
        ["4 stable", "low, low", 600],
      ].map(([label, note, x], i) => (
        <g key={label as string}>
          <text x={x as number} y="216" fontSize="5.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{label as string}</text>
          <text x={x as number} y="226" fontSize="5.2" textAnchor="middle" className="fill-current text-muted-foreground">{note as string}</text>
        </g>
      ))}
      <text x="360" y="66" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">orange = birth rate · red = death rate — the gap between them is the population boom</text>
      {/* facts */}
      <rect x="30" y="228" width="660" height="64" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="248" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The boom is a lag: death rates fall with sanitation and medicine before birth rates fall with development — the gap is growth.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: stage 2 = death rate falls first; stage 3 = birth rate follows — that sequencing IS the model.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">What pulls births down: girls' education, child survival, urban life, contraception access.</text>
    </svg>
  );
}
