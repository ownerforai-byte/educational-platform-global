// FlagshipComplexes figure. Theme-aware.
export function FlagshipComplexes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Comparison of chlorophyll and haemoglobin as metal chelate complexes">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The two flagship complexes</text>
      <rect x="40" y="55" width="280" height="125" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="80" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">CHLOROPHYLL — Mg²⁺</text>
      <text x="180" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">chlorophyll a: C₅₅H₇₂O₅N₄Mg</text>
      <text x="180" y="128" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">absorbs red + blue light</text>
      <text x="180" y="148" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">drives photosynthesis</text>
      <text x="180" y="168" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">in chloroplasts</text>
      <rect x="340" y="55" width="280" height="125" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="80" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">HAEMOGLOBIN — Fe²⁺</text>
      <text x="480" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">4 haem groups → 4 O₂ per molecule</text>
      <text x="480" y="128" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">reversible O₂ binding</text>
      <text x="480" y="148" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">loads in lungs, unloads in tissues</text>
      <text x="480" y="168" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">in red blood cells</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Same ring idea, different metal, opposite jobs — transport vs light</text>
    </svg>
  );
}
