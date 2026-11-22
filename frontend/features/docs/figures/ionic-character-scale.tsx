// Ionic character scale from HF to HI. Theme-aware.
export function IonicCharacterScale({ className }: { className?: string }) {
  const bars: [string, number, string][] = [
    ["HF", 43, "EN diff 1.9"],
    ["HCl", 17, "EN diff 0.9"],
    ["HBr", 11, "EN diff 0.7"],
    ["HI", 5, "EN diff 0.4"],
  ];
  return (
    <svg viewBox="0 0 640 280" className={className} role="img" aria-label="Ionic character scale bar chart for hydrogen fluoride 43 percent hydrogen chloride 17 hydrogen bromide 11 and hydrogen iodide 5 percent">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Ionic character falls as EN difference shrinks</text>
      {bars.map(([label, pct, note], i) => (
        <g key={i}>
          <text x="50" y={76 + i * 56} fontSize="14" className="fill-current text-foreground" fontWeight="800">{label}</text>
          <rect x="110" y={56 + i * 56} width={pct * 8} height="36" className="fill-current" style={{ color: "rgb(244 63 94)" }} opacity="0.28" />
          <text x={124 + pct * 8} y={80 + i * 56} fontSize="12" className="fill-current text-foreground" fontWeight="700">{pct}%</text>
          <text x="500" y={80 + i * 56} fontSize="10" className="fill-current text-muted-foreground">{note}</text>
        </g>
      ))}
      <text x="320" y="266" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Hannay-Smyth: percent ionic = 16 x ENdiff + 3.5 x ENdiff squared</text>
    </svg>
  );
}
