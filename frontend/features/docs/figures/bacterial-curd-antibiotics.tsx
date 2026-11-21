/** Useful bacteria — curd, antibiotics, nitrogen fixation. Well-detailed. Theme-aware. */
export function BacterialCurdAntibiotics({ className }: { className?: string }) {
  const uses: [string, string, string, string][] = [
    ["Dairy", "Lactobacillus sours milk into curd; cheese ripening", "kitchen biotechnology", "rgb(245 158 11)"],
    ["Medicine", "antibiotics from soil bacteria; gut vitamins B, K", "health allies", "rgb(2 132 199)"],
    ["Agriculture", "Rhizobium fixes N₂ in legume nodules; composting", "free fertiliser", "rgb(22 163 74)"],
    ["Industry", "vinegar, lactic acid, enzymes; sewage treatment", "fermentation workhorses", "rgb(139 92 246)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Useful bacteria curd Lactobacillus antibiotics Rhizobium nitrogen fixation composting vinegar enzymes sewage treatment four uses economic importance">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Bacteria that work for us</text>
      {uses.map(([name, detail, tag, rgb], i) => {
        const x = 30 + (i % 2) * 335;
        const y = 44 + Math.floor(i / 2) * 110;
        return (
          <g key={name}>
            <rect x={x} y={y} width="320" height="98" rx="10" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 16} y={y + 22} fontSize="8.8" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x={x + 16} y={y + 44} fontSize="7.4" className="fill-current text-muted-foreground">{detail.slice(0, 46)}</text>
            {detail.length > 46 && <text x={x + 16} y={y + 58} fontSize="7.4" className="fill-current text-muted-foreground">{detail.slice(46, 92)}</text>}
            <text x={x + 16} y={y + 80} fontSize="7" className="fill-current" style={{ color: rgb }}>{tag}</text>
          </g>
        );
      })}
      <rect x="30" y="268" width="660" height="24" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="284" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name one bacterium per use — Lactobacillus (curd), Rhizobium (N₂ fixation), Streptomyces (antibiotics), E. coli (biotech workhorse).</text>
    </svg>
  );
}
