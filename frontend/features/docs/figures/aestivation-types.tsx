/** Aestivation types — how petals bud-pack. Well-detailed. Theme-aware. */
export function AestivationTypes({ className }: { className?: string }) {
  const types: [string, string, string, string][] = [
    ["Valvate", "edges just touch, no overlap", "calotropis", "rgb(22 163 74)"],
    ["Twisted", "each petal overlaps the next, one way", "china-rose, cotton", "rgb(245 158 11)"],
    ["Imbricate", "one inside, one outside, rest alternate", "pea, bean", "rgb(2 132 199)"],
    ["Vexillary", "big banner folds over two wings and the keel", "fabaceae special", "rgb(139 92 246)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Aestivation types valvate twisted imbricate vexillary petal arrangement in bud china rose pea calotropis floral bud overlap">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Aestivation — how petals fold inside the bud</text>
      {types.map(([name, detail, eg, rgb], i) => {
        const x = 30 + i * 170;
        const cx = x + 85;
        return (
          <g key={name}>
            <rect x={x} y="44" width="160" height="200" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={cx} y="64" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            {i === 0 && [0, 90, 180, 270].map((a) => (
              <ellipse key={a} cx={cx + 16 * Math.cos((a * Math.PI) / 180)} cy={140 + 16 * Math.sin((a * Math.PI) / 180)} rx="14" ry="8" className="fill-current text-emerald-500/30" stroke="currentColor" strokeWidth="1.4" style={{ color: rgb }} transform={`rotate(${a} ${cx + 16 * Math.cos((a * Math.PI) / 180)} ${140 + 16 * Math.sin((a * Math.PI) / 180)})`} />
            ))}
            {i === 1 && [0, 72, 144, 216, 288].map((a, j) => (
              <path key={a} d={`M${cx} 140 q22 -6 30 -14 q-16 -8 -30 2 q-12 8 0 12`} className="fill-current text-amber-500/30" stroke="currentColor" strokeWidth="1.4" style={{ color: rgb }} transform={`rotate(${a + j * 2} ${cx} 140)`} />
            ))}
            {i === 2 && (
              <g>
                <ellipse cx={cx} cy={126} rx="12" ry="16" className="fill-current text-sky-400/30" stroke="currentColor" strokeWidth="1.4" style={{ color: rgb }} />
                <ellipse cx={cx - 20} cy={146} rx="16" ry="10" className="fill-current text-sky-500/30" stroke="currentColor" strokeWidth="1.4" style={{ color: rgb }} transform="rotate(-30 740 0)" />
                <ellipse cx={cx + 20} cy={146} rx="16" ry="10" className="fill-current text-sky-600/30" stroke="currentColor" strokeWidth="1.4" style={{ color: rgb }} transform="rotate(30 0 0)" />
              </g>
            )}
            {i === 3 && (
              <g>
                <path d={`M${cx - 30} 152 q30 -50 60 0 q-30 16 -60 0`} className="fill-current text-violet-500/30" stroke="currentColor" strokeWidth="1.6" style={{ color: rgb }} />
                <path d={`M${cx - 22} 158 q22 -34 44 0 q-22 12 -44 0`} className="fill-current text-violet-600/40" stroke="currentColor" strokeWidth="1.4" style={{ color: rgb }} />
                <path d={`M${cx - 12} 162 q12 -18 24 0 q-12 8 -24 0`} className="fill-current text-violet-700/50" stroke="currentColor" strokeWidth="1.2" />
              </g>
            )}
            <text x={cx} y="212" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{detail}</text>
            <text x={cx} y="230" fontSize="6.8" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{eg}</text>
          </g>
        );
      })}
      <rect x="30" y="258" width="660" height="34" rx="8" className="fill-current text-amber-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Exam hook: aestivation = the mode of arrangement of sepals or petals in the floral bud.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Twisted in china-rose, vexillary (papilionaceous) in pea — two named examples to memorise.</text>
    </svg>
  );
}
