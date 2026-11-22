// SF6 octahedral shape with 90 degree angles. Theme-aware.
export function Sf6OctahedralShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 300" className={className} role="img" aria-label="Sulphur hexafluoride octahedral shape with six sulphur fluorine bonds at ninety degrees to each other">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">SF6: octahedral, six bonds, all 90 degrees</text>
      <circle cx="320" cy="150" r="16" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.35" />
      <text x="320" y="155" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">S</text>
      {[[320, 60], [320, 240], [210, 150], [430, 150], [250, 95], [390, 95]].map(([x, y], i) => (
        <g key={i}>
          <line x1="320" y1="150" x2={x} y2={y} stroke="currentColor" strokeWidth="2" />
          <circle cx={x} cy={y} r="12" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.25" />
          <text x={x} y={y + 4} fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">F</text>
        </g>
      ))}
      <text x="320" y="282" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Six bond pairs, zero lone pairs - sp3d2 hybridisation, nonpolar by symmetry</text>
    </svg>
  );
}
