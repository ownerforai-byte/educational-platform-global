/** Nepal forest cover recovery curve. Theme-aware. */
export function ForestCoverRecovery({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Nepal forest cover recovery from about 35 percent in the 1960s to under 30 percent by the 1990s then recovery to about 45 percent by the 2010s driven by community forestry">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Nepal's forest cover — a rare recovery story</text>
      <line x1="80" y1="160" x2="620" y2="160" strokeWidth="2" className="stroke-current text-muted-foreground" />
      <path d="M100 100 L260 130 L420 70 L580 62" className="fill-none stroke-current text-emerald-600" strokeWidth="3" />
      {[
        { x: 100, y: 100, t: "1960s", s: "~35%" },
        { x: 260, y: 130, t: "1990s", s: "under 30%" },
        { x: 420, y: 70, t: "2010s", s: "~45%" },
      ].map((p) => (
        <g key={p.t}>
          <circle cx={p.x} cy={p.y} r="5" className="fill-current text-emerald-600" />
          <text x={p.x} y={p.y - 12} fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{p.s}</text>
          <text x={p.x} y="178" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">{p.t}</text>
        </g>
      ))}
      <text x="16" y="200" fontSize="8.4" className="fill-current text-muted-foreground">The driver of recovery: community forestry — over 22,000 CFUGs managing ~2.3 million hectares.</text>
    </svg>
  );
}
