// CarbonCompoundExclusions figure. Theme-aware.
export function CarbonCompoundExclusions({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Carbon compounds excluded from organic chemistry by convention">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Carbon-containing but NOT organic</text>
      {[
        ["carbonates", "CO₃²⁻ (CaCO₃)", "rgb(59 130 246)", 40, 55],
        ["bicarbonates", "HCO₃⁻ (NaHCO₃)", "rgb(59 130 246)", 240, 55],
        ["carbides", "CaC₂, SiC", "rgb(239 68 68)", 440, 55],
        ["cyanides", "CN⁻ (KCN)", "rgb(139 92 246)", 40, 125],
        ["carbon monoxide", "CO", "rgb(245 158 11)", 240, 125],
        ["carbon dioxide", "CO₂", "rgb(245 158 11)", 440, 125],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 24} fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 44} fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Salt-like or oxide chemistry, no C–H framework — convention files them under inorganic</text>
    </svg>
  );
}
