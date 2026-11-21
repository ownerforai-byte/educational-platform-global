/** Placentation types — where ovules sit in the ovary. Well-detailed. Theme-aware. */
export function PlacentationTypes({ className }: { className?: string }) {
  const types: [string, string, string, string][] = [
    ["Marginal", "ovules along one seam of a single carpel", "pea pod", "rgb(22 163 74)"],
    ["Axile", "ovules on a central axis in a many-loculed ovary", "tomato, lemon", "rgb(245 158 11)"],
    ["Parietal", "ovules on the ovary wall itself", "mustard, papaya", "rgb(2 132 199)"],
    ["Free-central", "ovules on a central column, walls gone", "dianthus, primrose", "rgb(139 92 246)"],
    ["Basal", "one ovule at the ovary floor", "sunflower, marigold", "rgb(244 63 94)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Placentation types marginal axile parietal free central basal ovule arrangement inside ovary locule examples pea tomato mustard dianthus sunflower">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Placentation — the ovule's address inside the ovary</text>
      {types.map(([name, detail, eg, rgb], i) => {
        const x = 30 + i * 135;
        return (
          <g key={name}>
            <rect x={x} y="44" width="125" height="200" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 62} y="64" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            {/* ovary diagram */}
            {i === 0 && (
              <g>
                <path d={`M${x + 40} 90 q22 40 22 100 q0 14 -22 14 q-22 0 -22 -14 q0 -60 22 -100`} className="fill-current text-emerald-500/15" stroke="currentColor" strokeWidth="2" style={{ color: rgb }} />
                {[0, 1, 2, 3].map((j) => (
                  <circle key={j} cx={x + 62} cy={110 + j * 26} r="4" className="fill-current" style={{ color: rgb }} />
                ))}
              </g>
            )}
            {i === 1 && (
              <g>
                <circle cx={x + 62} cy="150" r="40" className="fill-current text-amber-500/15" stroke="currentColor" strokeWidth="2" style={{ color: rgb }} />
                <line x1={x + 62} y1="112" x2={x + 62} y2="188" className="stroke-current text-amber-700" strokeWidth="4" />
                <line x1={x + 24} y1="150" x2={x + 100} y2="150" className="stroke-current text-amber-700" strokeWidth="3" />
                {[[-14, -14], [14, -14], [-14, 14], [14, 14]].map(([dx, dy], j) => (
                  <circle key={j} cx={x + 62 + dx} cy={150 + dy} r="4" className="fill-current" style={{ color: rgb }} />
                ))}
              </g>
            )}
            {i === 2 && (
              <g>
                <circle cx={x + 62} cy="150" r="40" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="2" style={{ color: rgb }} />
                {[[-30, -12], [-30, 12], [30, -12], [30, 12]].map(([dx, dy], j) => (
                  <circle key={j} cx={x + 62 + dx} cy={150 + dy} r="4" className="fill-current" style={{ color: rgb }} />
                ))}
              </g>
            )}
            {i === 3 && (
              <g>
                <circle cx={x + 62} cy="150" r="40" className="fill-current text-violet-500/15" stroke="currentColor" strokeWidth="2" style={{ color: rgb }} />
                <line x1={x + 62} y1="116" x2={x + 62} y2="184" className="stroke-current text-violet-500" strokeWidth="4" />
                {[[-8, -18], [8, -6], [-8, 6], [8, 18]].map(([dx, dy], j) => (
                  <circle key={j} cx={x + 62 + dx} cy={150 + dy} r="4" className="fill-current" style={{ color: rgb }} />
                ))}
              </g>
            )}
            {i === 4 && (
              <g>
                <circle cx={x + 62} cy="150" r="40" className="fill-current text-rose-500/15" stroke="currentColor" strokeWidth="2" style={{ color: rgb }} />
                <circle cx={x + 62} cy="182" r="5" className="fill-current" style={{ color: rgb }} />
              </g>
            )}
            <text x={x + 62} y="212" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{detail}</text>
            <text x={x + 62} y="230" fontSize="6.6" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{eg}</text>
          </g>
        );
      })}
      <rect x="30" y="258" width="660" height="34" rx="8" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Exam hook: placentation = the arrangement of ovules on the placenta inside the ovary.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Pea = marginal, tomato = axile, mustard = parietal — three names examiners love.</text>
    </svg>
  );
}
