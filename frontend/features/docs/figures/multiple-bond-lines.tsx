// MultipleBondLines figure. Theme-aware.
export function MultipleBondLines({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Drawing double and triple bonds in line formulas">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">One line, two lines, three lines</text>
      {[
        ["single C–C", "ethane", 1, "rgb(16 185 129)", 75],
        ["double C=C", "ethene CH₂=CH₂", 2, "rgb(245 158 11)", 130],
        ["triple C≡C", "ethyne HC≡CH", 3, "rgb(239 68 68)", 190],
      ].map(([n, ex, k, col, y]) => (
        <g key={n as string}>
          <text x="70" y={(y as number) + 5} fontSize="11" fontWeight="800" fill={col as string}>{n as string}</text>
          {[0, 1, 2].map((i) => (i < (k as number) ? (
            <line key={i} x1="220" y1={(y as number) - 6 + i * 8} x2="330" y2={(y as number) - 6 + i * 8} stroke={col as string} strokeWidth="3" />
          ) : null))}
          <text x="360" y={(y as number) + 5} fontSize="10" className="fill-current text-muted-foreground">{ex as string}</text>
        </g>
      ))}
      <text x="330" y="228" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">unsaturation lives in the parallel lines — each extra pair is a reactive site</text>
    </svg>
  );
}
