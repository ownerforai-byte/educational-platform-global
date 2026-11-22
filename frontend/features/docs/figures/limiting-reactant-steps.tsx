// Limiting reactant 4-step method. Theme-aware.
export function LimitingReactantSteps({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Limiting reactant four step method balance equation convert to moles divide by coefficients compare identify limiting">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The 4-step method — identical for every problem</text>
      {[
        ["1", "Balance the equation — coefficients are the recipe"],
        ["2", "Convert every given quantity to moles"],
        ["3", "Divide each mole amount by its coefficient"],
        ["4", "The smaller quotient marks the limiting reactant"],
      ].map(([n, t], i) => (
        <g key={n}>
          <circle cx="58" cy={54 + i * 38} r="14" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <text x="58" y={59 + i * 38} fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">{n}</text>
          <text x="86" y={59 + i * 38} fontSize="9.5" className="fill-current text-foreground" fontWeight="700">{t}</text>
        </g>
      ))}
      <rect x="30" y="188" width="660" height="24" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="204" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">All product amounts and leftovers are then computed from the limiting reactant only — never from the excess one.</text>
    </svg>
  );
}
