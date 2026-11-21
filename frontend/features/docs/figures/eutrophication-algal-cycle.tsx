/** Eutrophication algal cycle — the lake that suffocates. Well-detailed. Theme-aware. */
export function EutrophicationAlgalCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Eutrophication algal cycle nitrates phosphates fertiliser runoff algal bloom surface shade oxygen depletion bacteria decomposition fish death lake succession anaerobic bottom">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Eutrophication — how a lake suffocates</text>
      {/* cycle steps */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["1. Enrich", "fertiliser N and P wash off fields", 130],
        ["2. Bloom", "algae explode across the surface", 300],
        ["3. Shade + die", "light blocked below; algae sink and decay", 470],
        ["4. Suffocate", "decomposers use up oxygen; fish die", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(16 185 129 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the killer is not the algae but their funeral — decay consumes the oxygen everything else breathes</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Tell-tale signs: green scum, dead fish, foul smell, and a bottom layer gone anaerobic — BOD spikes as oxygen crashes.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Phosphorus is usually the limiting trigger — one reason detergents were reformulated phosphate-free.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: enrichment → bloom → decay → oxygen crash — four steps in order, with N and P named as causes.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Eutrophication is accelerated succession: a lake aging decades in a single summer.</text>
    </svg>
  );
}
