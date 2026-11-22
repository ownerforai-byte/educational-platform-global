// Fraction clearing in empirical formulas. Theme-aware.
export function RatioClearingPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Ratio clearing panel fractional mole ratios times two times three times four to whole numbers with examples one half one third one quarter">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Clearing fractions — the step that breaks ratios</text>
      {[
        ["0.5 → ×2", "C : H : O = 1 : 1.5 : 1 → 2 : 3 : 2"],
        ["0.33 → ×3", "1 : 1.33 : 0.67 → 3 : 4 : 2"],
        ["0.25 → ×4", "1 : 1.25 : 0.25 → 4 : 5 : 1"],
        ["0.167 → ×6", "1 : 1.33 : 0.167 → 6 : 8 : 1"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x={30 + (i % 2) * 340} y={40 + Math.floor(i / 2) * 56} width="320" height="48" rx="9" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x={46 + (i % 2) * 340} y={60 + Math.floor(i / 2) * 56} fontSize="9" className="fill-current text-emerald-600" fontWeight="800">{t}</text>
          <text x={46 + (i % 2) * 340} y={78 + Math.floor(i / 2) * 56} fontSize="8.4" className="fill-current text-foreground" fontWeight="700">{d}</text>
        </g>
      ))}
      <rect x="30" y="160" width="660" height="40" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="178" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Golden rule: multiply ALL elements by the same factor — scaling one subscript alone changes the compound.</text>
      <text x="360" y="192" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Rounding discipline: treat 1.98 as 2 and 3.02 as 3, but never round 1.5 to 2 — that is what the ×2 step is for.</text>
    </svg>
  );
}
