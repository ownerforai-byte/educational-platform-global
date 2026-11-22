// Water dissolving an ionic crystal by hydration of ions. Theme-aware.
export function IonicSolubilityPanel({ className }: { className?: string }) {
  const waters: [number, number][] = [[70, 70], [110, 60], [60, 110], [150, 80], [90, 140], [140, 130], [200, 70], [190, 130]];
  return (
    <svg viewBox="0 0 640 280" className={className} role="img" aria-label="Water molecules hydrating sodium and chloride ions as an ionic crystal dissolves through ion dipole attraction">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Why water dissolves salt: ion-dipole attraction</text>
      <rect x="300" y="90" width="120" height="100" rx="12" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.15" />
      <text x="360" y="130" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NaCl crystal</text>
      <text x="360" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">lattice breaks apart</text>
      {waters.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.3" />
          <text x={x} y={y + 3.5} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">H2O</text>
        </g>
      ))}
      <text x="60" y="200" fontSize="11" className="fill-current text-muted-foreground">O end (delta minus) turns to Na+;</text>
      <text x="60" y="218" fontSize="11" className="fill-current text-muted-foreground">H ends (delta plus) turn to Cl-.</text>
      <text x="60" y="244" fontSize="11" className="fill-current text-foreground">Hydration energy pays the lattice bill</text>
      <text x="470" y="220" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Hexane cannot offer this -</text>
      <text x="470" y="238" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">so salt will not dissolve in it</text>
    </svg>
  );
}
