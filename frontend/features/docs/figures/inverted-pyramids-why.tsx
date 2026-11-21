/** Inverted pyramids — when the shape flips. Well-detailed. Theme-aware. */
export function InvertedPyramidsWhy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Inverted pyramid of numbers tree insects biomass ocean phytoplankton fish why inversion happens turnover rate explanation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">When the pyramid flips upside down</text>

      {/* tree-insects */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NUMBERS: ONE TREE, MANY INSECTS</text>
      {/* big base = 1 tree */}
      <rect x="150" y="90" width="90" height="30" rx="4" className="fill-current text-sky-500/30" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="110" fontSize="7" textAnchor="middle" className="fill-current text-foreground">1 tree</text>
      {/* many insects above */}
      {[[130, 140], [165, 140], [200, 140], [235, 140], [260, 140]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="20" height="12" rx="3" className="fill-current text-sky-500/50" stroke="currentColor" strokeWidth="1" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      ))}
      <text x="195" y="170" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">thousands of herbivorous insects</text>
      {[
        "pyramid of numbers counts heads,",
        "not size — one giant producer can",
        "feed an army of tiny consumers",
      ].map((t, i) => (
        <text key={t} x="50" y={196 + i * 16} fontSize="7.2" className="fill-current text-muted-foreground">{i === 0 ? t : "  " + t}</text>
      ))}
      <text x="50" y="256" fontSize="7" className="fill-current text-sky-600">Shape inverted; nothing broken.</text>

      {/* ocean biomass */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BIOMASS: OCEAN INVERSION</text>
      <rect x="470" y="90" width="140" height="26" rx="4" className="fill-current text-emerald-600/35" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="540" y="108" fontSize="7" textAnchor="middle" className="fill-current text-foreground">fish biomass (large)</text>
      <rect x="510" y="126" width="60" height="20" rx="4" className="fill-current text-emerald-600/20" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="540" y="140" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">phytoplankton</text>
      {[
        "phytoplankton are tiny but multiply",
        "in days — standing crop is small",
        "while the turnover is enormous",
      ].map((t, i) => (
        <text key={t} x="406" y={166 + i * 16} fontSize="7.2" className="fill-current text-muted-foreground">{i === 0 ? t : "  " + t}</text>
      ))}
      <text x="406" y="230" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">Rate beats stock: the sea's productivity</text>
      <text x="406" y="244" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">is high even when its standing crop is low.</text>
      <text x="406" y="266" fontSize="7" className="fill-current text-muted-foreground">Energy still never inverts — only</text>
    </svg>
  );
}
