// C2H6OIsomerTest figure. Theme-aware.
export function C2H6OIsomerTest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Molecular formula C2H6O hiding two different compounds">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Where the molecular formula fails</text>
      <rect x="200" y="55" width="260" height="44" rx="10" fill="rgb(148 163 184)" opacity="0.14" stroke="rgb(148 163 184)" />
      <text x="330" y="83" fontSize="14" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">C₂H₆O  =  ???</text>
      <path d="M 250 105 L 180 140" stroke="rgb(59 130 246)" strokeWidth="2.5" markerEnd="url(#cit-a)" />
      <path d="M 410 105 L 480 140" stroke="rgb(239 68 68)" strokeWidth="2.5" markerEnd="url(#cit-a)" />
      <rect x="40" y="145" width="280" height="60" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="168" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">ethanol CH₃CH₂OH</text>
      <text x="180" y="192" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C–C–O–H · liquid · b.p. 78 °C</text>
      <rect x="340" y="145" width="280" height="60" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="168" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">dimethyl ether CH₃OCH₃</text>
      <text x="480" y="192" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C–O–C · gas · different chemistry</text>
      <text x="330" y="228" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Only the condensed formula restores the identity</text>
      <defs>
        <marker id="cit-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
    </svg>
  );
}
