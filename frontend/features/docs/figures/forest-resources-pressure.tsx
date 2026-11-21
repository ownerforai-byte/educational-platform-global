/** Forest resources pressure — fuelwood fodder timber balance. Well-detailed. Theme-aware. */
export function ForestResourcesPressure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Forest resources pressure fuelwood fodder timber demand community forestry user groups regeneration rate sustainable harvest annual allowable cut Nepal forest cover recovery community forests success grazing lopping">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Forest pressure — demand vs regeneration</text>
      {/* demand vs supply */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE BALANCE SHEET</text>
      {[
        "demand side: fuelwood, fodder,",
        "  timber, leaf-litter, grazing",
        "supply side: only the annual",
        "  growth can be cut sustainably",
        "harvest above growth = the",
        "  forest's capital, not its",
        "  interest — degradation",
        "lopping for fodder kills slowly:",
        "  the tree looks alive while its",
        "  crown is being mined",
        "Nepal's forest cover has actually",
        "  recovered in recent decades",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* community forestry */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">COMMUNITY FORESTRY — THE FIX</text>
      {[
        "user groups hold real rights and",
        "  real duties over their forest",
        "rules set who cuts what, where,",
        "  and when",
        "nursery and planting become",
        "  local income and pride",
        "the world's studied case of",
        "  common-pool resource success",
        "lesson: ownership by users beats",
        "  policing by outsiders —",
        "  incentives, not fences",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: sustainable harvest = annual growth; anything above that mines the forest's capital.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Community forestry turned Nepal's forest decline into a global textbook success.</text>
    </svg>
  );
}
