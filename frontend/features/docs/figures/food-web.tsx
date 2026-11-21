/**
 * Food web — interconnected chains in a grassland/pond community.
 * Theme-aware via currentColor.
 */
export function FoodWeb({ className }: { className?: string }) {
  const node = (x: number, y: number, t: string, c: string, k: string) => (
    <g key={k}>
      <rect x={x - 38} y={y - 14} width="76" height="28" rx="8" style={{ color: c }} className="fill-current opacity-12" strokeWidth="2" stroke="currentColor" />
      <text x={x} y={y + 4} fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{t}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Food web diagram connecting plants grasshopper rabbit frog snake hawk fox and decomposers with multiple feeding links">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Food web — real ecosystems are braided, not linear</text>

      {node(330, 60, "Plants (T1)", "rgb(22 163 74 / 0.9)", "n1")}
      {node(120, 130, "Grasshopper", "rgb(14 165 233 / 0.9)", "n2")}
      {node(280, 130, "Rabbit", "rgb(14 165 233 / 0.9)", "n3")}
      {node(470, 130, "Deer", "rgb(14 165 233 / 0.9)", "n4")}
      {node(120, 210, "Frog", "rgb(245 158 11 / 0.9)", "n5")}
      {node(300, 210, "Fox", "rgb(244 63 94 / 0.9)", "n6")}
      {node(480, 210, "Hawk", "rgb(244 63 94 / 0.9)", "n7")}
      {node(600, 270, "Decomposers", "rgb(124 58 237 / 0.9)", "n8")}

      <g className="stroke-current text-muted-foreground" strokeWidth="2">
        <line x1="310" y1="72" x2="140" y2="116" /><line x1="320" y1="76" x2="290" y2="116" /><line x1="350" y1="72" x2="460" y2="116" />
        <line x1="130" y1="144" x2="120" y2="196" /><line x1="140" y1="144" x2="280" y2="198" />
        <line x1="290" y1="144" x2="300" y2="196" /><line x1="300" y1="144" x2="470" y2="198" />
        <line x1="140" y1="224" x2="290" y2="220" /><line x1="140" y1="224" x2="460" y2="222" />
        <line x1="480" y1="224" x2="590" y2="262" /><line x1="320" y1="224" x2="580" y2="268" />
      </g>

      <text x="16" y="270" fontSize="10" className="fill-current text-muted-foreground">One species, many menus: the hawk eats frogs, foxes and snakes; if rabbits die out, deer and grasshoppers absorb the pressure. </text>
      <text x="16" y="288" fontSize="10" className="fill-current text-muted-foreground">More interconnections → more stability: a web absorbs shocks that would snap a single chain.</text>
    </svg>
  );
}
