// Solved: percentage yield numerical. Theme-aware.
export function YieldCalculationDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 240" className={className} role="img" aria-label="Solved percentage yield calcium oxide from fifty gram calcium carbonate theoretical twenty eight gram actual twenty one gram seventy five percent">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — 50 g CaCO₃ → 21 g CaO. % yield?</text>
      {[
        ["Equation", "CaCO₃ → CaO + CO₂"],
        ["Theoretical", "50 g CaCO₃ = 0.5 mol → 0.5 mol CaO = 28 g"],
        ["Actual", "21 g (given from the experiment)"],
        ["Percentage yield", "(21 ÷ 28) × 100 = 75%"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={38 + i * 40} width="660" height="34" rx="8" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x="46" y={60 + i * 40} fontSize="9" className="fill-current text-emerald-600" fontWeight="800">{t}</text>
          <text x="674" y={60 + i * 40} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d}</text>
        </g>
      ))}
      <rect x="30" y="200" width="660" height="32" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="218" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Reverse drill: if 80% yield was reported, actual = 0.80 × 28 = 22.4 g — the formula works in both directions.</text>
    </svg>
  );
}
