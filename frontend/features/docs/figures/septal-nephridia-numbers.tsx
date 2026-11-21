/** Septal nephridia numbers — the accounting. Well-detailed. Theme-aware. */
export function SeptalNephridiaNumbers({ className }: { className?: string }) {
  const types: [string, string, string, string][] = [
    ["Septal", "from segment 15 onward, one pair per segment", "into intestine", "rgb(2 132 199)"],
    ["Integumentary", "scattered in the body wall, segments 3 onward", "out via skin pores", "rgb(217 119 6)"],
    ["Pharyngeal", "three tufts per segment, segments 4–6", "into the pharynx", "rgb(139 92 246)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Septal nephridia numbers accounting three types distribution segments openings comparison table excretory system arrangement">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three nephridia types — the full accounting</text>
      <rect x="30" y="40" width="90" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="75" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TYPE</text>
      <rect x="120" y="40" width="280" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="260" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHERE THEY SIT</text>
      <rect x="400" y="40" width="290" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="545" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHERE THEY OPEN</text>
      {types.map(([name, where, opens, rgb], i) => {
        const y = 74 + i * 56;
        return (
          <g key={name}>
            <text x="46" y={y + 22} fontSize="7.4" className="fill-current" style={{ color: rgb }} fontWeight="800">{name}</text>
            <text x="134" y={y + 14} fontSize="6.8" className="fill-current text-muted-foreground">{where.slice(0, 46)}</text>
            {where.length > 46 && <text x="134" y={y + 28} fontSize="6.8" className="fill-current text-muted-foreground">{where.slice(46, 92)}</text>}
            <text x="414" y={y + 22} fontSize="6.8" className="fill-current text-muted-foreground">{opens}</text>
          </g>
        );
      })}
      <rect x="30" y="248" width="660" height="44" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="266" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Total: over 200 nephridia per worm — a decentralised kidney system, one filter pair per segment.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: match type → position → opening. The septal type is the one that opens into the intestine (enteronephric).</text>
    </svg>
  );
}
