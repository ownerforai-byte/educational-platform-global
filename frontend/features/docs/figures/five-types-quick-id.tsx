// FiveTypesQuickId figure. Theme-aware.
export function FiveTypesQuickId({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Quick identification table of five structural isomerism types">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Spot the type — the one-question test</text>
      {[
        ["skeleton different?", "CHAIN", "rgb(59 130 246)", 40, 52],
        ["group moved, skeleton same?", "POSITION", "rgb(16 185 129)", 340, 52],
        ["functional group different?", "FUNCTIONAL", "rgb(245 158 11)", 40, 122],
        ["alkyl halves around O/N/S differ?", "METAMERISM", "rgb(139 92 246)", 340, 122],
      ].map(([q, a, col, x, y]) => (
        <g key={q as string}>
          <rect x={x as number} y={y as number} width="280" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 14} y={(y as number) + 24} fontSize="10" className="fill-current text-muted-foreground">{q as string}</text>
          <text x={(x as number) + 14} y={(y as number) + 46} fontSize="12" fontWeight="800" fill={col as string}>→ {a as string}</text>
        </g>
      ))}
      <text x="330" y="212" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">dynamic H-shift equilibrium → TAUTOMERISM (the fifth type)</text>
    </svg>
  );
}
