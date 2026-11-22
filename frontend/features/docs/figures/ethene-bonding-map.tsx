// Ethene bonding map: five sigma plus one pi, planar. Theme-aware.
export function EtheneBondingMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Ethene bonding map with two sp2 carbons five sigma bonds in the plane and one pi cloud above and below giving 120 degree angles">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Ethene: 5 sigma + 1 pi, all in one plane</text>
      <circle cx="280" cy="140" r="15" className="fill-current" opacity="0.3" />
      <text x="280" y="145" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">C</text>
      <circle cx="380" cy="140" r="15" className="fill-current" opacity="0.3" />
      <text x="380" y="145" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">C</text>
      <line x1="295" y1="140" x2="365" y2="140" stroke="currentColor" strokeWidth="3" />
      {[[230, 100], [230, 180], [430, 100], [430, 180]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" className="fill-current" opacity="0.2" />
          <text x={x} y={y + 3.5} fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">H</text>
        </g>
      ))}
      <line x1="272" y1="128" x2="242" y2="106" stroke="currentColor" strokeWidth="2" />
      <line x1="272" y1="152" x2="242" y2="174" stroke="currentColor" strokeWidth="2" />
      <line x1="388" y1="128" x2="418" y2="106" stroke="currentColor" strokeWidth="2" />
      <line x1="388" y1="152" x2="418" y2="174" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="330" cy="112" rx="55" ry="14" className="fill-current" style={{ color: "rgb(139 92 246)" }} opacity="0.25" />
      <ellipse cx="330" cy="168" rx="55" ry="14" className="fill-current" style={{ color: "rgb(139 92 246)" }} opacity="0.25" />
      <text x="330" y="216" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">purple: pi cloud from sideways p overlap (above and below)</text>
      <text x="330" y="242" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">sp2 carbons, H-C-H = 120 degrees, planar (NEB 2023)</text>
    </svg>
  );
}
