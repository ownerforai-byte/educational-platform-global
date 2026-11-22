// Concentration units overview. Theme-aware.
export function ConcentrationUnitsPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Concentration units molarity molality normality mass percent definitions with formulas and units">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Four ways to say "how concentrated"</text>
      {[
        ["Molarity (M)", "mol solute ÷ L solution", "mol/L — T-dependent", "rgb(14 165 233 / 0.85)"],
        ["Molality (m)", "mol solute ÷ kg solvent", "mol/kg — T-independent", "rgb(16 185 129 / 0.85)"],
        ["Normality (N)", "equivalents ÷ L solution", "N = M × basicity/acidity", "rgb(139 92 246 / 0.85)"],
        ["Mass %", "mass solute ÷ mass solution × 100", "temperature-proof", "rgb(245 158 11 / 0.85)"],
      ].map(([t, d, n, c], i) => (
        <g key={t}>
          <rect x={30 + (i % 2) * 340} y={40 + Math.floor(i / 2) * 78} width="320" height="70" rx="10" className="fill-current" style={{ color: String(c) }} opacity="0.1" />
          <rect x={30 + (i % 2) * 340} y={40 + Math.floor(i / 2) * 78} width="320" height="70" rx="10" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ color: String(c) }} />
          <text x={46 + (i % 2) * 340} y={62 + Math.floor(i / 2) * 78} fontSize="9.5" className="fill-current text-foreground" fontWeight="800">{t}</text>
          <text x={46 + (i % 2) * 340} y={82 + Math.floor(i / 2) * 78} fontSize="8.4" className="fill-current text-muted-foreground">{d}</text>
          <text x={46 + (i % 2) * 340} y={98 + Math.floor(i / 2) * 78} fontSize="7.6" className="fill-current text-muted-foreground">{n}</text>
        </g>
      ))}
      <rect x="30" y="202" width="660" height="12" rx="0" />
      <text x="360" y="214" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Molarity vs molality is the classic 2m: the denominator (solution volume vs solvent mass) decides temperature dependence.</text>
    </svg>
  );
}
