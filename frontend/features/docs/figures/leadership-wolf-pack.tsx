/** Leadership wolf pack — how leaders actually lead. Well-detailed. Theme-aware. */
export function LeadershipWolfPack({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Leadership wolf pack herd roles decision maker route finder sentinels experience age knowledge group movement coordination elephant matriarch bees scout">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Leadership in animal groups — who decides, who guides</text>
      {/* pack roles */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ROLES IN A MOVING GROUP</text>
      {[
        ["Leader", "sets direction and pace", 100],
        ["Sentinels", "watch for danger at the edges", 195],
        ["Followers", "copy the leader's choices", 290],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 55} y="88" width="110" height="90" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y="110" fontSize="6.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="128" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 24)}</text>
          <text x={x as number} y="142" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(24, 48)}</text>
          <text x={x as number} y="166" fontSize="5.4" textAnchor="middle" className="fill-current text-sky-600">{["decides", "guards", "obey"][i]}</text>
        </g>
      ))}
      <text x="195" y="206" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">leadership is about information, not force — the one who knows the way leads the march</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EVIDENCE FROM THE FIELD</text>
      {[
        "elephant herds follow the oldest",
        "  female — her memory of distant",
        "  water holes decides survival",
        "wolf packs move as a family,",
        "  guided by experienced breeders",
        "honeybee swarms scout and vote:",
        "  the best nest site wins by",
        "  consensus, not by rank",
        "leadership ≠ dominance: the",
        "  alpha and the pathfinder are",
        "  often different individuals",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: leadership = guiding group movement by knowledge and experience — distinct from dominance (priority of resources).</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The matriarch's memory is the herd's map — leadership as stored information.</text>
    </svg>
  );
}
