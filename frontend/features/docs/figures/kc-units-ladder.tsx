// Units of Kc ladder by delta-n. Theme-aware.
export function KcUnitsLadder({ className }: { className?: string }) {
  const rows: [string, string, string, string][] = [
    ["H2 + I2 = 2HI", "dn = 2 - 2 = 0", "dimensionless", "rgb(16 185 129)"],
    ["N2O4 = 2NO2", "dn = 2 - 1 = +1", "mol/L", "rgb(14 165 233)"],
    ["N2 + 3H2 = 2NH3", "dn = 2 - 4 = -2", "(mol/L)^-2 = L^2/mol^2", "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Units of Kc for three reactions determined by the change in gaseous moles: dimensionless, mol per litre, and litres squared per mole squared">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Units of Kc = (mol/L) raised to dn</text>
      {rows.map(([eq, dn, unit, c], i) => (
        <g key={i}>
          <rect x="40" y={48 + i * 60} width="230" height="46" rx="8" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="56" y={76 + i * 60} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{eq}</text>
          <text x="290" y={68 + i * 60} fontSize="12" fontWeight="700" className="fill-current text-foreground">{dn}</text>
          <text x="290" y={86 + i * 60} fontSize="11" style={{ fill: c }}>{unit}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Count only the gases - the mole change writes the units</text>
    </svg>
  );
}
