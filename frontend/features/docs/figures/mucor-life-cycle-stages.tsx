/** Mucor life cycle — asexual loop with sexual backup. Well-detailed. Theme-aware. */
export function MucorLifeCycleStages({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mucor life cycle stages sporangiospore germinates coenocytic mycelium sporangiophore grows upward sporangium bursts releases spores sexual conjugation zygospore resting spore cycle on bread">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mucor life cycle — speed first, survival second</text>

      {/* steps around */}
      {[
        { x: 110, y: 90, t: "1. sporangiospore (n)" },
        { x: 360, y: 75, t: "2. germ tube → mycelium" },
        { x: 610, y: 95, t: "3. sporangiophore rises" },
        { x: 610, y: 215, t: "4. sporangium bursts" },
        { x: 360, y: 235, t: "5. spores scatter" },
        { x: 110, y: 210, t: "6. new colony (hours!)" },
      ].map((p) => (
        <g key={p.t}>
          <circle cx={p.x} cy={p.y} r="32" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <text x={p.x} y={p.y - 2} fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{p.t.split(". ")[0]}.</text>
          <text x={p.x} y={p.y + 10} fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{p.t.split(". ")[1]}</text>
        </g>
      ))}
      <path d="M142 88 L328 78 M392 78 L578 92 M610 127 L610 183 M578 212 L392 230 M328 230 L142 212 M110 178 L110 122" strokeWidth="2" className="stroke-current text-muted-foreground" markerEnd="url(#arrmlc)" />
      <defs><marker id="arrmlc" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" className="fill-current text-muted-foreground" /></marker></defs>

      {/* sexual backup */}
      <rect x="30" y="252" width="660" height="38" rx="10" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="50" y="268" fontSize="7.8" className="fill-current text-foreground" fontWeight="700">Sexual backup: when food runs short, + and − hyphae conjugate → thick-walled zygospore waits out bad times, then meioses and sprouts.</text>
      <text x="50" y="284" fontSize="7.4" className="fill-current text-muted-foreground">A whole colony can appear on bread overnight — each spore is a complete clone of the parent.</text>
    </svg>
  );
}
