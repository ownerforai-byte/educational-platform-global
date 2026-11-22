// Hybrid count drill: domains to hybrid type. Theme-aware.
export function HybridCountDrill({ className }: { className?: string }) {
  const rows: [string, string, string, string][] = [
    ["BeCl2", "2 domains", "sp", "linear 180"],
    ["BF3", "3 domains", "sp2", "trigonal 120"],
    ["CH4", "4 domains", "sp3", "tetrahedral 109.5"],
    ["C2H4 carbon", "3 domains + p", "sp2", "planar 120"],
    ["C2H2 carbon", "2 domains + 2p", "sp", "linear 180"],
  ];
  return (
    <svg viewBox="0 0 680 340" className={className} role="img" aria-label="Hybrid count drill table converting electron domain counts for beryllium chloride boron trifluoride methane ethene and ethyne into hybridisation and shape">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Drill: count domains, name the hybrid</text>
      {rows.map(([mol, dom, hyb, shape], i) => (
        <g key={i}>
          <rect x="24" y={46 + i * 56} width="632" height="46" rx="8" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.08" />
          <rect x="24" y={46 + i * 56} width="632" height="46" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <text x="40" y={66 + i * 56} fontSize="12.5" className="fill-current text-foreground" fontWeight="800">{mol}</text>
          <text x="180" y={66 + i * 56} fontSize="11" className="fill-current text-muted-foreground">{dom}</text>
          <text x="360" y={66 + i * 56} fontSize="12.5" className="fill-current text-foreground" fontWeight="800">{hyb}</text>
          <text x="480" y={66 + i * 56} fontSize="11" className="fill-current text-muted-foreground">{shape}</text>
        </g>
      ))}
      <text x="340" y="330" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">VSEPR counts, hybridisation explains - same number, two languages</text>
    </svg>
  );
}
