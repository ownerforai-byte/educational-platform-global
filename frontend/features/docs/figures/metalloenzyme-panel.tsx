// MetalloenzymePanel figure. Theme-aware.
export function MetalloenzymePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Carbonic anhydrase zinc active site catalysing carbon dioxide hydration">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Metalloenzyme: the metal does the chemistry</text>
      <rect x="40" y="55" width="300" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="190" y="78" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">CARBONIC ANHYDRASE</text>
      <circle cx="190" cy="120" r="16" fill="rgb(148 163 184)" />
      <text x="190" y="125" fontSize="10" textAnchor="middle" className="fill-current text-foreground">Zn²⁺</text>
      <text x="190" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">held by histidine residues</text>
      <text x="190" y="168" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">activates water → OH⁻ attacks CO₂</text>
      <path d="M 345 115 L 395 115" stroke="rgb(16 185 129)" strokeWidth="2.5" markerEnd="url(#mp-a)" />
      <rect x="400" y="55" width="220" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="510" y="82" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">CO₂ + H₂O ⇌ H₂CO₃</text>
      <text x="510" y="106" fontSize="10" textAnchor="middle" className="fill-current text-foreground">⇌ HCO₃⁻ + H⁺</text>
      <text x="510" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">millions× faster than uncatalysed</text>
      <text x="510" y="150" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">blood CO₂ transport + lungs</text>
      <defs>
        <marker id="mp-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Also: carboxypeptidase (Zn²⁺), catalase (Fe), nitrogenase (Fe–Mo)</text>
    </svg>
  );
}
