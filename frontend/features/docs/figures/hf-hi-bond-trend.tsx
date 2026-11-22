// Hydrogen halide trend: length up, strength down. Theme-aware.
export function HfHiBondTrend({ className }: { className?: string }) {
  const cols: [string, number, number][] = [
    ["HF", 92, 565],
    ["HCl", 127, 431],
    ["HBr", 141, 364],
    ["HI", 160, 297],
  ];
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Hydrogen halide trend chart showing bond length rising and bond energy falling from hydrogen fluoride through hydrogen chloride and bromide to iodide">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Longer means weaker: H-F to H-I</text>
      {cols.map(([hal, pm, kj], i) => (
        <g key={i}>
          <text x={70 + i * 150} y="60" fontSize="14" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{hal}</text>
          <rect x={40 + i * 150} y={280 - pm} width="50" height={pm - 60} className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.25" />
          <text x={65 + i * 150} y={276 - pm} fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{pm} pm</text>
          <rect x={105 + i * 150} y={280 - kj / 2.4} width="50" height={kj / 2.4 - 60} className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.25" />
          <text x={130 + i * 150} y={276 - kj / 2.4} fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{kj}</text>
        </g>
      ))}
      <text x="330" y="70" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">blue = length (pm), green = energy (kJ/mol, scaled)</text>
      <text x="330" y="296" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Bigger halogen: longer bond, poorer overlap, less ionic character - weaker link</text>
    </svg>
  );
}
