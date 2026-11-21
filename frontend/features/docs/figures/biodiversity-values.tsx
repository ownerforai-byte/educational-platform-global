/** Why biodiversity matters — ecosystem services value chart. Theme-aware. */
export function BiodiversityValues({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Why biodiversity matters ecosystem services food security medicine and ethical aesthetic value underpinning human wellbeing">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why biodiversity matters — the value chain</text>

      {[
        { x: 110, t: "ECOSYSTEM SERVICES", s: "water, soil, climate regulation,", s2: "pollination — provided free", c: "rgb(22 163 74 / 0.9)" },
        { x: 330, t: "FOOD SECURITY", s: "crop diversity = insurance", s2: "against disease and climate shifts", c: "rgb(245 158 11 / 0.9)" },
        { x: 550, t: "MEDICINE", s: "wild species are the source", s2: "of many drugs and treatments", c: "rgb(124 58 237 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 88} y="52" width="176" height="88" rx="12" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="76" fontSize="7.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="96" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="112" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
        </g>
      ))}

      <rect x="40" y="156" width="580" height="44" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="56" y="174" fontSize="8.8" className="fill-current text-foreground" fontWeight="700">Ethical–aesthetic value: species have worth beyond use — and national heritage value.</text>
      <text x="56" y="192" fontSize="8.2" className="fill-current text-muted-foreground">Every level underpins the next: genes → species → ecosystems → services → people.</text>
    </svg>
  );
}
