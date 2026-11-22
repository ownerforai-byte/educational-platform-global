// Gram atom, gram molecule, gram ion terms. Theme-aware.
export function GramAtomMoleTerms({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Gram atom gram molecule gram ion terminology each equals one mole with examples oxygen thirty two grams sodium twenty three grams">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Old names, one meaning — all are "1 mole"</text>
      {[
        ["Gram atom", "1 mol of atoms — 23 g Na, 16 g O"],
        ["Gram molecule", "1 mol of molecules — 32 g O₂, 18 g H₂O"],
        ["Gram ion", "1 mol of ions — 58.5 g Na⁺Cl⁻ units"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x={30 + i * 230} y="44" width="210" height="76" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x={135 + i * 230} y="70" fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">{t}</text>
          <text x={135 + i * 230} y="92" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">{d.slice(0, 26)}</text>
          <text x={135 + i * 230} y="106" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">{d.slice(26, 52)}</text>
        </g>
      ))}
      <rect x="30" y="136" width="660" height="64" rx="10" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="160" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">All three hold 6.022 × 10²³ of their named particle — the term just says what is being counted.</text>
      <text x="360" y="180" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">NEB wording: "How many gram-atoms are in 46 g Na?" → 46 ÷ 23 = 2 gram-atoms = 2 mol Na.</text>
    </svg>
  );
}
