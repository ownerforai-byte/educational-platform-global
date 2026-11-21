/** Biology today frontiers — where the subject is heading. Well-detailed. Theme-aware. */
export function BiologyTodayFrontiers({ className }: { className?: string }) {
  const fronts: [string, string, string, string][] = [
    ["Genomics", "reading whole genomes in days", "personalised medicine", "rgb(2 132 199)"],
    ["Biotechnology", "editing genes with CRISPR tools", "drought-proof crops", "rgb(139 92 246)"],
    ["Ecology + climate", "tracking a warming biosphere", "conservation targets", "rgb(22 163 74)"],
    ["Neurobiology", "mapping brain circuits", "treating depression, dementia", "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Biology today frontiers genomics CRISPR biotechnology ecology climate neurobiology modern developments scope future">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Where biology is heading — four frontiers</text>
      {fronts.map(([name, detail, tag, rgb], i) => {
        const x = 30 + i * 170;
        return (
          <g key={name}>
            <rect x={x} y="44" width="160" height="200" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 80} y="68" fontSize="8.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            {/* frontier icon */}
            <circle cx={x + 80} cy="110" r="20" className="fill-none stroke-current" strokeWidth="2.4" style={{ color: rgb }} strokeDasharray="6 4" />
            <circle cx={x + 80} cy="110" r="8" className="fill-current" style={{ color: rgb, opacity: 0.5 }} />
            <text x={x + 12} y="152" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(0, 28)}</text>
            <text x={x + 12} y="166" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(28, 56)}</text>
            <text x={x + 80} y="196" fontSize="6.8" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{tag}</text>
            <text x={x + 80} y="228" fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{["read", "edit", "protect", "understand"][i]}</text>
          </g>
        );
      })}
      <rect x="30" y="256" width="660" height="36" rx="8" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="270" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">The scope of biology keeps widening: from naming species to editing them, from describing nature to forecasting its future.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: one frontier, one tool, one benefit — that is a complete answer.</text>
    </svg>
  );
}
