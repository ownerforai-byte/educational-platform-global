// Physical vs chemical equilibrium side-by-side. Theme-aware.
export function PhysicalVsChemicalEq({ className }: { className?: string }) {
  const cols: [string, string, string, string][] = [
    ["Physical equilibrium", "state changes only", "H2O(l) = H2O(g)  -  evaporation = condensation", "rgb(14 165 233)"],
    ["Chemical equilibrium", "new substances form", "CaCO3(s) = CaO(s) + CO2(g)  -  decomposition = recombination", "rgb(16 185 129)"],
  ];
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Physical equilibrium changes state without new substances while chemical equilibrium forms new substances">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Same tie, different trades</text>
      {cols.map(([title, sub, eq, color], i) => (
        <g key={i}>
          <rect x="30" y={46 + i * 88} width="600" height="76" rx="10" className="fill-current" style={{ color }} opacity="0.14" />
          <rect x="30" y={46 + i * 88} width="600" height="76" rx="10" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ color }} />
          <text x="50" y={74 + i * 88} fontSize="14" fontWeight="800" className="fill-current text-foreground">{title}</text>
          <text x="50" y={94 + i * 88} fontSize="11" className="fill-current text-muted-foreground">{sub}</text>
          <text x="50" y={112 + i * 88} fontSize="12.5" fontWeight="700" style={{ fill: color }}>{eq}</text>
        </g>
      ))}
      <text x="330" y="228" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Physical: identity kept. Chemical: identity changed - both balance at equal rates</text>
    </svg>
  );
}
