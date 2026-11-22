// Units of Kp panel by delta-n. Theme-aware.
export function KpUnitsPanel({ className }: { className?: string }) {
  const rows: [string, string, string, string][] = [
    ["H2 + I2 = 2HI", "dn = 0", "dimensionless", "rgb(16 185 129)"],
    ["N2O4 = 2NO2", "dn = +1", "atm", "rgb(14 165 233)"],
    ["N2 + 3H2 = 2NH3", "dn = -2", "atm^-2", "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Units of Kp for three reactions determined by the change in gaseous moles: dimensionless, atmospheres, and inverse atmospheres squared">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Units of Kp = (pressure) raised to dn</text>
      {rows.map(([eq, dn, unit, c], i) => (
        <g key={i}>
          <rect x="40" y={48 + i * 60} width="240" height="46" rx="8" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="56" y={76 + i * 60} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{eq}</text>
          <text x="300" y={68 + i * 60} fontSize="12" fontWeight="700" className="fill-current text-foreground">{dn}</text>
          <text x="300" y={86 + i * 60} fontSize="11.5" style={{ fill: c }}>{unit}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Match R to the unit: 0.0821 with atm, 8.314 with SI - and T always in kelvin</text>
    </svg>
  );
}
