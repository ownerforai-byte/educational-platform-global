/** Air pollutant effects — smog, acid rain, greenhouse, health. Theme-aware. */
export function AirPollutantEffects({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Air pollution effects photochemical smog ozone and PAN eye irritation acid rain acidifies lakes corrodes buildings greenhouse effect global warming glacier retreat and CO binding haemoglobin causing hypoxia">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">What polluted air does — four chains of damage</text>

      {[
        { x: 105, t: "PHOTOCHEMICAL SMOG", s: "NOₓ + hydrocarbons + sunlight", s2: "→ ozone and PAN → eye irritation,", s3: "plant damage", c: "rgb(245 158 11 / 0.9)" },
        { x: 275, t: "ACID RAIN", s: "SO₂ + NOₓ dissolve in rain", s2: "→ acidifies lakes and soils,", s3: "corrodes buildings", c: "rgb(14 165 233 / 0.9)" },
        { x: 445, t: "GREENHOUSE EFFECT", s: "CO₂, CH₄, N₂O trap infrared", s2: "→ global warming, glacier retreat,", s3: "sea-level rise, erratic monsoon", c: "rgb(22 163 74 / 0.9)" },
        { x: 590, t: "DIRECT TOXICITY", s: "CO binds haemoglobin →", s2: "tissue hypoxia; particulates", s3: "→ asthma, bronchitis", c: "rgb(244 63 94 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 80} y="56" width="160" height="130" rx="12" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="78" fontSize="7.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="100" fontSize="6.9" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="118" fontSize="6.9" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
          <text x={n.x} y="136" fontSize="6.9" textAnchor="middle" className="fill-current text-muted-foreground">{n.s3}</text>
        </g>
      ))}

      <rect x="40" y="204" width="580" height="32" rx="10" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="56" y="225" fontSize="8.8" className="fill-current text-foreground" fontWeight="700">Local face of it: the haze over Kathmandu valley — vehicle exhaust plus brick kilns plus winter temperature inversion.</text>
    </svg>
  );
}
