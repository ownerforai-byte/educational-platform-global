// NF3 versus NH3 dipole direction contrast. Theme-aware.
export function Nf3Nh3DipoleContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 680 280" className={className} role="img" aria-label="Contrast of ammonia 1.47 debye where bond dipoles reinforce the lone pair with nitrogen trifluoride 0.24 debye where they oppose it">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Same shape, opposite dipole logic</text>
      <g>
        <text x="170" y="70" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NH3 - 1.47 D</text>
        <circle cx="170" cy="130" r="16" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.3" />
        <text x="170" y="135" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">N</text>
        {[[110, 170], [230, 170], [170, 200]].map(([x, y], i) => (
          <g key={i}>
            <line x1="170" y1="130" x2={x} y2={y} stroke="currentColor" strokeWidth="2" />
            <circle cx={x} cy={y} r="9" className="fill-current" opacity="0.2" />
            <text x={x} y={y + 3.5} fontSize="8" textAnchor="middle" className="fill-current text-foreground">H</text>
          </g>
        ))}
        <text x="170" y="240" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">N-H dipoles point up, adding to the lone pair</text>
      </g>
      <g>
        <text x="510" y="70" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NF3 - 0.24 D</text>
        <circle cx="510" cy="130" r="16" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.3" />
        <text x="510" y="135" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">N</text>
        {[[450, 170], [570, 170], [510, 200]].map(([x, y], i) => (
          <g key={i}>
            <line x1="510" y1="130" x2={x} y2={y} stroke="currentColor" strokeWidth="2" />
            <circle cx={x} cy={y} r="9" className="fill-current" opacity="0.2" />
            <text x={x} y={y + 3.5} fontSize="8" textAnchor="middle" className="fill-current text-foreground">F</text>
          </g>
        ))}
        <text x="510" y="240" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">N-F dipoles point down, fighting the lone pair</text>
      </g>
      <text x="340" y="266" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Direction matters as much as shape - vector addition decides</text>
    </svg>
  );
}
