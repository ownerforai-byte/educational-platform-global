/** Reflex arc path — receptor to effector. Theme-aware. */
export function ReflexArcPath({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Reflex arc pathway receptor sensory neuron CNS motor neuron effector with hot object withdrawal example and knee jerk fastest reflex">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The reflex arc — five stations, no waiting</text>

      {[
        { x: 70, t: "RECEPTOR", s: "skin senses heat" },
        { x: 220, t: "SENSORY NEURON", s: "carries signal in" },
        { x: 370, t: "CNS", s: "spinal cord decides" },
        { x: 520, t: "MOTOR NEURON", s: "carries command out" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x - 60} y="70" width="120" height="56" rx="10" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
          <text x={n.x} y="94" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="112" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          {i < 3 && <path d={`M${n.x + 62} 98 h${i === 0 ? 84 : 86}`} markerEnd="url(#arr)" strokeWidth="2.5" className="stroke-current text-violet-500" />}
        </g>
      ))}
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" className="fill-current text-violet-500" />
        </marker>
      </defs>

      <rect x="620" y="70" width="24" height="56" rx="8" className="fill-current text-rose-500/30" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="632" y="146" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">EFFECTOR (muscle pulls hand away)</text>

      <rect x="40" y="150" width="580" height="50" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="56" y="172" fontSize="8.8" className="fill-current text-foreground" fontWeight="700">Example: touch a hot object → hand withdraws automatically. Fastest reflex: knee-jerk (patellar), ~30–50 ms.</text>
      <text x="56" y="190" fontSize="8.2" className="fill-current text-muted-foreground">Why so fast? The signal never climbs to the brain — the spinal cord fires the command on its own.</text>
    </svg>
  );
}
