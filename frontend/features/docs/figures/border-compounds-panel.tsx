// BorderCompoundsPanel figure. Theme-aware.
export function BorderCompoundsPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Boundary compounds kept in inorganic chemistry despite containing carbon">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The conventional border</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">ORGANIC side</text>
      <text x="180" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">C–H framework, catenated skeletons,</text>
      <text x="180" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">covalent molecular families</text>
      <text x="180" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">CH₄, C₂H₅OH, CH₃COOH, benzene…</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">INORGANIC side (though C is present)</text>
      <text x="480" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">carbonates, bicarbonates, carbides,</text>
      <text x="480" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">cyanides, CO, CO₂</text>
      <text x="480" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">salt-like / oxide chemistry, no chains</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The border is behavioural: chains and C–H make the organic family</text>
    </svg>
  );
}
