// FluxFamilies figure. Theme-aware.
export function FluxFamiliesPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Table of acidic flux silica and basic flux limestone with the gangue each removes">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Pick the flux by the gangue</text>
      <rect x="40" y="50" width="280" height="150" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="76" fontSize="13" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">ACIDIC FLUX — SiO₂</text>
      <text x="180" y="100" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">removes BASIC gangue</text>
      <text x="180" y="120" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">(lime, metal oxides)</text>
      <text x="180" y="145" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">forms silicate slags</text>
      <text x="180" y="165" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">used in Cu, Fe extraction</text>
      <rect x="340" y="50" width="280" height="150" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="480" y="76" fontSize="13" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">BASIC FLUX — CaCO₃ / CaO</text>
      <text x="480" y="100" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">removes ACIDIC gangue</text>
      <text x="480" y="120" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">(silica, alumina)</text>
      <text x="480" y="145" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">CaCO₃ → CaO + CO₂</text>
      <text x="480" y="165" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">CaO + SiO₂ → CaSiO₃</text>
      <text x="330" y="225" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Acid-base neutralisation at 1500 °C</text>
    </svg>
  );
}
