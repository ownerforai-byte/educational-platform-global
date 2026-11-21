/** Urbanisation causes consequences — the cityward flow. Well-detailed. Theme-aware. */
export function UrbanisationCausesConsequences({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Urbanisation causes consequences push pull factors rural poverty land fragmentation conflict jobs services education health pull urban growth rate Kathmandu primacy valley concentration consequences housing pressure traffic congestion air pollution waste management water supply informal settlements infrastructure gap planning zoning building codes earthquake risk smart city debate">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Urbanisation — the cityward flow and its bill</text>
      {/* push pull */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PUSH AND PULL</text>
      {[
        "push: land fragmentation, farm",
        "  income falling, conflict legacy,",
        "  climate stress on hills",
        "pull: wages, schools, hospitals,",
        "  jobs, the simple gravity of",
        "  opportunity",
        "Kathmandu's primacy: one valley",
        "  holds a large share of Nepal's",
        "  urban population — growth is",
        "  lopsided, not spread",
        "global fact: over half of humanity",
        "  is urban since ~2007 — the",
        "  century of cities",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* consequences */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE BILL</text>
      {[
        "housing: informal settlements",
        "  fill the gap planning leaves",
        "traffic: road space loses to",
        "  vehicles faster than it grows",
        "air: the valley bowl traps",
        "  winter smog",
        "water: pipes chase growth;",
        "  groundwater fills the rest",
        "waste: collection lags",
        "  generation",
        "risk: unplanned density meets",
        "  seismic Nepal — building codes",
        "  are the quiet life-saver",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: two push + two pull factors, then three consequences — the standard urbanisation structure.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Cities are engines and furnaces at once — they generate opportunity and exhaust in the same breath.</text>
    </svg>
  );
}
