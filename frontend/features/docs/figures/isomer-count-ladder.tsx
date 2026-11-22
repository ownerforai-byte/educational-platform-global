// IsomerCountLadder figure. Theme-aware.
export function IsomerCountLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Number of isomers rising with carbon count">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Why isomerism explodes with carbon count</text>
      {[
        ["C₄H₁₀", "2", "rgb(59 130 246)"], ["C₅H₁₂", "3", "rgb(16 185 129)"], ["C₆H₁₄", "5", "rgb(245 158 11)"],
        ["C₈H₁₈", "18", "rgb(239 68 68)"], ["C₁₀H₂₂", "75", "rgb(139 92 246)"],
      ].map(([f, n, col], i) => (
        <g key={f as string}>
          <rect x={40 + (i as number) * 120} y={160 - (i as number) * 22} width="90" height={(i as number) * 22 + 40} rx="8" fill={col as string} opacity="0.15" stroke={col as string} />
          <text x={85 + (i as number) * 120} y={150 - (i as number) * 22} fontSize="13" fontWeight="800" textAnchor="middle" fill={col as string}>{n as string}</text>
          <text x={85 + (i as number) * 120} y={222} fontSize="10" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{f as string}</text>
        </g>
      ))}
      <text x="330" y="45" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">more carbons → more possible skeletons → more isomers</text>
    </svg>
  );
}
