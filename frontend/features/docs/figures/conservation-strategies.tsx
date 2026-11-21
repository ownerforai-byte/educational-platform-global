/** Conservation strategies — legal, protected areas, captive breeding, community. Theme-aware. */
export function ConservationStrategies({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Conservation strategies legal protection CITES and national laws protected areas captive breeding habitat restoration community-based conservation and international cooperation">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Six conservation strategies</text>

      {[
        { x: 110, t: "LEGAL PROTECTION", s: "CITES + national laws", c: "rgb(244 63 94 / 0.9)" },
        { x: 250, t: "PROTECTED AREAS", s: "parks, reserves, sanctuaries", c: "rgb(22 163 74 / 0.9)" },
        { x: 390, t: "CAPTIVE BREEDING", s: "breed then reintroduce", c: "rgb(14 165 233 / 0.9)" },
        { x: 530, t: "HABITAT RESTORATION", s: "repair what was lost", c: "rgb(132 204 22 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 66} y="52" width="132" height="76" rx="10" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="74" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="94" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
        </g>
      ))}

      {[
        { x: 250, t: "COMMUNITY-BASED", s: "locals benefit, locals protect" },
        { x: 440, t: "INTERNATIONAL COOPERATION", s: "treaties, shared migratory routes" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 90} y="146" width="180" height="52" rx="10" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
          <text x={n.x} y="166" fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="184" fontSize="6.9" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
        </g>
      ))}
      <text x="16" y="226" fontSize="9.5" className="fill-current text-muted-foreground">The strongest plans stack all six — law alone cannot guard a forest nobody benefits from.</text>
    </svg>
  );
}
