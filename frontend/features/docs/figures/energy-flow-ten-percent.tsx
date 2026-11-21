/**
 * Energy flow and the 10% law — Lindeman's trophic model with heat
 * loss at each transfer. Theme-aware via currentColor.
 */
export function EnergyFlowTenPercent({ className }: { className?: string }) {
  const tier = (y: number, c: string, t: string, kJ: string, k: string) => (
    <g key={k}>
      <rect x="90" y={y} width="220" height="34" rx="8" style={{ color: c }} className="fill-current opacity-20" strokeWidth="2.5" stroke="currentColor" />
      <text x="200" y={y + 15} fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{t}</text>
      <text x="200" y={y + 28} fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">{kJ}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Lindeman energy flow model showing 20000 kilojoules at producers falling to 2000 200 and 20 at successive trophic levels with ninety percent lost as heat at each step">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Lindeman's 10% law — why big predators are rare</text>

      {tier(220, "rgb(22 163 74 / 0.9)", "T1 PRODUCERS", "20,000 kJ (gross production)", "t1")}
      {tier(170, "rgb(14 165 233 / 0.9)", "T2 HERBIVORES", "2,000 kJ", "t2")}
      {tier(120, "rgb(245 158 11 / 0.9)", "T3 CARNIVORES", "200 kJ", "t3")}
      {tier(70, "rgb(244 63 94 / 0.9)", "T4 TOP CARNIVORES", "20 kJ", "t4")}

      {/* upward arrows with loss */}
      {[
        { y1: 216, y2: 208 },
        { y1: 166, y2: 158 },
        { y1: 116, y2: 108 },
      ].map((a, i) => (
        <g key={i}>
          <line x1="330" y1={a.y1} x2="330" y2={a.y2} strokeWidth="3" className="stroke-current text-foreground" />
          <polygon points="324,212 330,200 336,212" className="fill-current text-foreground" transform={`translate(0 ${-i * 50})`} />
          <text x="340" y={a.y2 + 8 - i * 50} fontSize="8.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">~90% lost: respiration heat, uneaten, excreted</text>
        </g>
      ))}

      {/* sun */}
      <circle cx="560" cy="90" r="26" className="fill-current text-amber-400/40" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(251 191 36)" }} />
      <line x1="534" y1="104" x2="316" y2="236" strokeWidth="3" className="stroke-current text-amber-500" />
      <text x="560" y="136" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">sun — the only input</text>

      <text x="400" y="200" fontSize="9.5" className="fill-current text-muted-foreground">Energy flows ONE way —</text>
      <text x="400" y="216" fontSize="9.5" className="fill-current text-muted-foreground">it is never recycled, only degraded</text>
      <text x="400" y="232" fontSize="9.5" className="fill-current text-muted-foreground">to heat (2nd law of thermodynamics).</text>

      <text x="16" y="288" fontSize="10" className="fill-current text-muted-foreground">Consequences: short chains (4–5 levels max), few top predators, and pyramids of energy that always stand upright.</text>
    </svg>
  );
}
