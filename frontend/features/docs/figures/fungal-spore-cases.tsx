/** Fungal spore structures — sporangium, ascus, basidium compared. Theme-aware. */
export function FungalSporeCases({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Three fungal spore cases sporangium sac ascus with eight ascospores and basidium with four basidiospores on sterigmata">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three spore cases — count the spores</text>

      {/* sporangium */}
      <g>
        <circle cx="110" cy="120" r="42" className="fill-current text-sky-500/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <line x1="110" y1="162" x2="110" y2="200" strokeWidth="6" className="stroke-current text-sky-600" />
        {[[95, 110], [125, 112], [105, 132], [122, 128], [100, 95], [120, 98]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" className="fill-current text-sky-700/70" />
        ))}
        <text x="110" y="222" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">SPORANGIUM (sac on a stalk)</text>
        <text x="110" y="238" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">hundreds of sporangiospores — Mucor</text>
      </g>

      {/* ascus */}
      <g>
        <rect x="270" y="78" width="50" height="110" rx="25" className="fill-current text-violet-500/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
        {[[285, 100], [305, 100], [285, 124], [305, 124], [285, 148], [305, 148], [285, 172], [305, 172]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" className="fill-current text-violet-700/70" />
        ))}
        <text x="295" y="222" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">ASCUS (sac)</text>
        <text x="295" y="238" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">exactly 8 ascospores — yeast, Penicillium</text>
      </g>

      {/* basidium */}
      <g>
        <ellipse cx="500" cy="150" rx="40" ry="20" className="fill-current text-emerald-500/25" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <g className="stroke-current text-emerald-700" strokeWidth="2.5">
          <line x1="480" y1="134" x2="474" y2="104" /><line x1="494" y1="132" x2="492" y2="100" /><line x1="508" y1="132" x2="510" y2="100" /><line x1="522" y1="134" x2="528" y2="104" />
        </g>
        {[[474, 100], [492, 96], [510, 96], [528, 100]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" className="fill-current text-emerald-700/80" />
        ))}
        <text x="500" y="222" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">BASIDIUM (club)</text>
        <text x="500" y="238" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">4 basidiospores on sterigmata — mushroom</text>
      </g>
    </svg>
  );
}
