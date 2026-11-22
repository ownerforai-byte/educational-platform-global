// Bleaching speed contrast for halogens. Theme-aware.
export function BleachingSpeedContrast({ className }: { className?: string }) {
  const bars: [string, number, string][] = [
    ["Cl₂", 90, "rgb(245 158 11)"],
    ["Br₂", 35, "rgb(180 83 9)"],
    ["I₂", 0, "rgb(124 58 237)"],
  ];
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Bleaching speed on moist litmus fast for chlorine slow for bromine and none for iodine">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Bleaching power tracks oxidising power</text>
      {bars.map(([l, v, c], i) => (
        <g key={i}>
          <text x="80" y={70 + i * 44} fontSize="12.5" fontWeight="800" textAnchor="end" style={{ fill: c }}>{l}</text>
          {v > 0 && <rect x="95" y={54 + i * 44} width={v * 4.4} height="26" rx="6" className="fill-current" style={{ color: c }} opacity="0.5" />}
          <text x={105 + v * 4.4} y={72 + i * 44} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{v === 0 ? "no bleach" : v === 90 ? "fast" : "slow"}</text>
        </g>
      ))}
      <text x="330" y="204" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">HOCl strength falls down the group — iodine bleaches nothing</text>
    </svg>
  );
}
