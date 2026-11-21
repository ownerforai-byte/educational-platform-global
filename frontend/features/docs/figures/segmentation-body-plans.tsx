/** Segmentation & body plans — metameres in earthworm, tagmata in arthropod. Theme-aware. */
export function SegmentationBodyPlans({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Segmentation showing true metameres repeated in earthworm and tagmatization into head thorax abdomen in an insect">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Segmentation — repeating yourself to advantage</text>

      {/* earthworm metameres */}
      <g>
        <text x="16" y="56" fontSize="10.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">TRUE (metameric) segmentation — Annelida</text>
        {Array.from({ length: 10 }, (_, i) => (
          <g key={i}>
            <ellipse cx={70 + i * 42} cy="100" rx="20" ry="16" className="fill-current text-emerald-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
            <line x1={50 + i * 42} y1="100" x2={90 + i * 42} y2="100" strokeWidth="1" strokeDasharray="2 2" className="stroke-current text-emerald-600/60" />
          </g>
        ))}
        <text x="16" y="146" fontSize="8.5" className="fill-current text-muted-foreground">each segment repeats coelom, nephridia, nerves — damage one, the rest survive; specialisation follows (clitellum)</text>
      </g>

      {/* arthropod tagmata */}
      <g>
        <text x="16" y="186" fontSize="10.5" className="fill-current text-rose-700 dark:text-rose-300" fontWeight="800">TAGMATISATION — Arthropoda (segments fused into units)</text>
        <ellipse cx="140" cy="220" rx="46" ry="20" className="fill-current text-rose-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <text x="140" y="224" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">head</text>
        <ellipse cx="270" cy="220" rx="56" ry="22" className="fill-current text-amber-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <text x="270" y="224" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">thorax (legs + wings)</text>
        <ellipse cx="430" cy="220" rx="80" ry="22" className="fill-current text-violet-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
        <text x="430" y="224" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">abdomen</text>
      </g>

      <text x="16" y="256" fontSize="10" className="fill-current text-muted-foreground">Segmentation first repeats, then specialises: annelids keep the repeat, arthropods fuse repeats into working divisions.</text>
    </svg>
  );
}
