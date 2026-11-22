// PassiveVsActive figure. Theme-aware.
export function PassiveVsActive({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Passive transport down the gradient versus active transport against it">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Downhill is free; uphill costs ATP</text>
      <rect x="40" y="55" width="280" height="125" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="80" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">PASSIVE (diffusion)</text>
      <path d="M 100 130 L 260 130" stroke="rgb(16 185 129)" strokeWidth="3" markerEnd="url(#pva-a)" />
      <text x="180" y="120" fontSize="10" textAnchor="middle" className="fill-current text-foreground">down the gradient</text>
      <text x="180" y="155" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">no energy needed (O₂ into blood)</text>
      <rect x="340" y="55" width="280" height="125" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="80" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">ACTIVE transport</text>
      <path d="M 400 130 L 560 130" stroke="rgb(239 68 68)" strokeWidth="3" markerEnd="url(#pva-b)" />
      <text x="480" y="120" fontSize="10" textAnchor="middle" className="fill-current text-foreground">AGAINST the gradient</text>
      <text x="480" y="155" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">energy required (Na⁺/K⁺ pump, ATP)</text>
      <text x="330" y="210" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Direction relative to the gradient + energy source = the two test marks</text>
      <defs>
        <marker id="pva-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
        <marker id="pva-b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(239 68 68)" /></marker>
      </defs>
    </svg>
  );
}
