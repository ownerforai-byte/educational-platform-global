/** Pond food web — who eats whom in the water. Well-detailed. Theme-aware. */
export function PondFoodWeb({ className }: { className?: string }) {
  const nodes: [string, number, number][] = [
    ["algae", 110, 90],
    ["water plants", 250, 90],
    ["zooplankton", 110, 170],
    ["insect larvae", 250, 170],
    ["small fish", 180, 240],
    ["big fish", 330, 240],
  ];
  const links: [number, number][] = [[0, 2], [1, 2], [1, 3], [2, 4], [3, 4], [4, 5], [3, 5]];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Pond food web algae water plants zooplankton insect larvae small fish big fish arrows energy flow interconnection ecology diagram">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">A pond food web — arrows point where the energy goes</text>
      <rect x="30" y="44" width="660" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      {links.map(([a, b], i) => {
        const [ax, ay] = nodes[a].slice(1) as [number, number];
        const [bx, by] = nodes[b].slice(1) as [number, number];
        return <line key={i} x1={ax} y1={ay} x2={bx} y2={by} className="stroke-current text-sky-600/60" strokeWidth="1.6" />;
      })}
      {nodes.map(([name, x, y]) => (
        <g key={name}>
          <rect x={x - 52} y={y - 16} width="104" height="32" rx="8" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <text x={x} y={y + 5} fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{name}</text>
        </g>
      ))}
      <text x="430" y="110" fontSize="7.4" className="fill-current text-muted-foreground">• producers at the top-left feed everything</text>
      <text x="430" y="130" fontSize="7.4" className="fill-current text-muted-foreground">• most animals have several foods</text>
      <text x="430" y="150" fontSize="7.4" className="fill-current text-muted-foreground">• remove one link and others reroute</text>
      <text x="430" y="176" fontSize="7.4" className="fill-current text-sky-600" fontWeight="700">Reading rule: arrow = eaten → eater</text>
      <text x="430" y="200" fontSize="7.4" className="fill-current text-muted-foreground">Big fish sits at the top of every path;</text>
      <text x="430" y="218" fontSize="7.4" className="fill-current text-muted-foreground">algae sit at the bottom of every path.</text>
    </svg>
  );
}
