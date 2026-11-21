/** Growth conditions — what bacteria need to multiply. Well-detailed. Theme-aware. */
export function BacterialGrowthConditions({ className }: { className?: string }) {
  const factors: [string, string, string, string][] = [
    ["Temperature", "most grow 25–40 °C; fridge slows, boiling kills", "mesophiles rule the lab", "rgb(245 158 11)"],
    ["pH", "near neutral 6.5–7.5; pickles resist spoilage by acid", "acid is an old preservative", "rgb(2 132 199)"],
    ["Moisture", "water is the medium; drying preserves food", "no water, no doubling", "rgb(22 163 74)"],
    ["Oxygen", "aerobes need it, anaerobes are killed by it", "botulinum loves sealed cans", "rgb(139 92 246)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Bacterial growth conditions temperature pH moisture oxygen aerobes anaerobes food preservation refrigeration sterilisation factors affecting growth curve">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">What doubles a culture — four dials</text>
      {factors.map(([name, detail, tag, rgb], i) => {
        const x = 30 + (i % 2) * 335;
        const y = 44 + Math.floor(i / 2) * 108;
        return (
          <g key={name}>
            <rect x={x} y={y} width="320" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 16} y={y + 22} fontSize="8.8" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x={x + 16} y={y + 44} fontSize="7.4" className="fill-current text-muted-foreground">{detail.slice(0, 46)}</text>
            {detail.length > 46 && <text x={x + 16} y={y + 58} fontSize="7.4" className="fill-current text-muted-foreground">{detail.slice(46, 92)}</text>}
            <text x={x + 16} y={y + 80} fontSize="7" className="fill-current" style={{ color: rgb }}>{tag}</text>
          </g>
        );
      })}
      <rect x="30" y="264" width="660" height="28" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="278" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Preservation is just dial-turning: refrigeration slows the clock, drying removes the water, salting and pickling shift the pH, canning removes the oxygen.</text>
      <text x="360" y="290" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: link each food-preservation method to the factor it attacks.</text>
    </svg>
  );
}
