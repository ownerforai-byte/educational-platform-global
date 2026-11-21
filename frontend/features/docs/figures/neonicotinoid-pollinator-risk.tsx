/** Neonicotinoid pollinator risk — the bee question. Well-detailed. Theme-aware. */
export function NeonicotinoidPollinatorRisk({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Neonicotinoid pollinator risk systemic pesticide seed coating pollen nectar bee navigation memory loss colony collapse disorder sublethal dose ban EU partial evidence debate">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Neonicotinoids — the pollinator question</text>
      {/* mechanism */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOW THEY REACH THE BEE</text>
      {[
        "systemic: coated seed absorbs",
        "  the chemical into every tissue",
        "it appears in pollen and nectar",
        "  — the bee's own food",
        "bees carry it home: the colony",
        "  is dosed through its foragers",
        "sublethal doses scramble bee",
        "  navigation and memory —",
        "  foragers fail to return",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* debate */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE ONGOING DEBATE</text>
      {[
        "EU restricted the three main",
        "  neonicotinoids on flowering",
        "  crops (2013, tightened 2018)",
        "growers argue yields fall and",
        "  older sprays return",
        "evidence points to multiple",
        "  stressors: chemicals + mites +",
        "  habitat loss together",
        "lesson: a 'safe' pesticide can",
        "  still be unsafe at the level",
        "  of the whole system",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="240" width="330" height="52" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Exam hook: neonicotinoid = systemic; it travels to pollen — exposure is built into the plant.</text>
      <text x="195" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Pollination is an ecosystem service worth billions — bee risk is economic risk.</text>
      <text x="195" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Modern pesticide policy must weigh non-target species, not just the pest.</text>
    </svg>
  );
}
