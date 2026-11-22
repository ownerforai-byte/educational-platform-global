// Solved: conservation of mass numerical. Theme-aware.
export function ConservationLavoisierDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Solved conservation of mass numerical ten gram calcium carbonate heated gives calcium oxide and carbon dioxide five point six and four point four grams">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — 10 g CaCO₃ heated gives ?</text>
      {[
        ["Equation", "CaCO₃ → CaO + CO₂ (all masses conserved)"],
        ["Molar masses", "CaCO₃ = 100, CaO = 56, CO₂ = 44"],
        ["From 10 g CaCO₃", "CaO = 10 × 56/100 = 5.6 g; CO₂ = 4.4 g"],
        ["Check", "5.6 + 4.4 = 10 g ✓ mass conserved"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={40 + i * 40} width="660" height="34" rx="9" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="46" y={62 + i * 40} fontSize="9" className="fill-current text-sky-600" fontWeight="800">{t}</text>
          <text x="674" y={62 + i * 40} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d}</text>
        </g>
      ))}
      <rect x="30" y="202" width="660" height="12" rx="0" />
      <text x="360" y="214" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Closed-system requirement: CO₂ must be collected, not released — that is why Lavoisier used sealed vessels.</text>
    </svg>
  );
}
