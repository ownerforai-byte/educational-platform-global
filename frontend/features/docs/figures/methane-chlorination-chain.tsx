// MethaneChlorinationChain figure. Theme-aware.
export function MethaneChlorinationChain({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Free radical chain mechanism of methane chlorination three stages">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Chlorination of CH₄ — the radical chain</text>
      {[
        ["INITIATION", "Cl₂ → 2Cl·", "light splits the bond", "rgb(239 68 68)", 40, 52],
        ["PROPAGATION", "Cl· + CH₄ → CH₃· + HCl", "then CH₃· + Cl₂ → CH₃Cl + Cl·", "rgb(245 158 11)", 40, 122],
        ["TERMINATION", "Cl· + Cl· → Cl₂", "radicals annihilate", "rgb(59 130 246)", 40, 192],
      ].map(([h, e, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="580" height="56" rx="10" fill={col as string} opacity="0.08" stroke={col as string} strokeWidth="1.5" />
          <text x={20 + (x as number)} y={(y as number) + 24} fontSize="11" fontWeight="800" fill={col as string}>{h as string}</text>
          <text x={20 + (x as number)} y={(y as number) + 44} fontSize="10.5" fontWeight="800" className="fill-current text-foreground">{e as string}</text>
          <text x={360} y={(y as number) + 44} fontSize="9.5" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
    </svg>
  );
}
