// ConcentrationThreeWays figure. Theme-aware.
export function ConcentrationThreeWays({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Three ore concentration methods gravity washing magnetic separation and froth flotation">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Concentration — three ways to lose the gangue</text>
      {[
        ["GRAVITY / WASH", "water carries the light gangue away", "oxides, gold", "rgb(59 130 246)", 30],
        ["MAGNETIC", "magnet belt lifts Fe₃O₄ from silica", "magnetite ores", "rgb(239 68 68)", 250],
        ["FROTH FLOTATION", "oil-wetted sulphides ride bubbles", "ZnS PbS CuFeS₂", "rgb(16 185 129)", 470],
      ].map(([tag, how, ores, col, x]) => (
        <g key={tag as string}>
          <rect x={x as number} y="55" width="180" height="115" rx="10" fill={col as string} opacity="0.1" stroke={col as string} />
          <text x={(x as number) + 90} y="80" fontSize="11.5" fontWeight="800" textAnchor="middle" fill={col as string}>{tag as string}</text>
          <text x={(x as number) + 90} y="104" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{how as string}</text>
          <text x={(x as number) + 90} y="128" fontSize="10" textAnchor="middle" className="fill-current text-foreground">{ores as string}</text>
        </g>
      ))}
      <text x="330" y="205" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Concentrate first — the furnace should melt metal, not sand</text>
    </svg>
  );
}
