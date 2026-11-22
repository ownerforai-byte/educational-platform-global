// Antarctic ozone hole formation recipe. Theme-aware.
export function AntarcticHoleRecipe({ className }: { className?: string }) {
  const items: [string, string, string][] = [
    ["polar winter darkness", "no UV, vortex isolates air", "rgb(59 130 246)"],
    ["polar stratospheric clouds (PSCs)", "−80 °C ice surfaces host reservoir reactions", "rgb(14 165 233)"],
    ["Cl₂ + BrCl released", "stored on PSCs as reservoirs, then freed", "rgb(245 158 11)"],
    ["spring sunlight returns", "Cl₂ + hν → 2Cl· - hole opens fast", "rgb(239 68 68)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Four stage recipe for the Antarctic ozone hole involving polar stratospheric clouds and spring sunlight">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Why the hole is Antarctic and seasonal</text>
      {items.map(([t, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 46} width="580" height="38" rx="9" className="fill-current" style={{ color: c }} opacity="0.13" />
          <text x="58" y={62 + i * 46} fontSize="12" fontWeight="800" className="fill-current text-foreground">{t}</text>
          <text x="58" y={79 + i * 46} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="246" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Dark + ice + returning light: a three-ingredient recipe only the South Pole serves</text>
    </svg>
  );
}
