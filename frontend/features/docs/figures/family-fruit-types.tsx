/** Family fruits — legume, silique, berry, capsule side by side. Well-detailed. Theme-aware. */
export function FamilyFruitTypes({ className }: { className?: string }) {
  const fruits: [string, string, string, string][] = [
    ["Legume", "Fabaceae", "one carpel splits along both seams", "rgb(22 163 74)"],
    ["Silique", "Brassicaceae", "two carpels, long thin, seeds on a rim", "rgb(245 158 11)"],
    ["Berry", "Solanaceae", "fleshy throughout, many seeds inside", "rgb(239 68 68)"],
    ["Capsule", "Liliaceae", "dry, three chambers, opens by pores/valves", "rgb(139 92 246)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Family fruit types legume silique berry capsule fabaceae brassicaceae solanaceae liliaceae fruit identification carpels dehiscence seeds">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">One fruit each — the family fingerprint</text>
      {fruits.map(([name, family, detail, rgb], i) => {
        const x = 30 + i * 170;
        const cx = x + 85;
        return (
          <g key={name}>
            <rect x={x} y="44" width="160" height="200" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={cx} y="66" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x={cx} y="82" fontSize="7" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{family}</text>
            {i === 0 && (
              <g>
                <path d={`M${cx - 12} 110 q12 40 0 84 q-12 -40 0 -84`} className="fill-current text-emerald-600/30" stroke="currentColor" strokeWidth="2" style={{ color: rgb }} />
                <path d={`M${cx - 4} 118 v68`} className="stroke-current text-emerald-800" strokeWidth="1.4" strokeDasharray="3 2" />
                {[0, 1, 2, 3].map((j) => (
                  <circle key={j} cx={cx + 3} cy={126 + j * 18} r="3" className="fill-current" style={{ color: rgb }} />
                ))}
              </g>
            )}
            {i === 1 && (
              <g>
                <rect x={cx - 8} y={104} width="16" height="96" rx="8" className="fill-current text-amber-500/30" stroke="currentColor" strokeWidth="2" style={{ color: rgb }} />
                {[0, 1, 2, 3].map((j) => (
                  <circle key={j} cx={cx} cy={116 + j * 22} r="3.4" className="fill-current" style={{ color: rgb }} />
                ))}
              </g>
            )}
            {i === 2 && (
              <g>
                <ellipse cx={cx} cy={150} rx="22" ry="30" className="fill-current text-rose-500/30" stroke="currentColor" strokeWidth="2" style={{ color: rgb }} />
                {[[-8, -10], [8, -10], [-8, 10], [8, 10], [0, 0]].map(([dx, dy], j) => (
                  <circle key={j} cx={cx + dx} cy={150 + dy} r="2.6" className="fill-current" style={{ color: rgb }} />
                ))}
              </g>
            )}
            {i === 3 && (
              <g>
                <rect x={cx - 16} y={108} width="32" height="86" rx="8" className="fill-current text-violet-500/25" stroke="currentColor" strokeWidth="2" style={{ color: rgb }} />
                <line x1={cx} y1={108} x2={cx} y2={194} className="stroke-current text-violet-700" strokeWidth="2" />
                {[[-8, 126], [8, 126], [-8, 172], [8, 172]].map(([dx, dy], j) => (
                  <circle key={j} cx={cx + dx} cy={dy} r="3" className="fill-current" style={{ color: rgb }} />
                ))}
              </g>
            )}
            <text x={cx} y="216" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(0, 38)}</text>
            {detail.length > 38 && <text x={cx} y={230} fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(38, 76)}</text>}
          </g>
        );
      })}
      <rect x="30" y="258" width="660" height="34" rx="8" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Exam hook: match fruit to family — legume: Fabaceae, silique: Brassicaceae, berry: Solanaceae, capsule: Liliaceae.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">A single fruit can settle a family question faster than the whole floral formula.</text>
    </svg>
  );
}
