/** Mushroom structure — pileus, gills, stipe, ring, volva, mycelium. Theme-aware. */
export function MushroomStructure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Mushroom structure with cap pileus gills lamellae stipe annulus ring volva and underground mycelium labelled">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Anatomy of a mushroom (basidiocarp)</text>

      {/* cap */}
      <path d="M180 110 q150 -90 300 0 q-150 26 -300 0 Z" className="fill-current text-rose-500/25" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(190 90 90 / 0.9)" }} />
      <text x="330" y="52" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PILEUS (cap)</text>

      {/* gills */}
      <g className="stroke-current text-stone-500" strokeWidth="2">
        {Array.from({ length: 11 }, (_, i) => (
          <line key={i} x1={210 + i * 24} y1="112" x2={315 + (i - 5) * 3} y2="146" />
        ))}
      </g>
      <text x="500" y="120" fontSize="8.5" className="fill-current text-muted-foreground">GILLS (lamellae) —</text>
      <text x="500" y="134" fontSize="8.5" className="fill-current text-muted-foreground">bear basidia + spores</text>

      {/* stipe */}
      <rect x="310" y="146" width="40" height="100" rx="12" className="fill-current text-stone-400/40" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(168 162 158 / 0.9)" }} />
      <text x="380" y="196" fontSize="9.5" className="fill-current text-foreground" fontWeight="800">STIPE (stalk)</text>

      {/* ring */}
      <ellipse cx="330" cy="176" rx="30" ry="6" className="fill-current text-sky-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="380" y="172" fontSize="8.5" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">ANNULUS (ring) — veil remnant</text>

      {/* volva + mycelium */}
      <path d="M304 246 q26 12 52 0" fill="none" strokeWidth="4" className="stroke-current text-violet-500" />
      <text x="380" y="252" fontSize="8.5" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">VOLVA — cup at the base</text>
      <g className="stroke-current text-amber-600" strokeWidth="2">
        <path d="M330 246 q-30 14 -60 10 M330 246 q30 14 60 10 M330 246 q0 16 4 22" fill="none" />
      </g>
      <text x="100" y="272" fontSize="8.5" className="fill-current text-muted-foreground">underground MYCELIUM — the real body; the mushroom is just its fruit</text>
    </svg>
  );
}
