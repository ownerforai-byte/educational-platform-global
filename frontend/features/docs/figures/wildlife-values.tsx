/** Wildlife values — ecological, economic, cultural. Theme-aware. */
export function WildlifeValues({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Values of wildlife ecological ecosystem services economic ecotourism and genetic diversity and cultural aesthetic ethical value">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Wildlife — three kinds of value</text>

      {[
        { x: 110, t: "ECOLOGICAL", s: "pollination, seed dispersal,", s2: "nutrient cycling, pest control,", s3: "maintenance of food webs", c: "rgb(22 163 74 / 0.9)" },
        { x: 330, t: "ECONOMIC", s: "ecotourism, medicinal resources,", s2: "genetic diversity for agriculture,", s3: "sustainable timber and non-timber", c: "rgb(245 158 11 / 0.9)" },
        { x: 550, t: "CULTURAL", s: "aesthetic and ethical value;", s2: "indigenous knowledge and", s3: "spiritual traditions", c: "rgb(124 58 237 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 88} y="52" width="176" height="110" rx="12" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="76" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="98" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="116" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
          <text x={n.x} y="134" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s3}</text>
        </g>
      ))}

      <rect x="40" y="180" width="580" height="34" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="56" y="202" fontSize="8.8" className="fill-current text-foreground" fontWeight="700">Wildlife = all non-domesticated plants, animals and microorganisms in natural habitats — ecosystem components, not decoration.</text>
    </svg>
  );
}
