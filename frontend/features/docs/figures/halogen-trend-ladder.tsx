// Halogen trend ladder. Theme-aware.
export function HalogenTrendLadder({ className }: { className?: string }) {
  const rows: [string, string, string, string, string][] = [
    ["F₂", "pale yellow gas", "4.0", "strongest", "rgb(239 68 68)"],
    ["Cl₂", "green-yellow gas", "3.0", "strong", "rgb(245 158 11)"],
    ["Br₂", "red-brown liquid", "2.8", "moderate", "rgb(180 83 9)"],
    ["I₂", "violet-black solid", "2.5", "weak", "rgb(124 58 237)"],
  ];
  return (
    <svg viewBox="0 0 660 270" className={className} role="img" aria-label="Ladder of halogens with state colour electronegativity and oxidising power from fluorine to iodine">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Down the group: bigger, softer, weaker</text>
      {rows.map(([x, state, en, ox, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="120" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.2" />
          <text x="100" y={71 + i * 48} fontSize="13" fontWeight="800" textAnchor="middle" style={{ fill: c }}>{x}</text>
          <text x="190" y={71 + i * 48} fontSize="11.5" className="fill-current text-foreground">{state}</text>
          <text x="400" y={71 + i * 48} fontSize="11.5" textAnchor="middle" className="fill-current text-muted-foreground">EN {en}</text>
          <text x="560" y={71 + i * 48} fontSize="11.5" textAnchor="end" fontWeight="700" style={{ fill: c }}>{ox} oxidant</text>
        </g>
      ))}
      <text x="330" y="256" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Radius up, electronegativity down, oxidising power down — the family trade-off</text>
    </svg>
  );
}
