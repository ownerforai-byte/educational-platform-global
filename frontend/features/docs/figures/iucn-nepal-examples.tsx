/** IUCN categories with Nepal examples. Theme-aware. */
export function IucnNepalExamples({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="IUCN categories with Nepal examples tiger endangered one-horned rhinoceros vulnerable red panda endangered snow leopard vulnerable and the dodo extinct">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The ladder with faces — Nepal's examples</text>

      {[
        { x: 110, t: "EN", s: "Bengal tiger", s2: "red panda", c: "rgb(234 88 12 / 0.9)" },
        { x: 330, t: "VU", s: "one-horned rhinoceros", s2: "snow leopard", c: "rgb(202 138 4 / 0.9)" },
        { x: 550, t: "EX", s: "the dodo —", s2: "the textbook caution", c: "rgb(120 53 15 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 88} y="50" width="176" height="96" rx="12" style={{ color: n.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="82" fontSize="18" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="106" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="122" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
        </g>
      ))}

      <rect x="40" y="162" width="580" height="34" rx="10" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="56" y="184" fontSize="8.6" className="fill-current text-foreground" fontWeight="700">Scale of the problem: more than 42,000 species threatened with extinction; Nepal lists 27 mammal species as threatened.</text>
    </svg>
  );
}
