/** Weismann's germplasm experiment — cutting mice's tails. Theme-aware. */
export function WeismannGermplasm({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Weismann germplasm theory experiment cutting mice tails for 22 generations tails still born disproving inheritance of acquired characters">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Weismann's germplasm theory — the mouse-tail test</text>

      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <ellipse cx={90 + i * 60} cy="100" rx="20" ry="14" className="fill-current text-stone-500/20" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
          <line x1={70 + i * 60} y1="100" x2={52 + i * 60} y2="100" strokeWidth="3" className="stroke-current text-rose-500" strokeDasharray="4 3" />
          <text x={90 + i * 60} y="132" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">gen {i + 1}</text>
        </g>
      ))}
      <text x="300" y="105" fontSize="9" className="fill-current text-foreground" fontWeight="800">…for 22 generations</text>
      <text x="300" y="126" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">Tails still born — every time.</text>

      <rect x="40" y="150" width="580" height="44" rx="10" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="56" y="194" fontSize="8.8" className="fill-current text-foreground" fontWeight="700">Body (somatic) changes do not reach the germ line — acquired characters are not inherited.</text>
    </svg>
  );
}
