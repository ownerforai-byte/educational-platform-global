// Limiting reactant sandwich analogy. Theme-aware.
export function LimitingReactantConcept({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Limiting reactant concept sandwich analogy bread slices and cheese pieces limiting reagent runs out first controls product amount">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The sandwich analogy — the exhausted ingredient rules</text>
      <rect x="30" y="44" width="320" height="100" rx="10" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="190" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-amber-600" fontWeight="800">10 slices bread + 7 slices cheese</text>
      <text x="190" y="90" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">recipe: 2 bread : 1 cheese per sandwich</text>
      <text x="190" y="110" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">bread allows 5, cheese allows 7</text>
      <text x="190" y="130" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">→ only 5 sandwiches; bread is limiting</text>
      <rect x="370" y="44" width="320" height="100" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="530" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Chemistry version</text>
      <text x="530" y="90" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">2 H₂ + O₂ → 2 H₂O</text>
      <text x="530" y="110" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">4 mol H₂ + 3 mol O₂ → H₂ limits</text>
      <text x="530" y="130" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">→ 4 mol H₂O; 1 mol O₂ left over</text>
      <rect x="30" y="158" width="660" height="42" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="176" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Definition: the reactant that produces the least product (or is consumed first) is the limiting reactant; the other is in excess.</text>
      <text x="360" y="192" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">The smaller given mass is NOT automatically limiting — divide by the coefficient, then compare.</text>
    </svg>
  );
}
