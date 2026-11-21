/** Ecotourism pros cons — the double-edged visit. Well-detailed. Theme-aware. */
export function EcotourismProsCons({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Ecotourism pros cons definition responsible travel nature conservation benefits local employment revenue funding parks cultural exchange versus greenwashing mass tourism under ecotourism label trail erosion wildlife disturbance feeding animals off road driving crowding Annapurna Everest trekking carrying capacity limits permit fees ACAP NTB conservation fee share community lodges homestay model leakage foreign operators capture revenue certification criteria genuine ecotourism seven principles">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Ecotourism — the double-edged visit</text>
      {/* pros */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE GAINS</text>
      {[
        "revenue that makes wildlife",
        "  worth more alive than poached",
        "local jobs: guides, lodges,",
        "  porters — income stays if",
        "  ownership stays local",
        "conservation fees fund parks —",
        "  Annapurna's ACAP model",
        "  ploughs entry money into",
        "  communities",
        "political cover: tourists",
        "  justify protected areas to",
        "  treasuries",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* cons */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE COSTS</text>
      {[
        "greenwashing: mass tourism",
        "  wearing an 'eco' label",
        "trail erosion, waste, and",
        "  crowding at Everest Base Camp",
        "  scale",
        "wildlife disturbance: feeding,",
        "  off-road driving, noise —",
        "  habituation kills animals",
        "leakage: foreign operators and",
        "  imported supplies can capture",
        "  most of the revenue",
        "carrying capacity: limits and",
        "  permit caps exist to prevent",
        "  love from becoming load",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: three gains (revenue, jobs, funding) + three costs (erosion, disturbance, leakage) — the balanced answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Ecotourism is only conservation when the money lands locally and the footprint stays small — both conditions, always.</text>
    </svg>
  );
}
