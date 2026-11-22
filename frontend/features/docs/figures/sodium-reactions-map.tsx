// SodiumReactionsMap figure. Theme-aware.
export function SodiumReactionsMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Reaction map of sodium with oxygen water acids hydrogen chlorine and ammonia">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Sodium — the reaction checklist</text>
      {[
        ["O₂ limited", "4Na + O₂ → 2Na₂O", "rgb(148 163 184)", 30, 55],
        ["O₂ excess", "2Na + O₂ → Na₂O₂", "rgb(245 158 11)", 340, 55],
        ["H₂O", "2Na + 2H₂O → 2NaOH + H₂↑", "rgb(59 130 246)", 30, 110],
        ["HCl", "2Na + 2HCl → 2NaCl + H₂↑", "rgb(139 92 246)", 340, 110],
        ["H₂", "2Na + H₂ → 2NaH (H⁻)", "rgb(16 185 129)", 30, 165],
        ["NH₃(l), Fe cat", "Na + NH₃ → NaNH₂ + ½H₂", "rgb(239 68 68)", 340, 165],
      ].map(([re, eq, col, x, y]) => (
        <g key={re as string}>
          <rect x={x as number} y={y as number} width="290" height="42" rx="8" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1" />
          <text x={(x as number) + 12} y={(y as number) + 17} fontSize="9.5" fontWeight="800" fill={col as string}>{re as string}</text>
          <text x={(x as number) + 12} y={(y as number) + 34} fontSize="10" className="fill-current text-foreground">{eq as string}</text>
        </g>
      ))}
      <text x="330" y="228" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">NH₃ gas + Na at room temperature: no reaction — needs the liquid route or heat</text>
    </svg>
  );
}
