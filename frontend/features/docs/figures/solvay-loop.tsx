// SolvayLoop figure. Theme-aware.
export function SolvayLoop({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Solvay process loop from brine ammonia and carbon dioxide to sodium carbonate">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Solvay — the ammonia that comes back</text>
      <rect x="40" y="60" width="230" height="80" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="155" y="86" fontSize="10.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">brine + NH₃, CO₂ in</text>
      <text x="155" y="108" fontSize="10" textAnchor="middle" className="fill-current text-foreground">NaHCO₃ precipitates</text>
      <text x="155" y="126" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">(least soluble here)</text>
      <path d="M 275 100 L 335 100" stroke="rgb(239 68 68)" strokeWidth="2.5" markerEnd="url(#sl-a)" />
      <text x="305" y="90" fontSize="9.5" textAnchor="middle" fill="rgb(239 68 68)">heat</text>
      <rect x="340" y="60" width="230" height="80" rx="10" fill="rgb(245 158 11)" opacity="0.12" stroke="rgb(245 158 11)" />
      <text x="455" y="86" fontSize="10.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">2NaHCO₃ → Na₂CO₃</text>
      <text x="455" y="108" fontSize="10" textAnchor="middle" className="fill-current text-foreground">+ CO₂ + H₂O</text>
      <text x="455" y="126" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">soda ash — product</text>
      <path d="M 455 145 C 455 175, 300 185, 160 150" stroke="rgb(16 185 129)" strokeWidth="2" fill="none" strokeDasharray="5 4" markerEnd="url(#sl-a)" />
      <text x="310" y="185" fontSize="9.5" fill="rgb(16 185 129)" textAnchor="middle">CO₂ recycled · NH₃ recovered from NH₄Cl with lime</text>
      <defs>
        <marker id="sl-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
    </svg>
  );
}
