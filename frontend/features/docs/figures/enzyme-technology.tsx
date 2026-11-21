/** Enzyme technology — catalysts by the tonne. Well-detailed. Theme-aware. */
export function EnzymeTechnology({ className }: { className?: string }) {
  const enzymes: [string, string, string, string][] = [
    ["Amylase", "starch → sugar", "bread, syrup, brewing", "rgb(245 158 11)"],
    ["Protease", "protein → amino acids", "detergents, cheese, tenderising", "rgb(2 132 199)"],
    ["Lipase", "fat → fatty acids", "detergents, flavouring", "rgb(22 163 74)"],
    ["Lactase", "lactose → glucose", "lactose-free milk", "rgb(139 92 246)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Enzyme technology amylase protease lipase lactase industrial enzymes detergent food processing immobilised enzymes reuse biotechnology fermentation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Enzyme technology — four workhorses</text>
      {enzymes.map(([name, rxn, use, rgb], i) => {
        const x = 30 + i * 170;
        const cx = x + 85;
        return (
          <g key={name}>
            <rect x={x} y="44" width="160" height="196" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={cx} y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            {/* lock and key */}
            <path d={`M${cx - 26} 100 q26 14 52 0 q-6 22 -26 22 q-20 0 -26 -22`} className="fill-current" style={{ color: rgb, opacity: 0.25 }} stroke="currentColor" strokeWidth="1.6" />
            <circle cx={cx} cy={98} r="7" className="fill-current" style={{ color: rgb, opacity: 0.7 }} />
            <text x={cx} y="140" fontSize="7" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{rxn}</text>
            <text x={cx} y="164" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{use.slice(0, 30)}</text>
            <text x={cx} y="178" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{use.slice(30, 60)}</text>
            <text x={cx} y="204" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{["from fungi, Bacillus", "Bacillus, papaya", "yeast, pancreas", "yeast, E. coli"][i]}</text>
            <text x={cx} y="224" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{["works 50–60 °C", "cold-wash active", "fat stain removal", "beads, reusable"][i]}</text>
          </g>
        );
      })}
      <rect x="30" y="252" width="660" height="40" rx="8" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="268" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Immobilised enzymes — fixed to beads or membranes so one batch works thousands of times; the basis of industrial biocatalysis.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name the enzyme, its substrate and one use — a guaranteed 2-marker.</text>
    </svg>
  );
}
