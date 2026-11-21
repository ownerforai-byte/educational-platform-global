/** Cursorial vs fossorial adaptations — running vs burrowing. Theme-aware. */
export function CursorialFossorialAdaptations({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Cursorial running adaptations long limbs reduced digits hoof digitigrade cheetah versus fossorial burrowing adaptations strong claws reduced eyes vibrissae mole">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Runners vs diggers — two terrestrial solutions</text>

      {/* cursorial */}
      <g>
        <rect x="30" y="56" width="290" height="170" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <text x="175" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CURSORIAL — built for speed</text>
        <path d="M100 180 l30 -60 l14 2 l-6 58 Z M150 182 l22 -58 l14 2 l-2 56 Z" className="fill-current text-amber-400/50" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(252 211 77 / 0.9)" }} />
        <ellipse cx="150" cy="106" rx="46" ry="22" className="fill-current text-amber-400/40" />
        <circle cx="196" cy="96" r="13" className="fill-current text-amber-400/60" />
        <text x="46" y="200" fontSize="8.3" className="fill-current text-muted-foreground">long slender limbs, digits reduced to one hoof</text>
        <text x="46" y="216" fontSize="8.3" className="fill-current text-muted-foreground">digitigrade/unguligrade stance · light frame, flexible spine (cheetah)</text>
      </g>

      {/* fossorial */}
      <g>
        <rect x="340" y="56" width="290" height="170" rx="12" className="fill-current text-stone-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
        <text x="485" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FOSSORIAL — built for digging</text>
        <ellipse cx="470" cy="150" rx="60" ry="24" className="fill-current text-stone-400/50" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(168 162 158 / 0.9)" }} />
        <circle cx="530" cy="146" r="14" className="fill-current text-stone-400/60" />
        <path d="M410 158 l-26 8 l26 8 Z" className="fill-current text-stone-500/60" />
        <text x="356" y="200" fontSize="8.3" className="fill-current text-muted-foreground">short powerful forelimbs, strong claws (mole)</text>
        <text x="356" y="216" fontSize="8.3" className="fill-current text-muted-foreground">cylindrical body · reduced eyes · sensitive vibrissae</text>
      </g>
      <text x="16" y="246" fontSize="10" className="fill-current text-muted-foreground">Same habitat, opposite briefs: open ground rewards legs; underground rewards shovels — and punishes eyes.</text>
    </svg>
  );
}
