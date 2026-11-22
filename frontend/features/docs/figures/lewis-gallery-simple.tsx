// Lewis dot gallery: water, ammonia, methane with lone pairs marked. Theme-aware.
export function LewisGallerySimple({ className }: { className?: string }) {
  const mols: [string, string, string, number][] = [
    ["H2O", "2 bonds, 2 lone pairs", "bent", 104.5],
    ["NH3", "3 bonds, 1 lone pair", "pyramidal", 107],
    ["CH4", "4 bonds, 0 lone pairs", "tetrahedral", 109.5],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Lewis dot structures of water ammonia and methane showing bond pairs lone pairs and bond angles">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Lewis gallery 1: the simple hydrides</text>
      {mols.map(([sym, desc, shape, angle], i) => (
        <g key={i}>
          <rect x={30 + i * 210} y="48" width="190" height="170" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.08" />
          <rect x={30 + i * 210} y="48" width="190" height="170" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x={125 + i * 210} y="76" fontSize="16" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{sym}</text>
          <circle cx={125 + i * 210} cy="120" r="14" className="fill-current" style={{ color: "rgb(244 63 94)" }} opacity="0.3" />
          <text x={125 + i * 210} y="125" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{sym.slice(0, 1)}</text>
          <circle cx={95 + i * 210} cy="96" r="8" className="fill-current" opacity="0.2" />
          <text x={95 + i * 210} y="100" fontSize="7" textAnchor="middle" className="fill-current text-foreground">H</text>
          <circle cx={155 + i * 210} cy="96" r="8" className="fill-current" opacity="0.2" />
          <text x={155 + i * 210} y="100" fontSize="7" textAnchor="middle" className="fill-current text-foreground">H</text>
          <line x1={113 + i * 210} y1="110" x2={101 + i * 210} y2="101" stroke="currentColor" strokeWidth="2" />
          <line x1={137 + i * 210} y1="110" x2={149 + i * 210} y2="101" stroke="currentColor" strokeWidth="2" />
          <text x={125 + i * 210} y="160" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">{desc}</text>
          <text x={125 + i * 210} y="182" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{shape}, {angle} degrees</text>
          <text x={125 + i * 210} y="204" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">dots = lone pairs on central atom</text>
        </g>
      ))}
    </svg>
  );
}
