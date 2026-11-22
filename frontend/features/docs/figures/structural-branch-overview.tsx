// StructuralBranchOverview figure. Theme-aware.
export function StructuralBranchOverview({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Five types of structural isomerism overview">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Structural isomerism — five types</text>
      {[
        ["chain", "different carbon skeleton", "rgb(59 130 246)", 40, 55],
        ["position", "same skeleton, group moved", "rgb(16 185 129)", 240, 55],
        ["functional", "different functional group", "rgb(245 158 11)", 440, 55],
        ["metamerism", "unequal alkyl split", "rgb(139 92 246)", 140, 130],
        ["tautomerism", "dynamic H-shift equilibrium", "rgb(20 184 166)", 340, 130],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 24} fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 44} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">all five share one signature: the atoms are wired differently</text>
    </svg>
  );
}
