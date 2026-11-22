// Solved: percentage of nitrogen in urea. Theme-aware.
export function UreaPercentDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Solved percentage of nitrogen in urea NH2CONH2 molar mass sixty nitrogen twenty eight gives forty six point six percent">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — % nitrogen in urea, CO(NH₂)₂</text>
      {[
        ["Step 1 — molar mass", "12 + 16 + 2(14) + 4(1) = 60 g/mol", "rgb(14 165 233 / 0.9)"],
        ["Step 2 — nitrogen mass per mole", "2 N = 2 × 14 = 28 g", "rgb(16 185 129 / 0.9)"],
        ["Step 3 — percentage", "(28 ÷ 60) × 100 = 46.6%", "rgb(139 92 246 / 0.9)"],
      ].map(([t, d, c], i) => (
        <g key={String(t)}>
          <rect x="30" y={40 + i * 52} width="660" height="44" rx="10" className="fill-current" style={{ color: String(c) }} opacity="0.1" />
          <rect x="30" y={40 + i * 52} width="660" height="44" rx="10" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ color: String(c) }} />
          <text x="46" y={60 + i * 52} fontSize="9.5" className="fill-current text-foreground" fontWeight="800">{String(t)}</text>
          <text x="674" y={60 + i * 52} fontSize="10" textAnchor="end" className="fill-current" style={{ color: String(c) }} fontWeight="800">{String(d)}</text>
        </g>
      ))}
      <rect x="30" y="200" width="660" height="22" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="215" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Why urea matters: 46.6% N makes it the strongest solid nitrogen fertiliser in common use — the chemistry behind the bag's label.</text>
    </svg>
  );
}
