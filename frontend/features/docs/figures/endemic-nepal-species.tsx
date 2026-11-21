/** Endemic Nepal species — found only here. Well-detailed. Theme-aware. */
export function EndemicNepalSpecies({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Endemic Nepal species found nowhere else endemism definition isolation altitude speciation spiny babbler Kanchenjunga endemic plants high proportion mid hills isolated valleys island analogy conservation priority irreplaceable">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Endemic species — Nepal's irreplaceables</text>
      {/* concept */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT ENDENEMIC MEANS</text>
      {[
        "native to one place and only",
        "  that place — a country, a",
        "  mountain, a single lake",
        "born of isolation: mountains,",
        "  valleys and islands split",
        "  populations until they diverge",
        "altitude works like islands:",
        "  each ridge-top is a sky island",
        "  with its own specialists",
        "lose an endemic species and it",
        "  is gone from the planet —",
        "  no other population exists",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* Nepal examples */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NEPAL'S ENDEMICS</text>
      {[
        "spiny babbler: Nepal's only",
        "  endemic bird — the national",
        "  textbook example",
        "dozens of flowering plants are",
        "  endemic to the Nepal Himalaya",
        "many insects and freshwater",
        "  species remain undescribed —",
        "  endemism is undercounted",
        "endemics concentrate where",
        "  habitat is unusual: high",
        "  alpine, deep gorges, wetlands",
        "they anchor the hotspot case:",
        "  irreplaceable + threatened",
        "  = priority",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: endemic ≠ rare — it means confined. The spiny babbler is Nepal's flagship endemic.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Endemic species justify conservation spending: their loss is global, not local.</text>
    </svg>
  );
}
