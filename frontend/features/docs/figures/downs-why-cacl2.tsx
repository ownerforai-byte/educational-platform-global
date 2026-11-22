// DownsWhyCacl2 figure. Theme-aware.
export function DownsWhyCacl2({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Temperature margin panel showing calcium chloride lowering the melting point of sodium chloride">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Why CaCl₂? A 200-degree life line</text>
      {[
        ["pure NaCl", "mp 801 °C", "rgb(239 68 68)", 70],
        ["NaCl + CaCl₂ 42:58", "mp ≈ 600 °C", "rgb(16 185 129)", 70],
      ].map(([label, v, col, x], i) => (
        <g key={label as string}>
          <rect x={x as number} y={60 + i * 55} width={(i ? 400 : 530)} height="34" rx="6" fill={col as string} opacity="0.18" />
          <text x={(x as number) + 12} y={82 + i * 55} fontSize="11" fontWeight="800" fill={col as string}>{label as string}</text>
          <text x={(x as number) + (i ? 410 : 540)} y={82 + i * 55} fontSize="11" textAnchor="end" className="fill-current text-foreground">{v as string}</text>
        </g>
      ))}
      <line x1="70" y1="180" x2="600" y2="180" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      <text x="600" y="196" fontSize="9.5" textAnchor="end" fill="rgb(239 68 68)">Na boils at 883 °C</text>
      <text x="70" y="196" fontSize="9.5" fill="rgb(59 130 246)">eutectic melt 600 °C</text>
      <text x="330" y="220" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The eutectic buys the safety margin; CaCl₂ also boosts conductivity — and Ca²⁺ is never discharged</text>
    </svg>
  );
}
