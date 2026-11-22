// NH3 vs PH3 contrast. Theme-aware.
export function Nh3VsPh3Contrast({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["bond angle", "107°", "93.6°"],
    ["dipole moment", "1.46 D", "0.58 D"],
    ["basicity", "fairly basic (pKb 4.7)", "very weak base"],
    ["solubility", "highly soluble (H-bonds)", "slightly soluble"],
    ["smell", "pungent", "garlic, rotten fish"],
    ["flammability", "non-flammable in air", "burns to H₃PO₄"],
  ];
  return (
    <svg viewBox="0 0 660 340" className={className} role="img" aria-label="Six row comparison of ammonia and phosphine">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Same shape, weaker grip</text>
      <text x="290" y="50" fontSize="13" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">NH₃</text>
      <text x="500" y="50" fontSize="13" fontWeight="800" textAnchor="middle" fill="rgb(124 58 237)">PH₃</text>
      {rows.map(([p, a, b], i) => (
        <g key={i}>
          <text x="60" y={80 + i * 40} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{p}</text>
          <text x="290" y={80 + i * 40} fontSize="11" textAnchor="middle" fontWeight="700" fill="rgb(59 130 246)">{a}</text>
          <text x="500" y={80 + i * 40} fontSize="11" textAnchor="middle" fontWeight="700" fill="rgb(124 58 237)">{b}</text>
          <line x1="50" y1={88 + i * 40} x2="620" y2={88 + i * 40} stroke="currentColor" strokeWidth="0.6" className="text-muted-foreground" opacity="0.3" />
        </g>
      ))}
      <text x="330" y="328" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">P is bigger and less electronegative — the lone pair sits looser and bonds sag to 93.6°</text>
    </svg>
  );
}
