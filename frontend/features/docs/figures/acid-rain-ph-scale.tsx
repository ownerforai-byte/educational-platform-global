/** Acid rain pH scale — where the damage begins. Well-detailed. Theme-aware. */
export function AcidRainPhScale({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Acid rain pH scale logarithmic normal rain 5.6 acid rain 4 lemon vinegar battery acid tenfold each unit lake fish eggs die below 5 marble dissolution logarithm">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The pH scale — why one unit means ten times</text>
      {/* scale bar */}
      <rect x="30" y="44" width="660" height="170" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {/* gradient bar */}
      {Array.from({ length: 15 }).map((_, i) => (
        <rect key={i} x={60 + i * 40} y="90" width="40" height="26" className="fill-current" style={{ color: i < 5 ? "rgb(244 63 94 / 0.55)" : i < 8 ? "rgb(217 119 6 / 0.45)" : i < 11 ? "rgb(16 185 129 / 0.35)" : "rgb(2 132 199 / 0.45)" }} stroke="currentColor" strokeWidth="0.8" />
      ))}
      {Array.from({ length: 15 }).map((_, i) => (
        <text key={`n${i}`} x={80 + i * 40} y="132" fontSize="6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{i}</text>
      ))}
      {[
        ["1", "battery acid", 100],
        ["3", "vinegar", 180],
        ["4", "ACID RAIN", 220],
        ["5.6", "normal rain (CO₂)", 290],
        ["7", "pure water", 320],
        ["11", "ammonia", 540],
      ].map(([v, label, x], i) => (
        <g key={v as string}>
          <line x1={x as number} y1="82" x2={x as number} y2="90" className="stroke-current" strokeWidth="1.5" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y={i % 2 === 0 ? 74 : 62} fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{label as string}</text>
        </g>
      ))}
      <text x="360" y="160" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">each pH unit is a tenfold change — pH 4 is 10× more acidic than pH 5, and 100× more than pH 6</text>
      <text x="360" y="184" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">fish eggs and snails fail below pH ~5; most amphibians lose reproduction below pH 4.5</text>
      <text x="360" y="204" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">marble (calcium carbonate) dissolves on contact with any acid — statues lose their faces</text>
      {/* facts */}
      <rect x="30" y="228" width="660" height="64" rx="10" className="fill-current text-rose-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="248" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Normal rain is already slightly acid (pH 5.6) from dissolved CO₂ — 'acid rain' means falling well below that natural baseline.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: pH is logarithmic — quote 'tenfold per unit' and the 5.6 baseline for full marks.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Lakes on granite can't neutralise acid; those on limestone buffer themselves — geology decides who suffers.</text>
    </svg>
  );
}
