export function WallCollisionPressure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 240" role="img" aria-label="Pressure as wall collision momentum transfer" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Pressure = Wall Collision Drumbeat</text>
      <rect x="60" y="45" width="440" height="150" rx="10" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 4" />
      {[
        { x: 110, y: 80, dx: 1, dy: 1 }, { x: 200, y: 60, dx: -1, dy: 1 },
        { x: 300, y: 110, dx: 1, dy: -1 }, { x: 420, y: 75, dx: -1, dy: 1 },
        { x: 150, y: 160, dx: 1, dy: -1 }, { x: 350, y: 165, dx: -1, dy: -1 },
        { x: 480, y: 140, dx: -1, dy: -1 }, { x: 250, y: 130, dx: 1, dy: 1 },
      ].map((m, i) => (
        <g key={i}>
          <circle cx={m.x} cy={m.y} r="7" className="fill-current opacity-60" />
          <line x1={m.x} y1={m.y} x2={m.x + m.dx * 22} y2={m.y + m.dy * 22} stroke="currentColor" strokeWidth="1.5" className="opacity-50" markerEnd="url(#arrK)" />
        </g>
      ))}
      <defs>
        <marker id="arrK" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="currentColor" className="opacity-50" /></marker>
      </defs>
      <g transform="translate(70, 205)">
        <text fontSize="11.5" fill="currentColor">wall impact transfers momentum 2mv</text>
      </g>
      <text x="490" y="215" textAnchor="end" fontSize="11" className="fill-current opacity-70">billions per second = steady P</text>
    </svg>
  );
}
