/** Mutualism case studies — both partners profit. Well-detailed. Theme-aware. */
export function MutualismCaseStudies({ className }: { className?: string }) {
  const cases: [string, string, string, string][] = [
    ["Lichen", "alga feeds fungus sugar; fungus shelters alga", "one body, two kingdoms", "rgb(22 163 74)"],
    ["Mycorrhiza", "fungus trades soil minerals for root sugar", "every forest runs on it", "rgb(139 92 246)"],
    ["Pollination", "insect gets nectar; flower gets fatherhood", "co-evolved colours and shapes", "rgb(245 158 11)"],
    ["Rhizobium", "bacteria fix N₂; legume pays in sugar", "the noduled root", "rgb(2 132 199)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mutualism case studies lichen mycorrhiza pollination Rhizobium both partners benefit symbiosis examples coevolution">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mutualism — ++ in four costumes</text>
      {cases.map(([name, detail, tag, rgb], i) => {
        const x = 30 + i * 170;
        return (
          <g key={name}>
            <rect x={x} y="44" width="160" height="200" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 80} y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            {/* two-partner icon */}
            <circle cx={x + 58} cy="104" r="13" className="fill-current" style={{ color: rgb, opacity: 0.35 }} />
            <circle cx={x + 102} cy="104" r="13" className="fill-current" style={{ color: rgb, opacity: 0.2 }} />
            <line x1={x + 71} y1="104" x2={x + 89} y2="104" className="stroke-current" strokeWidth="2" style={{ color: rgb }} />
            <text x={x + 80} y="140" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(0, 30)}</text>
            <text x={x + 80} y="154" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(30, 60)}</text>
            <text x={x + 80} y="182" fontSize="6.8" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{tag}</text>
            <text x={x + 80} y="222" fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">+ / +</text>
          </g>
        );
      })}
      <rect x="30" y="256" width="660" height="36" rx="8" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="270" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Test of true mutualism: neither partner survives or reproduces as well alone — lichen dies if you separate the alga from the fungus.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: give the pair, the benefit each side gains, and one line on why the partnership persists.</text>
    </svg>
  );
}
