// AttackerTargetMatch figure. Theme-aware.
export function AttackerTargetMatch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Matching each reagent class to its preferred target site">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Attacker meets target</text>
      {[
        ["E⁺ electrophile", "→ electron-rich sites", "π bonds, lone pairs, aromatic rings", "rgb(239 68 68)", 40, 55],
        ["Nu⁻ nucleophile", "→ electron-poor sites", "δ+ carbons (C=O, C–X), cations", "rgb(59 130 246)", 40, 125],
        ["X· radical", "→ any σ bond", "abstracts H, adds to C=C", "rgb(16 185 129)", 40, 195],
      ].map(([h, m, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="580" height="58" rx="10" fill={col as string} opacity="0.08" stroke={col as string} strokeWidth="1.5" />
          <text x={60} y={(y as number) + 24} fontSize="11.5" fontWeight="800" fill={col as string}>{h as string}</text>
          <text x={260} y={(y as number) + 24} fontSize="11" fontWeight="800" className="fill-current text-foreground">{m as string}</text>
          <text x={60} y={(y as number) + 44} fontSize="9.5" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
    </svg>
  );
}
