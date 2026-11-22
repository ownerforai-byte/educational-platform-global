// AnionSizeRule figure. Theme-aware.
export function AnionSizeRule({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Rule relating anion size to the direction of the solubility trend">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">One rule to memorise: anion size decides</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">SMALL ANION (OH⁻)</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">lattice falls FASTER than hydration</text>
      <text x="180" y="134" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">solubility INCREASES ↓</text>
      <text x="180" y="158" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Be(OH)₂ → Ba(OH)₂</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">LARGE ANION (CO₃²⁻, SO₄²⁻)</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">lattice falls SLOWER than hydration</text>
      <text x="480" y="134" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">solubility DECREASES ↓</text>
      <text x="480" y="158" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">MgCO₃ → BaCO₃ · MgSO₄ → BaSO₄</text>
      <text x="330" y="210" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Hydration falls at a fixed rate; the anion sets the lattice rate — direction follows</text>
    </svg>
  );
}
