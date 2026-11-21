/** Earthworm setae & locomotion — S-shaped peristalsis with alternating anchor. Theme-aware. */
export function EarthwormSetaeLocomotion({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Earthworm locomotion showing S shaped movement with setae anchoring extended and contracted segments and circular and longitudinal muscles alternating">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Locomotion — grip, stretch, grip, pull</text>

      {/* three-phase worm */}
      <g>
        <path d="M40 90 q60 -16 120 0" fill="none" strokeWidth="14" strokeLinecap="round" className="stroke-current text-rose-500/40" />
        <text x="100" y="70" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">① setae OUT (anchor front)</text>
      </g>
      <g>
        <path d="M200 90 q30 -26 60 0 q30 26 60 0" fill="none" strokeWidth="14" strokeLinecap="round" className="stroke-current text-rose-500/60" />
        <text x="260" y="56" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">② circular muscles contract — body extends forward</text>
      </g>
      <g>
        <path d="M360 90 q60 16 120 0" fill="none" strokeWidth="20" strokeLinecap="round" className="stroke-current text-rose-500/80" />
        <text x="420" y="128" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">③ longitudinal muscles contract — body shortens &amp; pulls</text>
      </g>

      {/* setae zoom */}
      <g>
        <rect x="40" y="160" width="240" height="80" rx="10" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="56" y="184" fontSize="9.5" className="fill-current text-foreground" fontWeight="800">Setae zoom-in</text>
        <path d="M80 220 q14 -26 30 -30 M120 222 q14 -26 30 -30 M160 220 q14 -26 30 -30" fill="none" strokeWidth="3" strokeLinecap="round" className="stroke-current text-sky-600" />
        <text x="200" y="200" fontSize="8" className="fill-current text-muted-foreground">S-shaped chitinous setae</text>
        <text x="200" y="214" fontSize="8" className="fill-current text-muted-foreground">80–120 per segment,</text>
        <text x="200" y="228" fontSize="8" className="fill-current text-muted-foreground">retracted by protractor muscles</text>
      </g>

      {/* muscle alternation */}
      <g>
        <rect x="310" y="160" width="310" height="80" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="326" y="184" fontSize="9.5" className="fill-current text-foreground" fontWeight="800">Muscle alternation (antagonistic)</text>
        <text x="326" y="204" fontSize="8.5" className="fill-current text-muted-foreground">circular contract → segment thin &amp; long (pushes)</text>
        <text x="326" y="222" fontSize="8.5" className="fill-current text-muted-foreground">longitudinal contract → segment fat &amp; short (pulls)</text>
        <text x="326" y="238" fontSize="8.5" className="fill-current text-muted-foreground">coelomic fluid acts as a hydrostatic skeleton</text>
      </g>
    </svg>
  );
}
