/**
 * Xerophyte adaptations — cactus and other desert plants: thick cuticle,
 * spines, CAM, succulent stem, deep roots. Theme-aware via currentColor.
 */
export function XerophyteAdaptations({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Xerophyte adaptations showing a cactus with succulent water storing stem spines deep roots thick cuticle and CAM metabolism annotations">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Xerophytes — engineered against drought</text>

      {/* cactus */}
      <g>
        <rect x="120" y="90" width="56" height="140" rx="26" className="fill-current text-emerald-500/25" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <rect x="90" y="130" width="34" height="20" rx="10" className="fill-current text-emerald-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <rect x="172" y="150" width="34" height="20" rx="10" className="fill-current text-emerald-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <g className="stroke-current text-emerald-800" strokeWidth="2">
          <line x1="132" y1="100" x2="132" y2="88" /><line x1="148" y1="100" x2="148" y2="88" /><line x1="164" y1="100" x2="164" y2="88" />
          <line x1="132" y1="130" x2="132" y2="118" /><line x1="164" y1="130" x2="164" y2="118" /><line x1="148" y1="160" x2="148" y2="148" /><line x1="132" y1="190" x2="132" y2="178" /><line x1="164" y1="190" x2="164" y2="178" />
        </g>
        <path d="M148 230 q-20 34 -34 44 M148 230 q20 34 34 44 M148 230 q0 40 0 48" fill="none" strokeWidth="3" className="stroke-current text-amber-700" />
      </g>

      {/* labels */}
      {[
        { y: 70, t: "leaves reduced to spines → no transpiration surface", x: 240 },
        { y: 100, t: "thick cuticle + sunken stomata → water stays in", x: 240 },
        { y: 130, t: "succulent stem stores water ( mucilage )", x: 240 },
        { y: 160, t: "CAM metabolism: stomata open only at night", x: 240 },
        { y: 190, t: "wide shallow + deep root system snares rare rain", x: 240 },
        { y: 220, t: "waxy ridges shade the stem, cut wind speed", x: 240 },
      ].map((l) => (
        <text key={l.y} x={l.x} y={l.y} fontSize="9.5" className="fill-current text-muted-foreground">• {l.t}</text>
      ))}

      <text x="240" y="252" fontSize="9.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">Examples: Opuntia, Euphorbia, Aloe, Casuarina (needle leaves)</text>
      <text x="16" y="284" fontSize="10" className="fill-current text-muted-foreground">The logic inverts the hydrophyte's: water is scarce, so every surface is a defence. Root : shoot ratio rises; leaf area falls.</text>
    </svg>
  );
}
