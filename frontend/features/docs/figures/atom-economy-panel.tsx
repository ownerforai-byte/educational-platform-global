// Atom economy concept. Theme-aware.
export function AtomEconomyPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Atom economy green chemistry percentage of reactant mass ending in desired product formula and ethylene oxide example">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Atom economy — green chemistry's scorecard</text>
      <rect x="30" y="42" width="660" height="50" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="66" fontSize="10.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">atom economy = (mass of desired product ÷ total mass of products) × 100</text>
      <text x="360" y="84" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">measures how much reactant mass ends up in the wanted molecule — set at the equation stage, not the lab</text>
      {[
        ["High economy", "addition reactions — everything joins the product"],
        ["Low economy", "substitution/elimination — a by-product carries mass away"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x={30 + i * 340} y="104" width="320" height="44" rx="9" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x={46 + i * 340} y={126} fontSize="9" className="fill-current text-sky-600" fontWeight="800">{t}</text>
          <text x={46 + i * 340} y={142} fontSize="7.8" className="fill-current text-muted-foreground">{d}</text>
        </g>
      ))}
      <rect x="30" y="160" width="660" height="40" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="178" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Distinguish clearly: percentage yield measures lab efficiency; atom economy measures design efficiency — a reaction can score 100% yield with terrible atom economy.</text>
      <text x="360" y="192" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Sustainable-industry angle: higher atom economy means less waste to treat, cheaper processes, greener plants.</text>
    </svg>
  );
}
