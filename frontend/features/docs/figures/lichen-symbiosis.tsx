/** Lichen symbiosis cross-section — fungus + alga partnership. Theme-aware. */
export function LichenSymbiosis({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Lichen cross section with upper cortex algal layer fungal hyphae medulla and lower cortex showing mycobiont and phycobiont partnership">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two organisms, one body — the lichen slice</text>

      {/* thallus cross-section */}
      <rect x="120" y="60" width="380" height="130" rx="10" className="fill-current text-stone-400/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(168 162 158 / 0.9)" }} />
      <rect x="120" y="60" width="380" height="18" rx="8" className="fill-current text-stone-500/50" />
      <text x="520" y="74" fontSize="8.5" className="fill-current text-muted-foreground">upper cortex (protects)</text>
      {/* algal layer */}
      <g>
        {[[160, 96], [200, 92], [240, 98], [280, 94], [320, 96], [360, 92], [400, 98], [440, 94]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="7" className="fill-current text-emerald-500/60" />
        ))}
      </g>
      <text x="520" y="98" fontSize="8.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">algal layer (phycobiont)</text>
      {/* medulla hyphae */}
      <g className="stroke-current text-amber-600/70" strokeWidth="1.5">
        <path d="M140 130 q40 10 80 0 q40 -8 80 4 q40 10 80 -2 q40 -8 80 2" fill="none" />
        <path d="M140 150 q40 -8 80 4 q40 10 80 -2 q40 -10 80 2 q40 8 80 -2" fill="none" />
      </g>
      <text x="520" y="140" fontSize="8.5" className="fill-current text-muted-foreground">medulla (loose hyphae)</text>
      <rect x="120" y="170" width="380" height="18" rx="8" className="fill-current text-stone-500/50" />
      <text x="520" y="184" fontSize="8.5" className="fill-current text-muted-foreground">lower cortex + rhizines</text>

      {/* deal */}
      <rect x="30" y="206" width="600" height="40" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="46" y="224" fontSize="9" className="fill-current text-foreground" fontWeight="700">The deal: alga photosynthesises → sugars for both; fungus absorbs water & minerals, shields the alga from drying and UV</text>
      <text x="46" y="240" fontSize="8.5" className="fill-current text-muted-foreground">mycobiont (fungus, usually Ascomycete) + phycobiont (green alga or cyanobacterium)</text>
    </svg>
  );
}
