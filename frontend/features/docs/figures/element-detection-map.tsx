// ElementDetectionMap figure. Theme-aware.
export function ElementDetectionMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Summary map of element detection by Lassaigne test">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Lassaigne's test — the complete map</text>
      {[
        ["N", "Prussian blue", "rgb(59 130 246)", 40, 55],
        ["S", "violet / black PbS", "rgb(139 92 246)", 240, 55],
        ["X (Cl,Br,I)", "AgX colour ladder", "rgb(16 185 129)", 440, 55],
        ["N + S together", "blood red NaSCN", "rgb(239 68 68)", 140, 135],
        ["neither detected", "element absent (or C,H only)", "rgb(148 163 184)", 380, 135],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 24} fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 44} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">one fusion, one extract, four verdicts — the most efficient test in qualitative organic analysis</text>
    </svg>
  );
}
