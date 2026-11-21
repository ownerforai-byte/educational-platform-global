/** Aquatic adaptations — primary vs secondary aquatic animals. Theme-aware. */
export function AquaticAdaptations({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Aquatic adaptations with streamlined body swim bladder gills flippers buoyancy and primary versus secondary aquatic animals whale seal dolphin">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Living in water — the engineering brief</text>

      {/* fish side view */}
      <g>
        <rect x="30" y="56" width="380" height="170" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="220" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">The fish solution</text>
        <path d="M90 150 q60 -34 150 -34 q70 0 90 34 q-20 30 -90 30 q-90 0 -150 -30 Z" className="fill-current text-sky-400/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(56 189 248 / 0.9)" }} />
        <path d="M330 150 l34 -16 v32 Z" className="fill-current text-sky-400/60" />
        <ellipse cx="150" cy="118" rx="8" ry="16" transform="rotate(-40 150 118)" className="fill-current text-sky-300/60" />
        <text x="46" y="206" fontSize="8.3" className="fill-current text-muted-foreground">streamlined body · swim bladder for buoyancy · gills for dissolved O₂</text>
        <text x="46" y="222" fontSize="8.3" className="fill-current text-muted-foreground">fins and flippers for push · laterally flattened tail · scales + mucus cut drag</text>
      </g>

      {/* primary vs secondary */}
      <g>
        <rect x="430" y="56" width="210" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="535" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Primary vs secondary</text>
        <text x="446" y="104" fontSize="8.3" className="fill-current text-foreground" fontWeight="700">PRIMARY (never left water)</text>
        <text x="446" y="120" fontSize="8" className="fill-current text-muted-foreground">fish — gills, eggs in water</text>
        <text x="446" y="148" fontSize="8.3" className="fill-current text-foreground" fontWeight="700">SECONDARY (returned)</text>
        <text x="446" y="164" fontSize="8" className="fill-current text-muted-foreground">whale, seal, dolphin, turtle —</text>
        <text x="446" y="180" fontSize="8" className="fill-current text-muted-foreground">lungs, live birth, streamlined</text>
        <text x="446" y="196" fontSize="8" className="fill-current text-muted-foreground">body, fat layer for buoyancy</text>
      </g>
      <text x="16" y="246" fontSize="10" className="fill-current text-muted-foreground">Water gives support for free but takes oxygen and speed — every aquatic trait buys back one of these.</text>
    </svg>
  );
}
