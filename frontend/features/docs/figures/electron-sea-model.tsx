// Electron sea model: cation lattice in delocalised electrons. Theme-aware.
export function ElectronSeaModel({ className }: { className?: string }) {
  const cations: [number, number][] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) cations.push([110 + c * 80, 90 + r * 70]);
  return (
    <svg viewBox="0 0 660 320" className={className} role="img" aria-label="Electron sea model of metallic bonding with fixed metal cations immersed in a cloud of delocalised valence electrons">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The electron sea: cations in a mobile cloud</text>
      <rect x="70" y="55" width="520" height="220" rx="14" className="fill-current" style={{ color: "rgb(139 92 246)" }} opacity="0.10" />
      {cations.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="16" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.3" />
          <text x={x} y={y + 4} fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">M+</text>
        </g>
      ))}
      {[[140, 80], [260, 130], [400, 90], [520, 150], [180, 200], [330, 230], [480, 240], [100, 150]].map(([x, y], i) => (
        <circle key={"e" + i} cx={x} cy={y} r="4" className="fill-current" style={{ color: "rgb(139 92 246)" }} opacity="0.7" />
      ))}
      <text x="330" y="300" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">purple dots: delocalised valence electrons - collective property of the whole crystal</text>
    </svg>
  );
}
