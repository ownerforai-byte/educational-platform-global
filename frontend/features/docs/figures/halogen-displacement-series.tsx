// Halogen displacement series. Theme-aware.
export function HalogenDisplacementSeries({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Cl₂ into KBr", "orange Br₂ liberated", "rgb(245 158 11)"],
    ["Cl₂ into KI", "blue-black I₂ with starch", "rgb(124 58 237)"],
    ["Br₂ into KI", "blue-black I₂ liberated", "rgb(124 58 237)"],
    ["I₂ into KCl/KBr", "nothing — too weak", "rgb(148 163 184)"],
  ];
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Displacement series showing lighter halogens liberating heavier halides with observed colours">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The bully always wins: lighter displaces heavier</text>
      {rows.map(([r, o, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 44} width="580" height="36" rx="8" className="fill-current" style={{ color: c }} opacity="0.12" />
          <text x="58" y={69 + i * 44} fontSize="12" fontWeight="800" className="fill-current text-foreground">{r}</text>
          <text x="600" y={69 + i * 44} fontSize="11" textAnchor="end" style={{ fill: c }}>{o}</text>
        </g>
      ))}
      <text x="330" y="236" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">F&gt;Cl&gt;Br&gt;I — the oxidising ladder in action</text>
    </svg>
  );
}
