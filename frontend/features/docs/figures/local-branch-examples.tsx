/** Local examples of branches — biology in a Nepali village. Well-detailed. Theme-aware. */
export function LocalBranchExamples({ className }: { className?: string }) {
  const examples: [string, string, string][] = [
    ["Ecology", "forest, pond, rice-field food webs", "a paddy field is an ecosystem"],
    ["Taxonomy", "naming sal, rhododendron, orchids", "herbarium and field guides"],
    ["Physiology", "how a buffalo digests, how ferns transpire", "farm and forest function"],
    ["Genetics", "why some wheat resists rust disease", "breeding better crops"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Local examples of branches biology in Nepal village ecology taxonomy physiology genetics paddy field sal herbarium wheat rust">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Every branch, seen in one Nepali valley</text>
      {examples.map(([name, where, hook], i) => {
        const x = 30 + (i % 2) * 335;
        const y = 44 + Math.floor(i / 2) * 108;
        return (
          <g key={name}>
            <rect x={x} y={y} width="320" height="96" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
            <text x={x + 16} y={y + 22} fontSize="8.6" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x={x + 16} y={y + 44} fontSize="7.4" className="fill-current text-muted-foreground">{where.slice(0, 46)}</text>
            {where.length > 46 && <text x={x + 16} y={y + 58} fontSize="7.4" className="fill-current text-muted-foreground">{where.slice(46, 92)}</text>}
            <text x={x + 16} y={y + 80} fontSize="7" className="fill-current text-emerald-600">{hook}</text>
          </g>
        );
      })}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Biology is not an imported subject: every branch studies something within walking distance of a Nepali classroom.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: pair each branch with a local example — the marker wants the pairing, not the definition.</text>
    </svg>
  );
}
