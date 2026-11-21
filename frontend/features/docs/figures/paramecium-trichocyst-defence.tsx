/** Paramecium trichocyst defence — barbed threads. Well-detailed. Theme-aware. */
export function ParameciumTrichocystDefence({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Paramecium trichocyst defence barbed threads embedded pellicle fired on irritation anchor predator deterrent spindle shaped bodies">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Trichocysts — the loaded harpoons</text>
      {/* embedded state */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EMBEDDED IN THE PELLICLE</text>
      <ellipse cx="195" cy="140" rx="110" ry="60" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[[120, 110], [170, 100], [220, 106], [262, 122], [140, 160], [200, 168], [250, 158]].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx="4" ry="9" className="fill-current" style={{ color: "rgb(2 132 199 / 0.6)" }} transform={`rotate(${x < 195 ? -20 : 20} ${x} ${y})`} />
        </g>
      ))}
      <text x="195" y="216" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">spindle-shaped bodies parked just under the surface</text>
      {/* fired state */}
      <rect x="390" y="44" width="300" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FIRED ON IRRITATION</text>
      {[[440, 120], [520, 140], [600, 110]].map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={x + 40} y2={y + 8} className="stroke-current" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          {[[x + 12, y + 2], [x + 22, y + 4], [x + 32, y + 6]].map(([bx, by], j) => (
            <path key={j} d={`M${bx} ${by} l3 -5 l3 5`} className="fill-none stroke-current" strokeWidth="1" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          ))}
        </g>
      ))}
      <text x="540" y="192" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">long barbed threads shoot out in milliseconds</text>
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Roles: anchor the cell during feeding, deter predators like Didinium, and tangle attackers long enough to escape.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: trichocysts = defence organelles of Paramecium — barbed threads fired from the pellicle.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">A single cell carries thousands, ready to fire on contact.</text>
    </svg>
  );
}
