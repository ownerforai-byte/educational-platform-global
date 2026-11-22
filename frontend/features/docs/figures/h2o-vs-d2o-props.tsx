// H2O vs D2O property comparison. Theme-aware.
export function H2oVsD2oProps({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["molar mass", "18", "20"],
    ["melting point", "0 °C", "3.8 °C"],
    ["boiling point", "100 °C", "101.4 °C"],
    ["density", "1.000 g/mL", "1.108 g/mL"],
    ["reactor role", "absorbs neutrons", "moderator + coolant"],
  ];
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Property table comparing ordinary water and heavy water in mass, melting point, boiling point, density and reactor role">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">H₂O vs D₂O: the isotope ledger</text>
      <rect x="180" y="42" width="180" height="34" rx="8" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.2" />
      <text x="270" y="65" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">H₂O</text>
      <rect x="400" y="42" width="180" height="34" rx="8" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.2" />
      <text x="490" y="65" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">D₂O</text>
      {rows.map(([p, a, b], i) => (
        <g key={i}>
          <text x="50" y={104 + i * 36} fontSize="12" fontWeight="700" className="fill-current text-foreground">{p}</text>
          <text x="270" y={104 + i * 36} fontSize="12" textAnchor="middle" className="fill-current text-muted-foreground">{a}</text>
          <text x="490" y={104 + i * 36} fontSize="12" textAnchor="middle" fontWeight="700" fill="rgb(14 165 233)">{b}</text>
          <line x1="40" y1={112 + i * 36} x2="620" y2={112 + i * 36} stroke="currentColor" strokeWidth="0.6" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="290" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Every constant shifts slightly up - mass is the only difference</text>
    </svg>
  );
}
