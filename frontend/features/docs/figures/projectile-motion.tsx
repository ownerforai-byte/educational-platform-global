/**
 * Projectile motion — parabolic path with the velocity vector split into
 * constant horizontal and changing vertical components. Theme-aware.
 */
export function ProjectileMotion({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 380" className={className} role="img" aria-label="Projectile trajectory parabola with horizontal and vertical velocity components and maximum height">
      {/* ground */}
      <line x1="40" y1="320" x2="612" y2="320" strokeWidth="2" className="stroke-current text-muted-foreground" />
      {/* axes */}
      <line x1="64" y1="330" x2="64" y2="40" strokeWidth="1.5" className="stroke-current text-muted-foreground" />
      <text x="46" y="48" fontSize="12" className="fill-current text-muted-foreground" fontWeight="700">y</text>
      <text x="596" y="344" fontSize="12" className="fill-current text-muted-foreground" fontWeight="700">x</text>

      {/* trajectory: from (64,320) to (560,320) apex at (312,90) */}
      <path d="M 64 320 Q 312 -6 560 320" fill="none" strokeWidth="3" className="stroke-current text-primary" />
      <text x="380" y="120" fontSize="13" className="fill-current text-primary" fontWeight="700">y = x tanθ − gx²/(2u²cos²θ)</text>

      {/* launch velocity vector */}
      <line x1="64" y1="320" x2="150" y2="232" strokeWidth="3" className="stroke-current text-amber-500" />
      <polygon points="142,222 158,230 146,242" className="fill-current text-amber-500" />
      <text x="90" y="286" fontSize="12.5" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="700">u</text>
      {/* launch angle arc */}
      <path d="M 110 320 A 46 46 0 0 0 96 288" fill="none" strokeWidth="1.5" className="stroke-current text-amber-500" />
      <text x="118" y="306" fontSize="12" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="700">θ</text>

      {/* apex with zero vertical velocity marker */}
      <circle cx="312" cy="90" r="6" className="fill-current text-rose-500" />
      <line x1="312" y1="90" x2="312" y2="320" strokeWidth="1.5" strokeDasharray="6 5" className="stroke-current text-muted-foreground" />
      <line x1="312" y1="90" x2="392" y2="90" strokeWidth="3" className="stroke-current text-emerald-500" />
      <polygon points="384,84 400,90 384,96" className="fill-current text-emerald-500" />
      <text x="404" y="94" fontSize="12" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">u cos θ (v_y = 0)</text>
      <text x="240" y="84" fontSize="12" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">H = u²sin²θ / 2g</text>

      {/* component decomposition mid-flight on the descent */}
      <circle cx="470" cy="204" r="5" className="fill-current text-foreground" />
      <line x1="470" y1="204" x2="530" y2="204" strokeWidth="2.5" className="stroke-current text-emerald-500" />
      <polygon points="524,198 540,204 524,210" className="fill-current text-emerald-500" />
      <line x1="470" y1="204" x2="470" y2="252" strokeWidth="2.5" className="stroke-current text-rose-500" />
      <polygon points="464,246 470,262 476,246" className="fill-current text-rose-500" />
      <text x="544" y="200" fontSize="11" className="fill-current text-emerald-700 dark:text-emerald-300">v_x constant</text>
      <text x="482" y="256" fontSize="11" className="fill-current text-rose-700 dark:text-rose-300">v_y = gt</text>

      {/* range double arrow */}
      <line x1="64" y1="348" x2="560" y2="348" strokeWidth="2" className="stroke-current text-violet-500" />
      <polygon points="64,342 48,348 64,354" className="fill-current text-violet-500" />
      <polygon points="560,342 576,348 560,354" className="fill-current text-violet-500" />
      <text x="312" y="370" fontSize="12.5" textAnchor="middle" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">R = u² sin 2θ / g — maximum at θ = 45°</text>
    </svg>
  );
}
