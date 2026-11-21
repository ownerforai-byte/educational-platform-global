/** Deforestation consequences chain. Theme-aware. */
export function DeforestationConsequences({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 200" className={className} role="img" aria-label="Deforestation consequences chain soil erosion landslides springs drying siltation of rivers hydropower reservoirs biodiversity loss local climate drying carbon release climate change">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">When the forest goes — the consequence chain</text>
      {[
        { x: 110, t: "TREE LOSS", s: "roots no longer", s2: "hold soil" },
        { x: 260, t: "EROSION / SLIDES", s: "fragile slopes fail;", s2: "springs dry up" },
        { x: 410, t: "SILTATION", s: "rivers and hydropower", s2: "reservoirs choke" },
        { x: 560, t: "BIODIVERSITY LOSS", s: "habitat specialists", s2: "disappear first" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 62} y="56" width="124" height="80" rx="10" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={n.x} y="78" fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="98" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="114" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
          {n.x < 550 && <path d={`M${n.x + 64} 96 h${84}`} markerEnd="url(#arrdc)" strokeWidth="2.5" className="stroke-current text-muted-foreground" />}
        </g>
      ))}
      <defs><marker id="arrdc" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-muted-foreground" /></marker></defs>
      <text x="16" y="172" fontSize="8.4" className="fill-current text-muted-foreground">Plus: local climate drying and carbon release feeding climate change.</text>
    </svg>
  );
}
