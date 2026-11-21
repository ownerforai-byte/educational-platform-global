/** Food security four pillars — availability access utilisation stability. Well-detailed. Theme-aware. */
export function FoodSecurityFourPillars({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Food security four pillars availability production access affordability distribution utilisation nutrition absorption sanitation stability shocks drought conflict price spikes FAO definition 1996 world food summit famine Amartya Sen entitlement failure not shortage Nepal import dependence rice self sufficient hidden hunger micronutrients">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Food security — the four pillars</text>
      {/* pillars */}
      <rect x="30" y="40" width="660" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["Availability", "enough food produced or imported — the supply side", 130],
        ["Access", "people can afford and reach it — the income side", 260],
        ["Utilisation", "the body absorbs it — nutrition, water, sanitation", 390],
        ["Stability", "all three hold through droughts, conflicts, price spikes", 520],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 78} y="70" width="156" height="110" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name as string}</text>
          <text x={x as number} y="112" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 32)}</text>
          <text x={x as number} y="126" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(32, 64)}</text>
          <text x={x as number} y="168" fontSize="5.6" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">{["supply", "afford", "absorb", "withstand"][i]}</text>
        </g>
      ))}
      <text x="360" y="200" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">FAO's 1996 definition: 'when all people, at all times, have physical and economic access to sufficient, safe, nutritious food'</text>
      {/* facts */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Sen's insight: famines are usually entitlement failures — food exists, but people can't buy it — not production failures.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Nepal's profile: roughly self-sufficient in rice on average, yet food-insecure hills import grain, and hidden hunger (micronutrients) persists everywhere.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name all four pillars with one line each — the standard food-security answer; most candidates forget stability.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Calories are the easiest pillar — nutrition and stability are where food security actually fails.</text>
    </svg>
  );
}
