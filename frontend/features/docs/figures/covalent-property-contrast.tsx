// Diamond versus iodine: giant covalent versus molecular solid. Theme-aware.
export function CovalentPropertyContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 680 300" className={className} role="img" aria-label="Contrast of diamond giant covalent network with iodine molecular solid explaining melting point difference">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Both covalent - wildly different melting points</text>
      <rect x="24" y="46" width="300" height="220" rx="12" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.08" />
      <rect x="24" y="46" width="300" height="220" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="174" y="74" fontSize="14" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Diamond - giant network</text>
      <g stroke="currentColor" strokeWidth="1.6">
        <line x1="120" y1="120" x2="174" y2="100" />
        <line x1="174" y1="100" x2="228" y2="120" />
        <line x1="120" y1="120" x2="174" y2="150" />
        <line x1="228" y1="120" x2="174" y2="150" />
        <line x1="174" y1="150" x2="174" y2="196" />
      </g>
      {[[120, 120], [174, 100], [228, 120], [174, 150], [174, 196]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="8" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.35" />
      ))}
      <text x="174" y="238" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">melts at 3550 C - must break covalent bonds</text>
      <rect x="356" y="46" width="300" height="220" rx="12" className="fill-current" style={{ color: "rgb(139 92 246)" }} opacity="0.08" />
      <rect x="356" y="46" width="300" height="220" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="506" y="74" fontSize="14" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Iodine - molecular solid</text>
      {[[420, 110], [470, 110], [540, 110], [590, 110], [420, 170], [470, 170], [540, 170], [590, 170]].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx="16" ry="10" className="fill-current" style={{ color: "rgb(139 92 246)" }} opacity="0.3" />
          <text x={x} y={y + 3} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">I2</text>
        </g>
      ))}
      <text x="506" y="238" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">melts at 114 C - only weak forces between I2 units</text>
    </svg>
  );
}
