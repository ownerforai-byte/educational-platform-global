/** Living collections — botanical garden, museum, zoo. Well-detailed. Theme-aware. */
export function LivingCollectionsGardens({ className }: { className?: string }) {
  const cards: [string, string, string[], string][] = [
    ["BOTANICAL GARDEN", "living plants, labelled, grown for study", ["each plant carries a label", "seed exchanges worldwide", "rare species protected"], "rgb(22 163 74)"],
    ["MUSEUM", "preserved dead specimens, catalogued", ["insects pinned in boxes", "plants in spirit jars", "skeletons and hides"], "rgb(2 132 199)"],
    ["ZOLOGICAL PARK", "live animals in near-natural enclosures", ["captive breeding programmes", "education + research", "wildlife conservation"], "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Living collections botanical garden museum zoological park taxonomic aids preserved specimens labels captive breeding education research">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three houses of biodiversity</text>
      {cards.map(([name, detail, pts, rgb], i) => {
        const x = 30 + i * 225;
        return (
          <g key={name}>
            <rect x={x} y="44" width="210" height="220" rx="12" className="fill-current text-slate-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 105} y="66" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            <text x={x + 16} y="88" fontSize="7.2" className="fill-current text-muted-foreground">{detail}</text>
            {pts.map((p, j) => (
              <text key={p} x={x + 16} y={120 + j * 26} fontSize="7.2" className="fill-current text-muted-foreground">• {p}</text>
            ))}
            {i === 0 && (
              <g>
                <path d={`M${x + 60} 220 L${x + 60} 190`} className="stroke-current text-emerald-700" strokeWidth="3" style={{ color: rgb }} />
                <circle cx={x + 60} cy={182} r="10" className="fill-current text-emerald-500/40" />
                <path d={`M${x + 110} 224 L${x + 110} 200`} className="stroke-current text-emerald-700" strokeWidth="3" style={{ color: rgb }} />
                <circle cx={x + 110} cy={192} r="8" className="fill-current text-emerald-500/40" />
              </g>
            )}
            {i === 1 && (
              <g>
                <rect x={x + 50} y={196} width="34" height="28" rx="4" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="1.4" style={{ color: rgb }} />
                <rect x={x + 100} y={200} width="24" height="24" rx="12" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="1.4" style={{ color: rgb }} />
              </g>
            )}
            {i === 2 && (
              <g>
                <path d={`M${x + 60} 226 q10 -22 22 0 Z`} className="fill-current text-amber-600/40" />
                <path d={`M${x + 110} 226 q8 -18 18 0 Z`} className="fill-current text-amber-600/40" />
              </g>
            )}
            <text x={x + 105} y="254" fontSize="6.6" textAnchor="middle" className="fill-current" style={{ color: rgb }}>key roles: study + conservation</text>
          </g>
        );
      })}
      <rect x="30" y="274" width="660" height="18" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="287" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: garden = living plants, museum = preserved specimens, zoo = live animals — all with labelled, catalogued collections.</text>
    </svg>
  );
}
