// Zero dipole club: symmetric molecules with polar bonds. Theme-aware.
export function ZeroDipoleClub({ className }: { className?: string }) {
  const mols: [string, string, string][] = [
    ["CO2", "linear 180", "two dipoles cancel"],
    ["BF3", "trigonal 120", "three-way cancel"],
    ["CH4", "tetrahedral", "four-way cancel"],
    ["CCl4", "tetrahedral", "four-way cancel"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Zero dipole club of carbon dioxide boron trifluoride methane and carbon tetrachloride where polar bonds cancel by symmetry">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Polar bonds, nonpolar molecules: the zero club</text>
      {mols.map(([mol, shape, why], i) => (
        <g key={i}>
          <rect x={30 + i * 158} y="50" width="140" height="150" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.10" />
          <rect x={30 + i * 158} y="50" width="140" height="150" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x={100 + i * 158} y="88" fontSize="16" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{mol}</text>
          <text x={100 + i * 158} y="120" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">{shape}</text>
          <text x={100 + i * 158} y="146" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{why}</text>
          <text x={100 + i * 158} y="180" fontSize="14" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">mu = 0</text>
        </g>
      ))}
      <text x="330" y="236" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Add the arrows as vectors - symmetry adds them to zero</text>
    </svg>
  );
}
