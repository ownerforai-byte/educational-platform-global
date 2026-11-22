// Solved: limiting reactant numerical. Theme-aware.
export function LimitingReactantDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 240" className={className} role="img" aria-label="Solved limiting reactant numerical four mole hydrogen and three mole oxygen water limiting hydrogen product four mole water one mole oxygen left">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — 4 mol H₂ + 3 mol O₂</text>
      {[
        ["Equation", "2H₂ + O₂ → 2H₂O"],
        ["Divide by coefficients", "H₂: 4/2 = 2.0 · O₂: 3/1 = 3.0"],
        ["Limiting reactant", "H₂ (2.0 less than 3.0)"],
        ["Product", "H₂O = 2 × 2.0 = 4 mol = 72 g"],
        ["Left over", "O₂ used = 2 mol → 3 − 2 = 1 mol = 32 g remains"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={38 + i * 38} width="660" height="32" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="46" y={59 + i * 38} fontSize="9" className="fill-current text-sky-600" fontWeight="800">{t}</text>
          <text x="674" y={59 + i * 38} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d}</text>
        </g>
      ))}
      <rect x="30" y="222" width="660" height="12" rx="0" />
      <text x="360" y="234" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Mass check: 8 g H₂ + 96 g O₂ in → 72 g H₂O + 32 g O₂ out — conservation holds alongside the limiting logic.</text>
    </svg>
  );
}
