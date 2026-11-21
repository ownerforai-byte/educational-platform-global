/** Invasive species threat — Mikania, lantana, hyacinth. Well-detailed. Theme-aware. */
export function InvasiveSpeciesThreat({ className }: { className?: string }) {
  const invasives: [string, string, string, string][] = [
    ["Mikania (banmara)", "smothers saplings in Terai forests", "climbs and blankets everything", "rgb(139 92 246)"],
    ["Lantana", "forms dense thickets in open land", "toxic leaves, nothing grows under", "rgb(244 63 94)"],
    ["Water hyacinth", "carpets lakes and ponds", "blocks light, kills fish habitat", "rgb(2 132 199)"],
    ["Eupatorium (bannmara)", "invades fallow and overgrazed land", "takes over where grazing weakens natives", "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Invasive species threat Mikania lantana water hyacinth eupatorium banmara alien plants smother native biodiversity control manual removal">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Invasive plants — invaders that win by cheating</text>
      {invasives.map(([name, where, how, rgb], i) => {
        const x = 30 + i * 170;
        return (
          <g key={name}>
            <rect x={x} y="44" width="160" height="200" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 80} y="64" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            {/* smothering vine icon */}
            <path d={`M${x + 40} 170 q20 -30 40 -10 q20 20 40 -10`} className="fill-none stroke-current" strokeWidth="2.6" style={{ color: rgb }} />
            {[0, 1, 2].map((j) => (
              <ellipse key={j} cx={x + 50 + j * 30} cy={150 + j * 4} rx="10" ry="5" className="fill-current" style={{ color: rgb, opacity: 0.4 }} />
            ))}
            <text x={x + 12} y="196" fontSize="6.8" className="fill-current text-muted-foreground">{where.slice(0, 32)}</text>
            <text x={x + 12} y="210" fontSize="6.8" className="fill-current text-muted-foreground">{how.slice(0, 32)}</text>
            <text x={x + 12} y="232" fontSize="6.4" className="fill-current" style={{ color: rgb }}>{how.slice(32, 66)}</text>
          </g>
        );
      })}
      <rect x="30" y="256" width="660" height="36" rx="8" className="fill-current text-rose-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="270" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Why they win: no local pests, fast growth, huge seed output — and disturbed ground (overgrazed, logged) is their front door.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name two invasive plants and one control method (manual uprooting before seeding).</text>
    </svg>
  );
}
