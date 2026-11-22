// Ice open lattice versus liquid water density. Theme-aware.
export function IceDensityPanel({ className }: { className?: string }) {
  const ice: [number, number][] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) ice.push([90 + c * 60 + (r % 2) * 30, 90 + r * 55]);
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Ice open hexagonal hydrogen bonded lattice at 0.92 grams per cubic centimetre compared with denser liquid water at 1.00 explaining why ice floats">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Why ice floats: the lattice holds empty space</text>
      {ice.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="11" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.25" />
          <text x={x} y={y + 3.5} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">O</text>
        </g>
      ))}
      {ice.slice(0, ice.length - 1).map(([x, y], i) => (
        <line key={"l" + i} x1={x} y1={y} x2={ice[i + 1][0]} y2={ice[i + 1][1]} stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
      ))}
      <text x="480" y="100" fontSize="12" className="fill-current text-foreground" fontWeight="700">Ice: 0.92 g/cm3</text>
      <text x="480" y="124" fontSize="10.5" className="fill-current text-muted-foreground">tetrahedral, 4-connected,</text>
      <text x="480" y="142" fontSize="10.5" className="fill-current text-muted-foreground">about 11% empty space</text>
      <text x="480" y="176" fontSize="12" className="fill-current text-foreground" fontWeight="700">Water: 1.00 g/cm3</text>
      <text x="480" y="200" fontSize="10.5" className="fill-current text-muted-foreground">some H-bonds collapse,</text>
      <text x="480" y="218" fontSize="10.5" className="fill-current text-muted-foreground">molecules pack closer</text>
      <text x="330" y="266" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Floating ice insulates lakes - fish survive the winter underneath</text>
    </svg>
  );
}
