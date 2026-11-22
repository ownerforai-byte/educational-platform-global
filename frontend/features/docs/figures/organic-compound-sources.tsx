// OrganicCompoundSources figure. Theme-aware.
export function OrganicCompoundSources({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Sources of organic compounds from living things coal petroleum and synthesis">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Where organic compounds come from</text>
      {[
        ["plants", "carbohydrates, oils, dyes", "rgb(16 185 129)", 40, 55],
        ["animals", "proteins, fats, urea", "rgb(239 68 68)", 240, 55],
        ["coal tar", "benzene, phenol, dyes", "rgb(120 113 108)", 440, 55],
        ["petroleum + natural gas", "the great industrial feedstock", "rgb(59 130 246)", 40, 125],
        ["laboratory synthesis", "built from simple molecules upward", "rgb(139 92 246)", 240, 125],
        ["fermentation", "ethanol, antibiotics", "rgb(245 158 11)", 440, 125],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 24} fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 44} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">After Wöhler, synthesis rivalled extraction — most organics are now made, not gathered</text>
    </svg>
  );
}
