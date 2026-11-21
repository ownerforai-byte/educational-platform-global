/** Rare vs threatened vs endangered misconceptions. Theme-aware. */
export function RareVsThreatened({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Rare versus threatened versus endangered rare species are not always endangered population trend matters threatened means CR EN and VU collectively and extinct in the wild still survives in captivity">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Words students mix up — the three traps</text>

      {[
        { x: 110, t: "RARE ≠ ENDANGERED", s: "rarity alone doesn't imply", s2: "endangerment —", s3: "population trend matters", c: "rgb(245 158 11 / 0.9)" },
        { x: 330, t: "THREATENED = CR+EN+VU", s: "not a single category —", s2: "it is the collective label for", s3: "the three risk tiers", c: "rgb(244 63 94 / 0.9)" },
        { x: 550, t: "EW ≠ EX", s: "extinct in the wild species", s2: "still survive in captivity", s3: "or cultivation", c: "rgb(124 58 237 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 88} y="52" width="176" height="110" rx="12" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="76" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="98" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="114" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
          <text x={n.x} y="130" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s3}</text>
        </g>
      ))}

      <rect x="40" y="180" width="580" height="34" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="56" y="202" fontSize="8.8" className="fill-current text-foreground" fontWeight="700">One-line anchors: Extinct = no reasonable doubt the last individual has died. Endangered = very high risk in the near future.</text>
    </svg>
  );
}
