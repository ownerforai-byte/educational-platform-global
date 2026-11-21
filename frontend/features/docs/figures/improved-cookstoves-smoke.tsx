/** Improved cookstoves smoke — the kitchen air fix. Well-detailed. Theme-aware. */
export function ImprovedCookstovesSmoke({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Improved cookstoves smoke indoor air pollution traditional open fire chulha biomass smoke particulate carbon monoxide health women children respiratory infections improved stove chimney efficiency fuel saving ICS programme Nepal black carbon glacier health benefits kitchen ventilation design tests">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cookstoves — the kitchen smoke that kills</text>
      {/* problem */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE OPEN-FIRE PROBLEM</text>
      {[
        "traditional chulha: open fire,",
        "  no chimney, biomass fuel",
        "indoor smoke reaches many times",
        "  the safe PM2.5 limit — among",
        "  the top health risks globally",
        "the victims: cooks (mostly",
        "  women) and the children beside",
        "  them — pneumonia, COPD,",
        "  cataracts, low birth weight",
        "black carbon from stoves also",
        "  accelerates glacier melt",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* fix */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FIXES, RANKED</text>
      {[
        "1. cleaner fuel: LPG, biogas,",
        "  electricity — removes the",
        "  smoke at its source",
        "2. improved stove with chimney",
        "  and better combustion —",
        "  halves fuel, cuts smoke",
        "3. ventilation and kitchen",
        "  design — cheap and immediate",
        "adoption is the hard part:",
        "  stoves must fit cooking",
        "  culture or they end as",
        "  storage shelves",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: indoor air pollution from biomass cooking smoke — name two health outcomes and two fixes.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">A chimney is one of the cheapest public-health devices ever installed.</text>
    </svg>
  );
}
