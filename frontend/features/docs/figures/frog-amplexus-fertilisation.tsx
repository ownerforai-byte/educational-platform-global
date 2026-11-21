/** Frog amplexus & fertilisation — male clasps female, external fertilisation in water. Theme-aware. */
export function FrogAmplexusFertilisation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Amplexus with male frog clasping female back releasing sperm as eggs are laid in water followed by external fertilisation and jelly coated egg mass">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Amplexus — external fertilisation, perfectly timed</text>

      {/* pond */}
      <path d="M20 150 Q200 135 380 150 T640 150 L640 230 L20 230 Z" className="fill-current text-sky-500/15" stroke="none" />

      {/* male on female back */}
      <ellipse cx="330" cy="140" rx="80" ry="24" className="fill-current text-emerald-500/25" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <ellipse cx="330" cy="116" rx="56" ry="16" className="fill-current text-amber-500/30" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <circle cx="378" cy="108" r="6" className="fill-current text-amber-400/80" />
      <text x="330" y="180" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">male (smaller, nuptial pads on thumbs) grips the female's back</text>

      {/* eggs */}
      <g>
        {[[480, 180], [500, 190], [520, 180], [490, 200], [510, 202], [530, 196]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" className="fill-current text-slate-800/50" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(60 60 60 / 0.6)" }} />
        ))}
        <text x="510" y="224" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">eggs laid in jelly strings</text>
      </g>

      {/* sperm release */}
      <g className="stroke-current text-sky-500" strokeWidth="1.5">
        <path d="M410 150 q20 20 44 26" fill="none" strokeDasharray="3 3" />
      </g>
      <text x="420" y="130" fontSize="8.5" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">male releases milt over the eggs as they emerge</text>

      {/* fertilisation note */}
      <rect x="40" y="60" width="180" height="60" rx="10" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="50" y="82" fontSize="9" className="fill-current text-foreground" fontWeight="800">EXTERNAL fertilisation:</text>
      <text x="50" y="100" fontSize="8.5" className="fill-current text-muted-foreground">egg + sperm meet in water;</text>
      <text x="50" y="114" fontSize="8.5" className="fill-current text-muted-foreground">amplexus synchronises the releases</text>

      <text x="16" y="252" fontSize="10" className="fill-current text-muted-foreground">No copulation organ — fertilisation happens in water. Hundreds of eggs because survival odds are low (r-strategy), unlike internal fertilisers.</text>
    </svg>
  );
}
