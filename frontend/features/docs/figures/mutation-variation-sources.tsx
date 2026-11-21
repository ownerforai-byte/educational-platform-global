/** Mutation variation sources — where new alleles come from. Well-detailed. Theme-aware. */
export function MutationVariationSources({ className }: { className?: string }) {
  const sources: [string, string, string][] = [
    ["Mutation", "random DNA change — the only source of new alleles", "rgb(244 63 94)"],
    ["Recombination", "crossing over + independent assortment in meiosis", "rgb(139 92 246)"],
    ["Gene flow", "immigrants bring alleles into the population", "rgb(2 132 199)"],
    ["Reshuffling at fertilisation", "which sperm meets which egg is chance", "rgb(22 163 74)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mutation variation sources recombination crossing over gene flow fertilisation shuffling neo Darwinism genetic variation raw material selection">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Where variation comes from — four suppliers</text>
      {sources.map(([name, detail, rgb], i) => {
        const x = 30 + (i % 2) * 340;
        const y = 44 + Math.floor(i / 2) * 106;
        return (
          <g key={name}>
            <rect x={x} y={y} width="320" height="94" rx="10" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 16} y={y + 22} fontSize="8.2" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x={x + 16} y={y + 44} fontSize="7" className="fill-current text-muted-foreground">{detail.slice(0, 46)}</text>
            {detail.length > 46 && <text x={x + 16} y={y + 58} fontSize="7" className="fill-current text-muted-foreground">{detail.slice(46, 92)}</text>}
            <text x={x + 16} y={y + 80} fontSize="6.8" className="fill-current" style={{ color: rgb }}>{i === 0 ? "creates NEW alleles" : "reshuffles EXISTING alleles"}</text>
          </g>
        );
      })}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Only mutation makes brand-new alleles; the other three repackage what exists — but selection needs the whole package.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: 'mutation is the ultimate source of variation' — a one-mark sentence worth memorising.</text>
    </svg>
  );
}
