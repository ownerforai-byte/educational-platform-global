// Particles per unit cell: simple, bcc, fcc. Theme-aware.
export function CellCountTrio({ className }: { className?: string }) {
  const cells: [string, string, string, string][] = [
    ["simple cubic", "8 × 1/8", "1", "rgb(148 163 184)"],
    ["body-centred", "8 × 1/8 + 1", "2", "rgb(59 130 246)"],
    ["face-centred", "8 × 1/8 + 6 × 1/2", "4", "rgb(16 185 129)"],
  ];
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Particle count per unit cell for simple cubic body-centred and face-centred lattices">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Particles per cell: 1, 2, 4</text>
      {cells.map(([n, eq, total, c], i) => {
        const x = 80 + i * 200;
        return (
          <g key={i}>
            <rect x={x} y="56" width="120" height="100" rx="8" fill="none" stroke={c} strokeWidth="2" />
            {i === 1 && <circle cx={x + 60} cy="106" r="7" className="fill-current" style={{ color: c }} opacity="0.9" />}
            {i === 2 && [0, 1, 2, 3].map((k) => (
              <circle key={k} cx={x + (k % 2 ? 120 : 0)} cy={k < 2 ? 56 : 156} r="6" className="fill-current" style={{ color: c }} opacity="0.9" />
            ))}
            {[0, 1, 2, 3].map((k) => (
              <circle key={`c${k}`} cx={x + (k % 2 ? 120 : 0)} cy={k < 2 ? 56 : 156} r="5" className="fill-current" style={{ color: c }} opacity="0.55" />
            ))}
            <text x={x + 60} y="182" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{n}</text>
            <text x={x + 60} y="200" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">{eq} = {total}</text>
          </g>
        );
      })}
      <text x="330" y="226" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">One number that every solid-state numerical starts from</text>
    </svg>
  );
}
