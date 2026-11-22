// NucleophileRoster figure. Theme-aware.
export function NucleophileRoster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Charged and neutral nucleophiles with lone pairs">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Nucleophile roster — charged and neutral</text>
      <rect x="40" y="52" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="78" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">CHARGED (anions)</text>
      <text x="180" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">OH⁻ · CN⁻ · Cl⁻ · CH₃O⁻ · H⁻</text>
      <text x="180" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">CN⁻ extends chains; OH⁻ substitutes</text>
      <text x="180" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">a lone pair plus a negative charge</text>
      <rect x="340" y="52" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="78" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">NEUTRAL (lone pairs)</text>
      <text x="480" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">H₂O · NH₃ · ROH · RNH₂</text>
      <text x="480" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">lone pairs make them donors</text>
      <text x="480" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">NH₃ → amines; H₂O → alcohols</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">a nucleophile is a Lewis base in action</text>
    </svg>
  );
}
