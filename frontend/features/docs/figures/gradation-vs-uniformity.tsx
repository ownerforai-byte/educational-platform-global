// GradationVsUniformity figure. Theme-aware.
export function GradationVsUniformity({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Gradation of physical properties versus uniform chemical properties in a series">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Physics climbs; chemistry stays put</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">GRADATION (physical)</text>
      <text x="180" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">m.p. · b.p. · density · viscosity</text>
      <text x="180" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">rise smoothly with molecular mass</text>
      <text x="180" y="154" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">65 → 78 → 97 °C along the alkanols</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">UNIFORMITY (chemical)</text>
      <text x="480" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">same functional group → same reactions</text>
      <text x="480" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">all alkanols oxidise, esterify, dehydrate</text>
      <text x="480" y="154" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">similar preparations for every member</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">"Gradation" belongs to physical properties — chemical properties are similar, not graded</text>
    </svg>
  );
}
