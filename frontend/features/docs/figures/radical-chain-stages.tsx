// RadicalChainStages figure. Theme-aware.
export function RadicalChainStages({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Initiation propagation termination stages of radical chain reaction">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The radical chain — three stages</text>
      {[
        ["1 · INITIATION", "Cl₂ → 2Cl·", "light creates the first radicals", "rgb(239 68 68)", 40, 52],
        ["2 · PROPAGATION", "Cl· + CH₄ → CH₃· + HCl; CH₃· + Cl₂ → CH₃Cl + Cl·", "each step makes the next radical — the chain sustains itself", "rgb(245 158 11)", 40, 122],
        ["3 · TERMINATION", "Cl· + Cl· → Cl₂ (or CH₃· + Cl·, CH₃· + CH₃·)", "radicals combine; the chain dies", "rgb(59 130 246)", 40, 192],
      ].map(([h, e, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="580" height="58" rx="10" fill={col as string} opacity="0.08" stroke={col as string} strokeWidth="1.5" />
          <text x={20 + (x as number)} y={(y as number) + 22} fontSize="10.5" fontWeight="800" fill={col as string}>{h as string}</text>
          <text x={20 + (x as number)} y={(y as number) + 42} fontSize="9.5" fontWeight="800" className="fill-current text-foreground">{e as string}</text>
          <text x={20 + (x as number)} y={(y as number) + 55} fontSize="8.5" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
    </svg>
  );
}
