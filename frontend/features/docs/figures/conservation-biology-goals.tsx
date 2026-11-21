/** Conservation biology goals — document, understand, prevent. Theme-aware. */
export function ConservationBiologyGoals({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Conservation biology as a crisis discipline with three goals document biodiversity understand human effects and prevent extinctions">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Conservation biology — a crisis discipline</text>
      <text x="16" y="48" fontSize="9.5" className="fill-current text-muted-foreground">Applies ecology, genetics and social science to prevent extinctions — from genes to ecosystems.</text>

      {[
        { x: 110, n: "1", t: "DOCUMENT", s: "inventories, monitoring,", s2: "IUCN Red List assessment", c: "rgb(14 165 233 / 0.9)" },
        { x: 330, n: "2", t: "UNDERSTAND", s: "effects of human activity on", s2: "species, communities, ecosystems", c: "rgb(245 158 11 / 0.9)" },
        { x: 550, n: "3", t: "PREVENT", s: "extinctions; restore populations", s2: "and habitats", c: "rgb(22 163 74 / 0.9)" },
      ].map((g) => (
        <g key={g.t}>
          <rect x={g.x - 88} y="66" width="176" height="100" rx="12" style={{ color: g.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <circle cx={g.x} cy="92" r="12" style={{ color: g.c }} className="fill-current opacity-40" />
          <text x={g.x} y="97" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{g.n}</text>
          <text x={g.x} y="122" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{g.t}</text>
          <text x={g.x} y="140" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{g.s}</text>
          <text x={g.x} y="156" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{g.s2}</text>
        </g>
      ))}
      <text x="16" y="196" fontSize="9.5" className="fill-current text-muted-foreground">Crisis discipline = decisions must be made before all the data are in — the clock is the enemy.</text>
    </svg>
  );
}
