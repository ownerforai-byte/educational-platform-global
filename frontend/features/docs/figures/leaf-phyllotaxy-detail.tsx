/** Phyllotaxy detail — alternate, opposite, whorled. Well-detailed. Theme-aware. */
export function LeafPhyllotaxyDetail({ className }: { className?: string }) {
  const types: [string, string, string][] = [
    ["Alternate", "one leaf per node, sides take turns", "mango, sunflower"],
    ["Opposite", "two leaves per node, facing each other", "tulsi, guava"],
    ["Whorled", "three or more leaves per node in a ring", "nerium (oleander)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Phyllotaxy detail alternate opposite whorled leaf arrangement one two three leaves per node mango tulsi nerium shading light capture">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Phyllotaxy — the rhythm of leaves on a stem</text>
      {types.map(([name, detail, eg], i) => {
        const x = 30 + i * 225;
        return (
          <g key={name}>
            <rect x={x} y="44" width="210" height="200" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
            <text x={x + 105} y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name.toUpperCase()}</text>
            {/* stem */}
            <line x1={x + 105} y1="84" x2={x + 105} y2="220" className="stroke-current text-emerald-800" strokeWidth="4" style={{ color: "rgb(6 46 27 / 0.9)" }} />
            {i === 0 && [[100, "M"], [150, "R"], [200, "L"]].map(([y, side], j) => (
              <path key={j} d={side === "L" ? `M${x + 105} ${y} q-30 -6 -38 -14 q30 -4 38 14` : `M${x + 105} ${y} q30 -6 38 -14 q-30 -4 -38 14`} className="fill-current text-emerald-600/40" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
            ))}
            {i === 1 && [[110, 140, 180]].map((ys, r) => (
              <g key={r}>
                {ys.map((y) => (
                  <g key={y}>
                    <path d={`M${x + 105} ${y} q-30 -6 -38 -14 q30 -4 38 14`} className="fill-current text-emerald-600/40" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
                    <path d={`M${x + 105} ${y} q30 -6 38 -14 q-30 -4 -38 14`} className="fill-current text-emerald-600/40" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
                  </g>
                ))}
              </g>
            ))}
            {i === 2 && [110, 165].map((y) => (
              <g key={y}>
                {[-1, 0, 1].map((k) => (
                  <path key={k} d={k === 0 ? `M${x + 105} ${y} q-4 -24 0 -28 q4 4 0 28` : `M${x + 105} ${y} q${k * 30} -6 ${k * 38} -14 q-${k * 30} -4 -${k * 38} 14`} className="fill-current text-emerald-600/40" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
                ))}
              </g>
            ))}
            <text x={x + 105} y="240" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{detail}</text>
            <text x={x + 105} y="256" fontSize="7" textAnchor="middle" className="fill-current text-emerald-700">e.g. {eg}</text>
          </g>
        );
      })}
      <rect x="30" y="258" width="660" height="34" rx="8" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Purpose: no leaf fully shades the one below — every arrangement is a light-capture strategy.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: count leaves per node — 1 = alternate, 2 = opposite, 3+ = whorled.</text>
    </svg>
  );
}
