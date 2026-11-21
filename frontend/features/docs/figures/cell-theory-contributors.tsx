/** Cell theory contributors — Hooke, Leeuwenhoek, Schleiden, Schwann, Virchow. Well-detailed. Theme-aware. */
export function CellTheoryContributors({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Cell theory contributors timeline Robert Hooke 1665 cork cells Leeuwenhoek 1674 living cells Schleiden 1838 plants Schwann 1839 animals Virchow 1855 omnis cellula e cellula with portraits and contributions">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Five scientists who built the cell theory</text>

      <line x1="60" y1="180" x2="680" y2="180" strokeWidth="4" className="stroke-current text-muted-foreground" />
      {[
        { x: 105, yr: "1665", t: "Robert Hooke", s: "saw 'cells' in cork", c: "rgb(14 165 233 / 0.9)" },
        { x: 235, yr: "1674", t: "Leeuwenhoek", s: "first living cells", c: "rgb(22 163 74 / 0.9)" },
        { x: 365, yr: "1838", t: "Schleiden", s: "plants: all tissues are cells", c: "rgb(245 158 11 / 0.9)" },
        { x: 495, yr: "1839", t: "Schwann", s: "animals too + cell wall study", c: "rgb(139 92 246 / 0.9)" },
        { x: 625, yr: "1855", t: "Virchow", s: "omnis cellula e cellula", c: "rgb(244 63 94 / 0.9)" },
      ].map((p) => (
        <g key={p.t}>
          <circle cx={p.x} cy="180" r="7" style={{ color: p.c }} className="fill-current" />
          <rect x={p.x - 58} y="52" width="116" height="86" rx="10" style={{ color: p.c }} className="fill-current opacity-10" strokeWidth="2" stroke="currentColor" />
          <circle cx={p.x} cy="84" r="14" style={{ color: p.c }} className="fill-current opacity-40" />
          <text x={p.x} y="112" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{p.t}</text>
          <text x={p.x} y="128" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{p.s}</text>
          <text x={p.x} y="206" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{p.yr}</text>
        </g>
      ))}

      <rect x="40" y="232" width="640" height="56" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="60" y="256" fontSize="8.6" className="fill-current text-foreground" fontWeight="700">THE THEORY: (1) all organisms are made of cells · (2) the cell is the unit of structure and function ·</text>
      <text x="60" y="276" fontSize="8.6" className="fill-current text-foreground" fontWeight="700">(3) all cells arise from pre-existing cells — Virchow's Latin: omnis cellula e cellula.</text>
    </svg>
  );
}
