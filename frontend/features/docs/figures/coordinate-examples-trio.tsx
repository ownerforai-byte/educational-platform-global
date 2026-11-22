// Coordinate bond examples: ammonium, hydronium, ammonia-borane adduct, ozone. Theme-aware.
export function CoordinateExamplesTrio({ className }: { className?: string }) {
  const cells: [string, string, string][] = [
    ["NH4&#8314;", "N donates to H&#8314;", "tetrahedral, all bonds equal"],
    ["H3O&#8314;", "O donates to H&#8314;", "pyramidal, acid in water"],
    ["NH3&#183;BF3", "N donates to empty B", "Lewis acid-base adduct"],
  ];
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Coordinate bond examples ammonium hydronium and ammonia boron trifluoride adduct with donor and acceptor roles">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The coordinate-bond gallery</text>
      {cells.map(([sym, move, note], i) => (
        <g key={i}>
          <rect x={30 + i * 210} y="50" width="190" height="150" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.10" />
          <rect x={30 + i * 210} y="50" width="190" height="150" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x={125 + i * 210} y="90" fontSize="18" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{sym}</text>
          <text x={125 + i * 210} y="122" fontSize="11" textAnchor="middle" className="fill-current text-foreground">{move}</text>
          <text x={125 + i * 210} y="146" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">{note}</text>
          <text x={125 + i * 210} y="180" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">donor &#8594; acceptor</text>
        </g>
      ))}
      <text x="330" y="232" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Ozone's odd structure also leans on a coordinate-style bond</text>
    </svg>
  );
}
