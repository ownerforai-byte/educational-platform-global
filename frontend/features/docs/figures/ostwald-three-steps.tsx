// Ostwald process three steps. Theme-aware.
export function OstwaldThreeSteps({ className }: { className?: string }) {
  const steps: [string, string, string][] = [
    ["1. catalytic oxidation", "4NH₃ + 5O₂ → 4NO + 6H₂O", "Pt–Rh gauze, 800–900 °C"],
    ["2. further oxidation", "2NO + O₂ → 2NO₂", "cooling tower, NO recycled"],
    ["3. absorption", "3NO₂ + H₂O → 2HNO₃ + NO", "excess air drives it forward"],
  ];
  return (
    <svg viewBox="0 0 660 270" className={className} role="img" aria-label="Ostwald process three steps with conditions including platinum rhodium gauze at 800 to 900 degrees">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Ostwald: NH₃ → HNO₃ in three moves</text>
      {steps.map(([t, eq, cond], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 60} width="580" height="50" rx="9" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.12" />
          <text x="58" y={64 + i * 60} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{t}</text>
          <text x="58" y={84 + i * 60} fontSize="11.5" fontWeight="700" fill="rgb(59 130 246)">{eq}</text>
          <text x="430" y={84 + i * 60} fontSize="10.5" textAnchor="end" className="fill-current text-muted-foreground">{cond}</text>
        </g>
      ))}
      <text x="330" y="256" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Verified PYQ (NEB 2021): the gauze is Pt–Rh at 800–900 °C, and unreacted NO is recycled</text>
    </svg>
  );
}
