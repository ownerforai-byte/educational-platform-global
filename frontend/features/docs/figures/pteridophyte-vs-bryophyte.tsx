/** Pteridophyte vs bryophyte — the vascular leap. Well-detailed. Theme-aware. */
export function PteridophyteVsBryophyte({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Vascular tissue", "absent", "xylem + phloem present"],
    ["Sporophyte", "attached, dependent", "independent, free-living"],
    ["Dominant plant", "gametophyte (green moss)", "sporophyte (the fern)"],
    ["Roots", "rhizoids only", "true roots"],
    ["Size reached", "a few centimetres", "tree ferns to 20 m"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Pteridophyte versus bryophyte comparison vascular tissue independent sporophyte true roots fern versus moss size water dependence">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Moss vs fern — the vascular leap</text>

      {/* moss */}
      <rect x="30" y="44" width="150" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="105" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MOSS</text>
      {[[85, 168], [100, 160], [115, 166], [130, 158]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} q${i - 2} -30 ${(i - 2) * 2} -40`} className="fill-none stroke-current text-emerald-600" strokeWidth="2.2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      ))}
      <text x="105" y="184" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">low cushion, no plumbing</text>

      {/* fern */}
      <rect x="540" y="44" width="150" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="615" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FERN</text>
      <rect x="611" y="130" width="8" height="34" rx="3" className="fill-current text-emerald-700/40" />
      {[[598, 128], [632, 128]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M615 128 L${x} ${y - 8}`} className="stroke-current text-emerald-600" strokeWidth="2.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
          {[0, 1, 2, 3].map((j) => (
            <ellipse key={j} cx={x + (i === 0 ? -1 : 1) * (4 + j * 7)} cy={y - 8 + j * 2} rx="6" ry="3.4" className="fill-current text-emerald-600/40" />
          ))}
        </g>
      ))}
      <text x="615" y="184" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">tall fronds, true roots</text>

      {/* VS */}
      <circle cx="360" cy="120" r="18" className="fill-current text-foreground/10" stroke="currentColor" strokeWidth="2" />
      <text x="360" y="125" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">VS</text>

      {/* table */}
      <rect x="30" y="208" width="660" height="80" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="46" y="226" fontSize="8.2" className="fill-current text-foreground" fontWeight="700">Feature</text>
      <text x="220" y="226" fontSize="8.2" className="fill-current text-emerald-600" fontWeight="700">Bryophyte</text>
      <text x="470" y="226" fontSize="8.2" className="fill-current text-emerald-600" fontWeight="700">Pteridophyte</text>
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
