/**
 * Concave (diverging) mirror — parallel rays spread out after reflection, so
 * the virtual focus sits behind the mirror. Companion to the mirror-formula
 * topic. Theme-aware via currentColor.
 */
export function ConcaveMirrorRays({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 380" className={className} role="img" aria-label="Concave mirror reflecting parallel rays so they diverge from a virtual focus behind the mirror">
      {/* principal axis */}
      <line x1="20" y1="190" x2="600" y2="190" strokeWidth="1.5" className="stroke-current text-muted-foreground" />

      {/* mirror surface: bulges toward the incoming light (concave toward left) */}
      <path d="M 200 70 C 150 120 150 260 200 310" fill="none" strokeWidth="4" className="stroke-current text-sky-500" />
      {/* hatching on the back of the mirror */}
      {Array.from({ length: 9 }).map((_, i) => {
        const y = 84 + i * 27;
        return <line key={i} x1="200" y1={y} x2="216" y2={y + 10} strokeWidth="2" className="stroke-current text-sky-400" />;
      })}
      <text x="228" y="86" fontSize="12" className="fill-current text-sky-600 dark:text-sky-400" fontWeight="700">concave mirror</text>

      {/* pole P, focus F (behind, virtual), centre of curvature C (behind) */}
      <circle cx="200" cy="190" r="4" className="fill-current text-foreground" />
      <text x="200" y="212" fontSize="12" textAnchor="middle" className="fill-current text-muted-foreground" fontWeight="700">P (pole)</text>
      <circle cx="280" cy="190" r="4" className="fill-current text-rose-500" />
      <text x="280" y="176" fontSize="12" textAnchor="middle" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">F (virtual)</text>
      <circle cx="360" cy="190" r="4" className="fill-current text-muted-foreground" />
      <text x="360" y="176" fontSize="12" textAnchor="middle" className="fill-current text-muted-foreground" fontWeight="700">C</text>

      {/* incoming parallel rays */}
      {[
        { y: 110, r: 240 },
        { y: 150, r: 260 },
        { y: 230, r: 260 },
        { y: 270, r: 240 },
      ].map((ray, i) => (
        <g key={i}>
          <line x1="20" y1={ray.y} x2="192" y2={ray.y} strokeWidth="2" className="stroke-current text-amber-500" />
          <polygon points={`${146},${ray.y - 6} 160,${ray.y} 146,${ray.y + 6}`} className="fill-current text-amber-500" />
          {/* reflected ray diverges as if it came from F */}
          <line x1="192" y1={ray.y} x2={ray.r} y2={ray.y - (ray.y - 190) * 1.35} strokeWidth="2" className="stroke-current text-emerald-500" />
          {/* backward extension (dashed) to F */}
          <line x1="192" y1={ray.y} x2="280" y2="190" strokeWidth="1.5" strokeDasharray="6 5" className="stroke-current text-muted-foreground" />
        </g>
      ))}

      <text x="24" y="88" fontSize="12" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="700">parallel rays in</text>
      <text x="380" y="112" fontSize="12" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">diverging reflected rays</text>
      <text x="380" y="130" fontSize="11" className="fill-current text-muted-foreground">appear to come from F behind the mirror</text>

      {/* rule box */}
      <g>
        <rect x="40" y="326" width="560" height="42" rx="10" className="fill-current text-card" stroke="currentColor" style={{ color: "rgb(0 0 0 / 0.12)" }} />
        <text x="60" y="343" fontSize="12" className="fill-current text-foreground" fontWeight="700">1/u + 1/v = 1/f with f &lt; 0 for a concave mirror</text>
        <text x="60" y="360" fontSize="11" className="fill-current text-muted-foreground">Always a virtual, erect, diminished image whatever the object distance.</text>
      </g>
    </svg>
  );
}
