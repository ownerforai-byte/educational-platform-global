/** Lichen reproduction — soredia vs isidia vs fragmentation. Well-detailed. Theme-aware. */
export function LichenIsidiaFragment({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Lichen vegetative reproduction soredia isidia fragmentation thallus break dispersal by wind water animals asexual propagation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three ways a lichen copies itself</text>

      {/* soredia */}
      <rect x="30" y="44" width="220" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="140" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">1. SOREDIA</text>
      {[[90, 110], [120, 96], [150, 118], [180, 100], [205, 122], [105, 140], [165, 142]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="7" className="fill-current text-lime-500/40" stroke="currentColor" strokeWidth="1" style={{ color: "rgb(132 204 22 / 0.9)" }} />
          <circle cx={x} cy={y} r="2.4" className="fill-current text-emerald-600/70" />
        </g>
      ))}
      <text x="140" y="170" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">alga + hyphae powder,</text>
      <text x="140" y="182" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">bursting through the surface</text>
      <text x="140" y="202" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">dust-like, wind-carried</text>

      {/* isidia */}
      <rect x="270" y="44" width="220" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="380" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">2. ISIDIA</text>
      <path d="M300 150 q80 -18 160 0" className="fill-none stroke-current text-stone-400" strokeWidth="6" style={{ color: "rgb(168 162 158 / 0.6)" }} />
      {[[330, 138], [365, 132], [400, 136], [435, 140]].map(([x, y]) => (
        <g key={x}>
          <path d={`M${x} ${y} q6 -16 12 0 q-6 4 -6 4 q-0 0 -6 -4`} className="fill-current text-emerald-600/50" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
        </g>
      ))}
      <text x="380" y="170" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">tiny coral-like outgrowths</text>
      <text x="380" y="182" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">with cortex skin, on the surface</text>
      <text x="380" y="202" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">break off by rain or touch</text>

      {/* fragmentation */}
      <rect x="510" y="44" width="180" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="600" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">3. FRAGMENTATION</text>
      <path d="M540 130 q30 -24 60 0 q30 24 60 0" className="fill-none stroke-current text-amber-600" strokeWidth="5" style={{ color: "rgb(180 130 40 / 0.8)" }} />
      <path d="M598 112 L602 148" className="stroke-current text-rose-500" strokeWidth="2" strokeDasharray="3 2" />
      <text x="600" y="102" fontSize="7" textAnchor="middle" className="fill-current text-rose-500">breaks here</text>
      <text x="600" y="170" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">a thallus piece splits off,</text>
      <text x="600" y="182" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">each piece grows into a</text>
      <text x="600" y="194" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">new complete lichen</text>

      {/* footer */}
      <rect x="30" y="240" width="660" height="44" rx="10" className="fill-current text-violet-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="50" y="260" fontSize="7.8" className="fill-current text-foreground" fontWeight="700">All three are VEGETATIVE (asexual): each propagule already carries both partners, so it can start a new lichen immediately.</text>
      <text x="50" y="276" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: soredia = powdery, no cortex; isidia = warty, cortex-covered.</text>
    </svg>
  );
}
