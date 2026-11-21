/** Hydropower Nepal potential — the flowing asset. Well-detailed. Theme-aware. */
export function HydropowerNepalPotential({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Hydropower Nepal potential 83000 MW theoretical 42000 economically feasible installed capacity run of river storage projects seasons dry winter monsoon India export electricity load shedding history micro hydro rural energy dams reservoirs Arun Karnali Gandaki projects economics">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Hydropower — Nepal's flowing asset</text>
      {/* potential */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE POTENTIAL vs REALITY</text>
      {[
        "theoretical potential: ~83,000",
        "  MW — among the world's highest",
        "  per-capita endowments",
        "economically viable: ~42,000 MW",
        "installed: a fraction of that —",
        "  the gap is the story",
        "run-of-river projects dominate:",
        "  cheap and quick, but output",
        "  tracks the seasons — low in",
        "  dry winter, high in monsoon",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* opportunities and risks */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">OPPORTUNITY AND RISK</text>
      {[
        "export to India's market is the",
        "  economic prize — electricity",
        "  as a trade good",
        "domestic use: replace LPG and",
        "  firewood imports with",
        "  homegrown electrons",
        "risks: sediment loads from",
        "  eroding hills wear turbines;",
        "  GLOF and earthquake threats;",
        "  downstream communities need",
        "  genuine benefit sharing",
        "micro-hydro (small village",
        "  plants) electrified remote",
        "  hills long before the grid",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: ~83,000 MW theoretical, ~42,000 MW economic — quote both numbers and the dry-season shortfall of run-of-river.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The paradox: a nation rich in flowing energy once endured hours of daily load shedding.</text>
    </svg>
  );
}
