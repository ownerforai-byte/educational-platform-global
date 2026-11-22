// Solved: calcium in limestone. Theme-aware.
export function LimestoneAssayDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Solved limestone assay calcium carbonate molar mass hundred calcium forty gives forty percent calcium content">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — calcium content of pure limestone</text>
      {[
        ["Step 1 — formula & molar mass", "CaCO₃: 40 + 12 + 3(16) = 100 g/mol"],
        ["Step 2 — calcium mass per mole", "1 Ca = 40 g"],
        ["Step 3 — percentage", "(40 ÷ 100) × 100 = 40% Ca"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={40 + i * 46} width="660" height="40" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="46" y={58 + i * 46} fontSize="9.5" className="fill-current text-sky-600" fontWeight="800">{t}</text>
          <text x="674" y={58 + i * 46} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d}</text>
        </g>
      ))}
      <rect x="30" y="182" width="660" height="30" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="196" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Reverse use: 5 g of a limestone sample yields 2 g Ca — the ore is 40% pure CaCO₃ (assuming the rest is inert).</text>
      <text x="360" y="208" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Percentage composition runs both ways: formula → purity, and assay data → formula.</text>
    </svg>
  );
}
