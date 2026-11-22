// DownsCellDiagram figure. Theme-aware.
export function DownsCellDiagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Labelled Downs cell for sodium extraction with anode cathode diaphragm and collectors">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The Downs cell</text>
      <rect x="150" y="55" width="360" height="125" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" strokeWidth="2" />
      <text x="330" y="76" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">fused NaCl + CaCl₂ (42 : 58), ~600 °C</text>
      <rect x="322" y="82" width="16" height="60" fill="rgb(56 56 56)" stroke="rgb(148 163 184)" />
      <text x="330" y="158" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">graphite ANODE · 2Cl⁻ → Cl₂ + 2e⁻</text>
      <path d="M 300 90 L 300 145" stroke="rgb(148 163 184)" strokeWidth="2" strokeDasharray="4 3" />
      <path d="M 360 90 L 360 145" stroke="rgb(148 163 184)" strokeWidth="2" strokeDasharray="4 3" />
      <text x="330" y="98" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">steel gauze diaphragm</text>
      <rect x="220" y="88" width="40" height="30" rx="4" fill="rgb(147 197 253)" stroke="rgb(59 130 246)" />
      <text x="240" y="82" fontSize="9.5" fill="rgb(59 130 246)" textAnchor="middle">Na bell — floats up</text>
      <text x="240" y="136" fontSize="9.5" fill="rgb(59 130 246)" textAnchor="middle">steel CATHODE · Na⁺ + e⁻ → Na</text>
      <path d="M 470 100 L 500 100" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#dcd-a)" />
      <text x="512" y="104" fontSize="9.5" fill="rgb(16 185 129)">Cl₂ out</text>
      <defs>
        <marker id="dcd-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Diaphragm keeps Na from Cl₂ (they would recombine); Ca²⁺ stays unreduced in the melt</text>
      <text x="330" y="224" fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">overall: 2NaCl(l) → 2Na + Cl₂</text>
    </svg>
  );
}
