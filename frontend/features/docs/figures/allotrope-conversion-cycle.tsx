// Phosphorus allotrope conversion cycle. Theme-aware.
export function AllotropeConversionCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Reversible conversion between white and red phosphorus at 250 to 300 degrees and above 400 degrees">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Heat one way, heat further the other</text>
      <rect x="80" y="70" width="200" height="60" rx="10" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.16" />
      <text x="180" y="96" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(245 158 11)">white P₄</text>
      <text x="180" y="116" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">under water, dark</text>
      <rect x="380" y="70" width="200" height="60" rx="10" className="fill-current" style={{ color: "rgb(220 38 38)" }} opacity="0.16" />
      <text x="480" y="96" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(220 38 38)">red P</text>
      <text x="480" y="116" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">sealed tube / catalyst</text>
      <path d="M 285 90 L 375 90" stroke="rgb(239 68 68)" strokeWidth="2.5" markerEnd="url(#acc1)" />
      <text x="330" y="78" fontSize="10.5" textAnchor="middle" fill="rgb(239 68 68)">250–300 °C</text>
      <path d="M 375 115 L 285 115" stroke="rgb(59 130 246)" strokeWidth="2.5" markerEnd="url(#acc2)" />
      <text x="330" y="138" fontSize="10.5" textAnchor="middle" fill="rgb(59 130 246)">heat &gt; 400 °C, cool</text>
      <defs>
        <marker id="acc1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(239 68 68)" /></marker>
        <marker id="acc2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(59 130 246)" /></marker>
      </defs>
      <text x="330" y="200" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Allotropy by temperature — the polymer wins at moderate heat, the strained tetrahedra return at high heat</text>
    </svg>
  );
}
