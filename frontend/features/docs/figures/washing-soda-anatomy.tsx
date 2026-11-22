// WashingSodaAnatomy figure. Theme-aware.
export function WashingSodaAnatomy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Washing soda decahydrate losing water of crystallisation by efflorescence">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Washing soda — Na₂CO₃·10H₂O</text>
      <rect x="60" y="60" width="230" height="100" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="175" y="88" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">DECAHYDRATE</text>
      <text x="175" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">10 loosely held waters</text>
      <text x="175" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">translucent crystals</text>
      <path d="M 295 110 L 360 110" stroke="rgb(239 68 68)" strokeWidth="2.5" markerEnd="url(#wsa-a)" />
      <text x="327" y="100" fontSize="9" textAnchor="middle" fill="rgb(239 68 68)">air takes</text>
      <text x="327" y="122" fontSize="9" textAnchor="middle" fill="rgb(239 68 68)">9 H₂O</text>
      <rect x="365" y="60" width="230" height="100" rx="10" fill="rgb(148 163 184)" opacity="0.15" stroke="rgb(148 163 184)" />
      <text x="480" y="88" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">MONOHYDRATE</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Na₂CO₃·H₂O white powder</text>
      <text x="480" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">efflorescence = losing water</text>
      <defs>
        <marker id="wsa-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(239 68 68)" /></marker>
      </defs>
      <text x="330" y="195" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Efflorescent (loses water) is the opposite of deliquescent (drinks water, like NaOH)</text>
    </svg>
  );
}
