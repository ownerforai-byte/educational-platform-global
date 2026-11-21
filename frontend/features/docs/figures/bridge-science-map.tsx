/** Biology as a bridge science — relations with other sciences. Theme-aware. */
export function BridgeScienceMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Biology as a bridge science borrowing chemistry's molecules physics's instruments and mathematics's models and lending findings to medicine agriculture and society">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Biology as a bridge science</text>

      <rect x="240" y="88" width="180" height="60" rx="14" className="fill-current text-emerald-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="330" y="115" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BIOLOGY</text>
      <text x="330" y="132" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">the bridge between the physical</text>
      <text x="330" y="142" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">sciences and the human world</text>

      <text x="110" y="80" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Chemistry</text>
      <text x="110" y="94" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">molecules, bonds, reactions</text>
      <text x="110" y="150" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Physics</text>
      <text x="110" y="164" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">instruments, energy, optics</text>
      <text x="110" y="220" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Mathematics</text>
      <text x="110" y="234" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">models, probability, statistics</text>

      <text x="550" y="80" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Medicine</text>
      <text x="550" y="94" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">clinical questions back</text>
      <text x="550" y="150" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Agriculture</text>
      <text x="550" y="164" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">crops, soil, food security</text>
      <text x="550" y="220" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Society</text>
      <text x="550" y="234" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">policy, public health</text>

      <path d="M150 92 L238 105" markerEnd="url(#arrbs1)" strokeWidth="2" className="stroke-current text-muted-foreground" />
      <path d="M150 150 L238 125" markerEnd="url(#arrbs1)" strokeWidth="2" className="stroke-current text-muted-foreground" />
      <path d="M150 215 L238 140" markerEnd="url(#arrbs1)" strokeWidth="2" className="stroke-current text-muted-foreground" />
      <path d="M422 105 L510 92" markerEnd="url(#arrbs1)" strokeWidth="2" className="stroke-current text-muted-foreground" />
      <path d="M422 125 L510 150" markerEnd="url(#arrbs1)" strokeWidth="2" className="stroke-current text-muted-foreground" />
      <path d="M422 140 L510 215" markerEnd="url(#arrbs1)" strokeWidth="2" className="stroke-current text-muted-foreground" />
      <defs><marker id="arrbs1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-muted-foreground" /></marker></defs>
    </svg>
  );
}
