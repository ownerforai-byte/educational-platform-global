/** Cell size log scale — mycoplasma to ostrich egg. Well-detailed. Theme-aware. */
export function CellSizeLogScale({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 280" className={className} role="img" aria-label="Cell size logarithmic scale from mycoplasma 0.1 micrometres through bacteria 1 to 5 micrometres human red blood cell 7 micrometres plant cells 10 to 50 micrometres human egg 100 micrometres to ostrich egg cell 15 centimetres and nerve cell 1 metre length">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The size ladder — 10⁷-fold range of cells</text>

      <line x1="60" y1="190" x2="680" y2="190" strokeWidth="3" className="stroke-current text-muted-foreground" />
      {[
        { x: 90, l: "0.1 µm", t: "Mycoplasma", s: "smallest known cell", c: "rgb(244 63 94 / 0.9)" },
        { x: 195, l: "1–5 µm", t: "Bacteria", s: "E. coli ~2 µm", c: "rgb(245 158 11 / 0.9)" },
        { x: 310, l: "7 µm", t: "Human RBC", s: "no nucleus", c: "rgb(239 68 68 / 0.9)" },
        { x: 425, l: "10–50 µm", t: "Plant cells", s: "with wall + vacuole", c: "rgb(22 163 74 / 0.9)" },
        { x: 540, l: "100 µm", t: "Human egg", s: "just visible to eye", c: "rgb(14 165 233 / 0.9)" },
        { x: 650, l: "15 cm", t: "Ostrich egg", s: "largest single cell", c: "rgb(139 92 246 / 0.9)" },
      ].map((p) => (
        <g key={p.t}>
          <circle cx={p.x} cy="190" r="6" style={{ color: p.c }} className="fill-current" />
          <text x={p.x} y="168" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{p.l}</text>
          <text x={p.x} y="212" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{p.t}</text>
          <text x={p.x} y="228" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{p.s}</text>
        </g>
      ))}

      <rect x="40" y="98" width="640" height="56" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="60" y="122" fontSize="8.6" className="fill-current text-foreground" fontWeight="700">Why cells stay small: the surface-area-to-volume ratio — exchange needs membrane area; demand grows with volume.</text>
      <text x="60" y="142" fontSize="8" className="fill-current text-muted-foreground">Longest cell: the human nerve cell — axons up to ~1 m from spine to toe.</text>

      <text x="16" y="262" fontSize="8.4" className="fill-current text-muted-foreground">Each step on this ladder is roughly a 10× jump — that is why we need both light and electron microscopes.</text>
    </svg>
  );
}
