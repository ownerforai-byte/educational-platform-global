/** Commensalism examples — one rides, one pays nothing. Well-detailed. Theme-aware. */
export function CommensalismExamples({ className }: { className?: string }) {
  const cases: [string, string, string][] = [
    ["Cattle egret", "follows grazing cattle, catches flushed insects", "bird gains, cow unaware"],
    ["Epiphytes", "orchids and mosses perch on tree branches", "plant gains support, tree unharmed"],
    ["Remora", "suctions to the shark, eats scraps", "fish gains, shark unbothered"],
    ["Cattle dung", "dung beetles breed in droppings", "beetle gains, cattle unharmed"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Commensalism examples cattle egret epiphytes orchid remora shark dung beetle one benefits other unaffected plus zero interaction">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Commensalism — + / 0 interactions</text>
      {cases.map(([name, detail, tag], i) => {
        const x = 30 + (i % 2) * 335;
        const y = 44 + Math.floor(i / 2) * 108;
        return (
          <g key={name}>
            <rect x={x} y={y} width="320" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
            <text x={x + 16} y={y + 22} fontSize="8.6" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x={x + 16} y={y + 44} fontSize="7.4" className="fill-current text-muted-foreground">{detail.slice(0, 46)}</text>
            {detail.length > 46 && <text x={x + 16} y={y + 58} fontSize="7.4" className="fill-current text-muted-foreground">{detail.slice(46, 92)}</text>}
            <text x={x + 16} y={y + 80} fontSize="7" className="fill-current text-sky-600">{tag}</text>
          </g>
        );
      })}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">The signature: one species clearly benefits, the other is neither helped nor harmed.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: distinguish from mutualism — no benefit flows back to the host.</text>
    </svg>
  );
}
