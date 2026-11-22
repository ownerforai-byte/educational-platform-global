// ReformingPlatforming figure. Theme-aware.
export function ReformingPlatforming({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Platinum catalysed reforming converting straight chains into aromatics">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Platforming — same size, better shape</text>
      <rect x="40" y="70" width="180" height="70" rx="10" fill="rgb(120 113 108)" opacity="0.12" stroke="rgb(120 113 108)" />
      <text x="130" y="98" fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">n-hexane (straight)</text>
      <text x="130" y="120" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">low octane, knocks</text>
      <path d="M 225 105 L 285 105" stroke="rgb(245 158 11)" strokeWidth="3" markerEnd="url(#rpf-a)" />
      <text x="255" y="92" fontSize="9.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">Pt, ~500 °C</text>
      <rect x="290" y="70" width="130" height="70" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="355" y="98" fontSize="10.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">REFORMER</text>
      <text x="355" y="120" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">(platforming)</text>
      <path d="M 425 105 L 485 105" stroke="rgb(245 158 11)" strokeWidth="3" markerEnd="url(#rpf-a)" />
      <text x="455" y="92" fontSize="9.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">+ 4H₂</text>
      <rect x="490" y="70" width="130" height="70" rx="10" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="555" y="98" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">benzene (ring)</text>
      <text x="555" y="120" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">high octane</text>
      <text x="330" y="180" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">straight chains → branched alkanes + aromatics, same carbon number</text>
      <text x="330" y="203" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">octane number rises without additives and without changing the boiling range</text>
      <text x="330" y="225" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">the H₂ by-product feeds hydrotreating across the refinery</text>
      <defs>
        <marker id="rpf-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
    </svg>
  );
}
