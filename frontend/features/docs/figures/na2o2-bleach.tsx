// Na2o2Bleach figure. Theme-aware.
export function Na2o2Bleach({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Sodium peroxide bleaching and oxygen generation chemistry">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Na₂O₂ — bleach and breath</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">BLEACHING</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">peroxide ion O₂²⁻</text>
      <text x="180" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">liberates nascent oxygen</text>
      <text x="180" y="154" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">oxidises colouring matter</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">OXYGEN MASKS</text>
      <text x="480" y="112" fontSize="11" textAnchor="middle" className="fill-current text-foreground">2Na₂O₂ + 2CO₂ → 2Na₂CO₃ + O₂</text>
      <text x="480" y="134" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">exhaled CO₂ feeds the O₂ release</text>
      <text x="480" y="156" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">closed-loop breathing apparatus</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">One compound, two jobs: oxidise stains, regenerate air</text>
    </svg>
  );
}
