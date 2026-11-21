/** Paper aids — flora, monograph, manual, catalogue. Well-detailed. Theme-aware. */
export function MonographFloraManual({ className }: { className?: string }) {
  const aids: [string, string, string, string][] = [
    ["Flora", "every plant of a given area, with keys and descriptions", "Flora of Nepal", "rgb(22 163 74)"],
    ["Monograph", "one taxon, exhaustively — every species worldwide", "a monograph on rice", "rgb(2 132 199)"],
    ["Manual", "ready-reference for identifying a region's plants", "manual of local trees", "rgb(245 158 11)"],
    ["Catalogue", "alphabetical index of species names and sources", "index of new names", "rgb(139 92 246)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Paper taxonomic aids flora monograph manual catalogue books keys descriptions region taxon ready reference index">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The taxonomist's bookshelf</text>
      {aids.map(([name, detail, eg, rgb], i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 30 + col * 335;
        const y = 44 + row * 110;
        return (
          <g key={name}>
            <rect x={x} y={y} width="320" height="98" rx="10" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            {/* book icon */}
            <rect x={x + 258} y={y + 30} width="44" height="52" rx="4" className="fill-current" style={{ color: rgb, opacity: 0.25 }} stroke="currentColor" strokeWidth="1.6" />
            <line x1={x + 266} y1={y + 40} x2={x + 294} y2={y + 40} className="stroke-current" strokeWidth="1.4" style={{ color: rgb }} />
            <line x1={x + 266} y1={y + 50} x2={x + 294} y2={y + 50} className="stroke-current" strokeWidth="1.4" style={{ color: rgb }} />
            <text x={x + 16} y={y + 22} fontSize="8.8" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x={x + 16} y={y + 44} fontSize="7.4" className="fill-current text-muted-foreground">{detail}</text>
            <text x={x + 16} y={y + 66} fontSize="7.2" className="fill-current" style={{ color: rgb }}>e.g. {eg}</text>
            <text x={x + 16} y={y + 84} fontSize="6.8" className="fill-current text-muted-foreground">{["scope: a place", "scope: one group", "scope: quick ID", "scope: name index"][i]}</text>
          </g>
        );
      })}
      <rect x="30" y="268" width="660" height="24" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="284" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: flora covers an AREA, monograph covers a TAXON — the classic one-line distinction.</text>
    </svg>
  );
}
