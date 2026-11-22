// Halide bond energy ladder. Theme-aware.
export function HalideBondLadder({ className }: { className?: string }) {
  const bars: [string, number, string][] = [
    ["H–Cl", 431, "rgb(59 130 246)"],
    ["H–Br", 366, "rgb(245 158 11)"],
    ["H–I", 299, "rgb(239 68 68)"],
  ];
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Bond energy ladder of hydrogen halides 431 366 and 299 kilojoules per mole">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The bond weakens, everything follows</text>
      {bars.map(([l, v, c], i) => (
        <g key={i}>
          <text x="90" y={70 + i * 44} fontSize="12.5" fontWeight="800" textAnchor="end" className="fill-current text-foreground">{l}</text>
          <rect x="105" y={54 + i * 44} width={v} height="26" rx="6" className="fill-current" style={{ color: c }} opacity="0.55" />
          <text x={115 + v} y={72 + i * 44} fontSize="12" fontWeight="800" style={{ fill: c }}>{v} kJ/mol</text>
        </g>
      ))}
      <text x="330" y="204" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">127 → 141 → 161 pm: one lengthening bond explains stability, acidity and reducing power</text>
    </svg>
  );
}
