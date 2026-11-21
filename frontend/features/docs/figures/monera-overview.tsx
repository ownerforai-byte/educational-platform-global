/** Monera overview — who lives in the kingdom. Well-detailed. Theme-aware. */
export function MoneraOverview({ className }: { className?: string }) {
  const groups: [string, string, string, string][] = [
    ["Bacteria", "cell wall of peptidoglycan; rods, cocci, spirals", "curd, disease, decay", "rgb(2 132 199)"],
    ["Cyanobacteria", "photosynthetic, chlorophyll a; heterocysts fix N₂", "blue-green water blooms", "rgb(22 163 74)"],
    ["Mycoplasma", "no cell wall at all; smallest living cells", "pleomorphic, plant yellows", "rgb(245 158 11)"],
    ["Archaebacteria-like", "extreme-environment relatives, distinct walls", "live where others cannot", "rgb(139 92 246)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Monera kingdom overview bacteria cyanobacteria mycoplasma archaebacteria prokaryotes no nucleus peptidoglycan cell wall nutrition modes classification">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Kingdom Monera — the prokaryote shelf</text>
      <text x="16" y="44" fontSize="7.6" className="fill-current text-muted-foreground">No nuclear membrane, no membrane organelles, 70S ribosomes — every member below is a prokaryote.</text>
      {groups.map(([name, detail, tag, rgb], i) => {
        const x = 30 + i * 170;
        return (
          <g key={name}>
            <rect x={x} y="60" width="160" height="196" rx="12" className="fill-current text-slate-500/10" strokeWidth="2.2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 80} y="82" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            {/* icon */}
            {i === 0 && <rect x={x + 55} y="96" width="50" height="18" rx="9" className="fill-current" style={{ color: rgb, opacity: 0.35 }} stroke="currentColor" strokeWidth="1.6" />}
            {i === 1 && [0, 1, 2, 3].map((j) => (
              <circle key={j} cx={x + 60 + j * 14} cy={104} r="7" className="fill-current" style={{ color: rgb, opacity: 0.35 }} />
            ))}
            {i === 2 && <circle cx={x + 80} cy={104} r="13" className="fill-none stroke-current" strokeWidth="2.4" style={{ color: rgb }} strokeDasharray="3 3" />}
            {i === 3 && <rect x={x + 58} y="94" width="44" height="20" rx="4" className="fill-current" style={{ color: rgb, opacity: 0.3 }} stroke="currentColor" strokeWidth="1.6" />}
            <text x={x + 12} y="140" fontSize="7" className="fill-current text-muted-foreground">{detail.slice(0, 36)}</text>
            <text x={x + 12} y="154" fontSize="7" className="fill-current text-muted-foreground">{detail.slice(36, 72)}</text>
            <text x={x + 12} y="176" fontSize="6.8" className="fill-current" style={{ color: rgb }}>{tag}</text>
            <text x={x + 12} y="200" fontSize="6.8" className="fill-current text-muted-foreground">{["nutrition: auto + hetero", "nutrition: photoautotroph", "nutrition: parasite", "nutrition: chemoautotroph"][i]}</text>
            <text x={x + 12} y="216" fontSize="6.8" className="fill-current text-muted-foreground">{["wall: peptidoglycan", "wall: peptidoglycan + mucilage", "wall: ABSENT", "wall: distinct, non-peptidoglycan"][i]}</text>
            <text x={x + 12} y="244" fontSize="6.6" className="fill-current text-muted-foreground">{["E. coli, Bacillus", "Nostoc, Anabaena", "M. gallisepticum", "methanogens, halophiles"][i]}</text>
          </g>
        );
      })}
      <rect x="30" y="266" width="660" height="26" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="283" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: four Monera groups, one shared plan — prokaryotic, unicellular, peptidoglycan (except mycoplasma, which has no wall).</text>
    </svg>
  );
}
