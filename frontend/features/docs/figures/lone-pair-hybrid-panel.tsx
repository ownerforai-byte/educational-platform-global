// Lone pairs occupy sp3 hybrids: ammonia and water. Theme-aware.
export function LonePairHybridPanel({ className }: { className?: string }) {
  const cells: [string, string, string, string][] = [
    ["NH3", "3 bonds + 1 lone pair", "pyramidal", "107 degrees"],
    ["H2O", "2 bonds + 2 lone pairs", "bent", "104.5 degrees"],
  ];
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Lone pairs occupy sp3 hybrid orbitals in ammonia and water compressing bond angles to 107 and 104.5 degrees">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">sp3 hybrids can hold lone pairs too</text>
      {cells.map(([mol, occ, shape, angle], i) => (
        <g key={i}>
          <rect x={40 + i * 310} y="50" width="280" height="150" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.08" />
          <rect x={40 + i * 310} y="50" width="280" height="150" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x={180 + i * 310} y="80" fontSize="16" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{mol}</text>
          <text x={180 + i * 310} y="108" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">{occ}</text>
          <text x={180 + i * 310} y="136" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{shape}</text>
          <text x={180 + i * 310} y="162" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{angle}</text>
          <text x={180 + i * 310} y="186" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">still sp3 - four hybrids, some occupied</text>
        </g>
      ))}
      <text x="330" y="226" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Hybrid count is four; the bond count is what remains after lone pairs move in</text>
    </svg>
  );
}
