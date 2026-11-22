// SodiumUsesMap figure. Theme-aware.
export function SodiumUsesMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Uses of sodium metal mapped to the property that enables each">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Sodium at work</text>
      {[
        ["Na vapour lamp", "589 nm D-lines — the amber street light", "rgb(250 204 21)", 30, 55],
        ["Reactor coolant", "liquid metal, huge heat capacity, mp 98 °C", "rgb(239 68 68)", 340, 55],
        ["Reducing agent", "Ti from TiCl₄, Zr from ZrCl₄", "rgb(59 130 246)", 30, 115],
        ["Na₂O₂ / NaOH source", "peroxide bleach; chlor-alkali feedstock", "rgb(16 185 129)", 340, 115],
        ["Lab desiccant", "dries ethers — reacts, not adsorbs", "rgb(139 92 246)", 30, 175],
        ["NaPb alloy", "antiknock lead additive precursor", "rgb(148 163 184)", 340, 175],
      ].map(([u, why, col, x, y]) => (
        <g key={u as string}>
          <rect x={x as number} y={y as number} width="290" height="48" rx="8" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1" />
          <text x={(x as number) + 12} y={(y as number) + 19} fontSize="10.5" fontWeight="800" fill={col as string}>{u as string}</text>
          <text x={(x as number) + 12} y={(y as number) + 37} fontSize="9.5" className="fill-current text-muted-foreground">{why as string}</text>
        </g>
      ))}
    </svg>
  );
}
