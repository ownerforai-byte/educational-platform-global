// Hydrogen bond anatomy: donor X-H and acceptor Y requirements. Theme-aware.
export function HydrogenBondAnatomy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Hydrogen bond anatomy showing donor X-H with hydrogen partially positive and acceptor Y with lone pair and requirements fluorine oxygen nitrogen">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Anatomy of a hydrogen bond: X-H...Y</text>
      <circle cx="180" cy="120" r="20" className="fill-current" style={{ color: "rgb(244 63 94)" }} opacity="0.3" />
      <text x="180" y="126" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">X</text>
      <circle cx="280" cy="120" r="12" className="fill-current" opacity="0.25" />
      <text x="280" y="125" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">H</text>
      <circle cx="440" cy="120" r="22" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.3" />
      <text x="440" y="126" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Y</text>
      <line x1="200" y1="120" x2="266" y2="120" stroke="currentColor" strokeWidth="3" />
      <line x1="294" y1="120" x2="416" y2="120" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
      <text x="180" y="165" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">donor: F, O or N</text>
      <text x="440" y="165" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">acceptor: lone pair, F, O or N</text>
      <text x="330" y="210" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Requirements: H strongly positive, Y small and electronegative with a lone pair</text>
      <text x="330" y="234" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">5-40 kJ per mole - weaker than covalent, ten times ordinary forces</text>
    </svg>
  );
}
