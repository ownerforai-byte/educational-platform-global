// Dispersion size ladder: halogen boiling points. Theme-aware.
export function DispersionSizeLadder({ className }: { className?: string }) {
  const cols: [string, number, string][] = [
    ["F2", -188, "gas"],
    ["Cl2", -34, "gas"],
    ["Br2", 59, "liquid"],
    ["I2", 184, "solid"],
  ];
  return (
    <svg viewBox="0 0 640 300" className={className} role="img" aria-label="Dispersion size ladder showing boiling points of fluorine chlorine bromine and iodine rising with electron count from gas to solid">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">More electrons, stronger flicker: F2 to I2</text>
      <line x1="80" y1="240" x2="580" y2="240" stroke="currentColor" strokeWidth="1.5" />
      {cols.map(([mol, bp, state], i) => {
        const h = (bp + 200) / 4.2;
        return (
          <g key={i}>
            <rect x={100 + i * 120} y={240 - h} width="60" height={h} className="fill-current" style={{ color: "rgb(139 92 246)" }} opacity="0.25" />
            <text x={130 + i * 120} y={232 - h} fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{bp} C</text>
            <text x={130 + i * 120} y="264" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{mol}</text>
            <text x={130 + i * 120} y="284" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">{state}</text>
          </g>
        );
      })}
      <text x="320" y="40" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Same nonpolar bonding family - only polarisability changes</text>
    </svg>
  );
}
