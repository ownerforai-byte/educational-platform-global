// Kp-Kc equality cases drill. Theme-aware.
export function KpKcEqualityCases({ className }: { className?: string }) {
  const cases: [string, string, string][] = [
    ["H2 + I2 = 2HI", "dn = 0", "Kp = Kc"],
    ["2SO2 + O2 = 2SO3", "dn = 3 - 2 = -1", "Kp = Kc/(RT)"],
    ["CaCO3(s) = CaO(s) + CO2(g)", "dn = +1 (gases only)", "Kp = Kc(RT)"],
    ["PCl5 = PCl3 + Cl2", "dn = +1", "Kp = Kc(RT)"],
  ];
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Four reactions classified by delta n showing whether Kp equals Kc or differs by a factor of RT">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Spot the dn, write the answer</text>
      {cases.map(([eq, dn, rel], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 52} width="330" height="40" rx="8" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.12" />
          <text x="56" y={71 + i * 52} fontSize="12" fontWeight="800" className="fill-current text-foreground">{eq}</text>
          <text x="390" y={62 + i * 52} fontSize="11" className="fill-current text-muted-foreground">{dn}</text>
          <text x="390" y={80 + i * 52} fontSize="12.5" fontWeight="800" fill="rgb(16 185 129)">{rel}</text>
        </g>
      ))}
      <text x="330" y="268" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Four readings, four one-line answers - the drill that never misses</text>
    </svg>
  );
}
