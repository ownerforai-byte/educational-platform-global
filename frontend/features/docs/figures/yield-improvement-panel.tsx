// Improving yield strategies. Theme-aware.
export function YieldImprovementPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Improving yield strategies excess reactant remove product Le chatelier catalysts careful transfer and purification technique">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Raising the percentage — what a chemist can actually do</text>
      {[
        ["Push the equilibrium", "excess of the cheaper reactant; remove product as it forms", 30, 44],
        ["Catalyse", "faster route, less time for side reactions", 370, 44],
        ["Tighten technique", "quantitative transfer, rinse glassware, cold washes", 30, 116],
        ["Recycle", "return unreacted starting material to the reactor", 370, 116],
      ].map(([t, d, x, y]) => (
        <g key={String(t)}>
          <rect x={Number(x)} y={Number(y)} width="320" height="62" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x={Number(x) + 16} y={Number(y) + 22} fontSize="9.5" className="fill-current text-emerald-600" fontWeight="800">{String(t)}</text>
          <text x={Number(x) + 16} y={Number(y) + 42} fontSize="7.8" className="fill-current text-muted-foreground">{String(d).slice(0, 46)}</text>
          <text x={Number(x) + 16} y={Number(y) + 54} fontSize="7.8" className="fill-current text-muted-foreground">{String(d).slice(46, 92)}</text>
        </g>
      ))}
      <rect x="30" y="188" width="660" height="16" rx="0" />
      <text x="360" y="202" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Haber link: recycling unreacted N₂/H₂ and condensing out NH₃ continuously is exactly strategy 1 + 4 at industrial scale.</text>
    </svg>
  );
}
