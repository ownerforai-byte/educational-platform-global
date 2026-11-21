/** Earthworm copulation & cocoon formation — ventral joining, cocoon, young worms. Theme-aware. */
export function EarthwormCopulationCocoon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Earthworm copulation with two worms joined ventrally exchanging sperm and cocoon formation with eggs deposited and young worms hatching">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Hermaphrodites that still mate — copulation & cocoon</text>

      {/* copulation */}
      <g>
        <text x="16" y="56" fontSize="10.5" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">① Copulation (rainy night, 1–3 h)</text>
        <path d="M40 100 q60 -18 130 -14 q70 4 120 0" fill="none" strokeWidth="12" strokeLinecap="round" className="stroke-current text-rose-500/30" />
        <path d="M370 96 q70 -18 140 -12 q60 6 90 8" fill="none" strokeWidth="12" strokeLinecap="round" className="stroke-current text-teal-500/30" />
        <rect x="290" y="78" width="70" height="40" rx="10" className="fill-current text-amber-500/30" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <rect x="290" y="78" width="70" height="40" rx="10" fill="none" strokeWidth="2" strokeDasharray="4 3" className="stroke-current text-teal-600" />
        <text x="325" y="140" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">clitellums aligned head-to-tail; sperm exchanged both ways</text>
        <text x="325" y="156" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">stored in the spermathecae (4 pairs)</text>
      </g>

      {/* cocoon */}
      <g>
        <text x="16" y="196" fontSize="10.5" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="800">② Cocoon formation</text>
        <ellipse cx="120" cy="220" rx="52" ry="20" className="fill-current text-amber-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <text x="120" y="258" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">clitellum secretes the ring → eggs + sperm inside</text>
        <line x1="180" y1="220" x2="240" y2="220" strokeWidth="2.5" className="stroke-current text-foreground" />
        <polygon points="232,214 248,220 232,226" className="fill-current text-foreground" />
        <ellipse cx="320" cy="220" rx="40" ry="18" className="fill-current text-emerald-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="320" y="258" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">cocoon dropped in soil; 1–4 young hatch in 2–3 weeks</text>
        <line x1="368" y1="220" x2="420" y2="220" strokeWidth="2.5" className="stroke-current text-foreground" />
        <polygon points="412,214 428,220 412,226" className="fill-current text-foreground" />
        <path d="M440 210 q40 -10 70 6 q10 8 0 14 q-30 12 -70 0 q-10 -10 0 -20 Z" className="fill-current text-rose-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(190 90 90 / 0.9)" }} />
        <text x="480" y="258" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">no larval stage — a miniature worm emerges</text>
      </g>

      <text x="16" y="278" fontSize="10" className="fill-current text-muted-foreground">Cross-fertilisation despite hermaphroditism — self-fertilisation is prevented by the spacing of male and female openings.</text>
    </svg>
  );
}
