// AvailableChlorinePanel figure. Theme-aware.
export function AvailableChlorinePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Available chlorine of bleaching powder and the hypochlorous acid bleaching mechanism">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Available chlorine — and the true bleach</text>
      <rect x="40" y="55" width="280" height="125" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="80" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">AVAILABLE CHLORINE 35–38 %</text>
      <text x="180" y="106" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Ca(OCl)Cl + H₂SO₄ →</text>
      <text x="180" y="126" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">CaSO₄ + H₂O + Cl₂↑</text>
      <text x="180" y="150" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">% of its mass liberated as Cl₂</text>
      <text x="180" y="168" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">— the quality test</text>
      <rect x="340" y="55" width="280" height="125" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="80" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">THE BLEACHING AGENT</text>
      <text x="480" y="106" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Cl₂ + H₂O → HCl + HOCl</text>
      <text x="480" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">HOCl → HCl + [O]</text>
      <text x="480" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">nascent oxygen oxidises the stain</text>
      <text x="480" y="170" fontSize="9.5" textAnchor="middle" fill="rgb(239 68 68)">never on wool/silk — HOCl eats protein</text>
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The chlorine is the carrier; the oxygen does the bleaching</text>
    </svg>
  );
}
