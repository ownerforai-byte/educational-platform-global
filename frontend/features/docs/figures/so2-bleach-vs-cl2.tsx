// SO2 vs Cl2 bleaching. Theme-aware.
export function So2BleachVsCl2({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Temporary reduction bleaching by sulphur dioxide versus permanent oxidation bleaching by chlorine">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Two chemistries, two fates for colour</text>
      <rect x="40" y="50" width="280" height="120" rx="10" className="fill-current" style={{ color: "rgb(124 58 237)" }} opacity="0.14" />
      <text x="180" y="78" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(124 58 237)">SO₂ — temporary</text>
      <text x="180" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">SO₂ + 2H₂O → H₂SO₄ + 2[H]</text>
      <text x="180" y="126" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">[H] reduces the chromophore</text>
      <text x="180" y="148" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">air re-oxidises → colour returns</text>
      <rect x="340" y="50" width="280" height="120" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.14" />
      <text x="480" y="78" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(14 165 233)">Cl₂ — permanent</text>
      <text x="480" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Cl₂ + H₂O → HCl + HOCl</text>
      <text x="480" y="126" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">HOCl → HCl + [O]</text>
      <text x="480" y="148" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">[O] destroys chromophore for good</text>
      <text x="330" y="206" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Reducing bleach fades back in sunlight; oxidising bleach never does</text>
    </svg>
  );
}
