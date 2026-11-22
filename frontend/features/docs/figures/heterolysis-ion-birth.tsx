// HeterolysisIonBirth figure. Theme-aware.
export function HeterolysisIonBirth({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Heterolytic fission of tert-butyl chloride producing carbocation and chloride">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Heterolysis in action: tert-butyl chloride in water</text>
      <rect x="40" y="58" width="220" height="70" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="150" y="88" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">(CH₃)₃C–Cl</text>
      <text x="150" y="112" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">polar C–Cl bond (Cl pulls harder)</text>
      <path d="M 265 92 L 340 92" stroke="rgb(245 158 11)" strokeWidth="3" markerEnd="url(#hib-a)" />
      <text x="302" y="80" fontSize="10" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">polar solvent</text>
      <rect x="345" y="58" width="150" height="70" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" strokeWidth="1.5" />
      <text x="420" y="88" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">(CH₃)₃C⁺</text>
      <text x="420" y="112" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">carbocation: 6 e⁻, positive</text>
      <rect x="505" y="58" width="115" height="70" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="562" y="88" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">:Cl⁻</text>
      <text x="562" y="112" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">chloride keeps the pair</text>
      <text x="330" y="170" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">the electron pair leaves WITH chlorine — the carbon is left electron-poor</text>
      <text x="330" y="198" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">HCl → H⁺ + Cl⁻ in water is the same story in miniature</text>
      <defs>
        <marker id="hib-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
    </svg>
  );
}
