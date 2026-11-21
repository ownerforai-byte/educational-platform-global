/** Nepal red list examples — who is how threatened. Well-detailed. Theme-aware. */
export function NepalRedListExamples({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Nepal red list examples critically endangered species pygmy hog gharial vulture endangered tiger red panda snow leopard asiatic elephant vulnerable Nepal national status IUCN categories examples table conservation status">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Nepal's Red List — who sits on which rung</text>
      {/* ladder table */}
      <rect x="30" y="40" width="170" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="115" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CATEGORY</text>
      <rect x="200" y="40" width="490" height="26" rx="6" className="fill-current text-rose-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="445" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NEPAL EXAMPLES (NATIONAL RED LIST)</text>
      {[
        ["Critically Endangered", "gharial, white-rumped vulture, Bengal florican"],
        ["Endangered", "tiger, red panda, snow leopard, Asian elephant"],
        ["Vulnerable", "one-horned rhinoceros, common leopard, blackbuck"],
        ["Near Threatened", "species trending downward but not yet at risk"],
        ["Least Concern", "common leopard is LC globally — status differs by region"],
      ].map(([cat, ex], i) => {
        const y = 74 + i * 30;
        const rgb = ["rgb(244 63 94)", "rgb(217 119 6)", "rgb(202 138 4)", "rgb(2 132 199)", "rgb(16 185 129)"][i];
        return (
          <g key={cat}>
            <rect x="40" y={y} width="150" height="20" rx="5" className="fill-current" style={{ color: `${rgb} / 0.3` }} stroke="currentColor" strokeWidth="1.2" />
            <text x="115" y={y + 14} fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{cat}</text>
            <text x="214" y={y + 14} fontSize="6.4" className="fill-current text-muted-foreground">{ex}</text>
          </g>
        );
      })}
      <rect x="30" y="232" width="660" height="60" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="252" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Categories reflect risk of extinction, not just rarity — a rare species can be LC; a common one can crash fast.</text>
      <text x="360" y="270" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: pair each category with one Nepali example — gharial (CR), tiger (EN), rhino (VU) is the classic trio.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Nepal publishes its own national Red List — global and national categories can differ.</text>
    </svg>
  );
}
