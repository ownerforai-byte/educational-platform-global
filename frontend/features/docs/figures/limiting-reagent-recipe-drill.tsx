// Solved: N2 + H2 limiting reagent. Theme-aware.
export function LimitingReagentRecipeDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 240" className={className} role="img" aria-label="Solved limiting reagent ammonia synthesis twenty eight gram nitrogen and nine gram hydrogen hydrogen limiting ammonia yield seventeen grams">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — 28 g N₂ + 9 g H₂ (Haber)</text>
      {[
        ["Equation", "N₂ + 3H₂ → 2NH₃"],
        ["Moles given", "N₂ = 28/28 = 1.0 · H₂ = 9/2 = 4.5"],
        ["Divide by coefficients", "N₂: 1.0/1 = 1.0 · H₂: 4.5/3 = 1.5"],
        ["Limiting", "N₂ (1.0 less than 1.5)"],
        ["Yield", "NH₃ = 2 × 1.0 = 2 mol = 34 g; H₂ left = 4.5 − 3 = 1.5 mol (3 g)"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={38 + i * 38} width="660" height="32" rx="8" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(139 92 246 / 0.85)" }} />
          <text x="46" y={59 + i * 38} fontSize="9" className="fill-current text-violet-600" fontWeight="800">{t}</text>
          <text x="674" y={59 + i * 38} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d}</text>
        </g>
      ))}
      <rect x="30" y="222" width="660" height="12" rx="0" />
      <text x="360" y="234" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Real plants run H₂ in excess deliberately — driving the equilibrium toward ammonia, the same logic at industrial scale.</text>
    </svg>
  );
}
