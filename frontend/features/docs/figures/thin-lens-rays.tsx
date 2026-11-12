/**
 * Thin-lens ray diagram — three construction rays for a converging lens
 * forming a real, inverted image beyond 2F. Ray bends at the lens plane.
 * Theme-aware via currentColor.
 */
export function ThinLensRays({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 380" className={className} role="img" aria-label="Ray diagram for a converging lens with object between F and 2F forming a real inverted image beyond 2F">
      {/* principal axis */}
      <line x1="20" y1="190" x2="620" y2="190" strokeWidth="1.5" className="stroke-current text-muted-foreground" />

      {/* lens (biconvex) */}
      <path d="M 300 60 C 340 120 340 260 300 320 C 260 260 260 120 300 60 Z" fill="none" strokeWidth="3" className="stroke-current text-sky-500" />
      <line x1="300" y1="56" x2="300" y2="324" strokeWidth="0" />
      <text x="300" y="46" fontSize="12" textAnchor="middle" className="fill-current text-sky-600 dark:text-sky-400" fontWeight="700">converging lens</text>

      {/* focal points: F on both sides at ±140 from lens; 2F at ±280 */}
      {[
        { x: 160, l: "F" },
        { x: 20, l: "" },
        { x: 440, l: "F′" },
        { x: 580, l: "2F′" },
      ].map((p) =>
        p.l ? (
          <g key={p.l}>
            <circle cx={p.x} cy="190" r="4" className="fill-current text-foreground" />
            <text x={p.x} y="212" fontSize="12" textAnchor="middle" className="fill-current text-muted-foreground" fontWeight="700">{p.l}</text>
          </g>
        ) : null,
      )}
      <circle cx="20" cy="190" r="4" className="fill-current text-foreground" />
      <text x="20" y="212" fontSize="12" textAnchor="middle" className="fill-current text-muted-foreground" fontWeight="700">2F</text>
      <text x="160" y="212" fontSize="12" textAnchor="middle" className="fill-current text-muted-foreground">F</text>
      <text x="440" y="212" fontSize="12" textAnchor="middle" className="fill-current text-muted-foreground">F′</text>
      <text x="580" y="212" fontSize="12" textAnchor="middle" className="fill-current text-muted-foreground">2F′</text>

      {/* object arrow (upright) between 2F and F */}
      <line x1="90" y1="190" x2="90" y2="112" strokeWidth="3.5" className="stroke-current text-emerald-500" />
      <polygon points="84,120 90,104 96,120" className="fill-current text-emerald-500" />
      <text x="90" y="298" fontSize="12" textAnchor="middle" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">object</text>
      <text x="90" y="314" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">between F and 2F</text>

      {/* ray 1: parallel to axis, then through F′ */}
      <line x1="90" y1="112" x2="300" y2="112" strokeWidth="2" className="stroke-current text-amber-500" />
      <line x1="300" y1="112" x2="440" y2="190" strokeWidth="2" className="stroke-current text-amber-500" />
      <line x1="440" y1="190" x2="560" y2="257" strokeWidth="2" strokeDasharray="0" className="stroke-current text-amber-500" />

      {/* ray 2: through optical centre, undeviated */}
      <line x1="90" y1="112" x2="300" y2="190" strokeWidth="2" className="stroke-current text-violet-500" />
      <line x1="300" y1="190" x2="560" y2="257" strokeWidth="2" className="stroke-current text-violet-500" />

      {/* ray 3: through F on the left, emerges parallel */}
      <line x1="90" y1="112" x2="160" y2="190" strokeWidth="2" className="stroke-current text-rose-500" />
      <line x1="160" y1="190" x2="300" y2="252" strokeWidth="2" className="stroke-current text-rose-500" />
      <line x1="300" y1="252" x2="560" y2="252" strokeWidth="2" className="stroke-current text-rose-500" />

      {/* image arrow (inverted) beyond 2F′ */}
      <line x1="560" y1="190" x2="560" y2="257" strokeWidth="3.5" className="stroke-current text-orange-500" />
      <polygon points="554,249 560,267 566,249" className="fill-current text-orange-500" />
      <text x="548" y="292" fontSize="12" textAnchor="middle" className="fill-current text-orange-700 dark:text-orange-300" fontWeight="700">real, inverted image</text>
      <text x="548" y="308" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">beyond 2F′ · enlarged</text>

      {/* rule box */}
      <g>
        <rect x="20" y="332" width="600" height="38" rx="10" className="fill-current text-card" stroke="currentColor" style={{ color: "rgb(0 0 0 / 0.12)" }} />
        <text x="38" y="356" fontSize="12" className="fill-current text-foreground" fontWeight="700">1/u + 1/v = 1/f</text>
        <text x="196" y="356" fontSize="12" className="fill-current text-muted-foreground">·</text>
        <text x="210" y="356" fontSize="12" className="fill-current text-foreground" fontWeight="700">m = −v/u</text>
        <text x="310" y="356" fontSize="12" className="fill-current text-muted-foreground">object past F → convergent rays give a real image</text>
      </g>
    </svg>
  );
}
