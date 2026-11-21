/** Earthworm juvenile to adult growth — the clitellum clock. Well-detailed. Theme-aware. */
export function EarthwormJuvenileAdultGrowth({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm juvenile to adult growth clitellum appears sexual maturity hatchling miniature adult no larva direct development months to maturity">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">From cocoon to adult — the clitellum is the clock</text>
      {/* stages */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["Cocoon", "lemon capsule in soil", 130],
        ["Hatchling", "miniature worm, no clitellum", 300],
        ["Growing juvenile", "segments added at the tail", 470],
        ["Adult", "clitellum appears — sexually mature", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y={92} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name as string}</text>
          <text x={x as number} y={112} fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y={126} fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">direct development — the hatchling is a small adult, no larval stage intervenes</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why the clitellum is the marker: it only forms when the reproductive organs are functional — a worm without a clitellum is a juvenile.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Maturation takes months; adult worms can live for years and produce cocoons each season.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: direct development + clitellum as the maturity marker — two facts that answer most life-cycle questions.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Contrast with the frog: tadpole → frog is indirect; worm hatchling → adult is direct.</text>
    </svg>
  );
}
