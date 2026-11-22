// Electron budget counting panel with carbon dioxide worked example. Theme-aware.
export function ElectronBudgetPanel({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["CO2", "4 + 2 x 6", "16 electrons = 8 pairs"],
    ["NH3", "5 + 3 x 1", "8 electrons = 4 pairs"],
    ["H2O", "6 + 2 x 1", "8 electrons = 4 pairs"],
    ["O3", "3 x 6 + 0", "18 electrons = 9 pairs"],
    ["CO3 2-", "4 + 3 x 6 + 2", "24 electrons = 12 pairs"],
  ];
  return (
    <svg viewBox="0 0 640 320" className={className} role="img" aria-label="Electron budget counting table for carbon dioxide ammonia water ozone and carbonate ion showing valence electron sums">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Step one is always the electron budget</text>
      {rows.map(([mol, sum, out], i) => (
        <g key={i}>
          <rect x="30" y={46 + i * 54} width="150" height="44" rx="8" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.14" />
          <text x="105" y={74 + i * 54} fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{mol}</text>
          <text x="220" y={74 + i * 54} fontSize="12" className="fill-current text-foreground" fontWeight="700">{sum}</text>
          <text x="400" y={74 + i * 54} fontSize="11" className="fill-current text-muted-foreground">{out}</text>
        </g>
      ))}
      <text x="320" y="308" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Anions add electrons; cations subtract them</text>
    </svg>
  );
}
