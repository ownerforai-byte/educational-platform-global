/** Dominance hierarchy payoffs — who wins what. Well-detailed. Theme-aware. */
export function DominanceHierarchyPayoffs({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Dominance hierarchy payoffs pecking order alpha beta omega rank fights ritualised aggression resources priority food mates shelter reduced fighting stable society chickens wolves">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Dominance hierarchies — the pecking order's economics</text>
      {/* rank pyramid */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE RANK PYRAMID</text>
      {[["alpha", 195, 100, 110], ["beta", 195, 150, 160], ["omega", 195, 200, 200]].map(([name, x, w, y], i) => (
        <g key={name as string}>
          <rect x={(x as number) - ((w as number) / 2)} y={(y as number) - 14} width={w as number} height="28" rx="8" className="fill-current" style={{ color: ["rgb(217 119 6 / 0.3)", "rgb(217 119 6 / 0.2)", "rgb(217 119 6 / 0.1)"][i] }} stroke="currentColor" strokeWidth="1.6" />
          <text x={x as number} y={(y as number) + 5} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{(name as string).toUpperCase()}</text>
        </g>
      ))}
      <text x="195" y="222" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">each animal knows its place — decided once, mostly by ritual display, rarely by injury</text>
      {/* payoffs */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHO GAINS WHAT</text>
      {[
        "alpha: first at food, best mates,",
        "  best shelter — but pays in stress",
        "  and constant vigilance",
        "middle ranks: safe, average share",
        "omega: last and least — but even",
        "  subordinates gain, because the",
        "  order ends endless fighting",
        "the group wins most of all:",
        "  ritual replaces injury, and",
        "  everyone saves energy",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Origin of the term: chickens peck in a linear order — the top hen pecks all, the bottom hen pecks none.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: hierarchy = settled priority of access to resources, built by ritualised aggression, stable once learned.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Ranks are remembered, not re-fought — memory does the work of violence.</text>
    </svg>
  );
}
