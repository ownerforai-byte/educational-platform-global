/** Urbanisation pressure points — the city as an ecosystem. Well-detailed. Theme-aware. */
export function UrbanisationPressurePoints({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Urbanisation pressure points migration Kathmandu valley housing water supply waste traffic sprawl farmland loss heat island slums service pressure planning urban growth environmental load ecosystem view">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Urbanisation — the city as an ecosystem under load</text>
      {/* pressure map */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHERE THE PRESSURE LANDS</text>
      {[
        ["Water", "demand outruns supply; groundwater drops"],
        ["Waste", "collection lags generation; rivers take the rest"],
        ["Housing", "sprawl onto farmland; informal settlements"],
        ["Traffic", "congestion, fuel burn, air quality crash"],
        ["Heat", "concrete stores heat — the urban heat island"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="46" y={92 + i * 26} fontSize="6.6" className="fill-current text-amber-600" fontWeight="700">{k}</text>
          <text x="110" y={92 + i * 26} fontSize="6.2" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE ECOLOGY OF IT</text>
      {[
        "a city imports food, water, fuel",
        "  and exports waste — a het-",
        "  erotrophic ecosystem",
        "Kathmandu's growth is migration-",
        "  driven: opportunity pulls people",
        "  from hills and Terai",
        "density can be green: apartments",
        "  beat sprawl per capita for",
        "  energy, water and land",
        "planning ahead beats retrofitting:",
        "  land-use rules, transit, and",
        "  watershed protection",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: a city is a heterotrophic ecosystem — it depends on land far beyond its borders.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Urbanisation is not the villain by default — unplanned urbanisation is.</text>
    </svg>
  );
}
