/** Resource scarcity conflicts — water wars and rare earths. Well-detailed. Theme-aware. */
export function ResourceScarcityConflicts({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Resource scarcity conflicts water wars Nile transboundary rivers treaty upstream downstream hydropower dam disputes rare earth minerals lithium cobalt supply chains conflict minerals coltan Congo electronics land grabbing food price riots 2008 Arab spring water stress index Nepal India rivers Koshi Gandaki Karnali treaties Pancheshwar debate cooperation versus conflict shared basins">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Resource scarcity — where stress meets politics</text>
      {/* water */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WATER: THE SHARED RIVER</text>
      {[
        "263 transboundary basins cover",
        "  nearly half the world's land —",
        "  upstream-downstream tension is",
        "  structural",
        "cases: the Nile (Egypt vs",
        "  Ethiopia's dam), the Indus",
        "  treaty's survival through wars,",
        "  Mekong dams vs delta farmers",
        "Nepal's rivers: Koshi, Gandaki,",
        "  Karnali flow to India —",
        "  Pancheshwar's stalled dam",
        "  shows the negotiation trap",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* minerals */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MINERALS: THE NEW MAP</text>
      {[
        "lithium, cobalt, rare earths —",
        "  the energy transition's",
        "  ingredient list is geographic",
        "  and political",
        "conflict minerals: coltan and",
        "  cobalt fund armed groups —",
        "  certification schemes try to",
        "  trace supply chains",
        "the irony: the green transition",
        "  needs mined metals — the",
        "  extraction question doesn't",
        "  disappear, it moves",
        "food too: the 2008 price spikes",
        "  fed riots — scarcity turns",
        "  political through the market",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: water scarcity rarely causes war alone — it escalates existing tensions; cooperation treaties outnumber water wars.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The resource-conflict link is real but conditional — institutions decide whether scarcity becomes violence or negotiation.</text>
    </svg>
  );
}
