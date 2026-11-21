/** Mitosis stages panel — prophase to telophase detailed. Well-detailed. Theme-aware. */
export function MitosisStagesPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 320" className={className} role="img" aria-label="Mitosis stages panel prophase chromosomes condense spindle forms nuclear envelope breaks metaphase chromosomes at equatorial plate anaphase sister chromatids separate to poles telophase two nuclei reform cytokinesis cell plate or cleavage furrow">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mitosis — four stages, one event each</text>

      {[
        { x: 105, t: "PROPHASE", s1: "chromosomes condense,", s2: "spindle forms, envelope breaks", c: "rgb(14 165 233 / 0.9)" },
        { x: 285, t: "METAPHASE", s1: "chromosomes align on the", s2: "equatorial (metaphase) plate", c: "rgb(22 163 74 / 0.9)" },
        { x: 465, t: "ANAPHASE", s1: "centromeres split; sister", s2: "chromatids pulled to poles", c: "rgb(245 158 11 / 0.9)" },
        { x: 645, t: "TELOPHASE", s1: "two nuclei reform;", s2: "cytokinesis divides cytoplasm", c: "rgb(139 92 246 / 0.9)" },
      ].map((p) => (
        <g key={p.t}>
          <circle cx={p.x} cy="130" r="70" style={{ color: p.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={p.x} y="46" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{p.t}</text>
          <text x={p.x} y="228" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{p.s1}</text>
          <text x={p.x} y="242" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{p.s2}</text>
        </g>
      ))}

      {/* prophase: condensed X chromosomes */}
      {[[80, 110], [130, 150]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x - 10} ${y - 14} q10 14 20 28 M${x + 10} ${y - 14} q-10 14 -20 28`} className="fill-none stroke-current text-sky-600" strokeWidth="3" />
        </g>
      ))}
      <path d="M35 130 L175 130" strokeWidth="1.5" strokeDasharray="4 4" className="stroke-current text-sky-500" />

      {/* metaphase: aligned */}
      {[[265, 112], [285, 112], [305, 112]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x - 6} ${y - 10} q6 10 12 20 M${x + 6} ${y - 10} q-6 10 -12 20`} className="fill-none stroke-current text-emerald-600" strokeWidth="2.5" />
        </g>
      ))}
      <line x1="215" y1="130" x2="355" y2="130" strokeWidth="2" strokeDasharray="5 4" className="stroke-current text-emerald-600" />
      <path d="M230 90 L240 122 M340 90 L330 122" strokeWidth="1.5" className="stroke-current text-emerald-500" />

      {/* anaphase: separated */}
      {[[440, 100], [490, 100]].map(([x, y], i) => (
        <path key={i} d={`M${x - 6} ${y - 10} q6 10 12 20 M${x + 6} ${y - 10} q-6 10 -12 20`} className="fill-none stroke-current text-amber-600" strokeWidth="2.5" />
      ))}
      {[[440, 168], [490, 168]].map(([x, y], i) => (
        <path key={i} d={`M${x - 6} ${y - 10} q6 10 12 20 M${x + 6} ${y - 10} q-6 10 -12 20`} className="fill-none stroke-current text-amber-600" strokeWidth="2.5" />
      ))}
      <path d="M465 60 L465 200" strokeWidth="2" strokeDasharray="4 4" className="stroke-current text-amber-500" />

      {/* telophase: two nuclei */}
      <circle cx="625" cy="105" r="26" className="fill-none stroke-current text-violet-600" strokeWidth="2.5" />
      <circle cx="665" cy="160" r="26" className="fill-none stroke-current text-violet-600" strokeWidth="2.5" />
      <line x1="580" y1="130" x2="710" y2="130" strokeWidth="3" className="stroke-current text-violet-500" />

      <text x="16" y="286" fontSize="8.4" className="fill-current text-muted-foreground">Chromosome number stays constant (2n → 2n): each daughter cell receives an identical copy of every chromosome.</text>
      <text x="16" y="306" fontSize="8.4" className="fill-current text-muted-foreground">Karyokinesis (nuclear division) is followed by cytokinesis — cell plate in plants, cleavage furrow in animals.</text>
    </svg>
  );
}
