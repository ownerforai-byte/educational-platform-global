// Solved: dilution M1V1 = M2V2. Theme-aware.
export function DilutionFormulaDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Solved dilution from two molar stock to zero point five molar five hundred millilitres needs one hundred twenty five millilitres stock">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — dilution: M₁V₁ = M₂V₂</text>
      {[
        ["Given", "2 M stock → make 500 mL of 0.5 M"],
        ["Moles before = moles after", "2 × V₁ = 0.5 × 500"],
        ["Solve", "V₁ = 250/2 = 125 mL of stock"],
        ["Method", "take 125 mL stock, add water to the 500 mL mark (not 375 mL water)"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={40 + i * 40} width="660" height="34" rx="9" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x="46" y={62 + i * 40} fontSize="9" className="fill-current text-emerald-600" fontWeight="800">{t}</text>
          <text x="674" y={62 + i * 40} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d}</text>
        </g>
      ))}
      <rect x="30" y="202" width="660" height="12" rx="0" />
      <text x="360" y="214" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">"Add to the mark" is the phrase that earns the practical mark — volumes are not strictly additive.</text>
    </svg>
  );
}
