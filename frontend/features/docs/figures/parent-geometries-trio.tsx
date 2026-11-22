// Three parent geometries: linear, trigonal planar, tetrahedral. Theme-aware.
export function ParentGeometriesTrio({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 680 260" className={className} role="img" aria-label="Parent electron geometries linear with two domains trigonal planar with three and tetrahedral with four domains and their bond angles">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Parent geometries: where the domains sit</text>
      <g>
        <circle cx="120" cy="120" r="10" className="fill-current" opacity="0.3" />
        <line x1="120" y1="120" x2="70" y2="120" stroke="currentColor" strokeWidth="2" />
        <line x1="120" y1="120" x2="170" y2="120" stroke="currentColor" strokeWidth="2" />
        <text x="120" y="160" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Linear - 2 domains</text>
        <text x="120" y="180" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">180 degrees</text>
      </g>
      <g>
        <circle cx="340" cy="130" r="10" className="fill-current" opacity="0.3" />
        {[[290, 100], [390, 100], [340, 185]].map(([x, y], i) => (
          <g key={i}>
            <line x1="340" y1="130" x2={x} y2={y} stroke="currentColor" strokeWidth="2" />
            <circle cx={x} cy={y} r="7" className="fill-current" opacity="0.2" />
          </g>
        ))}
        <text x="340" y="215" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Trigonal planar - 3 domains</text>
        <text x="340" y="235" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">120 degrees</text>
      </g>
      <g>
        <circle cx="570" cy="120" r="10" className="fill-current" opacity="0.3" />
        {[[520, 95], [620, 95], [545, 170], [595, 170]].map(([x, y], i) => (
          <g key={i}>
            <line x1="570" y1="120" x2={x} y2={y} stroke="currentColor" strokeWidth="2" />
            <circle cx={x} cy={y} r="7" className="fill-current" opacity="0.2" />
          </g>
        ))}
        <text x="570" y="200" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Tetrahedral - 4 domains</text>
        <text x="570" y="220" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">109.5 degrees</text>
      </g>
    </svg>
  );
}
