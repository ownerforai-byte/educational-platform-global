/** Amitosis vs mitosis vs meiosis — three-way comparison. Well-detailed. Theme-aware. */
export function AmitosisMitosisMeiosis({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 320" className={className} role="img" aria-label="Amitosis versus mitosis versus meiosis three way comparison table direct division no spindle somatic rare mitosis equational diploid somatic growth repair meiosis reduction division haploid gametes crossing over variation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three kinds of division at a glance</text>

      {/* header row */}
      {[
        { x: 130, t: "AMITOSIS" },
        { x: 370, t: "MITOSIS" },
        { x: 610, t: "MEIOSIS" },
      ].map((h) => (
        <text key={h.t} x={h.x} y="50" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{h.t}</text>
      ))}

      {/* rows */}
      {[
        { y: 70, l: "Where", a: "old/failing cells", m: "somatic (body) cells", me: "germ cells" },
        { y: 100, l: "Spindle", a: "none — direct split", m: "forms, full apparatus", me: "forms, two divisions" },
        { y: 130, l: "Divisions", a: "nucleus constricts", m: "one (PMAT)", me: "two (Meiosis I + II)" },
        { y: 160, l: "Result", a: "2 unequal nuclei", m: "2 identical cells (2n)", me: "4 haploid cells (n)" },
        { y: 190, l: "Crossing over", a: "no", m: "no", me: "yes — prophase I" },
        { y: 220, l: "Role", a: "rare, degenerative", m: "growth + repair", me: "gametes/spores, variation" },
      ].map((r) => (
        <g key={r.l}>
          <text x="20" y={r.y + 4} fontSize="7.4" className="fill-current text-foreground" fontWeight="700">{r.l}</text>
          <text x="130" y={r.y + 4} fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{r.a}</text>
          <text x="370" y={r.y + 4} fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{r.m}</text>
          <text x="610" y={r.y + 4} fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{r.me}</text>
          <line x1="20" y1={r.y + 12} x2="700" y2={r.y + 12} strokeWidth="1" className="stroke-current text-muted-foreground opacity-30" />
        </g>
      ))}

      {/* visual row */}
      {[
        { x: 130, c: "rgb(120 113 108 / 0.9)", d: "M115 258 q15 -14 30 0 q15 14 0 20 q-15 8 -30 0 q-15 -6 0 -20" },
        { x: 370, c: "rgb(22 163 74 / 0.9)", d: null },
        { x: 610, c: "rgb(139 92 246 / 0.9)", d: null },
      ].map((v, vi) => (
        <g key={vi}>
          {vi === 0 && v.d && <path d={v.d} className="fill-none stroke-current" strokeWidth="2.5" style={{ color: v.c }} />}
          {vi === 1 && (
            <g>
              <circle cx="355" cy="266" r="14" className="fill-none stroke-current" strokeWidth="2.5" style={{ color: v.c }} />
              <circle cx="385" cy="266" r="14" className="fill-none stroke-current" strokeWidth="2.5" style={{ color: v.c }} />
            </g>
          )}
          {vi === 2 && (
            <g>
              {[592, 628].map((x) => [254, 282].map((y) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="10" className="fill-none stroke-current" strokeWidth="2" style={{ color: v.c }} />
              )))}
            </g>
          )}
        </g>
      ))}

      <text x="16" y="310" fontSize="8.4" className="fill-current text-muted-foreground">Memory hook: AMItosis = AMateur (no spindle); MItosis = Identical; MEiosis = rEdUction (diploid → haploid) + variation.</text>
    </svg>
  );
}
