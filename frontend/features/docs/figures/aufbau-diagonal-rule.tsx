// Aufbau diagonal filling rule chart. Theme-aware.
export function AufbauDiagonalRule({ className }: { className?: string }) {
  const cells: [string, number, number][] = [
    ["1s", 90, 70], ["2s", 150, 70], ["2p", 210, 70], ["2p", 270, 70], ["2p", 330, 70],
    ["3s", 150, 120], ["3p", 210, 120], ["3p", 270, 120], ["3p", 330, 120],
    ["3d", 210, 170], ["3d", 270, 170], ["3d", 330, 170], ["3d", 390, 170], ["3d", 450, 170],
    ["4s", 210, 220], ["4p", 270, 220], ["4p", 330, 220], ["4p", 390, 220],
  ];
  return (
    <svg viewBox="0 0 560 280" className={className} role="img" aria-label="Aufbau diagonal rule chart filling orbitals in order of increasing energy one s two s two p three s three p four s three d four p">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Aufbau principle — fill lowest energy first</text>
      {cells.map(([label, x, y], i) => (
        <g key={i}>
          <rect x={x - 22} y={y - 14} width="44" height="28" rx="5" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x={x} y={y + 4} fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{label}</text>
        </g>
      ))}
      {[[68, 84, 128, 84], [128, 84, 148, 134], [148, 134, 208, 134], [208, 134, 228, 184], [228, 184, 288, 184], [288, 184, 208, 234], [208, 234, 148, 184]].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-current text-amber-500" strokeWidth="1.6" strokeDasharray="4 3" style={{ color: "rgb(245 158 11 / 0.8)" }} markerEnd="url(#aufarr)" />
      ))}
      <defs>
        <marker id="aufarr" markerWidth="6" markerHeight="6" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" className="fill-current" /></marker>
      </defs>
      <text x="500" y="70" fontSize="8.6" className="fill-current text-muted-foreground">Follow the arrows:</text>
      <text x="500" y="86" fontSize="8.6" className="fill-current text-muted-foreground">1s → 2s → 2p →</text>
      <text x="500" y="102" fontSize="8.6" className="fill-current text-muted-foreground">3s → 3p → 4s →</text>
      <text x="500" y="118" fontSize="8.6" className="fill-current text-muted-foreground">3d → 4p …</text>
      <text x="280" y="262" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">The 4s-before-3d crossing is the single most-tested detail — it also explains the first-row transition elements.</text>
    </svg>
  );
}
