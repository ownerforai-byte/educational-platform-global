// Solved: mass percent numerical. Theme-aware.
export function MassPercentDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Solved mass percent ten gram salt in ninety gram water ten percent by mass solution mass two hundred total">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — mass percent of a solution</text>
      {[
        ["Given", "10 g NaCl dissolved in 90 g water"],
        ["Mass of solution", "10 + 90 = 100 g"],
        ["Mass percent", "(10 ÷ 100) × 100 = 10% (w/w)"],
        ["Trap avoided", "divide by the SOLUTION mass, not the solvent mass"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x="30" y={40 + i * 40} width="660" height="34" rx="9" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(245 158 11 / 0.85)" }} />
          <text x="46" y={62 + i * 40} fontSize="9" className="fill-current text-amber-600" fontWeight="800">{t}</text>
          <text x="674" y={62 + i * 40} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{d}</text>
        </g>
      ))}
      <rect x="30" y="202" width="660" height="12" rx="0" />
      <text x="360" y="214" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Variants: w/v percent (g per 100 mL) for lab reagents; v/v percent for alcohol mixtures — always state which.</text>
    </svg>
  );
}
