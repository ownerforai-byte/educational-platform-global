/** Germ layers — diploblastic vs triploblastic cross-sections. Theme-aware. */
export function GermLayers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Diploblastic two layer body wall of cnidarians versus triploblastic three layer arrangement of flatworms to humans with ectoderm mesoderm and endoderm labelled">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Germ layers — how many sheets build the body</text>

      {/* diploblastic */}
      <g>
        <circle cx="170" cy="130" r="70" className="fill-current text-sky-500/10" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <circle cx="170" cy="130" r="52" fill="none" strokeWidth="10" className="stroke-current text-emerald-500/40" />
        <text x="170" y="60" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DIPLOBLASTIC (2 layers)</text>
        <text x="170" y="228" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">ectoderm outside, endoderm inside,</text>
        <text x="170" y="242" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">mesoglea between — cnidarians only</text>
      </g>

      {/* triploblastic */}
      <g>
        <circle cx="480" cy="130" r="70" className="fill-current text-sky-500/10" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <circle cx="480" cy="130" r="52" fill="none" strokeWidth="9" className="stroke-current text-rose-500/40" />
        <circle cx="480" cy="130" r="34" fill="none" strokeWidth="9" className="stroke-current text-amber-500/40" />
        <text x="480" y="60" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TRIPOBLASTIC (3 layers)</text>
        <text x="580" y="112" fontSize="8.5" className="fill-current text-muted-foreground">ectoderm → skin, nerves</text>
        <text x="580" y="130" fontSize="8.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">mesoderm → muscles, blood</text>
        <text x="580" y="148" fontSize="8.5" className="fill-current text-amber-600 dark:text-amber-400" fontWeight="700">endoderm → gut lining</text>
        <text x="480" y="228" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">flatworms onward — mesoderm enables organs</text>
      </g>

      <text x="16" y="258" fontSize="10" className="fill-current text-muted-foreground">The mesoderm is evolution's big move: with a third layer comes muscle, blood and true organs — complexity becomes possible.</text>
    </svg>
  );
}
