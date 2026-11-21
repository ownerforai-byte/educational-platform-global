/** Sporophyte dependence — the moss baby lives on the parent. Well-detailed. Theme-aware. */
export function BryophyteSporophyteDependence({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Bryophyte sporophyte depends on gametophyte foot seta capsule partially parasitic green gametophyte dominant generation alternation moss">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Who wears the crown? The gametophyte</text>

      {/* moss plant with sporophytes */}
      <rect x="30" y="44" width="380" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="220" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ONE MOSS PLANT, TWO GENERATIONS</text>
      {/* gametophyte leafy shoots */}
      {[[120, 220], [200, 226], [280, 220]].map(([x, y]) => (
        <g key={x}>
          {[-2, -1, 0, 1, 2].map((k) => (
            <path key={k} d={`M${x} ${y} q${k * 6} -26 ${k * 9} -36`} className="fill-none stroke-current text-emerald-600" strokeWidth="2.2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
          ))}
          <text x={x} y="238" fontSize="6.6" textAnchor="middle" className="fill-current text-emerald-700">leafy shoot</text>
        </g>
      ))}
      {/* sporophytes rising from them */}
      {[[120, 184], [200, 190], [280, 184]].map(([x, y]) => (
        <g key={x}>
          <line x1={x} y1={y} x2={x} y2={y - 54} className="stroke-current text-amber-700" strokeWidth="3" style={{ color: "rgb(146 64 14 / 0.9)" }} />
          <ellipse cx={x} cy={y - 62} rx="9" ry="13" className="fill-current text-amber-700/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(146 64 14 / 0.9)" }} />
        </g>
      ))}
      <text x="60" y="120" fontSize="7.2" className="fill-current text-amber-700" fontWeight="700">brown sporophyte: foot + seta + capsule</text>
      <text x="60" y="136" fontSize="7.2" className="fill-current text-emerald-700" fontWeight="700">green gametophyte: leaves + stem (dominant)</text>
      <text x="50" y="256" fontSize="7.2" className="fill-current text-muted-foreground">Each capsule grows out of the leafy shoot it depends on.</text>

      {/* dependence card */}
      <rect x="430" y="44" width="260" height="220" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="560" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY IT CANNOT LEAVE</text>
      {[
        "foot stays buried in gametophyte",
        "draws water + sugars from parent",
        "capsule has little chlorophyll —",
        "partly parasitic, not independent",
        "contrast: fern sporophyte is the",
        "free-living dominant plant",
      ].map((t, i) => (
        <text key={t} x="446" y={94 + i * 23} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="446" y="240" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: 'gametophyte dominant,</text>
      <text x="446" y="254" fontSize="7.2" className="fill-current text-muted-foreground">sporophyte attached and dependent'</text>
      <text x="446" y="268" fontSize="7.2" className="fill-current text-muted-foreground">is the signature bryophyte answer.</text>
    </svg>
  );
}
