// Solved: density to molecular mass. Theme-aware.
export function GasDensityDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Solved gas density to molecular mass density one point nine six five gram per litre times twenty two point four equals forty four">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — density 1.965 g/L at STP → M?</text>
      {[
        ["Relation", "M = density × molar volume = d × 22.4"],
        ["Apply", "M = 1.965 × 22.4 = 44 g/mol"],
        ["Identify", "CO₂ (12 + 32) — or C₃H₈ (36 + 8); density alone cannot distinguish"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={40 + i * 44} width="660" height="38" rx="9" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="46" y={58 + i * 44} fontSize="9" className="fill-current text-sky-600" fontWeight="800">{t}</text>
          <text x="674" y={58 + i * 44} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d}</text>
        </g>
      ))}
      <rect x="30" y="176" width="660" height="34" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="194" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Limitation to quote: molecular mass from density is necessary but not sufficient for identification — percentage composition must also match.</text>
      <text x="360" y="204" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Companion formula: relative density vs air = M ÷ 29 (air's average molar mass).</text>
    </svg>
  );
}
