// Coordinate bond formation: ammonia plus hydrogen ion gives ammonium. Theme-aware.
export function CoordinateAmmoniumReaction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 680 280" className={className} role="img" aria-label="Coordinate covalent bond formation reaction where ammonia donates its lone pair to a hydrogen ion forming the ammonium ion">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Coordinate bond: one atom supplies both electrons</text>
      <g className="fill-current text-foreground" fontSize="14" fontWeight="700">
        <text x="40" y="80">NH3 (lone pair on N)  +  H&#8314;  &#8594;  NH4&#8314;</text>
      </g>
      <g>
        <circle cx="120" cy="160" r="26" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.25" />
        <text x="120" y="166" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NH3</text>
        <text x="120" y="120" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">donor: N has a lone pair</text>
        <path d="M 160 160 L 230 160" stroke="currentColor" strokeWidth="2" />
        <text x="195" y="150" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">:</text>
        <circle cx="270" cy="160" r="20" className="fill-current" style={{ color: "rgb(244 63 94)" }} opacity="0.25" />
        <text x="270" y="166" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">H&#8314;</text>
        <text x="270" y="120" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">acceptor: empty 1s</text>
        <path d="M 310 160 L 380 160" stroke="currentColor" strokeWidth="2" />
        <rect x="390" y="132" width="130" height="56" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.14" />
        <text x="455" y="166" fontSize="14" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NH4&#8314;</text>
        <text x="560" y="150" fontSize="11" className="fill-current text-muted-foreground">All four N-H bonds become</text>
        <text x="560" y="168" fontSize="11" className="fill-current text-muted-foreground">identical once formed -</text>
        <text x="560" y="186" fontSize="11" className="fill-current text-muted-foreground">origin leaves no trace.</text>
      </g>
      <text x="340" y="240" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Arrow notation: N &#8594; H shows the single-source shared pair</text>
    </svg>
  );
}
