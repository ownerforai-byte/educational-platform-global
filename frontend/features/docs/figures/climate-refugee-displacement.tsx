/** Climate refugee displacement — the human geography of warming. Well-detailed. Theme-aware. */
export function ClimateRefugeeDisplacement({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Climate refugee displacement environmental migrants sea level islands Bangladesh cyclones drought Sahel internally displaced persons IDMC statistics projection 2050 200 million World Bank Groundswell legal gap Geneva convention refugee definition 1951 not environmental migration rural urban Nepal Terai hills climate migration gradual sudden events">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Climate displacement — the human geography of warming</text>
      {/* drivers */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE DRIVERS</text>
      {[
        "sudden events: floods, cyclones,",
        "  GLOFs — displacement in hours",
        "slow onset: sea-level rise,",
        "  drought, salinisation —",
        "  displacement over years",
        "the projection: World Bank's",
        "  Groundswell report estimates",
        "  over 100 million internal",
        "  climate migrants by 2050 in",
        "  three regions alone",
        "most movement is internal and",
        "  rural→urban — not exotic,",
        "  just arithmetic",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* legal gap */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE LEGAL GAP</text>
      {[
        "the 1951 Refugee Convention",
        "  protects those fleeing",
        "  persecution — not climate",
        "  impacts",
        "'climate refugee' has no legal",
        "  standing yet — the term is",
        "  moral, not juridical",
        "island states (Tuvalu, Kiribati)",
        "  face an existential question:",
        "  where does a nation go?",
        "Nepal's own case: hill families",
        "  moving to the Terai as springs",
        "  dry — climate migration is",
        "  already domestic",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: sudden vs slow-onset drivers + the 1951 Convention gap — the two-part answer on climate displacement.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Migration is the oldest climate adaptation — the question is whether it is chosen or forced.</text>
    </svg>
  );
}
