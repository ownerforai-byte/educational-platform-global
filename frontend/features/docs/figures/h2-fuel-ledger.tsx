// Hydrogen fuel energy ledger vs petrol. Theme-aware.
export function H2FuelLedger({ className }: { className?: string }) {
  const bars: [string, number, string][] = [
    ["hydrogen", 142, "rgb(16 185 129)"],
    ["petrol", 48, "rgb(239 68 68)"],
    ["coal", 30, "rgb(148 163 184)"],
  ];
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Bar chart of energy per gram: hydrogen 142, petrol 48, coal 30 kilojoules per gram">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Energy per gram (kJ/g)</text>
      {bars.map(([label, v, c], i) => (
        <g key={i}>
          <text x="70" y={72 + i * 52} fontSize="12.5" fontWeight="800" textAnchor="end" className="fill-current text-foreground">{label}</text>
          <rect x="85" y={56 + i * 52} width={v * 3.6} height="30" rx="6" className="fill-current" style={{ color: c }} opacity="0.7" />
          <text x={95 + v * 3.6} y={76 + i * 52} fontSize="12.5" fontWeight="800" style={{ fill: c }}>{v}</text>
        </g>
      ))}
      <text x="330" y="228" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">2H₂ + O₂ → 2H₂O, ΔH = −286 kJ/mol - and the only exhaust is steam</text>
    </svg>
  );
}
