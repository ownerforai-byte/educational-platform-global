/** Cultural evolution ages — Paleolithic to Industrial. Theme-aware. */
export function CulturalEvolutionAges({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Cultural evolution ages Paleolithic stone tools hunting gathering fire Mesolithic microliths fishing Neolithic agriculture domestication villages pottery Metal ages bronze iron writing cities Industrial scientific machines medicine genetics">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cultural evolution — the fourth engine</text>
      <line x1="60" y1="110" x2="620" y2="110" strokeWidth="4" className="stroke-current text-muted-foreground" />
      {[
        { x: 100, t: "PALEOLITHIC", s: "stone tools, hunting-", s2: "gathering, fire" },
        { x: 235, t: "MESOLITHIC", s: "microliths, fishing,", s2: "settling" },
        { x: 380, t: "NEOLITHIC", s: "agriculture, villages,", s2: "pottery (~10,000 yr)" },
        { x: 505, t: "METAL AGES", s: "bronze, iron,", s2: "writing, cities" },
        { x: 610, t: "INDUSTRIAL", s: "machines, medicine,", s2: "genetics" },
      ].map((p) => (
        <g key={p.t}>
          <circle cx={p.x} cy="110" r="5" className="fill-current text-amber-500" />
          <text x={p.x} y="88" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{p.t}</text>
          <text x={p.x} y="130" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">{p.s}</text>
          <text x={p.x} y="144" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">{p.s2}</text>
        </g>
      ))}
      <text x="16" y="186" fontSize="8.4" className="fill-current text-muted-foreground">Cultural change is now faster than biological evolution — cumulative and transmitted by learning.</text>
    </svg>
  );
}
