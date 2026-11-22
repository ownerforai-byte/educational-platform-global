// CanonicalRulesPanel figure. Theme-aware.
export function CanonicalRulesPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Rules for drawing valid canonical resonance structures">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Rules of the resonance game</text>
      {[
        ["electrons move", "π pairs and lone pairs shift", "rgb(59 130 246)", 40, 52],
        ["atoms NEVER move", "the σ skeleton is frozen", "rgb(239 68 68)", 340, 52],
        ["charges appear where electrons land", "bookkeeping stays honest", "rgb(245 158 11)", 40, 122],
        ["arrow is ↔ not ⇌", "resonance is not equilibrium", "rgb(16 185 129)", 340, 122],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="280" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 14} y={(y as number) + 24} fontSize="11" fontWeight="800" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 14} y={(y as number) + 44} fontSize="9.5" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="212" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">if you find yourself moving an atom, you are drawing a different compound — not a canonical form</text>
    </svg>
  );
}
