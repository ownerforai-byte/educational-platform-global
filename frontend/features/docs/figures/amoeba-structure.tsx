/** Amoeba structure & feeding — pseudopod engulfment, food vacuole, contractile vacuole. Theme-aware. */
export function AmoebaStructure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Amoeba structure with pseudopodia nucleus food vacuoles contractile vacuole and engulfment of food particle by phagocytosis">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Amoeba — one cell doing everything</text>

      {/* body */}
      <path d="M150 120 q-40 -60 30 -78 q70 -18 120 12 q50 30 20 70 q-20 30 -60 36 q-60 10 -90 -10 q-30 -20 -20 -30 Z" className="fill-current text-sky-500/12" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />

      {/* pseudopodia */}
      <path d="M300 108 q40 -8 60 8" fill="none" strokeWidth="6" strokeLinecap="round" className="stroke-current text-sky-400/60" />
      <path d="M160 60 q-10 -26 12 -40" fill="none" strokeWidth="6" strokeLinecap="round" className="stroke-current text-sky-400/60" />
      <text x="356" y="106" fontSize="9" className="fill-current text-muted-foreground">pseudopodia — locomotion + feeding</text>

      {/* nucleus */}
      <circle cx="240" cy="120" r="18" className="fill-current text-violet-500/40" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="240" y="124" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">nucleus</text>

      {/* food vacuoles */}
      <circle cx="200" cy="90" r="9" className="fill-current text-emerald-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <circle cx="300" cy="140" r="7" className="fill-current text-emerald-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="330" y="150" fontSize="9" className="fill-current text-muted-foreground">food vacuoles — digestion inside</text>

      {/* contractile vacuole */}
      <circle cx="190" cy="150" r="12" className="fill-current text-sky-400/40" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(56 189 248 / 0.95)" }} />
      <text x="120" y="182" fontSize="9" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">contractile vacuole — pumps out excess water (osmoregulation)</text>

      {/* engulfment */}
      <g>
        <path d="M480 110 q-20 -30 10 -44 q30 -12 44 12 q12 22 -12 34 q-26 12 -42 -2 Z" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
        <circle cx="520" cy="96" r="7" className="fill-current text-amber-500/60" />
        <path d="M500 84 q14 -10 26 2" fill="none" strokeWidth="4" strokeLinecap="round" className="stroke-current text-emerald-500" />
        <text x="480" y="150" fontSize="9" className="fill-current text-muted-foreground">phagocytosis: pseudopods wrap the particle</text>
        <text x="480" y="166" fontSize="9" className="fill-current text-muted-foreground">into a food vacuole (endocytosis)</text>
      </g>

      <text x="16" y="230" fontSize="10" className="fill-current text-muted-foreground">No mouth, no organs — the entire surface is the feeding and breathing surface; digestion is intracellular (vacuolar), unlike our extracellular gut digestion.</text>
    </svg>
  );
}
