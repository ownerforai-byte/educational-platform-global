// MethaneTetrahedral figure. Theme-aware.
export function MethaneTetrahedral({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Methane molecule with four equivalent bonds in tetrahedral geometry">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">CH₄ — four equivalent bonds, one geometry</text>
      <circle cx="330" cy="115" r="26" fill="rgb(59 130 246)" opacity="0.25" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="330" y="121" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">C</text>
      {[[330, 55], [408, 145], [252, 145], [330, 190]].map(([hx, hy], i) => (
        <g key={i}>
          <line x1="330" y1="115" x2={hx} y2={hy} stroke="rgb(16 185 129)" strokeWidth="3" />
          <circle cx={hx} cy={hy} r="14" fill="rgb(16 185 129)" opacity="0.25" stroke="rgb(16 185 129)" />
          <text x={hx} y={hy + 4} fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">H</text>
        </g>
      ))}
      <text x="330" y="228" fontSize="10" textAnchor="middle" fill="rgb(245 158 11)">all four C–H bonds identical · 109.5° · sp³ hybridised</text>
      <text x="560" y="90" fontSize="10.5" fontWeight="800" className="fill-current text-foreground">why equivalent?</text>
      <text x="560" y="112" fontSize="9.5" className="fill-current text-muted-foreground">one 2s + three 2p orbitals</text>
      <text x="560" y="130" fontSize="9.5" className="fill-current text-muted-foreground">mix into four sp³ hybrids</text>
      <text x="560" y="148" fontSize="9.5" className="fill-current text-muted-foreground">→ tetrahedron, no distinct</text>
      <text x="560" y="166" fontSize="9.5" className="fill-current text-muted-foreground">"s-bond" or "p-bond"</text>
    </svg>
  );
}
