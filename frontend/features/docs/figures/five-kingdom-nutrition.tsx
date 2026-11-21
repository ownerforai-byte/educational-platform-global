/** Five kingdoms sorted by nutrition. Well-detailed. Theme-aware. */
export function FiveKingdomNutrition({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Five kingdoms sorted by nutrition mode autotrophic photosynthetic chemosynthetic heterotrophic absorptive ingestive saprophytic parasitic monera protista fungi plantae animalia flow diagram">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">One question sorts the kingdoms: how do you eat?</text>

      {/* nutrition root */}
      <rect x="280" y="44" width="160" height="40" rx="10" className="fill-current text-sky-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="68" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NUTRITION MODE</text>

      {/* three branches */}
      {[
        { x: 140, t: "AUTOTROPHIC", s: "makes its own food", c: "rgb(22 163 74 / 0.9)" },
        { x: 360, t: "ABSORPTIVE", s: "digests outside, absorbs", c: "rgb(245 158 11 / 0.9)" },
        { x: 580, t: "INGESTIVE", s: "swallows whole food", c: "rgb(244 63 94 / 0.9)" },
      ].map((b) => (
        <g key={b.t}>
          <path d={`M360 84 L${b.x} 120`} strokeWidth="2.5" className="stroke-current text-muted-foreground" />
          <rect x={b.x - 90} y="120" width="180" height="52" rx="10" style={{ color: b.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={b.x} y="142" fontSize="8.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{b.t}</text>
          <text x={b.x} y="160" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{b.s}</text>
        </g>
      ))}

      {/* kingdoms */}
      {[
        { x: 140, t: "Plantae + photosynthetic Monera & Protista", c: "rgb(22 163 74 / 0.9)" },
        { x: 360, t: "Fungi + absorptive Monera & Protista", c: "rgb(245 158 11 / 0.9)" },
        { x: 580, t: "Animalia + ingestive Protista", c: "rgb(244 63 94 / 0.9)" },
      ].map((k) => (
        <g key={k.t}>
          <path d={`M${k.x} 172 L${k.x} 200`} strokeWidth="2.5" className="stroke-current text-muted-foreground" />
          <rect x={k.x - 95} y="200" width="190" height="58" rx="10" style={{ color: k.c }} className="fill-current opacity-15" strokeWidth="2.5" stroke="currentColor" />
          <text x={k.x} y="224" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{k.t}</text>
        </g>
      ))}

      <text x="16" y="290" fontSize="8.4" className="fill-current text-muted-foreground">Whittaker's insight: nutrition + cell structure + body organisation together place every organism unambiguously — that is why five kingdoms beat two.</text>
    </svg>
  );
}
