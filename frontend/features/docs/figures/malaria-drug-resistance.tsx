/** Malaria drug resistance — the arms race. Well-detailed. Theme-aware. */
export function MalariaDrugResistance({ className }: { className?: string }) {
  const eras: [string, string, string][] = [
    ["Quinine", "17th–19th c., from cinchona bark", "rgb(217 119 6)"],
    ["Chloroquine", "1950s wonder drug — resistance by the 1960s", "rgb(2 132 199)"],
    ["Artemisinin", "from sweet wormwood; now first-line combination", "rgb(16 185 129)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Malaria drug resistance arms race quinine chloroquine artemisinin combination therapy ACT parasite mutations Southeast Asia resistance watch">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three drugs, three eras — the resistance race</text>
      {eras.map(([name, detail, rgb], i) => {
        const x = 30 + i * 228;
        return (
          <g key={name}>
            <rect x={x} y="44" width="210" height="150" rx="12" className="fill-current text-slate-500/10" strokeWidth="2.2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 105} y="70" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            {/* pill icon */}
            <rect x={x + 80} y={94} width="50" height="20" rx="10" className="fill-current" style={{ color: rgb, opacity: 0.35 }} stroke="currentColor" strokeWidth="1.4" transform={`rotate(-20 ${x + 105} 104)`} />
            <text x={x + 14} y="140" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(0, 34)}</text>
            <text x={x + 14} y="156" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(34, 68)}</text>
            <text x={x + 105} y="182" fontSize="6.4" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{["natural product", "resistance spread", "current first-line"][i]}</text>
          </g>
        );
      })}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The lesson: any single drug used alone breeds resistance — so treatment today is ACT, artemisinin combined with a partner drug.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Resistance almost always appears first in SE Asia and then spreads — surveillance matters as much as chemistry.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: order the three drugs chronologically and explain why combination therapy slows resistance.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Two mutations are needed for combined resistance — far rarer than one.</text>
    </svg>
  );
}
