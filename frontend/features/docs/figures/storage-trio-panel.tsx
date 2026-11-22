// Three hydrogen storage strategies. Theme-aware.
export function StorageTrioPanel({ className }: { className?: string }) {
  const cards: [string, string, string, string][] = [
    ["compressed gas", "~700 bar cylinders", "bulky, heavy cylinders", "rgb(14 165 233)"],
    ["cryogenic liquid", "−253 °C", "liquefaction eats ~30% of the energy", "rgb(59 130 246)"],
    ["metal hydrides", "LaNi₅H₆, MgH₂", "safest but very heavy", "rgb(16 185 129)"],
  ];
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Three hydrogen storage strategies with their drawbacks: compressed gas, cryogenic liquid and metal hydrides">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The storage problem, three ways</text>
      {cards.map(([t, c1, c2, col], i) => (
        <g key={i}>
          <rect x={40 + i * 210} y="50" width="190" height="120" rx="10" className="fill-current" style={{ color: col }} opacity="0.14" />
          <text x={135 + i * 210} y="80" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{t}</text>
          <text x={135 + i * 210} y="108" fontSize="12" textAnchor="middle" style={{ fill: col }}>{c1}</text>
          <text x={135 + i * 210} y="136" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">{c2}</text>
        </g>
      ))}
      <text x="330" y="212" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The lightest gas is the hardest to pack - low density is the fuel's curse</text>
      <text x="330" y="236" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">and its blessing</text>
    </svg>
  );
}
