// Solved: definite proportions copper oxide. Theme-aware.
export function DefiniteProportionDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Solved definite proportions copper oxide samples both show four to one copper oxygen ratio proving fixed composition">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — two CuO samples, one ratio</text>
      {[
        ["Sample A", "1.60 g CuO → 1.28 g Cu, 0.32 g O"],
        ["Sample B", "2.40 g CuO → 1.92 g Cu, 0.48 g O"],
        ["Ratio Cu : O", "A: 1.28/0.32 = 4.0 · B: 1.92/0.48 = 4.0"],
        ["Conclusion", "identical ratio from different sources → law of definite proportions holds"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={40 + i * 44} width="660" height="38" rx="9" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x="46" y={58 + i * 44} fontSize="9" className="fill-current text-emerald-600" fontWeight="800">{t}</text>
          <text x="674" y={58 + i * 44} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d}</text>
        </g>
      ))}
      <rect x="30" y="200" width="660" height="22" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="215" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Note the 4:1 ratio matches CuO itself (64 : 16) — experiment and formula agree, which is the point of the exercise.</text>
    </svg>
  );
}
