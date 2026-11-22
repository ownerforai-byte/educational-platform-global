// Benzene resonance: Kekule forms, circle notation, 139 pm. Theme-aware.
export function ResonanceBenzenePanel({ className }: { className?: string }) {
  const hex = (x0: number, doubleShift: number) => {
    const pts: [number, number][] = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      pts.push([x0 + 60 * Math.cos(a), 120 + 60 * Math.sin(a)]);
    }
    return (
      <g>
        {pts.map(([x, y], i) => {
          const [nx, ny] = pts[(i + 1) % 6];
          return <line key={i} x1={x} y1={y} x2={nx} y2={ny} stroke="currentColor" strokeWidth="2" />;
        })}
        {[0, 2, 4].map((i) => {
          const [x, y] = pts[i];
          const [nx, ny] = pts[(i + 1) % 6];
          return <line key={"d" + i} x1={x + doubleShift} y1={y + doubleShift} x2={nx + doubleShift} y2={ny + doubleShift} stroke="currentColor" strokeWidth="2" />;
        })}
      </g>
    );
  };
  return (
    <svg viewBox="0 0 680 250" className={className} role="img" aria-label="Benzene resonance between two Kekule structures and the circle notation with all carbon carbon bonds at 139 picometres">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Benzene: the famous resonance pair</text>
      {hex(110, 6)}
      {hex(400, -6)}
      <text x="300" y="130" fontSize="26" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">&#8596;</text>
      <circle cx="610" cy="120" r="42" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="610" cy="120" r="24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
      <text x="610" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">circle notation</text>
      <text x="340" y="236" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Every C-C bond: 139 pm - between single 154 and double 134</text>
    </svg>
  );
}
