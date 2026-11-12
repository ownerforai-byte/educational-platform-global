/**
 * Snell's-law ray diagram — a ray crossing the boundary between two media.
 * Theme-aware: all strokes use currentColor; colors set via Tailwind classes.
 */
export function SnellsLawRayDiagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 360" className={className} role="img" aria-label="Refraction of a ray at the boundary between two media">
      {/* media backgrounds */}
      <rect x="0" y="0" width="640" height="170" className="fill-sky-500/10" />
      <rect x="0" y="170" width="640" height="190" className="fill-sky-500/25" />
      <text x="18" y="30" fontSize="14" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="600">Medium 1 (n₁) — rarer (air)</text>
      <text x="18" y="330" fontSize="14" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="600">Medium 2 (n₂) — denser (glass), n₂ &gt; n₁</text>

      {/* boundary + normal */}
      <line x1="0" y1="170" x2="640" y2="170" strokeWidth="2" className="stroke-current text-foreground" />
      <line x1="320" y1="20" x2="320" y2="330" strokeWidth="1.5" strokeDasharray="7 6" className="stroke-current text-muted-foreground" />
      <text x="328" y="34" fontSize="12" className="fill-current text-muted-foreground">normal</text>

      {/* angles arcs */}
      <path d="M 320 110 A 60 60 0 0 0 262 138" fill="none" strokeWidth="1.5" className="stroke-current text-amber-500" />
      <text x="272" y="106" fontSize="14" className="fill-current text-amber-600 dark:text-amber-400" fontWeight="700">i</text>
      <path d="M 320 240 A 70 70 0 0 1 371 266" fill="none" strokeWidth="1.5" className="stroke-current text-emerald-500" />
      <text x="378" y="252" fontSize="14" className="fill-current text-emerald-600 dark:text-emerald-400" fontWeight="700">r</text>

      {/* incident ray (arrow at midpoint) */}
      <line x1="120" y1="40" x2="320" y2="170" strokeWidth="3" className="stroke-current text-amber-500" />
      <polygon points="238,118 258,131 244,110" className="fill-current text-amber-500" />
      <text x="96" y="60" fontSize="13" className="fill-current text-amber-600 dark:text-amber-400" fontWeight="600">incident ray</text>

      {/* refracted ray (bends toward normal: r < i) */}
      <line x1="320" y1="170" x2="392" y2="330" strokeWidth="3" className="stroke-current text-emerald-500" />
      <polygon points="356,252 380,276 372,250" className="fill-current text-emerald-500" />
      <text x="402" y="310" fontSize="13" className="fill-current text-emerald-600 dark:text-emerald-400" fontWeight="600">refracted ray</text>

      {/* faint reflected ray */}
      <line x1="320" y1="170" x2="500" y2="62" strokeWidth="1.5" strokeDasharray="5 5" className="stroke-current text-muted-foreground" />
      <text x="508" y="58" fontSize="12" className="fill-current text-muted-foreground">partial reflection</text>

      {/* law annotation */}
      <g>
        <rect x="430" y="180" width="190" height="54" rx="10" className="fill-current text-card" stroke="currentColor" style={{ color: "rgb(0 0 0 / 0.12)" }} />
        <text x="446" y="203" fontSize="14" className="fill-current text-foreground" fontWeight="700">n₁ sin i = n₂ sin r</text>
        <text x="446" y="222" fontSize="11" className="fill-current text-muted-foreground">i &gt; r when n₂ &gt; n₁</text>
      </g>
    </svg>
  );
}
