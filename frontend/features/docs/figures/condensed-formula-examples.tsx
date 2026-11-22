// CondensedFormulaExamples figure. Theme-aware.
export function CondensedFormulaExamples({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Condensed formulas of ethane ethanol and acetic acid">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Condensed formulas — the working notation</text>
      {[
        ["ethane", "CH₃–CH₃", "C₂H₆", "rgb(59 130 246)", 55],
        ["ethanol", "CH₃CH₂OH", "C₂H₆O", "rgb(16 185 129)", 115],
        ["acetic acid", "CH₃COOH", "C₂H₄O₂", "rgb(239 68 68)", 175],
      ].map(([n, c, m, col, y]) => (
        <g key={n as string}>
          <rect x="40" y={y as number} width="580" height="46" rx="10" fill={col as string} opacity="0.09" stroke={col as string} strokeWidth="1.5" />
          <text x="60" y={(y as number) + 29} fontSize="11.5" fontWeight="800" fill={col as string}>{n as string}</text>
          <text x="260" y={(y as number) + 29} fontSize="13" fontWeight="800" className="fill-current text-foreground">{c as string}</text>
          <text x="480" y={(y as number) + 29} fontSize="10.5" className="fill-current text-muted-foreground">molecular: {m as string}</text>
        </g>
      ))}
      <text x="330" y="234" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">groups written together; order of attachment preserved — unique identity at writing speed</text>
    </svg>
  );
}
