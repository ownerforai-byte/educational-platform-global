/** Medicinal herbs economy — yarsagumba to chiraito. Well-detailed. Theme-aware. */
export function MedicinalHerbEconomy({ className }: { className?: string }) {
  const herbs: [string, string, string, string][] = [
    ["Yarsagumba", "caterpillar fungus of alpine meadows", "among the most valuable biological goods on earth", "rgb(245 158 11)"],
    ["Chiraito", "temperate-hill bitter shrub", "fever and liver remedies; exported", "rgb(22 163 74)"],
    ["Timur", "Sichuan pepper of mid hills", "toothache numbing, spice trade", "rgb(139 92 246)"],
    ["Rudilo/jatamasi", "nard of high altitude", "aromatic oils, overharvested", "rgb(2 132 199)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Medicinal herbs economy yarsagumba chiraito timur jatamashi harvest trade value conservation sustainable collection Nepal forests">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The herbal economy hiding in the forest</text>
      {herbs.map(([name, what, value, rgb], i) => {
        const x = 30 + i * 170;
        return (
          <g key={name}>
            <rect x={x} y="44" width="160" height="200" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 80} y="66" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            {/* plant icon */}
            <path d={`M${x + 80} 150 v-30`} className="stroke-current" strokeWidth="2.4" style={{ color: rgb }} />
            <ellipse cx={x + 80} cy={112} rx="14" ry="9" className="fill-current" style={{ color: rgb, opacity: 0.4 }} />
            <text x={x + 12} y="176" fontSize="6.8" className="fill-current text-muted-foreground">{what.slice(0, 30)}</text>
            <text x={x + 12} y="190" fontSize="6.8" className="fill-current text-muted-foreground">{what.slice(30, 60)}</text>
            <text x={x + 12} y="212" fontSize="6.6" className="fill-current" style={{ color: rgb }}>{value.slice(0, 34)}</text>
            <text x={x + 12} y="226" fontSize="6.6" className="fill-current" style={{ color: rgb }}>{value.slice(34, 68)}</text>
          </g>
        );
      })}
      <rect x="30" y="256" width="660" height="36" rx="8" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="270" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Value brings pressure: unregulated digging strips meadows and hillsides — sustainable harvest rules and cultivation are the answer.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name two medicinal plants, their use, and the threat high value creates.</text>
    </svg>
  );
}
