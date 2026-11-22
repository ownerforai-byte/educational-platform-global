// Halide reducing power ladder. Theme-aware.
export function HalideReducingLadder({ className }: { className?: string }) {
  const bars: [string, number, string][] = [
    ["Cl⁻", 15, "rgb(59 130 246)"],
    ["Br⁻", 55, "rgb(245 158 11)"],
    ["I⁻", 95, "rgb(239 68 68)"],
  ];
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Reducing power ladder of halides increasing from chloride to iodide">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Reducing power climbs as the ion grows</text>
      {bars.map(([l, v, c], i) => (
        <g key={i}>
          <text x="80" y={70 + i * 44} fontSize="12.5" fontWeight="800" textAnchor="end" style={{ fill: c }}>{l}</text>
          <rect x="95" y={54 + i * 44} width={v * 4.4} height="26" rx="6" className="fill-current" style={{ color: c }} opacity="0.55" />
          <text x={105 + v * 4.4} y={72 + i * 44} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{v === 15 ? "barely reduces" : v === 55 ? "gives Br₂ with conc H₂SO₄" : "gives I₂, even reduces H₂SO₄"}</text>
        </g>
      ))}
      <text x="330" y="204" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Bigger ion, looser electrons — the reducing ladder mirrors the bond ladder</text>
    </svg>
  );
}
