// Reciprocal proportions panel. Theme-aware.
export function ReciprocalProportionPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Reciprocal proportions law panel CH4 and CO2 combine ratios with carbon common element equivalent ratio one to four">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Reciprocal proportions — the exchange-rate law</text>
      {[
        ["CH₄", "C : H = 12 : 4 = 3 : 1"],
        ["CO₂", "C : O = 12 : 32 = 3 : 8"],
        ["Prediction", "H : O in water should be 8 : 1 = 1 : 8"],
        ["Reality", "H₂O is H : O = 2 : 16 = 1 : 8 ✓"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={40 + i * 42} width="660" height="36" rx="9" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="46" y={58 + i * 42} fontSize="9" className="fill-current text-sky-600" fontWeight="800">{t}</text>
          <text x="674" y={58 + i * 42} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d}</text>
        </g>
      ))}
      <rect x="30" y="196" width="660" height="16" rx="0" />
      <text x="360" y="210" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Statement: the masses of two elements that separately combine with a fixed mass of a third are also the (or simple multiples of the) masses in which they combine with each other.</text>
    </svg>
  );
}
