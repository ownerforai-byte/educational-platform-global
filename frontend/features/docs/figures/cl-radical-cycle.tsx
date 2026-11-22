// Chlorine radical catalytic cycle. Theme-aware.
export function ClRadicalCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Two step chlorine radical cycle destroying ozone catalytically and regenerating the chlorine atom">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">One Cl atom, ~100,000 ozone deaths</text>
      <circle cx="330" cy="130" r="26" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.25" />
      <text x="330" y="136" fontSize="14" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">Cl·</text>
      <path d="M 305 118 Q 200 80 120 105" stroke="rgb(59 130 246)" strokeWidth="2" fill="none" markerEnd="url(#arc1)" />
      <text x="120" y="72" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)">Cl· + O₃ → ClO· + O₂</text>
      <path d="M 355 118 Q 460 80 540 105" stroke="rgb(16 185 129)" strokeWidth="2" fill="none" markerEnd="url(#arc2)" />
      <text x="440" y="72" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)">ClO· + O → Cl· + O₂</text>
      <path d="M 540 150 Q 460 195 355 145" stroke="rgb(245 158 11)" strokeWidth="2" strokeDasharray="5 4" fill="none" markerEnd="url(#arc3)" />
      <text x="470" y="205" fontSize="11" textAnchor="middle" fill="rgb(245 158 11)">regenerated - cycle repeats</text>
      <text x="180" y="205" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">net: O₃ + O → 2O₂</text>
      <defs>
        <marker id="arc1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(59 130 246)" /></marker>
        <marker id="arc2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
        <marker id="arc3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
      <text x="330" y="244" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The catalyst survives; the ozone does not</text>
    </svg>
  );
}
