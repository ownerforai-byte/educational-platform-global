// Na2co3UsesMap figure. Theme-aware.
export function Na2co3UsesMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Uses of sodium carbonate led by the glass industry">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Na₂CO₃ at work</text>
      <rect x="40" y="55" width="580" height="52" rx="10" fill="rgb(59 130 246)" opacity="0.12" stroke="rgb(59 130 246)" />
      <text x="330" y="78" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">GLASS — the biggest customer (~half of world output)</text>
      <text x="330" y="98" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">SiO₂ + Na₂CO₃ melt — every window pane carries its sodium</text>
      {[
        ["Washing soda", "cleaning, degreasing", "rgb(16 185 129)", 40, 125],
        ["Water softening", "precipitates Ca²⁺ Mg²⁺", "rgb(245 158 11)", 235, 125],
        ["Baking soda feed", "→ NaHCO₃ (CO₂ + H₂O)", "rgb(239 68 68)", 430, 125],
        ["Paper", "pulping aid", "rgb(148 163 184)", 40, 185],
        ["Primary standard", "anhydrous — weigh it, trust it", "rgb(139 92 246)", 235, 185],
        ["Dyeing / textiles", "fixes dyes, adjusts pH", "rgb(59 130 246)", 430, 185],
      ].map(([u, why, col, x, y]) => (
        <g key={u as string}>
          <rect x={x as number} y={y as number} width="180" height="44" rx="8" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1" />
          <text x={(x as number) + 90} y={(y as number) + 18} fontSize="10" fontWeight="800" textAnchor="middle" fill={col as string}>{u as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 34} fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{why as string}</text>
        </g>
      ))}
    </svg>
  );
}
