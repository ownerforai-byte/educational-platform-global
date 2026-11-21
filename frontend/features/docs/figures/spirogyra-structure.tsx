/** Spirogyra structure — spiral chloroplast, nucleus, conjugation-ready filaments. Theme-aware. */
export function SpirogyraStructure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Spirogyra filament with cylindrical cells spiral ribbon chloroplast nucleus pyrenoids and mucilaginous sheath">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Spirogyra — the 'water silk' under the lens</text>

      {/* filament of cells */}
      <g>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={60 + i * 130} y="70" width="130" height="80" rx="40" className="fill-current text-emerald-500/10" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        ))}
      </g>
      {/* spiral chloroplasts */}
      {[[60, 0], [190, 1], [320, 2], [450, 3]].map(([bx, i]) => (
        <path key={i} d={`M${bx + 15} 145 q65 -60 130 0`} fill="none" strokeWidth="4" className="stroke-current text-emerald-500" transform={`translate(${bx - 60 + 10},0)`} />
      ))}
      {/* nucleus + pyrenoids */}
      <circle cx="125" cy="110" r="10" className="fill-current text-violet-500/40" />
      <circle cx="255" cy="110" r="10" className="fill-current text-violet-500/40" />
      <circle cx="385" cy="110" r="10" className="fill-current text-violet-500/40" />
      <circle cx="515" cy="110" r="10" className="fill-current text-violet-500/40" />
      <text x="125" y="94" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">nucleus</text>

      {/* labels */}
      <text x="60" y="60" fontSize="8.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">spiral ribbon chloroplast with pyrenoids (starch centres)</text>
      <text x="60" y="176" fontSize="8.5" className="fill-current text-muted-foreground">cell wall + mucilaginous sheath — the slippery feel of the filament</text>
      <text x="60" y="196" fontSize="8.5" className="fill-current text-muted-foreground">each cell: one nucleus, 1–16 chloroplast ribbons, vacuole in the centre</text>

      <text x="16" y="226" fontSize="10" className="fill-current text-muted-foreground">Named for the SPIRAL: the chloroplast winds like a spring inside every cylindrical cell — the fastest field identification.</text>
    </svg>
  );
}
