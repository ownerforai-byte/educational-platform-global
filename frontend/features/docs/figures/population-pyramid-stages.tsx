/** Population pyramid stages — reading a nation's age structure. Well-detailed. Theme-aware. */
export function PopulationPyramidStages({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Population pyramid stages expanding stable declining broad base narrow top age structure Nepal demographic transition youth bulge ageing society pyramid shapes comparison three stages">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Population pyramids — three shapes, three futures</text>
      {/* three pyramids */}
      <rect x="30" y="40" width="660" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["Expanding", "broad base: high birth rate, fast growth", 130, "triangular"],
        ["Stable", "rectangular: births ≈ deaths at every age", 330, "rectangular"],
        ["Declining", "narrow base: ageing population, shrinkage ahead", 530, "inverted"],
      ].map(([name, detail, x, shape], i) => {
        const cx = x as number;
        return (
          <g key={name as string}>
            <rect x={cx - 60} y="66" width="120" height="130" rx="8" className="fill-current text-slate-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            {shape === "triangular" && <path d={`M${cx} 80 L${cx + 42} 186 L${cx - 42} 186 Z`} className="fill-current" style={{ color: "rgb(217 119 6 / 0.45)" }} />}
            {shape === "rectangular" && <rect x={cx - 38} y="80" width="76" height="106" className="fill-current" style={{ color: "rgb(16 185 129 / 0.4)" }} />}
            {shape === "inverted" && <path d={`M${cx - 42} 80 L${cx + 42} 80 L${cx} 186 Z`} className="fill-current" style={{ color: "rgb(244 63 94 / 0.45)" }} />}
            <text x={cx} y="216" fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
            <text x={cx} y="66" fontSize="5.2" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          </g>
        );
      })}
      {/* facts */}
      <rect x="30" y="228" width="660" height="64" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="248" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Nepal is mid-transition: the base is narrowing as fertility falls — the youth bulge becomes a working-age opportunity.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: read the base (birth rate) and the top (life expectancy) — the pyramid's two ends tell the demographic story.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Age structure predicts schools, jobs and pensions decades ahead — demography is slow but powerful.</text>
    </svg>
  );
}
