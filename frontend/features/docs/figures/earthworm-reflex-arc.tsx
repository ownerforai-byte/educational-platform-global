/** Earthworm reflex arc — sensory neuron to ganglion to motor response. Theme-aware. */
export function EarthwormReflexArc({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Earthworm reflex arc from skin receptor through sensory fibre to ventral cord ganglion to motor fibre to muscle response">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The reflex arc — one segment's fast lane</text>

      {[
        { x: 60, t: "RECEPTOR", s: "sensory cell in skin", c: "rgb(14 165 233 / 0.9)" },
        { x: 250, t: "SENSORY fibre", s: "carries signal in", c: "rgb(20 184 166 / 0.9)" },
        { x: 430, t: "GANGLION", s: "synapse in ventral cord", c: "rgb(124 58 237 / 0.9)" },
        { x: 590, t: "MOTOR fibre", s: "command out", c: "rgb(245 158 11 / 0.9)" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x - 45} y="90" width="90" height="52" rx="10" style={{ color: n.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="112" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="128" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          {i < 3 && <line x1={n.x + 47} y1="116" x2={n.x + 88} y2="116" strokeWidth="2.5" className="stroke-current text-foreground" />}
        </g>
      ))}
      <line x1="590" y1="146" x2="590" y2="196" strokeWidth="2.5" className="stroke-current text-foreground" />
      <rect x="500" y="196" width="180" height="34" rx="8" className="fill-current text-emerald-500/12" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="590" y="218" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">EFFECTOR — muscle contracts (withdraw)</text>

      <text x="16" y="222" fontSize="10" className="fill-current text-muted-foreground">Most reflexes complete within the segment — the brain only supervises. That is why a decapitated worm still crawls.</text>
    </svg>
  );
}
