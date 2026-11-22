// Catenation champion. Theme-aware.
export function CatenationChampion({ className }: { className?: string }) {
  const bars: [string, number, string][] = [
    ["C–C", 355, "rgb(16 185 129)"],
    ["Si–Si", 222, "rgb(148 163 184)"],
  ];
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Carbon carbon bond 355 versus silicon silicon 222 kilojoules per mole explaining catenation">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Why carbon chains and silicon doesn't</text>
      {bars.map(([l, v, c], i) => (
        <g key={i}>
          <text x="90" y={72 + i * 46} fontSize="12.5" fontWeight="800" textAnchor="end" className="fill-current text-foreground">{l}</text>
          <rect x="105" y={56 + i * 46} width={v * 1.2} height="28" rx="6" className="fill-current" style={{ color: c }} opacity="0.55" />
          <text x={115 + v * 1.2} y={75 + i * 46} fontSize="12" fontWeight="800" style={{ fill: c }}>{v} kJ/mol</text>
        </g>
      ))}
      <text x="330" y="188" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">355 kJ/mol survives chains of millions; 222 kJ/mol barely builds three links</text>
    </svg>
  );
}
