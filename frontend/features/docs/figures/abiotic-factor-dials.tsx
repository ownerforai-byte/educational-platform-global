/** Abiotic factor dials — light, temperature, water, soil. Well-detailed. Theme-aware. */
export function AbioticFactorDials({ className }: { className?: string }) {
  const factors: [string, string, string, string][] = [
    ["Light", "drives photosynthesis; day length times flowering", "the energy budget", "rgb(245 158 11)"],
    ["Temperature", "sets enzyme speed and species ranges", "altitude and latitude rules", "rgb(244 63 94)"],
    ["Water", "shapes rainfall belts and plant life forms", "rainfall decides the biome", "rgb(2 132 199)"],
    ["Soil", "texture, pH and humus decide what roots can hold", "the rooting anchor", "rgb(139 92 246)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Abiotic factors light temperature water soil photoperiod altitude latitude rainfall biome pH humus ecosystem nonliving components">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Abiotic factors — the four master dials</text>
      {factors.map(([name, detail, tag, rgb], i) => {
        const x = 30 + i * 170;
        const cx = x + 85;
        return (
          <g key={name}>
            <rect x={x} y="44" width="160" height="200" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={cx} y="66" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            {/* dial icon */}
            <circle cx={cx} cy="112" r="24" className="fill-none stroke-current" strokeWidth="3" style={{ color: rgb }} />
            <line x1={cx} y1="112" x2={cx + 16 * Math.cos((-30 + i * 40) * Math.PI / 180)} y2={112 + 16 * Math.sin((-30 + i * 40) * Math.PI / 180)} className="stroke-current" strokeWidth="2.4" style={{ color: rgb }} />
            <text x={cx} y="158" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(0, 30)}</text>
            <text x={cx} y="172" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(30, 60)}</text>
            <text x={cx} y="196" fontSize="6.8" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{tag}</text>
            <text x={cx} y="222" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{["photoperiod", "Q₁₀ enzyme rule", "precipitation", "texture + humus"][i]}</text>
          </g>
        );
      })}
      <rect x="30" y="256" width="660" height="36" rx="8" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="270" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Abiotic = non-living. Turn any dial too far and the community that lives there changes — species are tuned to narrow dial settings.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: give the factor, its effect on organisms, and one example of a species tuned to it.</text>
    </svg>
  );
}
