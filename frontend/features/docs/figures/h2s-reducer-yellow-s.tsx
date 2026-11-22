// H2S reducer yellow sulphur. Theme-aware.
export function H2sReducerYellowS({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["SO₂", "yellow S + water", "2H₂S + SO₂ → 3S + 2H₂O"],
    ["HNO₃", "S + brown NO₂", "2H₂S + 2HNO₃ → 2NO₂ + 3S + 4H₂O"],
    ["Cl₂", "pale yellow S", "H₂S + Cl₂ → 2HCl + S"],
    ["Fe³⁺", "Fe²⁺ + S", "2FeCl₃ + H₂S → 2FeCl₂ + 2HCl + S"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Hydrogen sulphide reducing oxidants to precipitated yellow sulphur with equations">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">H₂S gives electrons, S rains out</text>
      {rows.map(([o, obs, eq], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.12" />
          <text x="58" y={63 + i * 48} fontSize="12" fontWeight="800" className="fill-current text-foreground">{o}</text>
          <text x="180" y={63 + i * 48} fontSize="10.5" fontWeight="700" fill="rgb(245 158 11)">{obs}</text>
          <text x="600" y={70 + i * 48} fontSize="9.5" textAnchor="end" className="fill-current text-muted-foreground">{eq}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">S²⁻ → S⁰: oxidation number up two, everything around it down</text>
    </svg>
  );
}
