// Solved Rydberg formula drill. Theme-aware.
export function RydbergFormulaDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Solved Rydberg formula drill one over lambda equals R times one over n one squared minus one over n two squared giving 656.3 nanometres for three to two">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — the Rydberg route to the same answer</text>
      <rect x="30" y="40" width="660" height="50" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="72" fontSize="15" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">1/λ = R (1/n₁² − 1/n₂²),  R = 1.097 × 10⁷ m⁻¹</text>
      <rect x="30" y="102" width="660" height="52" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="46" y="124" fontSize="9.5" className="fill-current text-emerald-600" fontWeight="800">Balmer 3 → 2: 1/λ = 1.097 × 10⁷ (1/4 − 1/9) = 1.097 × 10⁷ × 5/36</text>
      <text x="46" y="144" fontSize="9.5" className="fill-current text-foreground" fontWeight="700">1/λ = 1.524 × 10⁶ m⁻¹ → λ = 6.56 × 10⁻⁷ m = 656.3 nm ✓</text>
      <rect x="30" y="166" width="660" height="40" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="184" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Rydberg's constant came first (from spectroscopy); Bohr's model derived it: R = 2π²me⁴/ch³ — quote this for the derivation mark.</text>
      <text x="360" y="198" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Same transition, two routes: energy difference (Bohr) or wavenumber difference (Rydberg) — both land on 656.3 nm.</text>
    </svg>
  );
}
