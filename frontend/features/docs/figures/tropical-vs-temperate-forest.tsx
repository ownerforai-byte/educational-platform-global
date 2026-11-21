/** Tropical deciduous vs temperate evergreen comparison. Theme-aware. */
export function TropicalVsTemperateForest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Tropical deciduous sal forest versus temperate evergreen oak conifer forest comparison altitude climate dominant species leaf habit and commercial value">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Sal forest vs oak–conifer forest (NEB 2021 &amp; 2024)</text>
      {[
        { y: 56, h: "BASIS", a: "Tropical deciduous (sal)", b: "Temperate evergreen (oak–conifer)" },
        { y: 88, h: "Altitude", a: "below ~1000 m", b: "~2000–3000 m" },
        { y: 120, h: "Climate", a: "hot summer, monsoon rain, dry winter", b: "cool, moist, snowy winter" },
        { y: 152, h: "Dominant species", a: "sal, sissoo, khair", b: "oak, blue pine, fir, hemlock, rhododendron" },
        { y: 184, h: "Leaf habit", a: "deciduous — shed leaves in dry season", b: "evergreen — needle/broad leaves year-round" },
        { y: 216, h: "Commercial value", a: "sal timber — most exploited zone", b: "timber, resin, fuel; slower growth" },
      ].map((r, i) => (
        <g key={r.h}>
          <rect x="30" y={r.y - 18} width="600" height="28" rx="6" className={i === 0 ? "fill-current text-foreground/5" : "fill-current text-muted-foreground/5"} />
          <text x="40" y={r.y} fontSize="7.8" className="fill-current text-foreground" fontWeight={i === 0 ? 800 : 700}>{r.h}</text>
          <text x="220" y={r.y} fontSize="7.4" className="fill-current text-muted-foreground">{r.a}</text>
          <text x="440" y={r.y} fontSize="7.4" className="fill-current text-muted-foreground">{r.b}</text>
        </g>
      ))}
      <text x="16" y="242" fontSize="8" className="fill-current text-muted-foreground">Deciduous = a drought strategy; evergreen = a year-round photosynthesis strategy.</text>
    </svg>
  );
}
