// Group-number formulas per block. Theme-aware.
export function GroupCountingRules({ className }: { className?: string }) {
  const rules: [string, string, string][] = [
    ["s-block", "Group = number of ns electrons", "Na: 3s¹ → group 1 · Mg: 3s² → group 2"],
    ["p-block", "Group = 12 + number of np electrons", "Cl: 3s² 3p⁵ → 12 + 5 = 17"],
    ["d-block", "Group = 2 + number of (n−1)d electrons", "Fe: 4s² 3d⁶ → 2 + 6 = 8"],
  ];
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Group number formulas for s p and d blocks with worked examples sodium magnesium chlorine iron">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Counting the group from the configuration</text>
      {rules.map(([blk, rule, ex], i) => (
        <g key={blk}>
          <rect x="30" y={40 + i * 46} width="660" height="40" rx="9" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="46" y={58 + i * 46} fontSize="9.5" className="fill-current text-sky-600" fontWeight="800">{blk}</text>
          <text x="130" y={58 + i * 46} fontSize="9" className="fill-current text-foreground" fontWeight="700">{rule}</text>
          <text x="46" y={73 + i * 46} fontSize="8" className="fill-current text-muted-foreground">{ex}</text>
        </g>
      ))}
      <rect x="30" y="182" width="660" height="20" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="196" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Drill: Al (3s² 3p¹) → 12 + 1 = 13 · Mn (4s² 3d⁵) → 2 + 5 = 7 · Zn (4s² 3d¹⁰) → 2 + 10 = 12.</text>
    </svg>
  );
}
