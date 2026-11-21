/** Animal water saving kit — the desert mammal manual. Well-detailed. Theme-aware. */
export function AnimalWaterSavingKit({ className }: { className?: string }) {
  const tools: [string, string, string][] = [
    ["Kidneys", "hyper-concentrated urine — every drop counted twice", "camel, kangaroo rat"],
    ["Nose", "counter-current nasal passages recycle exhaled moisture", "camels, desert foxes"],
    ["Behaviour", "active at night, burrow by day, estivate in drought", "frogs, snails, rodents"],
    ["Metabolism", "water released from burning fat and dry seeds", "kangaroo rat never drinks"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Animal water saving adaptations desert camel kangaroo rat concentrated urine nasal moisture nocturnal estivation metabolic water">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The desert mammal's water-saving kit</text>
      {tools.map(([name, detail, ex], i) => {
        const x = 30 + (i % 2) * 335;
        const y = 44 + Math.floor(i / 2) * 108;
        return (
          <g key={name}>
            <rect x={x} y={y} width="320" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
            <text x={x + 16} y={y + 22} fontSize="8.6" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x={x + 16} y={y + 44} fontSize="7.4" className="fill-current text-muted-foreground">{detail.slice(0, 46)}</text>
            {detail.length > 46 && <text x={x + 16} y={y + 58} fontSize="7.4" className="fill-current text-muted-foreground">{detail.slice(46, 92)}</text>}
            <text x={x + 16} y={y + 80} fontSize="7" className="fill-current text-amber-600">{ex}</text>
          </g>
        );
      })}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Physiology first, behaviour second: the body economises, the timetable hides from the sun.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: contrast physiological (kidney, nose) with behavioural (nocturnal, estivation) adaptation.</text>
    </svg>
  );
}
