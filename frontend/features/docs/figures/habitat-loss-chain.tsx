/** Habitat loss chain — destruction to fragmentation to extinction. Theme-aware. */
export function HabitatLossChain({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Habitat loss chain deforestation agriculture urbanisation and infrastructure destroy habitat then fragmentation isolates populations leading to local extinction">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Habitat loss — the leading cause of extinction</text>

      {[
        { x: 110, t: "DRIVERS", s: "deforestation, agriculture,", s2: "urbanisation, infrastructure", c: "rgb(245 158 11 / 0.9)" },
        { x: 330, t: "DESTRUCTION", s: "natural habitat converted —", s2: "the species' home disappears", c: "rgb(244 63 94 / 0.9)" },
        { x: 550, t: "FRAGMENTATION", s: "remnants split into islands;", s2: "populations isolated, gene flow cut", c: "rgb(124 58 237 / 0.9)" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x - 88} y="52" width="176" height="86" rx="12" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="74" fontSize="8.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="94" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="110" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
          {i < 2 && <path d={`M${n.x + 90} 95 h${128}`} markerEnd="url(#arrhl)" strokeWidth="2.5" className="stroke-current text-muted-foreground" />}
        </g>
      ))}
      <defs><marker id="arrhl" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-muted-foreground" /></marker></defs>

      <rect x="40" y="154" width="580" height="40" rx="10" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="56" y="172" fontSize="8.8" className="fill-current text-foreground" fontWeight="700">End point: small isolated populations → inbreeding and drift → local extinction.</text>
      <text x="56" y="188" fontSize="8" className="fill-current text-muted-foreground">This is why corridors and habitat restoration are conservation priorities, not luxuries.</text>
    </svg>
  );
}
