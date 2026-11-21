/** Park categories compare — park vs reserve vs conservation area. Well-detailed. Theme-aware. */
export function ParkCategoriesCompare({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Park categories compare national park wildlife reserve hunting reserve conservation area buffer zone human activity allowed strictness gradient hunting allowed community management comparison table Nepal examples">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Four protection levels — how strict is strict?</text>
      {/* table */}
      <rect x="30" y="40" width="140" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="100" y="58" fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CATEGORY</text>
      <rect x="170" y="40" width="160" height="26" rx="6" className="fill-current text-emerald-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="250" y="58" fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PEOPLE RULE</text>
      <rect x="330" y="40" width="170" height="26" rx="6" className="fill-current text-sky-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="415" y="58" fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MAIN PURPOSE</text>
      <rect x="500" y="40" width="190" height="26" rx="6" className="fill-current text-amber-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="595" y="58" fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NEPAL EXAMPLE</text>
      {[
        ["National park", "no hunting; limited access", "ecosystem + flagship species", "Chitwan, Sagarmatha"],
        ["Wildlife reserve", "no hunting; habitat focus", "specific faunal species", "Koshi Tappu"],
        ["Hunting reserve", "licensed hunting only", "sustainable harvest of game", "Dhorpatan"],
        ["Conservation area", "community-managed multiple use", "landscape + livelihoods", "Annapurna, Kanchenjunga"],
        ["Buffer zone", "community use at park edge", "reduce park–people conflict", "around all Terai parks"],
      ].map(([cat, rule, purpose, ex], i) => {
        const y = 74 + i * 30;
        return (
          <g key={cat}>
            <text x="46" y={y + 10} fontSize="6.4" className="fill-current text-foreground" fontWeight="700">{cat}</text>
            <text x="184" y={y + 10} fontSize="5.8" className="fill-current text-muted-foreground">{rule}</text>
            <text x="344" y={y + 10} fontSize="5.8" className="fill-current text-muted-foreground">{purpose}</text>
            <text x="514" y={y + 10} fontSize="5.8" className="fill-current text-muted-foreground">{ex}</text>
          </g>
        );
      })}
      <rect x="30" y="226" width="660" height="66" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="246" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The gradient: national park (strictest) → wildlife reserve → hunting reserve → conservation area (most flexible) → buffer zone (people-first).</text>
      <text x="360" y="264" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: match category to human-use rule — Dhorpatan is the only hunting reserve; Koshi Tappu the wildlife reserve.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Buffer zones exist to make the park pay its neighbours — revenue sharing reduces conflict.</text>
    </svg>
  );
}
