// Delta-n sign table with examples. Theme-aware.
export function DnSignTable({ className }: { className?: string }) {
  const rows: [string, string, string, string][] = [
    ["dn = 0", "Kp = Kc", "H2 + I2 = 2HI", "rgb(16 185 129)"],
    ["dn = +1", "Kp = Kc(RT) > Kc", "N2O4 = 2NO2 ; PCl5 = PCl3 + Cl2", "rgb(14 165 233)"],
    ["dn = -2", "Kp = Kc/(RT)^2 < Kc", "N2 + 3H2 = 2NH3", "rgb(239 68 68)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Delta n sign table showing when Kp equals, exceeds or falls below Kc with example reactions">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">One sign decides the relationship</text>
      {rows.map(([dn, rel, ex, c], i) => (
        <g key={i}>
          <rect x="40" y={48 + i * 62} width="130" height="50" rx="9" className="fill-current" style={{ color: c }} opacity="0.2" />
          <text x="105" y={79 + i * 62} fontSize="14" fontWeight="800" textAnchor="middle" style={{ fill: c }}>{dn}</text>
          <text x="190" y={68 + i * 62} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{rel}</text>
          <text x="190" y={88 + i * 62} fontSize="10.5" className="fill-current text-muted-foreground">{ex}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Count gas moles first - solids and liquids never vote</text>
    </svg>
  );
}
