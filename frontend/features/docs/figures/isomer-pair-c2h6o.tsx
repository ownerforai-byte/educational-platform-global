// IsomerPairC2H6O figure. Theme-aware.
export function IsomerPairC2H6O({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Two isomers sharing molecular formula C2H6O ethanol and dimethyl ether">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">One formula, two compounds: C₂H₆O</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">ETHANOL</text>
      <text x="180" y="108" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃CH₂OH</text>
      <text x="180" y="132" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C–C–O–H connectivity</text>
      <text x="180" y="154" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">liquid, b.p. 78 °C, a drinkable alcohol</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">DIMETHYL ETHER</text>
      <text x="480" y="108" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃OCH₃</text>
      <text x="480" y="132" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C–O–C connectivity</text>
      <text x="480" y="154" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">gas, different reactivity entirely</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Molecular formula counts atoms; condensed formula reveals identity</text>
    </svg>
  );
}
