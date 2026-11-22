// Solved: empirical formula numerical. Theme-aware.
export function EmpiricalFormulaDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 240" className={className} role="img" aria-label="Solved empirical formula compound forty percent carbon six point seven percent hydrogen fifty three point three percent oxygen gives CH2O">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — 40% C, 6.7% H, 53.3% O</text>
      {[
        ["Moles", "C: 40/12 = 3.33 · H: 6.7/1 = 6.7 · O: 53.3/16 = 3.33"],
        ["Divide by smallest (3.33)", "C: 1.0 · H: 2.0 · O: 1.0"],
        ["Ratio", "C : H : O = 1 : 2 : 1"],
        ["Empirical formula", "CH₂O (the glucose/formaldehyde ratio)"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={38 + i * 42} width="660" height="36" rx="9" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="46" y={56 + i * 42} fontSize="9" className="fill-current text-sky-600" fontWeight="800">{t}</text>
          <text x="674" y={56 + i * 42} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d}</text>
        </g>
      ))}
      <rect x="30" y="210" width="660" height="22" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="225" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">With M = 180 (given), molecular formula = CH₂O × (180 ÷ 30) = C₆H₁₂O₆ — glucose.</text>
    </svg>
  );
}
