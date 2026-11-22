// Isotopes vs identical-atoms postulate. Theme-aware.
export function IsotopeChallengePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Isotopes challenge identical atoms postulate chlorine thirty five and thirty seven same chemistry different mass averaged thirty five point five">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Postulate 2 vs isotopes — same element, different mass</text>
      <rect x="30" y="44" width="320" height="100" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="190" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Chlorine's two isotopes</text>
      <text x="190" y="92" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">³⁵Cl (75%) · ³⁷Cl (25%)</text>
      <text x="190" y="114" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">identical chemistry, different neutron counts</text>
      <text x="190" y="132" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">Dalton's "identical atoms" is false as stated</text>
      <rect x="370" y="44" width="320" height="100" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="530" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">The weighted average rescues stoichiometry</text>
      <text x="530" y="92" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">(35 × 75 + 37 × 25) / 100 = 35.5</text>
      <text x="530" y="114" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">the atomic mass used in every calculation</text>
      <text x="530" y="132" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">laws survive because ratios are statistical</text>
      <rect x="30" y="158" width="660" height="42" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="176" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Same story for isotopy of hydrogen (protium, deuterium, tritium) and carbon (C-12, C-13, C-14).</text>
      <text x="360" y="192" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Exam line: isotopes disprove postulate 2, but weighted averages preserve the laws built on it.</text>
    </svg>
  );
}
