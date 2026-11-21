/** Imbalance chain — one disturbance, many effects. Well-detailed. Theme-aware. */
export function ImbalanceChainReaction({ className }: { className?: string }) {
  const chain: [string, string][] = [
    ["Fossil CO₂ rises", "more heat trapped"],
    ["Temperature climbs", "glaciers and ice shrink"],
    ["Sea level rises", "coasts and islands flood"],
    ["Monsoons shift", "floods in wet season, drought in dry"],
    ["Crops fail", "food prices and migration rise"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Imbalance chain reaction fossil CO2 temperature sea level monsoon crops failure cascade domino effect climate consequences">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">One push, five falls — the imbalance cascade</text>
      {chain.map(([s, d], i) => {
        const x = 30 + (i % 2) * 340;
        const y = 48 + Math.floor(i / 2) * 74;
        return (
          <g key={s}>
            <rect x={x} y={y} width="310" height="62" rx="10" className="fill-current text-rose-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `rgb(244 63 94 / ${0.9 - i * 0.08})` }} />
            <text x={x + 16} y={y + 22} fontSize="8.2" className="fill-current text-foreground" fontWeight="800">{i + 1}. {s}</text>
            <text x={x + 16} y={y + 42} fontSize="7.2" className="fill-current text-muted-foreground">{d}</text>
            {i < 4 && (
              <line x1={i % 2 === 0 ? 340 : 340} y1={y + 31} x2={i % 2 === 0 ? 366 : 366} y2={y + 31} className="stroke-current text-rose-500" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} markerEnd="url(#arrhl)" />
            )}
          </g>
        );
      })}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Ecological imbalances are chained: disturb the carbon budget and the water, the coasts, the farms and the people follow.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: trace one greenhouse consequence through at least three steps of this cascade.</text>
    </svg>
  );
}
