// LassaigneTestFlow figure. Theme-aware.
export function LassaigneTestFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Lassaigne sodium fusion test workflow for detecting elements">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Lassaigne's test — the workflow</text>
      {[
        ["1. Fuse organic compound + Na", "red-hot ignition tube", "rgb(239 68 68)", 40, 55],
        ["2. Quench in water, boil, filter", "clear extract", "rgb(59 130 246)", 240, 55],
        ["3. Split extract into portions", "N, S, X tested separately", "rgb(245 158 11)", 440, 55],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="70" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 28} fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 50} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="160" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Na + C + N → NaCN · 2Na + S → Na₂S · Na + X → NaX</text>
      <text x="330" y="186" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">covalent elements are converted to ionic salts the standard tests can see</text>
      <text x="330" y="212" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">why sodium? — a strong reducer that converts everything at red heat</text>
    </svg>
  );
}
