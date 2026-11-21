/** Homologous organs — forelimbs of human, whale, bat, horse. Theme-aware. */
export function HomologousForelimbs({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Homologous forelimbs of human whale bat and horse with same bones humerus radius ulna carpals and digits showing divergent evolution from common ancestor">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Homologous organs — same bones, different jobs</text>
      {[
        { x: 100, t: "HUMAN", u: "grasping" },
        { x: 250, t: "WHALE", u: "swimming (flipper)" },
        { x: 400, t: "BAT", u: "flying (wing)" },
        { x: 550, t: "HORSE", u: "running" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 60} y="52" width="120" height="100" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <text x={n.x} y="74" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="96" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">humerus, radius-ulna,</text>
          <text x={n.x} y="110" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">carpals, digits</text>
          <text x={n.x} y="138" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontStyle="italic">{n.u}</text>
        </g>
      ))}
      <rect x="40" y="168" width="580" height="34" rx="10" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="56" y="190" fontSize="8.8" className="fill-current text-foreground" fontWeight="700">Same basic structure, different functions → DIVERGENT evolution from a common ancestor.</text>
    </svg>
  );
}
