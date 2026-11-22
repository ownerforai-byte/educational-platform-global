// Pressure effect by gas mole count. Theme-aware.
export function PressureMoleCount({ className }: { className?: string }) {
  const rows: [string, string, string, string][] = [
    ["N2 + 3H2 = 2NH3", "4 -> 2 gas moles", "P up: forward (more NH3)", "rgb(16 185 129)"],
    ["N2O4 = 2NO2", "1 -> 2 gas moles", "P up: backward (less NO2)", "rgb(239 68 68)"],
    ["H2 + I2 = 2HI", "2 -> 2 gas moles", "P up: no shift", "rgb(148 163 184)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Pressure effects on three equilibria decided by the change in gas moles: forward for ammonia synthesis, backward for nitrogen dioxide, none for hydrogen iodide">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Squeeze test: count the gas moles</text>
      {rows.map(([eq, moles, eff, c], i) => (
        <g key={i}>
          <rect x="40" y={48 + i * 62} width="280" height="50" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="56" y={70 + i * 62} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{eq}</text>
          <text x="56" y={89 + i * 62} fontSize="11" className="fill-current text-muted-foreground">{moles}</text>
          <text x="340" y={79 + i * 62} fontSize="12.5" fontWeight="800" style={{ fill: c }}>{eff}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Fewer moles wins under pressure - equal moles means immunity</text>
    </svg>
  );
}
