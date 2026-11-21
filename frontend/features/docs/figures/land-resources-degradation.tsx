/** Land resources degradation — topsoil's slow bankruptcy. Well-detailed. Theme-aware. */
export function LandResourcesDegradation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Land resources degradation topsoil formation centuries erosion loss terracing slash burn khoriya overgrazing salinisation irrigation waterlogging landslide Nepal slopes soil conservation contour bunds fallow">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Land degradation — topsoil's slow bankruptcy</text>
      {/* accounts */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-stone-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE ASYMMETRY</text>
      {[
        "formation: ~1 cm of topsoil takes",
        "  centuries of weathering and",
        "  biology",
        "loss: one bad monsoon can strip",
        "  centimetres from a bare slope",
        "drivers: deforestation, overgrazing,",
        "  steep farming without terraces,",
        "  repeated khoriya burning",
        "irrigation without drainage adds",
        "  salinisation and waterlogging",
        "in Nepal, terraces are both the",
        "  solution and the risk —",
        "  unmaintained, they fail",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* conservation */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">KEEPING THE SOIL</text>
      {[
        "terracing and contour bunds on",
        "  slopes — slow the water down",
        "cover crops and fallow periods",
        "  rebuild organic matter",
        "agroforestry: roots hold soil,",
        "  canopy buffers rain impact",
        "controlled grazing with stocking",
        "  limits",
        "windbreaks where wind erodes",
        "the principle: keep a living",
        "  cover between the raindrop",
        "  and the ground",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: soil forms in centuries, erodes in seasons — quote both timescales for the asymmetry mark.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Every conservation measure slows water or covers soil — the two mechanisms behind all of them.</text>
    </svg>
  );
}
