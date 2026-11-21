/** Sea level rise mechanism — thermal expansion and ice. Well-detailed. Theme-aware. */
export function SeaLevelRiseMechanism({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Sea level rise mechanism thermal expansion water density warm glacier melt Greenland Antarctica ice sheets contribution millimetres per year coastal flooding salinisation Bangladesh Kiribati small island nations displacement climate refugees projections">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Sea-level rise — two mechanisms, one coastline</text>
      {/* two mechanisms */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MECHANISM 1: THERMAL EXPANSION</text>
      {[
        "warmer water simply occupies",
        "  more space — the ocean's own",
        "  version of soup in a pot",
        "this accounts for roughly half",
        "  of observed rise so far",
        "it lags: the deep ocean is still",
        "  absorbing heat, so expansion",
        "  continues for centuries after",
        "  emissions stop",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* ice melt */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MECHANISM 2: ICE ON LAND MELTS</text>
      {[
        "glaciers, Greenland and",
        "  Antarctica add water that was",
        "  stored on land",
        "floating sea ice (Arctic) melts",
        "  without raising sea level —",
        "  the ice cube in the glass",
        "the rate is accelerating: from",
        "  ~1.5 mm/yr (20th c.) to",
        "  ~4 mm/yr now",
        "low-lying nations and deltas —",
        "  Bangladesh, Pacific islands —",
        "  face displacement first",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: thermal expansion + land ice melt = the two mechanisms; floating ice melt adds nothing — the classic trick question.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Sea level is a slow, committed change — the ocean remembers every decade of emissions.</text>
    </svg>
  );
}
