/** Lichen growth forms — crustose, foliose, fruticose. Theme-aware. */
export function LichenGrowthForms({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Three lichen growth forms crustose flat crust foliose leafy lobes and fruticose shrubby branches with examples">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three growth forms — how it grips the world</text>

      {/* crustose */}
      <g>
        <rect x="30" y="70" width="180" height="110" rx="10" className="fill-current text-stone-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
        <path d="M50 150 q20 -50 60 -40 q30 8 40 30 q10 16 -20 18 q-50 4 -80 -8 Z" className="fill-current text-lime-600/50" />
        <text x="120" y="200" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CRUSTOSE — flat crust</text>
        <text x="120" y="216" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground"> cemented to rock, unremovable</text>
      </g>

      {/* foliose */}
      <g>
        <rect x="240" y="70" width="180" height="110" rx="10" className="fill-current text-stone-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
        <path d="M260 150 q20 -40 60 -30 q40 10 70 20 q-20 16 -60 14 q-40 -2 -70 -4 Z" className="fill-current text-lime-500/60" />
        <text x="330" y="200" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FOLIOSE — leafy lobes</text>
        <text x="330" y="216" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground"> peels off the surface (Parmelia)</text>
      </g>

      {/* fruticose */}
      <g>
        <rect x="450" y="70" width="180" height="110" rx="10" className="fill-current text-stone-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
        <g className="stroke-current text-lime-600" strokeWidth="4" strokeLinecap="round">
          <line x1="540" y1="170" x2="540" y2="100" /><line x1="540" y1="130" x2="516" y2="106" /><line x1="540" y1="120" x2="564" y2="98" />
        </g>
        <text x="540" y="200" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FRUTICOSE — shrubby</text>
        <text x="540" y="216" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground"> upright or hanging (Usnea)</text>
      </g>
      <text x="16" y="234" fontSize="10" className="fill-current text-muted-foreground">Form follows attachment: glued flat → loosely leafed → freely branching, with drying risk increasing in the same order.</text>
    </svg>
  );
}
