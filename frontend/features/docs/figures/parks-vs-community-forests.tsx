/** National parks vs community forests comparison — two conservation models. Well-detailed. Theme-aware. */
export function ParksVsCommunityForests({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="National parks vs community forests comparison two conservation models state protected areas fencing guards eviction history versus community forestry CFUG tenure local management Nepal Chitwan Sagarmatha Langtang community forest user groups strengths weaknesses complementarity hybrid buffer zone landscape approach which works where biodiversity big mammals forests livelihoods">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Parks vs community forests — two models, one goal</text>
      {/* parks */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NATIONAL PARKS (state-led)</text>
      {[
        "best for: big mammals and wide-",
        "  ranging species — tigers and",
        "  rhinos need large intact habitat",
        "tools: fences, army patrols,",
        "  strict rules",
        "historic cost: early parks",
        "  displaced communities —",
        "  conservation versus people",
        "buffer zones now share revenue",
        "  and management — the",
        "  Nepali hybrid",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* community forests */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">COMMUNITY FORESTS (people-led)</text>
      {[
        "best for: mid-hill forests and",
        "  livelihoods — thousands of",
        "  CFUGs manage their own blocks",
        "tools: tenure, operational plans,",
        "  local rangers",
        "strength: legitimacy — rules",
        "  made by users are enforced by",
        "  users",
        "limits: less suited to wide-",
        "  ranging megafauna; quality",
        "  varies with local capacity",
        "the synthesis: Nepal runs both —",
        "  parks for wildlife, community",
        "  forestry for the matrix",
        "  between them",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: match model to purpose — parks for megafauna, community forestry for forest cover and livelihoods; Nepal needs both.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The debate is settled by geography, not ideology — the right tool depends on what lives there.</text>
    </svg>
  );
}
