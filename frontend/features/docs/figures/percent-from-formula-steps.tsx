// Percentage composition worked steps panel. Theme-aware.
export function PercentFromFormulaSteps({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Percentage composition four step method write formula find molar mass take element mass divide and multiply by hundred check sum hundred">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The 4-step method — works for every compound</text>
      {[
        ["1", "Write the correct formula (Ca(OH)₂, not CaOH₂)"],
        ["2", "Compute the molar mass with the given atomic masses"],
        ["3", "Element mass per mole ÷ molar mass × 100"],
        ["4", "Add all percentages — must total 100 (rounding aside)"],
      ].map(([n, t], i) => (
        <g key={n}>
          <circle cx="58" cy={54 + i * 38} r="14" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <text x="58" y={59 + i * 38} fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">{n}</text>
          <text x="86" y={59 + i * 38} fontSize="9.5" className="fill-current text-foreground" fontWeight="700">{t}</text>
        </g>
      ))}
      <rect x="30" y="188" width="660" height="24" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="204" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Common loss: forgetting the bracket multiplier in Ca(OH)₂ — oxygen counts twice, hydrogen counts twice.</text>
    </svg>
  );
}
