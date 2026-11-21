/** Protonema to leafy shoot — moss starts as a filament. Well-detailed. Theme-aware. */
export function ProtonemaToLeafyShoot({ className }: { className?: string }) {
  const steps = ["spore lands", "protonema spreads", "buds appear", "leafy shoot rises", "adult moss + capsules"];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Protonema to leafy shoot moss germination spore filamentous protonema buds lateral branch adult gametophyte development stages">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">From spore to moss — the protonema stage</text>
      {steps.map((label, i) => {
        const x = 30 + i * 135;
        return (
          <g key={label}>
            <rect x={x} y="44" width="125" height="190" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
            <text x={x + 62} y="64" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {label}</text>
            {i === 0 && <circle cx={x + 62} cy="140" r="9" className="fill-current text-amber-500/50" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(245 158 11 / 0.9)" }} />}
            {i === 1 && (
              <g>
                {[[40, 150, 62, 132], [62, 132, 88, 150], [62, 132, 60, 112], [60, 112, 84, 100]].map(([x1, y1, x2, y2], j) => (
                  <line key={j} x1={x + x1} y1={y1} x2={x + x2} y2={y2} className="stroke-current text-emerald-500" strokeWidth="2.4" style={{ color: "rgb(34 197 94 / 0.9)" }} />
                ))}
              </g>
            )}
            {i === 2 && (
              <g>
                {[[40, 150, 62, 132], [62, 132, 88, 150]].map(([x1, y1, x2, y2], j) => (
                  <line key={j} x1={x + x1} y1={y1} x2={x + x2} y2={y2} className="stroke-current text-emerald-500" strokeWidth="2.4" style={{ color: "rgb(34 197 94 / 0.9)" }} />
                ))}
                <circle cx={x + 62} cy="132" r="7" className="fill-current text-lime-500/50" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(132 204 22 / 0.9)" }} />
                <text x={x + 62} y="172" fontSize="6.6" textAnchor="middle" className="fill-current text-lime-600">bud</text>
              </g>
            )}
            {i === 3 && (
              <g>
                {[-2, -1, 0, 1, 2].map((k) => (
                  <path key={k} d={`M${x + 62} 160 q${k * 5} -22 ${k * 8} -32`} className="fill-none stroke-current text-emerald-600" strokeWidth="2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
                ))}
                <text x={x + 62} y="180" fontSize="6.6" textAnchor="middle" className="fill-current text-emerald-700">upright shoot</text>
              </g>
            )}
            {i === 4 && (
              <g>
                {[-2, -1, 0, 1, 2].map((k) => (
                  <path key={k} d={`M${x + 55} 160 q${k * 5} -22 ${k * 8} -32`} className="fill-none stroke-current text-emerald-600" strokeWidth="2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
                ))}
                <line x1={x + 76} y1="128" x2={x + 76} y2="100" className="stroke-current text-amber-700" strokeWidth="2.4" style={{ color: "rgb(146 64 14 / 0.9)" }} />
                <ellipse cx={x + 76} cy="94" rx="6" ry="9" className="fill-current text-amber-700/35" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(146 64 14 / 0.9)" }} />
              </g>
            )}
            <text x={x + 62} y="222" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">
              {["on damp soil", "green alga-like filaments", "side branch thickens", "the moss we recognise", "cycle repeats"][i]}
            </text>
          </g>
        );
      })}
      <rect x="30" y="250" width="660" height="40" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="50" y="268" fontSize="7.6" className="fill-current text-foreground" fontWeight="700">KEY POINT: the protonema looks like a filamentous alga — evidence that mosses came from green-alga-like ancestors.</text>
      <text x="50" y="284" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: protonema = creeping, filamentous, haploid gametophyte stage of moss.</text>
    </svg>
  );
}
