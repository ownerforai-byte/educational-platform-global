/** Rhizoid vs true root — why bryophytes stay small. Well-detailed. Theme-aware. */
export function RhizoidVsRoot({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Structure", "single cell or few cells, hair-like", "many cells, branched organ"],
    ["Job", "attach only — little absorption", "anchor AND absorb + transport"],
    ["Vessels", "no xylem or phloem", "xylem + phloem pipelines"],
    ["Result", "plant stays small, needs wet film", "tall plants possible"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Rhizoid versus true root comparison moss rhizoid hair-like no vascular tissue fern root xylem phloem why bryophytes stay small water conduction">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Rhizoid vs root — the size limit explained</text>

      {/* moss with rhizoids */}
      <rect x="30" y="44" width="150" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="105" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MOSS</text>
      <path d="M95 150 q-4 -30 2 -56 M115 150 q4 -30 -2 -56" className="fill-none stroke-current text-emerald-600" strokeWidth="2.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      {[[92, 150], [98, 152], [112, 152], [118, 150]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} q3 10 1 18`} className="fill-none stroke-current text-stone-500" strokeWidth="1.6" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      ))}
      <text x="105" y="184" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">thread rhizoids, no tubes</text>

      {/* fern with true root */}
      <rect x="540" y="44" width="150" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="615" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FERNS & LATER</text>
      <rect x="611" y="120" width="8" height="40" rx="3" className="fill-current text-emerald-700/40" />
      <path d="M615 160 q-16 16 -26 20 M615 160 q16 16 26 20 M615 160 v24" className="fill-none stroke-current text-emerald-800" strokeWidth="2.6" style={{ color: "rgb(6 46 27 / 0.9)" }} />
      <text x="615" y="184" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">true roots with vessels</text>

      {/* VS */}
      <circle cx="360" cy="120" r="18" className="fill-current text-foreground/10" stroke="currentColor" strokeWidth="2" />
      <text x="360" y="125" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">VS</text>

      {/* table */}
      <rect x="30" y="208" width="660" height="80" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="46" y="226" fontSize="8.2" className="fill-current text-foreground" fontWeight="700">Feature</text>
      <text x="220" y="226" fontSize="8.2" className="fill-current text-emerald-600" fontWeight="700">Rhizoid (moss)</text>
      <text x="470" y="226" fontSize="8.2" className="fill-current text-emerald-600" fontWeight="700">True root (fern+)</text>
      {rows.map(([f, a, b], i) => (
        <g key={f}>
          <text x="46" y={244 + i * 7.6} fontSize="6.4" className="fill-current text-muted-foreground">{f}</text>
          <text x="220" y={244 + i * 7.6} fontSize="6.4" className="fill-current text-muted-foreground">{a}</text>
          <text x="470" y={244 + i * 7.6} fontSize="6.4" className="fill-current text-muted-foreground">{b}</text>
        </g>
      ))}
    </svg>
  );
}
