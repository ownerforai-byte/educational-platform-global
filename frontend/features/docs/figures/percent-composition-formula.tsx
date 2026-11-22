// Percentage composition formula anatomy. Theme-aware.
export function PercentCompositionFormula({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 200" className={className} role="img" aria-label="Percentage composition formula mass of element in one mole divided by molar mass times hundred with labels">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The only formula the topic needs</text>
      <rect x="30" y="42" width="660" height="62" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="70" fontSize="13" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">% of element = (mass of element in 1 mol ÷ molar mass) × 100</text>
      <text x="360" y="92" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">subscripts count: multiply the element's atomic mass by its subscript before dividing</text>
      <rect x="30" y="118" width="660" height="34" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="136" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Self-check: all element percentages in one compound must add to 100 (within rounding) — a free error-catcher in the exam.</text>
      <text x="360" y="148" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Quote atomic masses used (H = 1, N = 14, O = 16 …) — method marks live there.</text>
    </svg>
  );
}
