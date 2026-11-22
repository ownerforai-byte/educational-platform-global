// Na2co3ReactionMap figure. Theme-aware.
export function Na2co3ReactionMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Reaction map of sodium carbonate with acids carbon dioxide sulphur dioxide and calcium chloride">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Na₂CO₃ — the reaction checklist</text>
      {[
        ["acids", "Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑", "brisk effervescence", "rgb(239 68 68)", 30, 55],
        ["CO₂ + H₂O", "Na₂CO₃ + CO₂ + H₂O → 2NaHCO₃", "absorbs to bicarbonate", "rgb(59 130 246)", 340, 55],
        ["SO₂", "Na₂CO₃ + SO₂ → Na₂SO₃ + CO₂↑", "SULPHITE — never sulphate", "rgb(148 163 184)", 30, 115],
        ["CaCl₂", "Na₂CO₃ + CaCl₂ → CaCO₃↓ + 2NaCl", "white ppt — hardness removal", "rgb(16 185 129)", 340, 115],
      ].map(([re, eq, note, col, x, y]) => (
        <g key={re as string}>
          <rect x={x as number} y={y as number} width="290" height="48" rx="8" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1" />
          <text x={(x as number) + 12} y={(y as number) + 18} fontSize="9.5" fontWeight="800" fill={col as string}>{re as string}</text>
          <text x={(x as number) + 12} y={(y as number) + 34} fontSize="9.5" className="fill-current text-foreground">{eq as string}</text>
          <text x={(x as number) + 12} y={(y as number) + 46} fontSize="8.5" className="fill-current text-muted-foreground">{note as string}</text>
        </g>
      ))}
      <text x="330" y="195" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">CuSO₄ gives a green-blue BASIC carbonate — the carbonate solution co-precipitates OH⁻</text>
    </svg>
  );
}
