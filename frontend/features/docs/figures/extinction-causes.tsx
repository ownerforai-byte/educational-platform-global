/** Six causes of extinction. Theme-aware. */
export function ExtinctionCauses({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Six major causes of extinction habitat destruction and fragmentation overexploitation invasive species pollution climate change and disease with habitat loss leading">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Six roads to extinction</text>

      {[
        { x: 110, t: "HABITAT LOSS", s: "destruction + fragmentation —", s2: "the LEADING cause; driven by", s3: "deforestation, agriculture,", s4: "urbanisation, infrastructure", c: "rgb(244 63 94 / 0.9)" },
        { x: 330, t: "OVEREXPLOITATION", s: "harvesting exceeds reproduction —", s2: "ivory poaching, overfishing,", s3: "hunting beyond recovery", c: "rgb(245 158 11 / 0.9)" },
        { x: 550, t: "INVASIVE SPECIES", s: "aliens outcompete natives and", s2: "alter ecosystem dynamics —", s3: "Lantana camara in Nepal", c: "rgb(124 58 237 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 88} y="52" width="176" height="112" rx="12" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="74" fontSize="7.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="94" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="110" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
          <text x={n.x} y="126" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{n.s3}</text>
          {n.s4 && <text x={n.x} y="142" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{n.s4}</text>}
        </g>
      ))}

      {[
        { x: 220, t: "POLLUTION", s: "pesticides, waste, effluents" },
        { x: 440, t: "CLIMATE CHANGE", s: "shifting habitats and timing" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 88} y="180" width="176" height="40" rx="10" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={n.x} y="196" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="212" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
        </g>
      ))}
      <text x="16" y="234" fontSize="9" className="fill-current text-muted-foreground">Plus disease — often the finishing blow to a population already reduced by the other five.</text>
    </svg>
  );
}
