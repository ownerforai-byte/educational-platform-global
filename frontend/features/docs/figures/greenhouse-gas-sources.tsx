/** Greenhouse gas sources — who emits what. Well-detailed. Theme-aware. */
export function GreenhouseGasSources({ className }: { className?: string }) {
  const gases: [string, string, string, string][] = [
    ["CO₂", "fossil fuels, deforestation, cement", "the volume leader", "rgb(2 132 199)"],
    ["CH₄", "rice paddies, cattle, landfills, gas leaks", "~25× CO₂'s heat power", "rgb(245 158 11)"],
    ["N₂O", "fertiliser overuse, vehicle engines", "long-lived, potent", "rgb(139 92 246)"],
    ["CFCs", "old refrigerators, aerosols, foams", "also destroys ozone", "rgb(244 63 94)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Greenhouse gas sources CO2 methane nitrous oxide CFCs emission sources global warming potential comparison blanket effect">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Four greenhouse gases, four sources</text>
      {gases.map(([name, src, tag, rgb], i) => {
        const x = 30 + i * 170;
        return (
          <g key={name}>
            <rect x={x} y="44" width="160" height="200" rx="12" className="fill-current text-slate-500/10" strokeWidth="2.2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 80} y="70" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            {/* gas molecules */}
            {[0, 1, 2].map((j) => (
              <circle key={j} cx={x + 50 + j * 30} cy="100" r="8" className="fill-current" style={{ color: rgb, opacity: 0.35 }} stroke="currentColor" strokeWidth="1.4" />
            ))}
            <text x={x + 12} y="134" fontSize="6.8" className="fill-current text-muted-foreground">{src.slice(0, 32)}</text>
            <text x={x + 12} y="148" fontSize="6.8" className="fill-current text-muted-foreground">{src.slice(32, 64)}</text>
            <text x={x + 80} y="176" fontSize="7" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{tag}</text>
            <text x={x + 80} y="210" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{["centuries in air", "~12 years", "~120 years", "decades"][i]}</text>
            <text x={x + 80} y="228" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{["biggest share", "fastest riser", "agriculture's gas", "banned, still leaking"][i]}</text>
          </g>
        );
      })}
      <rect x="30" y="256" width="660" height="36" rx="8" className="fill-current text-rose-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="270" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Each gas traps outgoing infrared — the thicker the mix, the warmer the blanket. CO₂ dominates by volume; the others beat it molecule-for-molecule.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name the gas, one source, one effect — four times over.</text>
    </svg>
  );
}
