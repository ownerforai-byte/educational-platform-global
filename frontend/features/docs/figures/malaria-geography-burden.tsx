/** Malaria geography burden map — where falciparum hits. Well-detailed. Theme-aware. */
export function MalariaGeographyBurden({ className }: { className?: string }) {
  const regions: [string, string, string][] = [
    ["Sub-Saharan Africa", "largest share of cases and deaths", "rgb(244 63 94)"],
    ["South Asia", "Nepal's Terai historically endemic; control improving", "rgb(217 119 6)"],
    ["SE Asia + Amazon", "drug resistance emerges here first", "rgb(139 92 246)"],
    ["Highlands and deserts", "too cold or too dry for Anopheles — malaria-free", "rgb(16 185 129)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Malaria geography burden map sub-Saharan Africa South Asia Southeast Asia Amazon endemic highlands malaria free altitude temperature vector limit">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Where falciparum strikes — the geography of risk</text>
      {regions.map(([name, detail, rgb], i) => {
        const x = 30 + (i % 2) * 340;
        const y = 44 + Math.floor(i / 2) * 106;
        return (
          <g key={name}>
            <rect x={x} y={y} width="320" height="94" rx="10" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 16} y={y + 22} fontSize="8" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x={x + 16} y={y + 44} fontSize="7" className="fill-current text-muted-foreground">{detail.slice(0, 46)}</text>
            {detail.length > 46 && <text x={x + 16} y={y + 58} fontSize="7" className="fill-current text-muted-foreground">{detail.slice(46, 92)}</text>}
            <text x={x + 16} y={y + 80} fontSize="6.6" className="fill-current" style={{ color: rgb }}>{["most deaths", "seasonal risk", "resistance watch", "vector absent"][i]}</text>
          </g>
        );
      })}
      <rect x="30" y="258" width="660" height="34" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">The limit is climatic: Anopheles needs warmth and standing water, so altitude and aridity fence malaria out — Nepal's hills were safer than its Terai.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name the three high-burden regions and the climatic reason highlands are safer.</text>
    </svg>
  );
}
