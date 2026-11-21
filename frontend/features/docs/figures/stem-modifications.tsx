/** Stem modifications — tendril, thorn, runner, tuber, cladode. Well-detailed. Theme-aware. */
export function StemModifications({ className }: { className?: string }) {
  const mods: [string, string, string, string][] = [
    ["Tendril", "coils around support — weak-stemmed climbers", "grapevine, pea", "text-emerald-500"],
    ["Thorn", "hard, pointed — defence against browsers", "citrus, bougainvillea", "text-rose-500"],
    ["Runner", "horizontal stem, new plantlets at nodes", "strawberry, grass", "text-sky-500"],
    ["Tuber", "swollen underground stem stores starch", "potato", "text-amber-500"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Stem modifications tendril thorn runner tuber axillary bud origin support defence propagation storage examples grapevine citrus strawberry potato">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">One bud, four disguises — stem modifications</text>
      {mods.map(([name, detail, eg, tint], i) => {
        const x = 30 + (i % 2) * 335;
        const y = 44 + Math.floor(i / 2) * 110;
        return (
          <g key={name}>
            <rect x={x} y={y} width="320" height="98" rx="10" className={`fill-current ${tint}/10`} strokeWidth="2" stroke="currentColor" />
            <text x={x + 16} y={y + 22} fontSize="8.8" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x={x + 16} y={y + 42} fontSize="7.4" className="fill-current text-muted-foreground">{detail}</text>
            <text x={x + 16} y={y + 60} fontSize="7" className={`fill-current ${tint}`}>e.g. {eg}</text>
            {/* icons */}
            {i === 0 && <path d={`M${x + 240} ${y + 58} q10 -18 20 0 q-10 12 -20 0`} className="fill-none stroke-current text-emerald-500" strokeWidth="2.4" />}
            {i === 1 && <path d={`M${x + 244} ${y + 74} l6 -22 l6 8 l-6 6 Z`} className="fill-current text-rose-500/50" />}
            {i === 2 && <path d={`M${x + 236} ${y + 66} q16 -12 32 0 M${x + 252} ${y + 60} v-8`} className="fill-none stroke-current text-sky-500" strokeWidth="2" />}
            {i === 3 && <ellipse cx={x + 252} cy={y + 62} rx="16" ry="10" className="fill-current text-amber-600/40" stroke="currentColor" strokeWidth="1.4" />}
            <text x={x + 16} y={y + 80} fontSize="6.8" className="fill-current text-muted-foreground">all arise from the axillary bud — proof they are stem, not leaf</text>
          </g>
        );
      })}
      <rect x="30" y="268" width="660" height="24" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="284" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: tendrils and thorns grow from axillary buds; a tuber's 'eyes' are buds — every modification keeps stem identity.</text>
    </svg>
  );
}
