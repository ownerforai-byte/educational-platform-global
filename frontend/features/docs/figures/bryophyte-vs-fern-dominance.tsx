/** Bryophyte vs fern — gametophyte vs sporophyte dominance flip. Theme-aware. */
export function BryophyteVsFernDominance({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Bryophyte versus fern showing gametophyte dominant in moss and sporophyte dominant in fern the evolutionary flip">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The great flip — who runs the life cycle</text>

      {/* moss */}
      <g>
        <rect x="30" y="56" width="290" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="175" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MOSS (bryophyte)</text>
        <g className="stroke-current text-emerald-600" strokeWidth="3"><line x1="120" y1="190" x2="120" y2="130" /></g>
        {[[114, 180], [126, 170], [116, 158], [124, 148]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="5" ry="3" className="fill-current text-emerald-500/60" />
        ))}
        <ellipse cx="120" cy="122" rx="5" ry="10" className="fill-current text-violet-500/60" />
        <text x="200" y="140" fontSize="8.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">green plant = GAMETOPHYTE (n)</text>
        <text x="200" y="158" fontSize="8.5" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">brown capsule = SPOROPHYTE (2n)</text>
        <text x="200" y="176" fontSize="8" className="fill-current text-muted-foreground">sporophyte is small & dependent</text>
      </g>

      {/* fern */}
      <g>
        <rect x="340" y="56" width="290" height="150" rx="12" className="fill-current text-teal-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
        <text x="485" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FERN (pteridophyte)</text>
        <g className="stroke-current text-teal-600" strokeWidth="3"><line x1="430" y1="190" x2="430" y2="120" /></g>
        {[[424, 180], [436, 168], [426, 152], [434, 136]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} q10 -6 18 2`} fill="none" strokeWidth="3" className="stroke-current text-teal-500" />
        ))}
        <text x="510" y="140" fontSize="8.5" className="fill-current text-teal-700 dark:text-teal-300" fontWeight="700">big plant = SPOROPHYTE (2n)</text>
        <text x="510" y="158" fontSize="8.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">tiny prothallus = GAMETOPHYTE (n)</text>
        <text x="510" y="176" fontSize="8" className="fill-current text-muted-foreground">gametophyte is small, short-lived</text>
      </g>
      <text x="16" y="226" fontSize="10" className="fill-current text-muted-foreground">Evolution's headline: the diploid generation took over — bigger, more genetic variety, better able to colonise land.</text>
    </svg>
  );
}
