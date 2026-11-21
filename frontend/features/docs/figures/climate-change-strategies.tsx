/** Climate change mitigation adaptation — the twin strategies. Well-detailed. Theme-aware. */
export function ClimateChangeStrategies({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Climate change mitigation adaptation twin strategies mitigation reduce emissions renewable energy efficiency afforestation adaptation drought resistant crops flood defences early warning both needed Nepal GLOF agriculture examples comparison">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mitigation vs adaptation — the twin strategies</text>
      {/* contrast */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MITIGATION (fix the cause)</text>
      {[
        "cut emissions: renewables replace",
        "  fossil fuels",
        "efficiency: same comfort, less",
        "  energy",
        "sinks: forests and soils absorb",
        "  carbon — afforestation counts",
        "works globally: every tonne",
        "  avoided helps everywhere",
        "the catch: benefits lag decades —",
        "  politics struggles with that",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* adaptation */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ADAPTATION (manage the effects)</text>
      {[
        "drought-ready crops and",
        "  water storage",
        "flood defences and early",
        "  warning systems",
        "glacial-lake monitoring —",
        "  Nepal's GLOF watch",
        "heat-resilient housing and",
        "  cooling plans",
        "works locally: benefits land",
        "  where the money is spent",
        "the catch: adaptation without",
        "  mitigation is an endless",
        "  arms race with the climate",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: mitigation = reduce emissions (cause); adaptation = adjust to impacts (effect) — define both, give one example each.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Nepal contributes almost nothing to global emissions yet adapts to their consequences — the climate injustice case.</text>
    </svg>
  );
}
