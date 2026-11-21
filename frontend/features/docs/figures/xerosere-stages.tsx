/** Xerosere stages — succession on bare rock. Well-detailed. Theme-aware. */
export function XerosereStages({ className }: { className?: string }) {
  const stages: [string, string, string][] = [
    ["Crustose lichen", "pioneers dissolve bare rock with acids", "year 0+"],
    ["Foliose lichen + moss", "first true soil crumbs accumulate", "decades"],
    ["Grasses + herbs", "roots bind deeper soil, hold water", "century"],
    ["Shrubs then forest", "large plants shade out pioneers", "climax"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Xerosere stages succession bare rock crustose foliose lichen moss grass shrub forest climax soil formation xerarch">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Xerosere — a forest built on bare rock</text>
      {stages.map(([name, detail, time], i) => {
        const x = 30 + i * 170;
        const h = 30 + i * 22;
        return (
          <g key={name}>
            <rect x={x} y="44" width="160" height="220" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
            {/* rock + growing vegetation */}
            <rect x={x + 20} y={264 - 20} width="120" height="20" rx="4" className="fill-current text-stone-500/40" />
            {i === 0 && <ellipse cx={x + 80} cy={244} rx="18" ry="6" className="fill-current text-lime-600/40" />}
            {i >= 1 && [0, 1, 2].map((j) => (
              <ellipse key={j} cx={x + 55 + j * 30} cy={240 - i * 4} rx="12" ry="7" className="fill-current text-lime-600/45" />
            ))}
            {i >= 2 && [0, 1, 2].map((j) => (
              <path key={j} d={`M${x + 55 + j * 30} ${236 - i * 4} v-24`} className="stroke-current text-emerald-600" strokeWidth="2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
            ))}
            {i === 3 && [0, 1, 2].map((j) => (
              <circle key={j} cx={x + 55 + j * 30} cy={196} r="9" className="fill-current text-emerald-600/50" />
            ))}
            <text x={x + 80} y="70" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x={x + 12} y="92" fontSize="6.8" className="fill-current text-muted-foreground">{detail.slice(0, 32)}</text>
            <text x={x + 12} y="106" fontSize="6.8" className="fill-current text-muted-foreground">{detail.slice(32, 64)}</text>
            <text x={x + 80} y="130" fontSize="7" textAnchor="middle" className="fill-current text-emerald-600">{time}</text>
          </g>
        );
      })}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Each stage changes the ground for the next: soil deepens, moisture rises, bigger plants win — diversity climbs to the climax community.</text>
    </svg>
  );
}
