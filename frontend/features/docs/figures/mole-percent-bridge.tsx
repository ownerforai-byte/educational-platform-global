// Mole to percentage bridge. Theme-aware.
export function MolePercentBridge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Mole to percentage composition bridge one mole basis makes mass fraction equal percentage directly">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Trick that halves the work: compute on a 1-mole basis</text>
      <rect x="30" y="44" width="660" height="60" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="46" y="66" fontSize="9.5" className="fill-current text-sky-600" fontWeight="800">In exactly 1 mol of compound:</text>
      <text x="46" y="88" fontSize="9" className="fill-current text-foreground" fontWeight="700">mass of element (g) ÷ molar mass (g) × 100 — grams cancel, leaving pure percentage</text>
      <rect x="30" y="116" width="660" height="44" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="46" y="138" fontSize="9.5" className="fill-current text-emerald-600" fontWeight="800">Example — NaHCO₃ (84 g/mol):</text>
      <text x="46" y="154" fontSize="9" className="fill-current text-foreground" fontWeight="700">Na 23/84 = 27.4% · H 1/84 = 1.2% · C 12/84 = 14.3% · O₃ 48/84 = 57.1% → sums to 100 ✓</text>
      <rect x="30" y="172" width="660" height="28" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="190" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">The 1-mole basis also feeds directly into empirical-formula problems — one habit, two topics.</text>
    </svg>
  );
}
