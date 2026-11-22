// Nitrogenase vs Haber comparison. Theme-aware.
export function FixationVsHaber({ className }: { className?: string }) {
  const cols: [string, string[], string][] = [
    ["nitrogenase enzyme", ["room temp, 1 atm", "8 e⁻, 16 ATP per NH₃", "slow but free (solar-driven)"], "rgb(16 185 129)"],
    ["Haber process", ["450–500 °C, 200–1000 atm", "Fe catalyst, recycled N₂/H₂", "industrial, energy-hungry"], "rgb(59 130 246)"],
  ];
  return (
    <svg viewBox="0 0 660 270" className={className} role="img" aria-label="Comparison of biological nitrogen fixation by nitrogenase with the industrial Haber process">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Same reaction, two engineering styles</text>
      {cols.map(([t, lines, c], i) => (
        <g key={i}>
          <rect x={50 + i * 300} y="50" width="260" height="140" rx="10" className="fill-current" style={{ color: c }} opacity="0.13" />
          <text x={180 + i * 300} y="78" fontSize="13" fontWeight="800" textAnchor="middle" style={{ fill: c }}>{t}</text>
          {lines.map((l, j) => (
            <text key={j} x={180 + i * 300} y={104 + j * 24} fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">{l}</text>
          ))}
        </g>
      ))}
      <text x="330" y="232" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Both crack the same 941 kJ/mol bond - biology just pays less per molecule</text>
      <text x="330" y="256" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">and never needs a pressure vessel</text>
    </svg>
  );
}
