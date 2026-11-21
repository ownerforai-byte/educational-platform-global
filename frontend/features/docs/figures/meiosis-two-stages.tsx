/** Meiosis II stages — equational division detail. Well-detailed. Theme-aware. */
export function MeiosisTwoStages({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Meiosis two stages equational division prophase two chromosomes condense no pairing metaphase two chromosomes at equator anaphase two sister chromatids separate telophase two four haploid cells results gametes genetically different">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Meiosis II — the equational division (like mitosis, but haploid)</text>

      {[
        { x: 105, t: "PROPHASE II", s: "chromosomes condense again — no pairing", c: "rgb(14 165 233 / 0.9)" },
        { x: 285, t: "METAPHASE II", s: "chromosomes (still double) align on equator", c: "rgb(22 163 74 / 0.9)" },
        { x: 465, t: "ANAPHASE II", s: "centromeres split — chromatids separate", c: "rgb(245 158 11 / 0.9)" },
        { x: 645, t: "TELOPHASE II", s: "four haploid cells (tetrad of cells)", c: "rgb(139 92 246 / 0.9)" },
      ].map((p) => (
        <g key={p.t}>
          <circle cx={p.x} cy="130" r="58" style={{ color: p.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={p.x} y="50" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{p.t}</text>
          <text x={p.x} y="212" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{p.s}</text>
        </g>
      ))}

      {/* prophase II: two single cells each with X */}
      {[[90, 130], [120, 130]].map(([x, y], i) => (
        <path key={i} d={`M${x - 5} ${y - 9} q5 9 10 18 M${x + 5} ${y - 9} q-5 9 -10 18`} className="fill-none stroke-current text-sky-600" strokeWidth="2" />
      ))}

      {/* metaphase II */}
      {[[270, 122], [300, 122]].map(([x, y], i) => (
        <path key={i} d={`M${x - 5} ${y - 9} q5 9 10 18 M${x + 5} ${y - 9} q-5 9 -10 18`} className="fill-none stroke-current text-emerald-600" strokeWidth="2" />
      ))}
      <line x1="235" y1="130" x2="335" y2="130" strokeWidth="1.5" strokeDasharray="4 4" className="stroke-current text-emerald-600" />

      {/* anaphase II */}
      {[[450, 100], [480, 100]].map(([x, y], i) => (
        <path key={i} d={`M${x - 5} ${y - 9} q5 9 10 18 M${x + 5} ${y - 9} q-5 9 -10 18`} className="fill-none stroke-current text-amber-600" strokeWidth="2" />
      ))}
      {[[450, 162], [480, 162]].map(([x, y], i) => (
        <path key={i} d={`M${x - 5} ${y - 9} q5 9 10 18 M${x + 5} ${y - 9} q-5 9 -10 18`} className="fill-none stroke-current text-amber-600" strokeWidth="2" />
      ))}

      {/* telophase II: four cells */}
      {[[618, 100], [672, 100], [618, 162], [672, 162]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="20" className="fill-none stroke-current text-violet-600" strokeWidth="2" />
      ))}

      <rect x="30" y="236" width="660" height="52" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="50" y="258" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">Chromosome number does NOT change in meiosis II (n → n) — sister chromatids simply separate.</text>
      <text x="50" y="278" fontSize="8" className="fill-current text-muted-foreground">The four products become gametes (animals) or spores (plants) — each genetically unique thanks to meiosis I.</text>
    </svg>
  );
}
