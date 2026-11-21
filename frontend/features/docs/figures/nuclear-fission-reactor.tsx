/** Nuclear fission reactor — how the plant works. Well-detailed. Theme-aware. */
export function NuclearFissionReactor({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Nuclear fission reactor how works fuel rods uranium 235 moderator control rods cadmium boron coolant steam turbine generator containment chain reaction neutron critical mass fission fragments waste high level long lived half life storage meltdowns Chernobyl Fukushima Three Mile Island comparison safety statistics deaths per TWh coal comparison Nepal no nuclear policy debate">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The fission reactor — anatomy of a controlled chain</text>
      {/* core */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE CORE, PART BY PART</text>
      {[
        ["Fuel rods", "enriched U-235; fission releases neutrons + heat", 120],
        ["Moderator", "slows neutrons so they keep the chain going", 160],
        ["Control rods", "boron/cadmium absorb neutrons — the throttle", 200],
        ["Coolant", "carries heat to make steam → turbine → power", 240],
      ].map(([k, v, y], i) => (
        <g key={k}>
          <text x="60" y={(y as number) - 4} fontSize="6.8" className="fill-current text-amber-600" fontWeight="800">{k}</text>
          <text x="60" y={(y as number) + 10} fontSize="6.2" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <text x="195" y="216" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">all inside a containment building — the last line between fission products and the public</text>
      {/* debate */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE BALANCE SHEET</text>
      {[
        "for: enormous energy from tiny",
        "  fuel, near-zero CO₂ in",
        "  operation, small land footprint",
        "against: high-level waste needs",
        "  isolation for millennia; rare",
        "  but catastrophic accidents",
        "  (Chernobyl 1986, Fukushima",
        "  2011); huge capital cost",
        "the statistic: deaths per TWh,",
        "  nuclear ranks below coal and",
        "  even below hydro — but",
        "  accidents are concentrated",
        "Nepal: no nuclear programme —",
        "  hydro is the domestic choice",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: four components (fuel, moderator, control rods, coolant) — name each with its job for full marks.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Control rods are the brake pedal — pull them out and power rises; drop them in and the chain stops.</text>
    </svg>
  );
}
