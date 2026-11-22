// IaVsIiaCarbonates figure. Theme-aware.
export function IaVsIiaCarbonates({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Comparison of thermal stability of group one and group two carbonates">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Why IA carbonates shrug off heat</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">GROUP IA — M⁺</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">single charge, big radius</text>
      <text x="180" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">weak polariser → carbonate intact</text>
      <text x="180" y="156" fontSize="10.5" textAnchor="middle" fill="rgb(16 185 129)">Na₂CO₃, K₂CO₃: stable to strong heat</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">GROUP IIA — M²⁺</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">double charge, smaller radius</text>
      <text x="480" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">strong polariser → carbonate breaks</text>
      <text x="480" y="156" fontSize="10.5" textAnchor="middle" fill="rgb(239 68 68)">all MCO₃ → MO + CO₂ on heating</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Only Li₂CO₃ breaks ranks — its tiny cation borrows Mg's behaviour</text>
    </svg>
  );
}
