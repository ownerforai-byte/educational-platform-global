// Theoretical, experimental, percentage yield trio. Theme-aware.
export function YieldTypesTrio({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Yield types theoretical from equation experimental from lab percentage yield ratio of actual to theoretical times hundred">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three yields, one relationship</text>
      {[
        ["Theoretical", "from the balanced equation — the paper promise", "rgb(14 165 233 / 0.85)"],
        ["Experimental (actual)", "from the lab bench — what the flask gave", "rgb(16 185 129 / 0.85)"],
        ["Percentage", "actual ÷ theoretical × 100 — the report card", "rgb(139 92 246 / 0.85)"],
      ].map(([t, d, c], i) => (
        <g key={t}>
          <rect x={30 + i * 230} y="44" width="210" height="90" rx="10" className="fill-current" style={{ color: String(c) }} opacity="0.1" />
          <rect x={30 + i * 230} y="44" width="210" height="90" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: String(c) }} />
          <text x={135 + i * 230} y="70" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{t}</text>
          <text x={135 + i * 230} y="94" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">{d.slice(0, 30)}</text>
          <text x={135 + i * 230} y="108" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">{d.slice(30, 60)}</text>
        </g>
      ))}
      <rect x="30" y="150" width="660" height="50" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="172" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">% yield = (actual ÷ theoretical) × 100</text>
      <text x="360" y="190" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Actual can never exceed theoretical — a value above 100% signals impure product or a calculation error.</text>
    </svg>
  );
}
