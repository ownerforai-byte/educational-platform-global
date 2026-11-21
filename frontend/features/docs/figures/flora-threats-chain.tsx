/** Flora threats chain — drivers to consequences. Well-detailed. Theme-aware. */
export function FloraThreatsChain({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Flora threats chain deforestation overgrazing firewood collection invasive species climate change leading to habitat loss population decline local extinction consequences erosion landslides watershed damage">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Threats to flora — the causal chain</text>

      {/* drivers */}
      {[
        { x: 105, t: "DEFORESTATION", s: "farmland, roads, settlements", c: "rgb(244 63 94 / 0.9)" },
        { x: 285, t: "OVERGRAZING", s: "livestock in forests and alpine meadows", c: "rgb(245 158 11 / 0.9)" },
        { x: 465, t: "OVER-HARVEST", s: "medicinal plants, firewood, timber", c: "rgb(139 92 246 / 0.9)" },
        { x: 645, t: "INVASIVES + CLIMATE", s: "mikania, shifting zones upslope", c: "rgb(14 165 233 / 0.9)" },
      ].map((d) => (
        <g key={d.t}>
          <rect x={d.x - 78} y="44" width="156" height="52" rx="10" style={{ color: d.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={d.x} y="64" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{d.t}</text>
          <text x={d.x} y="82" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{d.s}</text>
        </g>
      ))}

      {/* converge */}
      {[[105, 96], [285, 96], [465, 96], [645, 96]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} L360 140`} strokeWidth="2" className="stroke-current text-muted-foreground" />
      ))}
      <rect x="270" y="128" width="180" height="40" rx="10" className="fill-current text-rose-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="152" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HABITAT LOSS + DECLINE</text>

      {/* consequences */}
      <path d="M360 168 L360 200" markerEnd="url(#arrftc)" strokeWidth="2.5" className="stroke-current text-muted-foreground" />
      <defs><marker id="arrftc" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-muted-foreground" /></marker></defs>
      <rect x="30" y="204" width="660" height="80" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="50" y="226" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">CONSEQUENCES: local extinctions · genetic erosion (small populations lose variation) ·</text>
      <text x="50" y="246" fontSize="7.8" className="fill-current text-muted-foreground">soil erosion and landslides on bare slopes · drier microclimates · loss of undiscovered medicinal species before they are even named.</text>
      <text x="50" y="268" fontSize="7.6" className="fill-current text-muted-foreground">Exam hook: habitat loss is the single biggest driver of plant extinction worldwide — bigger than trade or pollution.</text>
    </svg>
  );
}
