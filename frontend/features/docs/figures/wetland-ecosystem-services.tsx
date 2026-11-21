/** Wetland ecosystem services — Nepal's sponges. Well-detailed. Theme-aware. */
export function WetlandEcosystemServices({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Wetland ecosystem services Nepal Koshi Tappu Rupa Bees Hazar Tal flood control water purification groundwater recharge carbon storage fisheries rice paddy Ramsar sites biodiversity waterbirds livelihoods fish ponds drainage conversion threats wise use principle">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Wetlands — Nepal's sponges at work</text>
      {/* services */}
      <rect x="30" y="40" width="660" height="170" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["Flood buffer", "absorb monsoon surge, release slowly", 130],
        ["Water filter", "sediment and nutrients settle; plants take up", 300],
        ["Recharge", "refill groundwater and dry-season springs", 470],
        ["Carbon store", "waterlogged soils hold carbon for centuries", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="66" width="136" height="100" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y="88" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="108" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="122" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          <text x={x as number} y="150" fontSize="5.6" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">{["Koshi Tappu", "Rupa, Begnas", "hill springs", "peat, mud"][i]}</text>
        </g>
      ))}
      <text x="360" y="192" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">plus the visible ones: fisheries, rice paddies, fodder, waterbird habitat — wetlands feed and employ</text>
      {/* facts */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Nepal has 10 Ramsar sites — from Koshi Tappu (wild buffalo) to Rara (high-altitude lake) — covering lowland and alpine wetlands.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The threats: drainage for farming, eutrophication, invasive water hyacinth, siltation from eroding uplands.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: four invisible services (flood, filter, recharge, carbon) + two visible ones (fish, rice) — a complete answer.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">'Wise use' is the Ramsar principle: use wetlands without using them up.</text>
    </svg>
  );
}
