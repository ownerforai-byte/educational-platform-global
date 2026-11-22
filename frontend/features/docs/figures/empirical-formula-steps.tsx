// Empirical formula determination steps. Theme-aware.
export function EmpiricalFormulaSteps({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Empirical formula determination five steps percent to grams grams to moles divide by smallest whole number ratio write formula">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Empirical formula — the 5-step machine</text>
      {[
        ["1", "Take percentages as grams (assume 100 g sample)"],
        ["2", "Convert each mass to moles: n = m ÷ atomic mass"],
        ["3", "Divide all mole values by the smallest"],
        ["4", "If fractions remain, multiply to clear them (×2, ×3…)"],
        ["5", "Write the whole-number ratio as subscripts"],
      ].map(([n, t], i) => (
        <g key={n}>
          <circle cx="58" cy={50 + i * 34} r="13" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <text x="58" y={55 + i * 34} fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">{n}</text>
          <text x="86" y={55 + i * 34} fontSize="9.2" className="fill-current text-foreground" fontWeight="700">{t}</text>
        </g>
      ))}
      <rect x="30" y="192" width="660" height="20" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="206" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Fraction decoder: 0.5 → ×2 · 0.33 → ×3 · 0.25 → ×4 · 0.167 → ×6 — the multiplier applies to EVERY element.</text>
    </svg>
  );
}
