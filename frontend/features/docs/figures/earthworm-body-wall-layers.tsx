/** Earthworm body wall cross-section — layers in order. Well-detailed. Theme-aware. */
export function EarthwormBodyWallLayers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm body wall cross section cuticle epidermis circular longitudinal muscles coelomic epithelium setae layers in order hydration respiration">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The body wall, layer by layer</text>
      {/* arc layers */}
      <rect x="30" y="44" width="330" height="200" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">OUTSIDE → IN</text>
      <path d="M60 230 a135 110 0 0 1 270 0" className="fill-none stroke-current" strokeWidth="7" style={{ color: "rgb(217 119 6 / 0.7)" }} />
      <path d="M75 230 a120 96 0 0 1 240 0" className="fill-none stroke-current" strokeWidth="7" style={{ color: "rgb(16 185 129 / 0.7)" }} />
      <path d="M90 230 a105 82 0 0 1 210 0" className="fill-none stroke-current" strokeWidth="7" style={{ color: "rgb(139 92 246 / 0.7)" }} />
      <path d="M105 230 a90 68 0 0 1 180 0" className="fill-none stroke-current" strokeWidth="7" style={{ color: "rgb(2 132 199 / 0.7)" }} />
      <path d="M120 230 a75 54 0 0 1 150 0" className="fill-none stroke-current" strokeWidth="7" style={{ color: "rgb(244 63 94 / 0.7)" }} />
      <text x="195" y="262" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">cuticle, epidermis, circular muscle, longitudinal muscle, coelomic epithelium</text>
      {/* roles */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY EACH LAYER MATTERS</text>
      {[
        "cuticle: thin, moist, permeable —",
        "  gas exchange happens here",
        "epidermis: mucus glands keep the",
        "  surface slippery",
        "circular muscle: contracts to",
        "  stretch the segment forward",
        "longitudinal muscle: contracts to",
        "  pull the segment short",
        "coelomic epithelium: lines the",
        "  fluid-filled coelom",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 19} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name the five layers in order — and remember respiration happens across the first two.</text>
    </svg>
  );
}
