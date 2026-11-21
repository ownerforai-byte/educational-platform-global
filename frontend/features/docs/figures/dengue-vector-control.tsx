/** Dengue vector control — beating the day-biting mosquito. Well-detailed. Theme-aware. */
export function DengueVectorControl({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Dengue vector control Aedes aegypti day biting standing water containers tyres pots larval source removal search destroy week 10 minute clean up campaign urban Nepal Terai outbreak 4 serotypes secondary infection severe dengue warning">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Dengue — control the container, not the mosquito sky</text>
      {/* the vector */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">KNOW THE VECTOR</text>
      {[
        "Aedes aegypti: a daytime biter —",
        "  dawn and dusk are peak hours,",
        "  but it bites all day",
        "breeds in clean standing water",
        "  near homes: tyres, pots, drums,",
        "  roof gutters, cooler trays",
        "urban mosquito: short flights,",
        "  so control is hyper-local",
        "four dengue serotypes — a second",
        "  infection with a different type",
        "  risks severe dengue",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* the strategy */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE STRATEGY: SEARCH & DESTROY</text>
      {[
        "weekly 10-minute house sweep:",
        "  empty, scrub, flip, discard",
        "every container that holds water",
        "larvicide in unavoidable tanks",
        "cover water storage; mesh windows",
        "repellent and long sleeves in",
        "  daytime — the bit most people",
        "  miss (they think nights only)",
        "community clean-up weeks before",
        "  monsoon — dengue is a",
        "  neighbourhood sport",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Aedes bites by day and breeds in containers — 'search and destroy' is the control answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Dengue reached Nepal's hills — warming has moved the mosquito's map uphill.</text>
    </svg>
  );
}
