/** Bird migration navigation — the compass stack. Well-detailed. Theme-aware. */
export function BirdMigrationNavigation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Bird migration navigation sun compass stars magnetic field landmarks smell inherited route juvenile first flight cuckoo no teacher fat stores stopover sites flyway Nepal">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Bird navigation — a stack of compasses</text>
      {/* compass stack */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FOUR COMPASSES, USED IN ORDER</text>
      {[
        ["Sun", "day compass, time-corrected", 100],
        ["Stars", "night compass for small songbirds", 145],
        ["Magnetism", "built-in field detector", 190],
        ["Landmarks + smell", "final local approach", 235],
      ].map(([name, detail, y], i) => (
        <g key={name as string}>
          <rect x="60" y={(y as number) - 14} width="270" height="30" rx="8" className="fill-current text-slate-500/10" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x="76" y={(y as number) + 5} fontSize="6.6" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name as string}</text>
          <text x="160" y={(y as number) + 5} fontSize="5.8" className="fill-current text-muted-foreground">{detail as string}</text>
        </g>
      ))}
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE REMARKABLE PART</text>
      {[
        "a first-year cuckoo flies alone",
        "  to Africa — the route is",
        "  inherited, not taught",
        "fuel is fat: birds nearly double",
        "  body weight before long legs",
        "stopover wetlands (including",
        "  Nepal's Koshi and Jagadishpur",
        "  Ramsar sites) refuel the flyers",
        "no compass is perfect — birds",
        "  cross-check one against another",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: migration navigation = sun + stars + magnetism + landmarks, with inherited routes and fat as fuel.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Nepal sits on a flyway — its Ramsar wetlands are service stations for migrating birds.</text>
    </svg>
  );
}
