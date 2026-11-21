/** Wind energy how turbines work — the Betz limit. Well-detailed. Theme-aware. */
export function WindEnergyTurbines({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Wind energy turbines how work Betz limit 59 percent theoretical maximum kinetic energy swept area cubic power wind speed relationship capacity factor intermittent onshore offshore bird bat collision noise NIMBY aesthetics blade length cubed diameter power curve cut in cut out speeds Nepal hills wind resource mapping small turbines remote electrification hybrid solar wind">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Wind power — the physics of the spinning blade</text>
      {/* physics */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE PHYSICS</text>
      {[
        "power scales with the CUBE of",
        "  wind speed — double the wind,",
        "  eight times the power",
        "swept area (blade diameter",
        "  squared) sets the ceiling",
        "Betz limit: no turbine captures",
        "  more than 59% of the wind's",
        "  kinetic energy — the physics",
        "  tax",
        "real turbines: capacity factor",
        "  ~25–45% — the wind doesn't",
        "  always blow",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* tradeoffs */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE TRADE-OFFS</text>
      {[
        "offshore wind blows steadier and",
        "  stronger — but costs more to",
        "  build and maintain",
        "wildlife: bird and bat collisions",
        "  — siting away from migration",
        "  routes matters most",
        "people: noise and aesthetics",
        "  drive NIMBY opposition —",
        "  community ownership softens it",
        "intermittency: wind pairs well",
        "  with solar (often opposite",
        "  peaks) and with hydro storage",
        "Nepal's hills have wind pockets",
        "  — small turbines hybridised",
        "  with solar serve remote",
        "  villages",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: power ∝ (wind speed)³ + Betz limit 59% — the two physics facts every wind answer needs.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The cube law is why site selection is everything — a 10% windier hilltop earns a third more power.</text>
    </svg>
  );
}
