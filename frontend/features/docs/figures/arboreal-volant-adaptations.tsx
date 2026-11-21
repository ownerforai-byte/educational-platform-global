/** Arboreal vs volant adaptations — climbing vs flight. Theme-aware. */
export function ArborealVolantAdaptations({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Arboreal climbing adaptations opposable thumbs prehensile tail binocular vision versus volant flight adaptations wings patagium pneumatic bones keel air sacs">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Climbers vs flyers — the gravity problem</text>

      {/* arboreal */}
      <g>
        <rect x="30" y="56" width="290" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="175" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ARBOREAL — tree-living</text>
        <line x1="60" y1="150" x2="290" y2="130" strokeWidth="6" className="stroke-current text-emerald-700" />
        <ellipse cx="170" cy="126" rx="40" ry="20" className="fill-current text-amber-500/50" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <circle cx="212" cy="112" r="12" className="fill-current text-amber-500/60" />
        <path d="M132 136 q-24 26 -6 40 q20 -4 24 -30 Z" className="fill-current text-amber-500/60" />
        <text x="46" y="200" fontSize="8.3" className="fill-current text-muted-foreground">opposable thumbs, grasping hands/feet</text>
        <text x="46" y="216" fontSize="8.3" className="fill-current text-muted-foreground">prehensile tail · binocular vision · padded soles (squirrel, sloth)</text>
      </g>

      {/* volant */}
      <g>
        <rect x="340" y="56" width="290" height="170" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="485" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">VOLANT — flight</text>
        <path d="M420 140 q50 -40 110 -20 q-16 26 -60 30 q-36 4 -50 -10 Z" className="fill-current text-sky-400/50" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(56 189 248 / 0.9)" }} />
        <circle cx="416" cy="146" r="9" className="fill-current text-sky-400/70" />
        <text x="356" y="200" fontSize="8.3" className="fill-current text-muted-foreground">forelimbs → wings (feathered bird; patagium in bat)</text>
        <text x="356" y="216" fontSize="8.3" className="fill-current text-muted-foreground">hollow pneumatic bones · keel + flight muscles · air sacs</text>
      </g>
      <text x="16" y="246" fontSize="10" className="fill-current text-muted-foreground">Both beat gravity, differently: the climber grips and judges distance; the flyer goes light, powerful and streamlined.</text>
    </svg>
  );
}
