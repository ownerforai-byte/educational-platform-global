// Intermolecular force ladder: London, Debye, Keesom, hydrogen bond. Theme-aware.
export function VdwForceLadder({ className }: { className?: string }) {
  const tiers: [string, string, string][] = [
    ["London dispersion", "all molecules, grows with size", "rgb(139 92 246)"],
    ["Debye", "dipole induces dipole", "rgb(245 158 11)"],
    ["Keesom", "dipole to dipole", "rgb(14 165 233)"],
    ["Hydrogen bond", "X-H...Y with F, O, N", "rgb(16 185 129)"],
  ];
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Intermolecular force ladder from weakest London dispersion through Debye and Keesom dipole forces to strongest hydrogen bond">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The intermolecular ladder, weakest to strongest</text>
      {tiers.map(([label, note, color], i) => (
        <g key={i}>
          <rect x="60" y={52 + i * 58} width={280 + i * 90} height="44" rx="8" className="fill-current" style={{ color }} opacity="0.22" />
          <rect x="60" y={52 + i * 58} width={280 + i * 90} height="44" rx="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <text x="80" y={80 + i * 58} fontSize="13" className="fill-current text-foreground" fontWeight="800">{label}</text>
          <text x={360 + i * 90} y={80 + i * 58} fontSize="10.5" className="fill-current text-muted-foreground">{note}</text>
        </g>
      ))}
      <text x="330" y="286" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Hydrogen bonds run 5-40 kJ/mol - ten times the ordinary contacts below them</text>
    </svg>
  );
}
