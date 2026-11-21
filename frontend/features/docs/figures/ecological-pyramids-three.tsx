/** Three pyramids — number, biomass, energy. Well-detailed. Theme-aware. */
export function EcologicalPyramidsThree({ className }: { className?: string }) {
  const pyramids: [string, string, string, string][] = [
    ["Number", "count of individuals per level", "can invert: one tree, many insects", "rgb(2 132 199)"],
    ["Biomass", "total dry mass per level", "can invert in the sea: phytoplankton < fish", "rgb(22 163 74)"],
    ["Energy", "energy flow per level, kJ m⁻² yr⁻¹", "NEVER inverts — thermodynamics forbids it", "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Ecological pyramids number biomass energy upright inverted trophic levels producers consumers thermodynamics Lindeman">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three ecological pyramids</text>
      {pyramids.map(([name, detail, warn, rgb], i) => {
        const x = 30 + i * 230;
        const cx = x + 115;
        return (
          <g key={name}>
            <rect x={x} y="44" width="220" height="220" rx="12" className="fill-current text-slate-500/10" strokeWidth="2.2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={cx} y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            {/* pyramid tiers */}
            {[[0, 70, 44], [1, 56, 64], [2, 40, 84], [3, 22, 104]].map(([tier, halfW, y]) => (
              <rect key={tier} x={cx - halfW} y={y} width={halfW * 2} height="18" rx="3" className="fill-current" style={{ color: rgb, opacity: 0.5 - tier * 0.09 }} stroke="currentColor" strokeWidth="1.2" />
            ))}
            <text x={cx + 60} y="80" fontSize="6.4" className="fill-current text-muted-foreground">producers</text>
            <text x={cx + 44} y="120" fontSize="6.4" className="fill-current text-muted-foreground">T3</text>
            <text x={cx + 12} y="148" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(0, 32)}</text>
            <text x={cx + 12} y="162" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(32, 64)}</text>
            <text x={cx + 12} y="188" fontSize="6.8" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{warn.slice(0, 34)}</text>
            <text x={cx + 12} y="202" fontSize="6.8" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{warn.slice(34, 68)}</text>
            <text x={cx} y="240" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{["can invert", "can invert", "always upright"][i]}</text>
          </g>
        );
      })}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: only the energy pyramid is always upright — 10% survives each step, so no level can hold more energy than the one below.</text>
    </svg>
  );
}
