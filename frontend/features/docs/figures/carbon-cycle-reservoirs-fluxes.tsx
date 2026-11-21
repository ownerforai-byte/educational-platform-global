/** Carbon cycle reservoirs fluxes — the planetary accounting. Well-detailed. Theme-aware. */
export function CarbonCycleReservoirsFluxes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Carbon cycle reservoirs fluxes atmosphere ocean land soil largest reservoir gigatonnes photosynthesis respiration ocean uptake dissolution anthropogenic emission fossil fuel imbalance sinks saturating volcanic versus human comparison small natural fluxes big perturbation residence time fast slow carbon diagram arrows values">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The carbon cycle — reservoirs and fluxes in balance</text>
      {/* reservoirs */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE RESERVOIRS (carbon stores)</text>
      {[
        ["Ocean (dissolved + biota)", "~38,000 Gt — the giant", 120],
        ["Soils + permafrost", "~2,000+ Gt and rising relevance", 160],
        ["Atmosphere", "~880 Gt — the small, critical one", 200],
        ["Fossil fuels (geologic)", "locked for aeons — until we burn it", 240],
      ].map(([name, detail, y], i) => (
        <g key={name as string}>
          <text x="60" y={(y as number) - 4} fontSize="6.8" className="fill-current text-emerald-600" fontWeight="800">{name as string}</text>
          <text x="60" y={(y as number) + 10} fontSize="6.2" className="fill-current text-muted-foreground">{detail as string}</text>
        </g>
      ))}
      {/* fluxes */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FLUXES (movements)</text>
      {[
        "natural exchanges are huge and",
        "  roughly balanced: photosynthesis",
        "  ↔ respiration, ocean uptake ↔",
        "  release",
        "the anthropogenic flux is small",
        "  (~10 Gt/yr) but one-directional",
        "  — like a dripping tap in a",
        "  balanced bathtub",
        "sinks absorb about half our",
        "  emissions (oceans + land) —",
        "  the rest accumulates",
        "the fear: sinks saturate —",
        "  warmer oceans absorb less,",
        "  stressed forests emit more",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: reservoir vs flux distinction + 'small flux, big imbalance' — the one-line insight that scores the analysis mark.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The atmosphere is the smallest reservoir and the one we're changing — that's why a 4% flux shift matters.</text>
    </svg>
  );
}
